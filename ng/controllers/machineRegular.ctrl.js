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
            $scope.$emit('WorkingOn');
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
                            var start = true; //This Must be false, but for test reason 
                            while (cont < 15 && contSF < sf.length ) {
                                if ($scope.machineInfo.of == aux[contSF]['OF']) start = true;  //I have to test, now is unavaliable, is like this not exists, because always is true
                                if (new Date(aux[contSF]['DATASTART']) > Date.now() && $scope.machineInfo.of != aux[contSF]['OF'] && start) {
                                    auxsfFirst[cont++] = aux[contSF++];
                                } else {
                                    contSF++;
                                }
                                
                            }

                            $scope.sfFirst = auxsfFirst;

                            ofSrv.materialAvaliable($scope.machineInfo.id,auxsfFirst)
                                .then(function(dd) {
                                    dd.forEach(function(ele) {
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
                                    
                                    $scope.sfFirst = dd;
                                    $scope.$emit('WorkingOff');
                                }); 
                

                });
            }

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