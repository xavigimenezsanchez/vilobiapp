angular.module('vilobiApp')
    .controller('machineRegularController', function($scope, $http, $stateParams, $location, $state, $interval, $timeout, $mdSidenav, $q, driverSrv, machineStateSrv,supervisorSrv,ofSrv) {
        var machine = $stateParams.id;
        $scope.machineInfo = {};
        $scope.sfFirst = [];

        
        $scope.goSupervisor = function() {
            $state.go('common.supervisor');
        }

        $scope.goBigScreen = function(locate) {
            driverSrv.set($stateParams.id);
            $scope.$emit('Machine');
            $state.go('common.machine',{'id':locate});
        };
        
        $scope.goBack = function() {
            try {
                var state = driverSrv.getState();
                $state.go(state.id,{'id':state.param});
            } catch (error) {
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

             $http.get('../../api/machine/'+machine)
                .success(function(sf) {
                    var aux = sf;
                    var auxsfFirst = []
                    for (var i=0; i<( sf.length <10 ? sf.length:10); i++) {
                        //aux[i]['avaliable'] = 0;
                        auxsfFirst[i] = aux[i];
                    }
                    ofSrv.materialAvaliable(auxsfFirst)
                        .then(function(dd) {
                            console.log('Estic aquíiiiiii');
                             console.log(dd);
                            $scope.sfFirst = dd;
                        });


                });

        }
        
        machineNow();
        
        supervisorSrv.machinesAllTimer = $interval(machineNow,100000);
        
    });

    /*    a REVISAR
     * 
     * 
     * 
     * ofSrv.materialAvaliable(aux[i].OF)
                            .success(function(avaliable) {
                                console.log(avaliable)
                                for (var j=0; j < avaliable.length; j++) {
                                    console.log('patata');
                                     console.log('---------------------------------');
                                    console.log($scope.sfFirst);
                                    console.log('---------------------------------');
                                    if (avaliable[j]['Avalaible'] <= (avaliable[j]['RequiredQty']/2)) {
                                        
                                        $scope.sfFirst[i]['avaliable'] = 0;
                                        break;
                                    } else if ((avaliable[j]['Avalaible'] > (avaliable[j]['RequiredQty']/2)) && 
                                                (avaliable[j]['Avalaible'] < avaliable[j]['RequiredQty'])) {
                                                    console.log(aux[i]);
                                        $scope.sfFirst[i]['avaliable'] = 1;
                                    } else if ($scope.sfFirst[i]['avaliable'] != 1) {
                                        $scope.sfFirst[i]['avaliable'] = 2;
                                    }
                                   
                                }
                            })
     */