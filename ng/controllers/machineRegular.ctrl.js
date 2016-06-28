angular.module('vilobiApp')
    .controller('machineRegularController', function($scope, $http, $stateParams, $location, $state, $interval, $timeout, $mdSidenav, driverSrv, machineStateSrv,supervisorSrv) {
        var machine = $stateParams.id;
        $scope.machineInfo = {};
        
        $scope.goSupervisor = function() {
            $state.go('common.supervisor');
        }
        
        $scope.goBack = function() {
            var state = driverSrv.getState();
            if (driverSrv.get() && driverSrv.getState()) {
                $state.go(state,{'id':driverSrv.get()});
            } else {
                $state.go('common.supervisor');
            }
            
        }

        function machineNow() {
            supervisorSrv.machineOne(machine)
                .success(function(mach) {
                    $scope.machineInfo = mach;
                    $scope.machineInfo['ofState'] = machineStateSrv.get(mach.status);  
                    if (mach.quantityPlanned && mach.quantityPlanned != 0 && mach.ofCompleted) {
                                $scope.machineInfo['ofCompletedPercent'] = mach.ofCompleted*100/mach.quantityPlanned
                            }
                },function(err){
                        console.log(err);
                    });

        }
        
        machineNow();
        
        supervisorSrv.machinesAllTimer = $interval(machineNow,5000);
        
    });