angular.module("gtAD")
.controller('requestsCtrl',  function ($rootScope, $scope, $state, $uibModal, ServiceAPI, $http, $sce, config){

  $scope.actualFile = "Nenhum arquivo selecionado!";

  $scope.fileSubmitted = false;
  $scope.disableButton = true;
  $scope.disableButton2 = true;

  $scope.ip_value = "";
  $scope.port_value = 0;
  $scope.freq_corte = 0;
  $scope.ganho = 0;

  $scope.initAdScript = function() {
    $rootScope.requisitionType = 2;
    $rootScope.actualStep = 1;
    $rootScope.qtSteps = 3;
    $state.go('scriptStep');
  };

  $scope.uploadFiles = function(files) {
    if ($rootScope.actualStep == 1) {
      $scope.$apply(function () {
        $scope.file = new FormData();
        $scope.file.append("file", files[0]);
        if ($scope.fileSubmitted) $rootScope.files.pop();
        $scope.actualFile = files[0].name;
        var archiveName = files[0].name;
        var n = archiveName.indexOf('.');
        var res = archiveName.substring(0,n);
        $rootScope.fileName = res;
        $rootScope.files = ($rootScope.files === undefined ) ? [] : $rootScope.files;
        $rootScope.files.push(files[0]);
        $scope.fileSubmitted = true;
      });
    }
    else{
      $scope.$apply(function () {
        $scope.file = new FormData();
        $scope.file.append("file", files[0]);
        $scope.actualFile = files[0].name;
        $scope.fileSubmitted = true;
      });
    }
  };

  $scope.submitGuideDetailsForm = function() {
    if ($rootScope.actualStep == 1) {
      $http.post('/upload_file', $scope.file, {
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
      }).success(function(results){
        var path = '/api/generate-midi/' + $rootScope.fileName;
        var path2 = '/api/generate-auris/' + $rootScope.fileName;
        var path3 = '/api/download-auris/' + $rootScope.fileName;
        var path4 = '/api/play-music/' + $rootScope.fileName;
        var path5 = '/api/download-audio-filtered/' + $rootScope.fileName;
        $rootScope.midi_route = path;
        $rootScope.auris_route = path2;
        $rootScope.download_route = path3;
        $rootScope.stream_route = path4;
        $rootScope.audioDownload_route = path5;
        $rootScope.actualStep = 2;
        $rootScope.qtSteps = 3;
        $state.go('setupStep');
      }).error(function(error){
        $log.log('error load file!!!!!');
        $log.log(error);
      });
    }
  };

  $scope.submitGuideDetailsForm_CFG = function() {
    $http.post('/upload_file', $scope.file, {
      headers: {'Content-Type': undefined },
      transformRequest: angular.identity
    }).success(function(results){
      $rootScope.actualStep = 3;
      $state.go('generateStep');
    }).error(function(error){
      $rootScope.actualStep = 3;
      $state.go('generateStep');
    });
  };

  $scope.generateMidi_melody = function(){
    $http.get($rootScope.midi_route).success(function(results){
      $scope.disableButton = false;
    });
  };

  $scope.generateAuris_file = function(){
    $http.get($rootScope.auris_route).success(function(results){
      $scope.disableButton2 = false;
    });
  };

  $scope.generateAudio = function(){
    $rootScope.actualStep = 4;
    $state.go('generateAudio');
  }

  $scope.ipConfigStep = function(){
    $rootScope.actualStep = 5;
    $state.go('ipConfigStep');
  };

  $scope.audioStep = function(){
    $rootScope.actualStep = 5;
    $state.go('musicStep');
  };

  $scope.sendtoArduino = function(){
    var path3 = '/api/arduino-post/' + $scope.ip_value + "/" + $scope.port_value + "/" + $rootScope.fileName;
    $rootScope.arduino_route = path3;
    $http.get($rootScope.arduino_route).success(function(results){
      $scope.disableButton = false;
    });
  };

  $scope.sendAurisFiltered = function(){
    var path3 = '/api/audio-generate/' + $rootScope.fileName + "/" + $scope.freq_corte + "/" + $scope.ganho;
    $rootScope.ganerateAudio_route = path3;
    $http.get($rootScope.ganerateAudio_route).success(function(results){
      $scope.disableButton2 = false;
    });
  };

  $scope.playArduino = function(){
    var path = '/api/start/' + $scope.ip_value + "/" + $scope.port_value + "/" + $rootScope.fileName;
    $rootScope.arduinoStart_route = path;
    $http.get($rootScope.arduinoStart_route).success(function(results){
      $scope.disableButton = true;
      $scope.disableButton2 = false;
      var audio = document.getElementById("myAudio");
      audio.load();
      audio.play();
    });
  };

  $scope.stopArduino = function(){
    var path = '/api/stop/' + $scope.ip_value + "/" + $scope.port_value;
    $rootScope.arduinoStop_route = path;
    $http.get($rootScope.arduinoStop_route).success(function(results){
      $scope.disableButton = false;
      $scope.disableButton2 = false;
      var audio = document.getElementById("myAudio");
      audio.stop();
    });
  };

  $scope.gotoHome = function(){
    $rootScope.actualStep = 1;
    $state.go('home');
  };

  $scope.getArray = function(num) {
      return new Array(num);
  };

  $rootScope.$on('listRequests', function(event) {
    allRequests();
  });
});
