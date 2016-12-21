angular.module("gtAD").factory("ServiceAPI", function ($http, $uibModalStack, $state, $rootScope, config, toastr) {

  var files = [];

  var _addFile = function (file) {
    files.push(file.files);
  };

  var _readAll = function() {
    $http.get(config.apiURL+'/api/contents')
    .then(function (data) {
      return data;
    });
  }

  var _sendRequest = function (type, files) {
    var uploadTypes = ["subtitle", "script", "video"];
    var fd = new FormData();
    var forCount = 0;

    var url = (type == 1) ? "/api/script/video/sub" : "/api/script/video/ad";

    for (var i = type - 1; i < uploadTypes.length; i++) {
        fd.append("files", files[forCount]);
        forCount++;
      }

    $http.post(config.apiURL+url, fd, {
      withCredentials : false,
      headers : {
        'Content-Type' : undefined
      },
      transformRequest : angular.identity
      })
      .success(function(data) {
          console.log("SUCCESSSSSSSS " + data);
          $uibModalStack.dismissAll();
          $state.go('requests');
          toastr.success("A requisição foi enviada com sucesso.", "Sucesso");
          $rootScope.requests = ($rootScope.requests === undefined ) ? [] : $rootScope.requests;
          $rootScope.requests.push(data._id);
      })
      .error(function(data) {
          console.log("ERRORRRRRRRRRRRR " + data);
          $uibModalStack.dismissAll();
          toastr.error("Erro ao enviar requisição.");
          $state.go('requests');
      });
  };

  return {
    addFile: _addFile,
    readAll: _readAll,
    sendRequest: _sendRequest
  };

});
