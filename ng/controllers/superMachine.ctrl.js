angular.module('vilobiApp')
    .controller('superMachineController', function($scope, supervisorSrv, $stateParams,$state) {
        $scope.machine = $stateParams.id;
        $scope.go = function(locate) {
            /*$scope.$emit('Machine');*/
            $state.go('common.machineRegular',{'id':locate});
        };
         $scope.goBigScreen = function(locate) {
            $scope.$emit('Machine');
            $state.go('common.machine',{'id':locate});
        };
        supervisorSrv.machines($stateParams.id)
            .success(function(machines) {
                $scope.machines = machines;
            });
    });