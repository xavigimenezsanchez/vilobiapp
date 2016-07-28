angular.module('vilobiApp')
    .controller('bitScreenController', function($scope, $http, $stateParams, ofSrv , machineStateSrv ,driverSrv, $location, $state, $interval, $timeout, $mdSidenav, supervisorSrv ) {
        var url = $location.absUrl().split('/');
        var machine = $stateParams.id;
        $scope.$emit('Machine');
        $scope.machineInfo = {};
        $scope.sfFirst =[];
        
        $scope.goSupervisor = function() {
            $scope.$emit('MachineOut');
            $state.go('common.supervisor');
        }

        $scope.goBack = function() {
            $scope.$emit('MachineOut');
            var state = driverSrv.getState();
            try {
                $state.go(state.id,{'id':state.param});
            } catch (error) {
                $state.go('common.supervisor');
            }
        }
        
      
        function machineNow2() {
            supervisorSrv.machineOne(machine)
                .success(function(mach) {
                    $scope.machineInfo = mach;
                    $scope.machineInfo['ofState'] = machineStateSrv.get(mach.status);  
                    if (mach.quantityPlanned && mach.quantityPlanned != 0 && mach.ofCompleted) {
                                $scope.machineInfo['ofCompletedPercent'] = mach.ofCompleted*100/mach.quantityPlanned
                            }
                    getNextOF();
                },function(err){
                        console.log(err);
                    });
                
                function getNextOF() {
                        $http.get('../../api/machine/'+machine)
                            .success(function(sf) {
                                var aux = sf;
                                var auxsfFirst = []
                                
                                var contSF = 0;
                                var cont =0
                                while (cont < 6 && contSF < sf.length ) {
                                    if (new Date(aux[contSF]['DATASTART']) > Date.now() && $scope.machineInfo.of != aux[contSF]['OF']) {
                                        auxsfFirst[cont++] = aux[contSF++];
                                    } else {
                                        contSF++;
                                    }
                                    
                                }

                                $scope.sfFirst = auxsfFirst;

                                ofSrv.materialAvaliable($scope.machineInfo.id, auxsfFirst)
                                    .then(function(dd2) {
                                        dd2.forEach(function(ele) {
                                            if (ele.avaliable) {
                                                    ele.avaliable.forEach(function(element, index, array) {
                                                            switch (element.avaliable) {
                                                                case 0 :
                                                                    array[index]['semaphor'] = 'semaphorRed';
                                                                    break;
                                                                case 1 :
                                                                    array[index]['semaphor'] = 'semaphorOrange';
                                                                    break;
                                                                case 2 :
                                                                    array[index]['semaphor'] = 'semaphorGreen';
                                                                    break;
                                                            }
                                                    });
                                            }
                                        });
                                        $scope.sfFirst = dd2;
                                    }); 
                            });
                }

        }
        machineNow2();  
        $interval(machineNow2,100000);
        
    });


