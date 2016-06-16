angular.module('vilobiApp')
    .controller('machinesRegularController', function($scope, $q, $http, supervisorSrv, $stateParams, $location, $state, $interval, $timeout, $mdSidenav, driverSrv, machineStateSrv) {
        var machine = $stateParams.id;
        var machines = [];
        var machinesaux =   [];
        var machineNames = $q.defer();
        var machinesDates = $q.defer();

        var intervalMachines;


        $scope.machines = [];

        $scope.goSupervisor = function() {
            driverSrv.set(locate);
            driverSrv.setState($state.current.name);
            $state.go('common.supervisor');
        }
        
        $scope.goBack = function() {
            
            if (driverSrv.get()) {
                $state.go('common.supervisorMachine',{'id':driverSrv.get()});
            } else {
                $state.go('common.supervisor');
            }
            
        }


        $scope.go = function(locate) {
                driverSrv.setState($state.current.name);
                driverSrv.set($stateParams.id);
                $state.go('common.machineRegular',{'id':locate});
            };
            
        $scope.goBigScreen = function(locate) {
                driverSrv.setState($state.current.name);
                driverSrv.set($stateParams.id);
                $scope.$emit('Machine');
                $state.go('common.machine',{'id':locate});
            };
        supervisorSrv.machines($stateParams.id)
            .success(function(mchs) {

                mchs.forEach(function(element, index, array) {
                    var indexAux = 0;
                     $http.get('../../api/machine/name/' + element['WrkCtrId'])
                        .success(function(name) {
                            if (name.length >0 ) {
                                machines[index] = { 'id': element['WrkCtrId'],'name' : name[0]['NAME'] }   
                            } else {
                                 machines[index] = {'name' : "Error!" }
                            }
                            if (array.length == (index +1)) {
                                machineNames.resolve(true);
                            }
                        });
                });
            });


        
        
        function machineNow() {
            
            machinesaux =   [];
            machines.forEach(function(machine, index, array){
                var aux ={};
                aux['name'] = machine.name;
                aux['id'] = machine.id;
                
                $http.get('../../api/machine/actual/'+machine.id)
                    .success(function(name) {
                        if (name[0]) {
                            aux['ofActual'] = name[0]['PrOdId'];
                            aux['ofOpr'] = name[0]['OprNum'];
                            /* 
                                Add machineState Service to a aux 
                            */
                            aux.ofState = machineStateSrv.get(name[0]['LastTimeJobType']);
                            $http.get('../api/of/desc/' + name[0]['PrOdId'])
                                .success(function(desc) {
                                    aux.ofDescription = desc[0]['ItemDesc'];
                                });
                            $http.get('../api/slit/'+name[0]['PrOdId'])
                                .success(function(qty) {
                                    if (name[0]['OprNum'] == 10 && 
                                        (machine.name != 'INKMAKER'  && machine.name != 'NOMAN'
                                        && machine.name != 'MAN' && machine.name != 'KIEFEL 1'
                                        && machine.name != 'Kiefel-2' && machine.name != 'LAP'
                                        )) {
                                        /* If OF is in state 10 or machine id is diferent 
                                           of INKMAKER we need find out quantity 
                                           in another table: PrOdBOM
                                        */
                                        
                                        $http.get('../api/printer/' + name[0]['PrOdId'])
                                            .success(function(q) {
                                                if (q[0]) {
                                                    aux.ofQtyPlanned = q[0]['quantity'];
                                                } else {
                                                    aux.ofQtyPlanned = null;
                                                }
                                                 
                                            })
                                    } else {
                                        aux.ofQtyPlanned = qty[0]['OrderQty'];
                                    }
                                    
                                    $http.get('../api/of/completed/'+name[0]['PrOdId']+'/'+name[0]['OprNum']+'/'  + machine.id)
                                        .success(function(comp) {
                                            if (comp.length>0) {
                                                aux.ofCompleted = comp[0]['StkQty'];
                                                //aux.ofCompletedPercent = comp[0]['StkQty']*100/qty[0]['OrderQty']; 
                                                aux.ofCompletedPercent = function() {
                                                    return this.ofCompleted*100/this.ofQtyPlanned;
                                                }; //comp[0]['StkQty']*100/qty[0]['OrderQty'];    
                                            }
                                            
                                       machinesaux[index] =aux;
                                       
                                        })
                                });
                        } else {
                            machinesaux[index] =aux;
                            
                        }
                    });
                    if (array.length == (index +1)) {
                            
                            machinesDates.resolve(true);
                        }
            } );
             //$scope.machines = machinesaux;   
             machinesDates.promise.then(function() {
                 $scope.machines = machinesaux;
                 console.log($scope.machines);
             })        
        }
        
       
        
        machineNames.promise.then(function() {
            
            machineNow();
            intervalMachines = $interval(machineNow,60000);
        });
        
    });