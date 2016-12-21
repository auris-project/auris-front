angular.module("gtAD").controller('listRequestsCtrl',  function ($rootScope, $scope, $sce, $http, config){

  $scope.getVideoURL = function(request) {
      return ($sce.trustAsResourceUrl(config.apiURL+'/'+request._id+'/'+request.fileName+request.fileType));
  }

  $scope.isCompleted = function(request) {
    console.log(request.status + " status");
    return (request.status === "done" ? true : false);
  }

  function allRequests() {
      $http.get(config.apiURL+'/api/contents')
      .success(function (data) {
        $scope.requestsList = data;
        console.log($scope.requestsList);
      });
  }

  allRequests();

});
