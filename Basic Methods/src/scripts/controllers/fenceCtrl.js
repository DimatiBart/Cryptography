angular.module('kiokiApp').controller('fenceCtrl', ['$scope', 'fenceSvc', function($scope, fenceSvc){
    $scope.fenceData = {};
    $scope.encrypt = function (){
      alert('huiblat');
      $scope.fenceData.encryptedMessage = fenceSvc.fence ($scope.fenceData.originalMesage, $scope.fenceData.key)
    }
    // $scope.decrypt = function(){
    //
    // }
}])
