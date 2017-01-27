var myVideo = document.getElementById("video1"); //Get Video Tag Element in HTML
var myImageSlider = document.getElementById("slides"); //Get Image Tag Element in HTML
var videoDiv = document.getElementById("videoDiv");

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

//Array to get every topic in HTML.
var topics = [
	document.getElementById("topic_1"),
	document.getElementById("topic_2"),
	document.getElementById("topic_3"),
	document.getElementById("topic_4"),
	document.getElementById("topic_5")
];

var i = 0; //Variable to controll TimeStamps and Slides.
var k = 0; //Variable to controll Topic Elements.
var canRun = false;

var timeStamp;//Variable to handle video timestamp.

//Function to update timeStamp and changeSlidesImage according to video time.
myVideo.ontimeupdate = function() {
	timeStamp = myVideo.currentTime; //timeStamp equals to current time of video.
	console.log("timeStamp: ", timeStamp) //Debug only.
	changeSlideImage(); //Call function to change slides automatically.
}; //end of function.

myVideo.onended = function() {
	myImageSlider.style.display = 'none';
    formDiv.style.display = 'block';
};

//
function changeSlideImage(){
	//console.log("Estou aqui!"); //Debug only.
	if(timeStamp > times[i]){
		i=i%times.length;
		k=k%topics.length;
		//console.log("Trocando Imagem");
		myImageSlider.src = imagesSrc[i];
		if(areTopic[i] == true){
			topics[k].style.color = 'blue';
			k++;
		}
		i++;
	}
}

function turnDivOff(){
	if(videoDiv.style.visibility == 'hidden'){
	//if(videoDiv.style.display == 'none'){
		//videoDiv.style.display = 'block';
		videoDiv.style.visibility='visible';
	}else{
		videoDiv.style.visibility='hidden';
		//videoDiv.style.display = 'none';
	}
}

function submitVotacao(){
	for (var i = 0, length = radios.length; i < length; i++) {
    	if (radios[i].checked) {
      	  	// do whatever you want with the checked radio
       		console.log(radios[i].value);
       		var path = 'http://127.0.0.1:5500/vote/' + radios[i].value;
       		console.log(path);
			//xhr.open('GET', path, false);
			//xhr.send();
       		// only one radio can be logically checked, don't check the rest
       		//xhr.onreadystatechange = processRequest;
       		$.ajax({
  				type: "GET",
  				url: path,
  				cache: false,
  				success: function(data){
     				myImageSlider.style.display = 'block';
        			formDiv.style.display = 'none';
  				}
			});
        	break;
    	}
	}
}

function goToSection(section){
	var index = 0;
	var index2 = 0;
	console.log("k: ", k);
	console.log("section", section);
	if(section < k){
		for(number = section; number < topics.length;number++){
			topics[number].style.color = 'gray';
		}
		for(number = 0; number < section+1; number++){
			index = areTopic.indexOf(true, index2);
			index2 = index;
			index2 = index2 + 1;
			console.log("My index of Last: ", index2);
		}
		k = section;
	}else{
		for(number = 0; number <= section;number++){
			topics[number].style.color = 'blue';
		}
		for(number = 0; number < section+1; number++){
			index = areTopic.indexOf(true, index2);
			index2 = index;
			index2 = index2 + 1;
			console.log("My index of Last: ", index2);
		}
	}
	console.log("My index of Last: ", indexOfLast);
	console.log("My index found", index);
	console.log("k_before: ", k);
	console.log("section_before", section);
	myVideo.currentTime = (times[index] + 0.5);
	i = index;
	indexOfLast = index+1;
}

function playPause() {
    if (myVideo.paused) 
        myVideo.play();
    	myVideo.muted = true;
} 

function pauseVideo(){
	myVideo.pause(); 
}

function nextTimesStamp(){
	i=i%times.length;
	k=k%topics.length;
	if (i == 0){
		myVideo.currentTime = times[i];
		timeStamp = times[i];
		k = 0;
		if(areTopic[0] == true){
			indexOfLast = 1;
		}else{
			indexOfLast = 0;
		}
		for (j=0;j<topics.length;j++){
			topics[j].style.color = 'gray';
			if(areTopic[i] == true && canRun == false){
				topics[k].style.color = 'blue';
				k++;
				console.log(k);
			}
			canRun = true;
		}
	}
	while(timeStamp > times[i]){
		if(timeStamp > times[times.length]){
			myVideo.currentTime = times[0];
			timeStamp = times[0];
			k = 0;
		}
		i++;
		i=i%times.length;
	}
	///console.log("k in my nextstamp", k);
	//console.log("Can Run :", canRun);
	//console.log("Are it topic? :", areTopic[i])
	if(areTopic[i] == true && canRun == false){
		topics[k].style.color = 'blue';
		k++;
	}
	//console.log(times[i])
	myVideo.currentTime = times[i];
	myImageSlider.src = imagesSrc[i];
	canRun = false;
	i++;
}