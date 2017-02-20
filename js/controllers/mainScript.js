var myVideo = document.getElementById("video1"); //Get Video Tag Element in HTML
var myAudio = document.getElementById("audioDiv");
var ip_value = document.getElementById("ip_value");
var port_value = document.getElementById("port_value");
var playButton = document.getElementById("playButton");
var pauseButton = document.getElementById("pauseButton");
var request = new XMLHttpRequest();
var data;

var flag = true;

var music_index = 0;

var indexOfLast = 0;

//Array with every slide.
//NOTE: Slides MUST be in png format.
var audios = [
	"/api/download-audio-filtered/musica1",
	"/api/download-audio-filtered/musica2",
	"/api/download-audio-filtered/musica3",
	"/api/download-audio-filtered/musica4",
	"/api/download-audio-filtered/musica5",
];

var auris_path = [
	"/api/download-auris/musica1",
	"/api/download-auris/musica2",
	"/api/download-auris/musica3",
	"/api/download-auris/musica4",
	"/api/download-auris/musica5",
];

var videos = [
	"/api/download-video/video1",
	"/api/download-video/video2",
	"/api/download-video/video3",
	"/api/download-video/video4",
	"/api/download-video/video5",
];

//Array to get every topic in HTML.
var videos_dropdown = [
	document.getElementById("video_1"),
	document.getElementById("video_2"),
	document.getElementById("video_3"),
	document.getElementById("video_4"),
	document.getElementById("video_5")
];

var audios_dropdown = [
	document.getElementById("musica_1"),
	document.getElementById("musica_2"),
	document.getElementById("musica_3"),
	document.getElementById("musica_4"),
	document.getElementById("musica_5")
];

var timeStamp;//Variable to handle video timestamp.

//Function to update timeStamp and changeSlidesImage according to video time.
myVideo.ontimeupdate = function() {
	timeStamp = myVideo.currentTime; //timeStamp equals to current time of video.
	console.log("timeStamp: ", timeStamp) //Debug only.
}; //end of function.

document.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
  	myVideo.pause();
    myVideo.mozCancelFullScreen();
  }
}, false);

function selectMusic(section){
	music_index = section;
	myAudio.src = audios[music_index];

	var arduino_ip = "/api/arduino-post/" + ip_value.value + "/" + port_value.value + "/" + "musica" + (music_index+1);
	console.log(arduino_ip);
	request.open("GET", arduino_ip, false); // false for synchronous request
    request.send(null);

	/*
	request.open("GET", "http://127.0.0.1:5500/api/download-auris/beto_brito", true);
	request.responseType = "blob";
	console.log("Entrei aqui");

	request.onload = function(oEvent) {
		console.log("Entrei no Onload");
  		data = request.response;
  		console.log(data);
	};
	*/
};

function selectVideo(section){
	myVideo.src = videos[section];
};

function sendToArduino(){

	/*var websocket_ip = "ws://" + ip_value.value + ":" + port_value.value + "/";
	var socket = new WebSocket(websocket_ip);
	//var socket = io();

	console.log("Estou aqui");

	socket.onopen = function(){
   		/*Send a small message to the console once the connection is established 
   		console.log('Connection open!');
   		socket.send("enviandio");
	}

	socket.onmessage = function(e){
   		var server_message = e.data;
   		console.log(server_message);
   		if(server_message == "Recebido"){
   			console.log("DEU CERTO!");
   			socket.close();
   		}
   		else{
   			console.log("Deu algum erro, favor verificar.")
   		}
	}
	*/
};

function playPause(){
    var arduino_ip = "/api/start/" + ip_value.value + "/" + port_value.value;
	console.log(arduino_ip);
	flag = false;
	request.open("GET", arduino_ip, false); // false for synchronous request
    request.send(null); 
};

function pauseVideo(){
	var arduino_ip = "/api/stop/" + ip_value.value + "/" + port_value.value;
	console.log(arduino_ip);
	flag = false;
	request.open("GET", arduino_ip, false); // false for synchronous request
    request.send(null);
};

request.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		if (flag == true){
			playButton.disabled = false;
		}
		else if(myVideo.paused && flag == false){
			myVideo.play();
			myVideo.muted = true;
			myVideo.mozRequestFullScreen();
			myAudio.play();
			playButton.disabled = true;
			pauseButton.disabled = false;
			flag = true;
		}
		else{
			myVideo.pause(); 
			myAudio.pause();
			playButton.disabled = false;
			pauseButton.disabled = true;
			flag = true;
		}
	}
};