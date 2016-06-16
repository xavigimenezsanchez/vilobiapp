angular.module('vilobiApp',['ui.router','ngMaterial','sasrio.angular-material-sidenav','ng-mfb']);
angular.module('vilobiApp')
    .config(function($mdThemingProvider,ssSideNavSectionsProvider) {
        ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);
            ssSideNavSectionsProvider.initWithSections([{
                    id:         'Home',
                    name:       'Home',
                    state:      'common.home',
                    type:       'link'
                },{
                    id:         'Supervisor',
                    name:       'Supervisor',
                    state:      'common.supervisor',
                    type:       'link'
                }]);
        });
       
angular.module('vilobiApp')
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
        $mdThemingProvider.theme('dark-red').backgroundPalette('red').dark();
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');

        $mdThemingProvider.definePalette('machinePalete', {
            '50': 'ffcdd2',
                '100': 'ffcdd2',
                '200': 'ef9a9a',
                '300': 'e57373',
                '400': 'ef5350',
                '500': 'f44336',
                '600': 'e53935',
                '700': 'd32f2f',
                '800': 'c62828',
                '900': 'b71c1c',
                'A100': '000000',  // Background Color
                'A200': 'ff5252',
                'A400': 'ff1744',
                'A700': 'd50000',
                'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                    // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
                'contrastLightColors': undefined 
        });

        $mdThemingProvider.theme('machine')
            .primaryPalette('blue')
            .backgroundPalette('machinePalete');


           $mdThemingProvider.definePalette('breadcrumbsPaletteName', {
                '50': 'FFFFFF',
                '100': 'ffcdd2',
                '200': 'ef9a9a',
                '300': 'e57373',
                '400': 'ef5350',
                '500': 'f44336',
                '600': 'e53935',
                '700': 'd32f2f',
                '800': 'c62828',
                '900': 'b71c1c',
                'A100': 'ff8a80',
                'A200': 'ff5252',
                'A400': 'ff1744',
                'A700': 'd50000',
                'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                    // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
                'contrastLightColors': undefined    // could also specify this if default was 'dark'
            });   
         $mdThemingProvider.theme('breadcrumbs')
            .primaryPalette('breadcrumbsPaletteName', {
                'default': '50'
            });
        $mdThemingProvider.theme('process')
            .backgroundPalette('green');
        $mdThemingProvider.theme('setup')
            .backgroundPalette('amber');
        $mdThemingProvider.theme('pull')
            .backgroundPalette('blue');
        $mdThemingProvider.theme('end')
            .backgroundPalette('red');
        $mdThemingProvider.theme('ncdown')
            .backgroundPalette('orange');
        $mdThemingProvider.theme('down')
            .backgroundPalette('deep-orange');
        $mdThemingProvider.theme('error')
            .backgroundPalette('grey');
        });
       
angular.module('vilobiApp')
    .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
        
        $urlRouterProvider.otherwise(function () {
            return '/';
        });
        $stateProvider
            .state('common' ,{
                abstract: true,
                templateUrl: 'templates/_common.html',
                controller: 'menuController'
            })
            .state('common.home', {
                url             :   '/',
                templateUrl    :   'templates/home.html',
                controller: 'homeController',
                breadCrumbs : 'home'

            })
            .state('common.machine' , {
                url             :   '/machine/:id',
                templateUrl    :   '/templates/machine.html',
                controller      :   'bitScreenController',
                breadCrumbs : 'machine'
            })
            .state('common.machineRegular' , {
                url             :   '/machineRegular/:id',
                templateUrl    :   '/templates/machineRegular.html',
                controller      :   'machineRegularController',
                breadCrumbs : 'machine'
            })
            .state('common.machinesRegular' , {
                url             :   '/machinesRegular/:id',
                templateUrl    :   '/templates/machinesRegular.html',
                controller      :   'machinesRegularController',
                breadCrumbs : 'machines'
            })
            .state('common.supervisor' , {
                url             :   '/supervisor',
                templateUrl    :   '/templates/supervisor2.html',
                controller      :   'supervisorController',
                breadCrumbs : 'supervisor'
            })
            .state('common.supervisorMachine' , {
                url             :   '/supervisor/:id',
                templateUrl    :   '/templates/supervisorMachine.html',
                controller      :   'superMachineController',
                breadCrumbs : 'detall supervisor'
            });
        
        
    })
angular.module('vilobiApp')
    .controller('bitScreenController', function($scope, $http, driverSrv, $location, $state, $interval, $timeout, $mdSidenav) {
        var url = $location.absUrl().split('/');
        $scope.$emit('Machine');
        $scope.sfFirst =[];
        
        $scope.goSupervisor = function() {
            $scope.$emit('MachineOut');
            $state.go('common.supervisor');
        }

        $scope.goBack = function() {
            $scope.$emit('MachineOut');
            var state = driverSrv.getState();
            console.log(state);
            if (driverSrv.get()) {
                $state.go(state,{'id':driverSrv.get()});
            } else {
                $state.go('common.supervisor');
            }
            
        }
        
        $http.get('../../api/machine/'+url[url.length -1])
            .success(function(sf) {
                for (var i=0; i<( sf.length <5 ? sf.length:5); i++) {
                    $scope.sfFirst[i] = sf[i];
                }
            })
        
        
        function machineNow() {
            $http.get('../../api/machine/name/' + url[url.length -1 ])
                .success(function(name) {
                    if (name.length >0 ) {
                        $scope.machineName = name[0]['NAME'];   
                    } else {
                        $scope.machineName = "Error!"
                    }
                });
            $http.get('../../api/machine/actual/'+url[url.length -1])
                .success(function(name) {
                    $scope.ofActual = name[0]['PrOdId'];
                    $scope.ofOpr = name[0]['OprNum'];
                    $scope.ofState = name[0]['LastTimeJobType'];
                    $http.get('../api/of/desc/' + name[0]['PrOdId'])
                        .success(function(desc) {
                            $scope.ofDescription = desc[0]['ItemDesc'];
                        });
                    $http.get('../api/slit/'+name[0]['PrOdId'])
                        .success(function(qty) {
                             if (name[0]['OprNum'] == 10 && 
                                    ($scope.machineName != 'INKMAKER'  && $scope.machineName != 'NOMAN'
                                    && $scope.machineName != 'MAN'
                                    )) {
                                        /* If OF is in state 10 or machine id is diferent 
                                           of INKMAKER we need find out quantity 
                                           in another table: PrOdBOM
                                        */
                                        $http.get('../api/printer/' + name[0]['PrOdId'])
                                            .success(function(q) {
                                                $scope.ofQtyPlanned = q[0]['quantity']; 
                                            })
                                    } else {
                                        $scope.ofQtyPlanned = qty[0]['OrderQty'];
                                    }
                            $http.get('../api/of/completed/'+name[0]['PrOdId']+'/'+name[0]['OprNum']+'/'  +url[url.length -1])
                                .success(function(comp) {
                                    if (comp.length>0) {
                                        $scope.ofCompleted = comp[0]['StkQty'];
                                        $scope.ofCompletedPercent = comp[0]['StkQty']*100/qty[0]['OrderQty'];    
                                    }
                                    
                                })
                        });
                })
        }
        
        machineNow();
        
        $interval(machineNow,60000);
        
    });
angular.module('vilobiApp')
    .controller('homeController' , function($scope) {
    });
angular.module('vilobiApp')
    .controller('machineRegularController', function($scope, $http, $stateParams, $location, $state, $interval, $timeout, $mdSidenav, driverSrv) {
        var machine = $stateParams.id;
        
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
        $http.get('../../api/machine/name/' + machine)
                .success(function(name) {
                    if (name.length >0 ) {
                        $scope.machineName = name[0]['NAME'];   
                    } else {
                        $scope.machineName = "Error!"
                    }
                });
        
        function machineNow() {
            
            $http.get('../../api/machine/actual/'+machine)
                .success(function(name) {
                    $scope.ofActual = name[0]['PrOdId'];
                    $scope.ofOpr = name[0]['OprNum'];
                    $scope.ofState = name[0]['LastTimeJobType'];
                    $http.get('../api/of/desc/' + name[0]['PrOdId'])
                        .success(function(desc) {
                            $scope.ofDescription = desc[0]['ItemDesc'];
                        });
                    $http.get('../api/slit/'+name[0]['PrOdId'])
                        .success(function(qty) {
                             if (name[0]['OprNum'] == 10 && 
                             ($scope.machineName != 'INKMAKER'  && $scope.machineName != 'NOMAN'
                               && $scope.machineName != 'MAN'
                             ))
                                {
                                        /* If OF is in state 10 or machine id is diferent 
                                           of INKMAKER we need find out quantity 
                                           in another table: PrOdBOM
                                        */
                                        $http.get('../api/printer/' + name[0]['PrOdId'])
                                            .success(function(q) {
                                                $scope.ofQtyPlanned = q[0]['quantity']; 
                                            })
                                    } else {
                                        $scope.ofQtyPlanned = qty[0]['OrderQty'];
                                    }
                            $http.get('../api/of/completed/'+name[0]['PrOdId']+'/'+name[0]['OprNum']+'/'  + machine)
                                .success(function(comp) {
                                    if (comp.length>0) {
                                        $scope.ofCompleted = comp[0]['StkQty'];
                                        $scope.ofCompletedPercent = comp[0]['StkQty']*100/qty[0]['OrderQty'];    
                                    }
                                    
                                })
                        });
                })
        }
        
        machineNow();
        
        $interval(machineNow,60000);
        
    });
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
             })        
        }
        
       
        
        machineNames.promise.then(function() {
            
            machineNow();
            intervalMachines = $interval(machineNow,60000);
        });
        
    });
angular.module('vilobiApp')
    .controller('mainController' , function($scope,$rootScope) {
        $scope.bodyStyle = '';
        $scope.showMenu = true;
        $scope.breadcrumbs = 'home';
        
        $scope.$on('Machine', function() {
            console.log('Change body color');
            $scope.bodyStyle = 'vilobiMachine';
            $scope.showMenu = false;
            $scope.bckgrndTheme = 'machine';
            
        });
        $scope.$on('MachineOut', function() {
            $scope.bodyStyle = ''; 
            $scope.showMenu = true;
            $scope.bckgrndTheme = 'default'
        });
        
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.breadcrumbs = toState.name;
         })
        
    });
angular.module('vilobiApp')
    .controller('menuController', function (
            $scope,
            $mdSidenav,
            $timeout,
            $rootScope,
            $state,
            ssSideNav,
            ssSideNavSharedService) {

            
            $scope.machine = false;
            $scope.breadCrumbs =  $state.current.breadCrumbs;
            
            $scope.onClickMenu = function () {
                $mdSidenav('left').toggle();
            };

            $scope.$on('Machine',function() {
                $scope.machine = true;  
            })
            $scope.$on('MachineOut', function () {
                $scope.machine = false;
            })
            $scope.menu = ssSideNav;
            $rootScope.$on('$stateChangeSuccess', 
                function(event, toState, toParams, fromState, fromParams){ 
                    $scope.breadCrumbs = toState.breadCrumbs;
                 });
           
        });
angular.module('vilobiApp')
    .controller('superMachineController', function($scope, supervisorSrv, driverSrv, $stateParams,$state) {
        $scope.machine = $stateParams.id;
        $scope.go = function(locate) {
            driverSrv.set($stateParams.id);
            $state.go('common.machineRegular',{'id':locate});
        };
        $scope.goBack = function() {
            $state.go('common.supervisor');
        }
         $scope.goBigScreen = function(locate) {
            driverSrv.set($stateParams.id);
            $scope.$emit('Machine');
            $state.go('common.machine',{'id':locate});
        };
        supervisorSrv.machines($stateParams.id)
            .success(function(machines) {
                $scope.machines = machines;
            });
    });
angular.module('vilobiApp')
    .controller('supervisorController', function($scope,supervisorSrv, driverSrv,$state) {
        $scope.go = function(locate) {
            driverSrv.set(locate);
            driverSrv.setState($state.current.name);

            $state.go('common.supervisorMachine',{'id':locate});
        };
        $scope.goGeneral = function(locate) {
            driverSrv.set(locate);
            console.log('---------------------------------');
            console.log($state.current.name);
            driverSrv.setState($state.current.name);
            $state.go('common.machinesRegular',{'id':locate});
        };
        supervisorSrv.departaments()
            .success(function(depts) {
                $scope.depts = depts;
                depts.forEach(function(element, index) {
                    supervisorSrv.machines(element.WCGroup)
                        .success(function(dept) {
                            $scope.depts[index]['machines'] = dept;
                        })
                });
                
            })
    });
angular.module('vilobiApp')
    .directive('sfClock', function ($interval, dateFilter) {
        return function (scope, element, attrs) {
            var stopTime;
            function updateTime() {
                element.text(dateFilter(new Date(), 'dd/MM/yyyy HH:mm:ss'));
            }
            
            stopTime = $interval(function() { updateTime()}, 1000);
            
            element.on('$destroy', function() {
                $interval.cancel(stopTime);
            });
        }
    })
angular.module('vilobiApp')
    .service('driverSrv', function($http) {
        this.lastId = null;
        this.lastState = []
     
        this.set = function(last) {
            this.lastId = last;
        }
        this.get = function() {
            return this.lastId;
        }
        this.setState = function(last) {
            this.lastState.push(last);
        }
        this.getState = function() {
            return this.lastState.pop();
        }
        return this;
    });
angular.module('vilobiApp')
    .service('machineStateSrv', function() {
        
        this.get = function(state) {
        
            var aux = {};
            switch (state.trim()) {
                case 'Down':
                    aux.name = 'Parat';
                    aux.icon = 'ic_thumb_down_black_18px.svg';
                    aux.theme = 'down'
                    break;
                case 'Pull':
                    aux.name = 'PULL';
                    aux.icon = 'ic_get_app_black_18px.svg';
                    aux.theme = 'pull'
                    break;
                case 'NCDown':
                    aux.name = 'parat sense carrec';
                    aux.icon = 'ic_sync_disabled_black_18px.svg';
                    aux.theme = 'ncdown'
                    break;
                case 'End of Operation':
                    aux.name = 'final operació';
                    aux.icon = 'ic_done_black_18px.svg';
                    aux.theme = 'end'
                    break;
                case 'Setup':
                    aux.name = 'manteniment';
                    aux.icon = 'ic_build_black_18px.svg';
                    aux.theme = 'setup'
                    break;
                case 'Process':
                    aux.name = 'en procés';
                    aux.icon = 'ic_loop_black_18px.svg';
                    aux.theme = 'process'
                    break;
                default:
                    aux = {'name':'desconegut','icon':'ic_error_black_18px.svg', 'theme' : 'error'};
                    break;
            }
            return aux;
        }
        return this;
    });
angular.module('vilobiApp')
    .factory('supervisorSrv', function($http) {
        var urlBase = '../../api/supervisor/dept';
     
        this.departaments = function() {
            return $http.get(urlBase);
        }
        this.machines = function(dept) {
            return $http.get(urlBase+'/'+dept);
        }
        return this;
    });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1lbnUuY2ZnLmpzIiwidGhlbWUuY2ZnLmpzIiwidmlsb2JpLmNmZy5qcyIsImNvbnRyb2xsZXJzL2JpZ1NjcmVlbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZS5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFjaGluZVJlZ3VsYXIuY3RybC5qcyIsImNvbnRyb2xsZXJzL21hY2hpbmVzUmVndWxhci5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFpbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWVudS5jdHJsLmpzIiwiY29udHJvbGxlcnMvc3VwZXJNYWNoaW5lLmN0cmwuanMiLCJjb250cm9sbGVycy9zdXBlcnZpc29yLmN0cmwuanMiLCJkaXJlY3RpdmVzL3NmQ2xvY2suanMiLCJzZXJ2aWNlcy9kcml2ZXIuc3J2LmpzIiwic2VydmljZXMvbWFjaGluZVN0YXRlLnNydi5qcyIsInNlcnZpY2VzL3N1cGVydmlzb3Iuc3J2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ2aWxvYmlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJyxbJ3VpLnJvdXRlcicsJ25nTWF0ZXJpYWwnLCdzYXNyaW8uYW5ndWxhci1tYXRlcmlhbC1zaWRlbmF2JywnbmctbWZiJ10pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIsc3NTaWRlTmF2U2VjdGlvbnNQcm92aWRlcikge1xyXG4gICAgICAgIHNzU2lkZU5hdlNlY3Rpb25zUHJvdmlkZXIuaW5pdFdpdGhUaGVtZSgkbWRUaGVtaW5nUHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBzc1NpZGVOYXZTZWN0aW9uc1Byb3ZpZGVyLmluaXRXaXRoU2VjdGlvbnMoW3tcclxuICAgICAgICAgICAgICAgICAgICBpZDogICAgICAgICAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogICAgICAgJ0hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAgICAgICdjb21tb24uaG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogICAgICAgJ2xpbmsnXHJcbiAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogICAgICAgICAnU3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogICAgICAgJ1N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAgICAgICdjb21tb24uc3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogICAgICAgJ2xpbmsnXHJcbiAgICAgICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLWdyZXknKS5iYWNrZ3JvdW5kUGFsZXR0ZSgnZ3JleScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2Rhcmstb3JhbmdlJykuYmFja2dyb3VuZFBhbGV0dGUoJ29yYW5nZScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RhcmstcHVycGxlJykuYmFja2dyb3VuZFBhbGV0dGUoJ2RlZXAtcHVycGxlJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1ibHVlJykuYmFja2dyb3VuZFBhbGV0dGUoJ2JsdWUnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLXJlZCcpLmJhY2tncm91bmRQYWxldHRlKCdyZWQnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ29yYW5nZScpO1xyXG5cclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnbWFjaGluZVBhbGV0ZScsIHtcclxuICAgICAgICAgICAgJzUwJzogJ2ZmY2RkMicsXHJcbiAgICAgICAgICAgICAgICAnMTAwJzogJ2ZmY2RkMicsXHJcbiAgICAgICAgICAgICAgICAnMjAwJzogJ2VmOWE5YScsXHJcbiAgICAgICAgICAgICAgICAnMzAwJzogJ2U1NzM3MycsXHJcbiAgICAgICAgICAgICAgICAnNDAwJzogJ2VmNTM1MCcsXHJcbiAgICAgICAgICAgICAgICAnNTAwJzogJ2Y0NDMzNicsXHJcbiAgICAgICAgICAgICAgICAnNjAwJzogJ2U1MzkzNScsXHJcbiAgICAgICAgICAgICAgICAnNzAwJzogJ2QzMmYyZicsXHJcbiAgICAgICAgICAgICAgICAnODAwJzogJ2M2MjgyOCcsXHJcbiAgICAgICAgICAgICAgICAnOTAwJzogJ2I3MWMxYycsXHJcbiAgICAgICAgICAgICAgICAnQTEwMCc6ICcwMDAwMDAnLCAgLy8gQmFja2dyb3VuZCBDb2xvclxyXG4gICAgICAgICAgICAgICAgJ0EyMDAnOiAnZmY1MjUyJyxcclxuICAgICAgICAgICAgICAgICdBNDAwJzogJ2ZmMTc0NCcsXHJcbiAgICAgICAgICAgICAgICAnQTcwMCc6ICdkNTAwMDAnLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JywgICAgLy8gd2hldGhlciwgYnkgZGVmYXVsdCwgdGV4dCAoY29udHJhc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbiB0aGlzIHBhbGV0dGUgc2hvdWxkIGJlIGRhcmsgb3IgbGlnaHRcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbJzUwJywgJzEwMCcsIC8vaHVlcyB3aGljaCBjb250cmFzdCBzaG91bGQgYmUgJ2RhcmsnIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgICAgICcyMDAnLCAnMzAwJywgJzQwMCcsICdBMTAwJ10sXHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IHVuZGVmaW5lZCBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdtYWNoaW5lJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdtYWNoaW5lUGFsZXRlJyk7XHJcblxyXG5cclxuICAgICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnYnJlYWRjcnVtYnNQYWxldHRlTmFtZScsIHtcclxuICAgICAgICAgICAgICAgICc1MCc6ICdGRkZGRkYnLFxyXG4gICAgICAgICAgICAgICAgJzEwMCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzIwMCc6ICdlZjlhOWEnLFxyXG4gICAgICAgICAgICAgICAgJzMwMCc6ICdlNTczNzMnLFxyXG4gICAgICAgICAgICAgICAgJzQwMCc6ICdlZjUzNTAnLFxyXG4gICAgICAgICAgICAgICAgJzUwMCc6ICdmNDQzMzYnLFxyXG4gICAgICAgICAgICAgICAgJzYwMCc6ICdlNTM5MzUnLFxyXG4gICAgICAgICAgICAgICAgJzcwMCc6ICdkMzJmMmYnLFxyXG4gICAgICAgICAgICAgICAgJzgwMCc6ICdjNjI4MjgnLFxyXG4gICAgICAgICAgICAgICAgJzkwMCc6ICdiNzFjMWMnLFxyXG4gICAgICAgICAgICAgICAgJ0ExMDAnOiAnZmY4YTgwJyxcclxuICAgICAgICAgICAgICAgICdBMjAwJzogJ2ZmNTI1MicsXHJcbiAgICAgICAgICAgICAgICAnQTQwMCc6ICdmZjE3NDQnLFxyXG4gICAgICAgICAgICAgICAgJ0E3MDAnOiAnZDUwMDAwJyxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgIC8vIHdoZXRoZXIsIGJ5IGRlZmF1bHQsIHRleHQgKGNvbnRyYXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhpcyBwYWxldHRlIHNob3VsZCBiZSBkYXJrIG9yIGxpZ2h0XHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCAvL2h1ZXMgd2hpY2ggY29udHJhc3Qgc2hvdWxkIGJlICdkYXJrJyBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgICAgLy8gY291bGQgYWxzbyBzcGVjaWZ5IHRoaXMgaWYgZGVmYXVsdCB3YXMgJ2RhcmsnXHJcbiAgICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2JyZWFkY3J1bWJzJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdicmVhZGNydW1ic1BhbGV0dGVOYW1lJywge1xyXG4gICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiAnNTAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgncHJvY2VzcycpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnZ3JlZW4nKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3NldHVwJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdhbWJlcicpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgncHVsbCcpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnYmx1ZScpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZW5kJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdyZWQnKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ25jZG93bicpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnb3JhbmdlJyk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkb3duJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdkZWVwLW9yYW5nZScpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZXJyb3InKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2dyZXknKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9cIik7XHJcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJy8nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uJyAse1xyXG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9fY29tbW9uLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21lbnVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5ob21lJywge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnLycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJ3RlbXBsYXRlcy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ2hvbWUnXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5tYWNoaW5lJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9tYWNoaW5lLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvbWFjaGluZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ2JpdFNjcmVlbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnbWFjaGluZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24ubWFjaGluZVJlZ3VsYXInICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL21hY2hpbmVSZWd1bGFyLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvbWFjaGluZVJlZ3VsYXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdtYWNoaW5lUmVndWxhckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnbWFjaGluZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24ubWFjaGluZXNSZWd1bGFyJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9tYWNoaW5lc1JlZ3VsYXIvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9tYWNoaW5lc1JlZ3VsYXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdtYWNoaW5lc1JlZ3VsYXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ21hY2hpbmVzJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5zdXBlcnZpc29yJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9zdXBlcnZpc29yJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9zdXBlcnZpc29yMi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ3N1cGVydmlzb3JDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ3N1cGVydmlzb3InXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLnN1cGVydmlzb3JNYWNoaW5lJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9zdXBlcnZpc29yLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvc3VwZXJ2aXNvck1hY2hpbmUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdzdXBlck1hY2hpbmVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ2RldGFsbCBzdXBlcnZpc29yJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH0pIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignYml0U2NyZWVuQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsIGRyaXZlclNydiwgJGxvY2F0aW9uLCAkc3RhdGUsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRtZFNpZGVuYXYpIHtcclxuICAgICAgICB2YXIgdXJsID0gJGxvY2F0aW9uLmFic1VybCgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgJHNjb3BlLnNmRmlyc3QgPVtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lT3V0Jyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lT3V0Jyk7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IGRyaXZlclNydi5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChkcml2ZXJTcnYuZ2V0KCkpIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSx7J2lkJzpkcml2ZXJTcnYuZ2V0KCl9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS8nK3VybFt1cmwubGVuZ3RoIC0xXSlcclxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oc2YpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTwoIHNmLmxlbmd0aCA8NSA/IHNmLmxlbmd0aDo1KTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3RbaV0gPSBzZltpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBtYWNoaW5lTm93KCkge1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL25hbWUvJyArIHVybFt1cmwubGVuZ3RoIC0xIF0pXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoID4wICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZU5hbWUgPSBuYW1lWzBdWydOQU1FJ107ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVOYW1lID0gXCJFcnJvciFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL2FjdHVhbC8nK3VybFt1cmwubGVuZ3RoIC0xXSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZBY3R1YWwgPSBuYW1lWzBdWydQck9kSWQnXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZPcHIgPSBuYW1lWzBdWydPcHJOdW0nXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZTdGF0ZSA9IG5hbWVbMF1bJ0xhc3RUaW1lSm9iVHlwZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2Rlc2MvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZEZXNjcmlwdGlvbiA9IGRlc2NbMF1bJ0l0ZW1EZXNjJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3NsaXQvJytuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWVbMF1bJ09wck51bSddID09IDEwICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoJHNjb3BlLm1hY2hpbmVOYW1lICE9ICdJTktNQUtFUicgICYmICRzY29wZS5tYWNoaW5lTmFtZSAhPSAnTk9NQU4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICRzY29wZS5tYWNoaW5lTmFtZSAhPSAnTUFOJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBJZiBPRiBpcyBpbiBzdGF0ZSAxMCBvciBtYWNoaW5lIGlkIGlzIGRpZmVyZW50IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgSU5LTUFLRVIgd2UgbmVlZCBmaW5kIG91dCBxdWFudGl0eSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGFub3RoZXIgdGFibGU6IFByT2RCT01cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9wcmludGVyLycgKyBuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZlF0eVBsYW5uZWQgPSBxWzBdWydxdWFudGl0eSddOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mUXR5UGxhbm5lZCA9IHF0eVswXVsnT3JkZXJRdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvb2YvY29tcGxldGVkLycrbmFtZVswXVsnUHJPZElkJ10rJy8nK25hbWVbMF1bJ09wck51bSddKycvJyAgK3VybFt1cmwubGVuZ3RoIC0xXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihjb21wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZDb21wbGV0ZWQgPSBjb21wWzBdWydTdGtRdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkNvbXBsZXRlZFBlcmNlbnQgPSBjb21wWzBdWydTdGtRdHknXSoxMDAvcXR5WzBdWydPcmRlclF0eSddOyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG1hY2hpbmVOb3coKTtcclxuICAgICAgICBcclxuICAgICAgICAkaW50ZXJ2YWwobWFjaGluZU5vdyw2MDAwMCk7XHJcbiAgICAgICAgXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicgLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21hY2hpbmVSZWd1bGFyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRzdGF0ZVBhcmFtcywgJGxvY2F0aW9uLCAkc3RhdGUsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRtZFNpZGVuYXYsIGRyaXZlclNydikge1xyXG4gICAgICAgIHZhciBtYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IGRyaXZlclNydi5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoZHJpdmVyU3J2LmdldCgpICYmIGRyaXZlclNydi5nZXRTdGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUseydpZCc6ZHJpdmVyU3J2LmdldCgpfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvbmFtZS8nICsgbWFjaGluZSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPjAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lTmFtZSA9IG5hbWVbMF1bJ05BTUUnXTsgICBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZU5hbWUgPSBcIkVycm9yIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvYWN0dWFsLycrbWFjaGluZSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZBY3R1YWwgPSBuYW1lWzBdWydQck9kSWQnXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZPcHIgPSBuYW1lWzBdWydPcHJOdW0nXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZTdGF0ZSA9IG5hbWVbMF1bJ0xhc3RUaW1lSm9iVHlwZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2Rlc2MvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZEZXNjcmlwdGlvbiA9IGRlc2NbMF1bJ0l0ZW1EZXNjJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3NsaXQvJytuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWVbMF1bJ09wck51bSddID09IDEwICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICgkc2NvcGUubWFjaGluZU5hbWUgIT0gJ0lOS01BS0VSJyAgJiYgJHNjb3BlLm1hY2hpbmVOYW1lICE9ICdOT01BTidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICRzY29wZS5tYWNoaW5lTmFtZSAhPSAnTUFOJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgT0YgaXMgaW4gc3RhdGUgMTAgb3IgbWFjaGluZSBpZCBpcyBkaWZlcmVudCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIElOS01BS0VSIHdlIG5lZWQgZmluZCBvdXQgcXVhbnRpdHkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbm90aGVyIHRhYmxlOiBQck9kQk9NXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvcHJpbnRlci8nICsgbmFtZVswXVsnUHJPZElkJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZRdHlQbGFubmVkID0gcVswXVsncXVhbnRpdHknXTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZlF0eVBsYW5uZWQgPSBxdHlbMF1bJ09yZGVyUXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2NvbXBsZXRlZC8nK25hbWVbMF1bJ1ByT2RJZCddKycvJytuYW1lWzBdWydPcHJOdW0nXSsnLycgICsgbWFjaGluZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihjb21wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZDb21wbGV0ZWQgPSBjb21wWzBdWydTdGtRdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkNvbXBsZXRlZFBlcmNlbnQgPSBjb21wWzBdWydTdGtRdHknXSoxMDAvcXR5WzBdWydPcmRlclF0eSddOyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG1hY2hpbmVOb3coKTtcclxuICAgICAgICBcclxuICAgICAgICAkaW50ZXJ2YWwobWFjaGluZU5vdyw2MDAwMCk7XHJcbiAgICAgICAgXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdtYWNoaW5lc1JlZ3VsYXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkcSwgJGh0dHAsIHN1cGVydmlzb3JTcnYsICRzdGF0ZVBhcmFtcywgJGxvY2F0aW9uLCAkc3RhdGUsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRtZFNpZGVuYXYsIGRyaXZlclNydiwgbWFjaGluZVN0YXRlU3J2KSB7XHJcbiAgICAgICAgdmFyIG1hY2hpbmUgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgdmFyIG1hY2hpbmVzID0gW107XHJcbiAgICAgICAgdmFyIG1hY2hpbmVzYXV4ID0gICBbXTtcclxuICAgICAgICB2YXIgbWFjaGluZU5hbWVzID0gJHEuZGVmZXIoKTtcclxuICAgICAgICB2YXIgbWFjaGluZXNEYXRlcyA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgIHZhciBpbnRlcnZhbE1hY2hpbmVzO1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLm1hY2hpbmVzID0gW107XHJcblxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldChsb2NhdGUpO1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGRyaXZlclNydi5nZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnLHsnaWQnOmRyaXZlclNydi5nZXQoKX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICRzY29wZS5nbyA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZHJpdmVyU3J2LnNldCgkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZVJlZ3VsYXInLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29CaWdTY3JlZW4gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGRyaXZlclNydi5zZXQoJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZScseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lcygkc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1jaHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtY2hzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4QXV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS9uYW1lLycgKyBlbGVtZW50WydXcmtDdHJJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPjAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFjaGluZXNbaW5kZXhdID0geyAnaWQnOiBlbGVtZW50WydXcmtDdHJJZCddLCduYW1lJyA6IG5hbWVbMF1bJ05BTUUnXSB9ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWNoaW5lc1tpbmRleF0gPSB7J25hbWUnIDogXCJFcnJvciFcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID09IChpbmRleCArMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWNoaW5lTmFtZXMucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBtYWNoaW5lTm93KCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbWFjaGluZXNhdXggPSAgIFtdO1xyXG4gICAgICAgICAgICBtYWNoaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKG1hY2hpbmUsIGluZGV4LCBhcnJheSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXV4ID17fTtcclxuICAgICAgICAgICAgICAgIGF1eFsnbmFtZSddID0gbWFjaGluZS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgYXV4WydpZCddID0gbWFjaGluZS5pZDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS9hY3R1YWwvJyttYWNoaW5lLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eFsnb2ZBY3R1YWwnXSA9IG5hbWVbMF1bJ1ByT2RJZCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4WydvZk9wciddID0gbmFtZVswXVsnT3ByTnVtJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGQgbWFjaGluZVN0YXRlIFNlcnZpY2UgdG8gYSBhdXggXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Lm9mU3RhdGUgPSBtYWNoaW5lU3RhdGVTcnYuZ2V0KG5hbWVbMF1bJ0xhc3RUaW1lSm9iVHlwZSddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2Rlc2MvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRlc2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Lm9mRGVzY3JpcHRpb24gPSBkZXNjWzBdWydJdGVtRGVzYyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvc2xpdC8nK25hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHF0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZVswXVsnT3ByTnVtJ10gPT0gMTAgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobWFjaGluZS5uYW1lICE9ICdJTktNQUtFUicgICYmIG1hY2hpbmUubmFtZSAhPSAnTk9NQU4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBtYWNoaW5lLm5hbWUgIT0gJ01BTicgJiYgbWFjaGluZS5uYW1lICE9ICdLSUVGRUwgMSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIG1hY2hpbmUubmFtZSAhPSAnS2llZmVsLTInICYmIG1hY2hpbmUubmFtZSAhPSAnTEFQJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgT0YgaXMgaW4gc3RhdGUgMTAgb3IgbWFjaGluZSBpZCBpcyBkaWZlcmVudCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIElOS01BS0VSIHdlIG5lZWQgZmluZCBvdXQgcXVhbnRpdHkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbm90aGVyIHRhYmxlOiBQck9kQk9NXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9wcmludGVyLycgKyBuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXgub2ZRdHlQbGFubmVkID0gcVswXVsncXVhbnRpdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5vZlF0eVBsYW5uZWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Lm9mUXR5UGxhbm5lZCA9IHF0eVswXVsnT3JkZXJRdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvb2YvY29tcGxldGVkLycrbmFtZVswXVsnUHJPZElkJ10rJy8nK25hbWVbMF1bJ09wck51bSddKycvJyAgKyBtYWNoaW5lLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29tcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5vZkNvbXBsZXRlZCA9IGNvbXBbMF1bJ1N0a1F0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2F1eC5vZkNvbXBsZXRlZFBlcmNlbnQgPSBjb21wWzBdWydTdGtRdHknXSoxMDAvcXR5WzBdWydPcmRlclF0eSddOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Lm9mQ29tcGxldGVkUGVyY2VudCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2ZDb21wbGV0ZWQqMTAwL3RoaXMub2ZRdHlQbGFubmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OyAvL2NvbXBbMF1bJ1N0a1F0eSddKjEwMC9xdHlbMF1bJ09yZGVyUXR5J107ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFjaGluZXNhdXhbaW5kZXhdID1hdXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hY2hpbmVzYXV4W2luZGV4XSA9YXV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID09IChpbmRleCArMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFjaGluZXNEYXRlcy5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgIC8vJHNjb3BlLm1hY2hpbmVzID0gbWFjaGluZXNhdXg7ICAgXHJcbiAgICAgICAgICAgICBtYWNoaW5lc0RhdGVzLnByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXMgPSBtYWNoaW5lc2F1eDtcclxuICAgICAgICAgICAgIH0pICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBtYWNoaW5lTmFtZXMucHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbWFjaGluZU5vdygpO1xyXG4gICAgICAgICAgICBpbnRlcnZhbE1hY2hpbmVzID0gJGludGVydmFsKG1hY2hpbmVOb3csNjAwMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInICwgZnVuY3Rpb24oJHNjb3BlLCRyb290U2NvcGUpIHtcclxuICAgICAgICAkc2NvcGUuYm9keVN0eWxlID0gJyc7XHJcbiAgICAgICAgJHNjb3BlLnNob3dNZW51ID0gdHJ1ZTtcclxuICAgICAgICAkc2NvcGUuYnJlYWRjcnVtYnMgPSAnaG9tZSc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2hhbmdlIGJvZHkgY29sb3InKTtcclxuICAgICAgICAgICAgJHNjb3BlLmJvZHlTdHlsZSA9ICd2aWxvYmlNYWNoaW5lJztcclxuICAgICAgICAgICAgJHNjb3BlLnNob3dNZW51ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5iY2tncm5kVGhlbWUgPSAnbWFjaGluZSc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzY29wZS4kb24oJ01hY2hpbmVPdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmJvZHlTdHlsZSA9ICcnOyBcclxuICAgICAgICAgICAgJHNjb3BlLnNob3dNZW51ID0gdHJ1ZTtcclxuICAgICAgICAgICAgJHNjb3BlLmJja2dybmRUaGVtZSA9ICdkZWZhdWx0J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmJyZWFkY3J1bWJzID0gdG9TdGF0ZS5uYW1lO1xyXG4gICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWVudUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoXHJcbiAgICAgICAgICAgICRzY29wZSxcclxuICAgICAgICAgICAgJG1kU2lkZW5hdixcclxuICAgICAgICAgICAgJHRpbWVvdXQsXHJcbiAgICAgICAgICAgICRyb290U2NvcGUsXHJcbiAgICAgICAgICAgICRzdGF0ZSxcclxuICAgICAgICAgICAgc3NTaWRlTmF2LFxyXG4gICAgICAgICAgICBzc1NpZGVOYXZTaGFyZWRTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmJyZWFkQ3J1bWJzID0gICRzdGF0ZS5jdXJyZW50LmJyZWFkQ3J1bWJzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLm9uQ2xpY2tNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZScsZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZSA9IHRydWU7ICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZU91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICRzY29wZS5tZW51ID0gc3NTaWRlTmF2O1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpeyBcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYnJlYWRDcnVtYnMgPSB0b1N0YXRlLmJyZWFkQ3J1bWJzO1xyXG4gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3N1cGVyTWFjaGluZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsIHN1cGVydmlzb3JTcnYsIGRyaXZlclNydiwgJHN0YXRlUGFyYW1zLCRzdGF0ZSkge1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICRzY29wZS5nbyA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmVSZWd1bGFyJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgJHNjb3BlLmdvQmlnU2NyZWVuID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQoJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lcygkc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1hY2hpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXMgPSBtYWNoaW5lcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdzdXBlcnZpc29yQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSxzdXBlcnZpc29yU3J2LCBkcml2ZXJTcnYsJHN0YXRlKSB7XHJcbiAgICAgICAgJHNjb3BlLmdvID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQobG9jYXRlKTtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLmdvR2VuZXJhbCA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KGxvY2F0ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZXNSZWd1bGFyJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN1cGVydmlzb3JTcnYuZGVwYXJ0YW1lbnRzKClcclxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVwdHMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5kZXB0cyA9IGRlcHRzO1xyXG4gICAgICAgICAgICAgICAgZGVwdHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXMoZWxlbWVudC5XQ0dyb3VwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGVwdHNbaW5kZXhdWydtYWNoaW5lcyddID0gZGVwdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5kaXJlY3RpdmUoJ3NmQ2xvY2snLCBmdW5jdGlvbiAoJGludGVydmFsLCBkYXRlRmlsdGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3BUaW1lO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVUaW1lKCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC50ZXh0KGRhdGVGaWx0ZXIobmV3IERhdGUoKSwgJ2RkL01NL3l5eXkgSEg6bW06c3MnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN0b3BUaW1lID0gJGludGVydmFsKGZ1bmN0aW9uKCkgeyB1cGRhdGVUaW1lKCl9LCAxMDAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHN0b3BUaW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5zZXJ2aWNlKCdkcml2ZXJTcnYnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgIHRoaXMubGFzdElkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxhc3RTdGF0ZSA9IFtdXHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5zZXQgPSBmdW5jdGlvbihsYXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdElkID0gbGFzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlID0gZnVuY3Rpb24obGFzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0ZS5wdXNoKGxhc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFN0YXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RTdGF0ZS5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5zZXJ2aWNlKCdtYWNoaW5lU3RhdGVTcnYnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmdldCA9IGZ1bmN0aW9uKHN0YXRlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBhdXggPSB7fTtcclxuICAgICAgICAgICAgc3dpdGNoIChzdGF0ZS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0Rvd24nOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ1BhcmF0JztcclxuICAgICAgICAgICAgICAgICAgICBhdXguaWNvbiA9ICdpY190aHVtYl9kb3duX2JsYWNrXzE4cHguc3ZnJztcclxuICAgICAgICAgICAgICAgICAgICBhdXgudGhlbWUgPSAnZG93bidcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1B1bGwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ1BVTEwnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX2dldF9hcHBfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdwdWxsJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnTkNEb3duJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdwYXJhdCBzZW5zZSBjYXJyZWMnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX3N5bmNfZGlzYWJsZWRfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICduY2Rvd24nXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQgb2YgT3BlcmF0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdmaW5hbCBvcGVyYWNpw7MnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX2RvbmVfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdlbmQnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdTZXR1cCc6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAnbWFudGVuaW1lbnQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX2J1aWxkX2JsYWNrXzE4cHguc3ZnJztcclxuICAgICAgICAgICAgICAgICAgICBhdXgudGhlbWUgPSAnc2V0dXAnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdQcm9jZXNzJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdlbiBwcm9jw6lzJztcclxuICAgICAgICAgICAgICAgICAgICBhdXguaWNvbiA9ICdpY19sb29wX2JsYWNrXzE4cHguc3ZnJztcclxuICAgICAgICAgICAgICAgICAgICBhdXgudGhlbWUgPSAncHJvY2VzcydcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4ID0geyduYW1lJzonZGVzY29uZWd1dCcsJ2ljb24nOidpY19lcnJvcl9ibGFja18xOHB4LnN2ZycsICd0aGVtZScgOiAnZXJyb3InfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmZhY3RvcnkoJ3N1cGVydmlzb3JTcnYnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgIHZhciB1cmxCYXNlID0gJy4uLy4uL2FwaS9zdXBlcnZpc29yL2RlcHQnO1xyXG4gICAgIFxyXG4gICAgICAgIHRoaXMuZGVwYXJ0YW1lbnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQodXJsQmFzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFjaGluZXMgPSBmdW5jdGlvbihkZXB0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQodXJsQmFzZSsnLycrZGVwdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
