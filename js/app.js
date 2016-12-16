angular.module('gtAD', ['ui.router', 'ui.bootstrap', 'toastr', 'angular-loading-bar', 'ngWebSocket'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
  .state('app', {
      abstract: true,
      templateUrl: '/index.html'
  })
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html'
  })
  .state('scriptStep', {
    url: '/upload',
    templateUrl: 'templates/scriptStep.html'
  })
  .state('generateStep', {
    url: '/generate_files',
    templateUrl: 'templates/AurisModulesStep.html'
  })
  .state('ipConfigStep', {
    url: '/arduino_step',
    templateUrl: 'templates/arduinoConfigStep.html'
  })
  .state('musicStep', {
    url: '/musicReq',
    templateUrl: 'templates/noArduinoStep.html'
  });

  $urlRouterProvider.otherwise('/home');

})

.run(function ($rootScope, $state, $websocket) {
  // 
  // var dataStream = $websocket('ws://150.165.205.146:8080');
  // console.log("abriu websocket");
  // var collection = [];
  //
  // dataStream.onMessage(function(message) {
  //   console.log("llego1");
  //   $rootScope.$broadcast('newRequest', message.data);
  //   collection.push(JSON.parse(message.data));
  // });

  $rootScope.$on('$routeChangeSuccess', function () {
      $rootScope.actualStep = 0;
      $rootScope.requisitionType = 0;
      $rootScope.files = [];
      $rootScope.fileName = '';
      $rootScope.midi_route = '';
      $rootScope.auris_route = '';
      $rootScope.arduino_route = '';
      $rootScope.download_route = '';
      $rootScope.stream_route = '';
      $rootScope.arduinoStart_route = '';
      $rootScope.arduinoStop_route = '';
  });
});
