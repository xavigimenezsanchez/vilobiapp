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
    .controller('machinesRegularController', function($scope, $q, $http, supervisorSrv, $stateParams, $location, $state, $interval, $timeout, $mdSidenav, driverSrv) {
        var machine = $stateParams.id;
        var machines = [];
        var machineNames = $q.defer();
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
            
            $scope.machines = [];
            machines.forEach(function(machine, index, array){
                var aux ={};
                aux['name'] = machine.name;
                aux['id'] = machine.id;
                
                $http.get('../../api/machine/actual/'+machine.id)
                    .success(function(name) {
                        if (name[0]) {
                            aux['ofActual'] = name[0]['PrOdId'];
                            aux['ofOpr'] = name[0]['OprNum'];
                            aux.ofState = name[0]['LastTimeJobType'];
                            $http.get('../api/of/desc/' + name[0]['PrOdId'])
                                .success(function(desc) {
                                    aux.ofDescription = desc[0]['ItemDesc'];
                                });
                            $http.get('../api/slit/'+name[0]['PrOdId'])
                                .success(function(qty) {
                                    if (name[0]['OprNum'] == 10 && 
                                        (machine.name != 'INKMAKER'  && machine.name != 'NOMAN'
                                        && machine.name != 'MAN'
                                        )) {
                                        /* If OF is in state 10 or machine id is diferent 
                                           of INKMAKER we need find out quantity 
                                           in another table: PrOdBOM
                                        */
                                        $http.get('../api/printer/' + name[0]['PrOdId'])
                                            .success(function(q) {
                                                aux.ofQtyPlanned = q[0]['quantity']; 
                                            })
                                    } else {
                                        aux.ofQtyPlanned = qty[0]['OrderQty'];
                                    }
                                    
                                    $http.get('../api/of/completed/'+name[0]['PrOdId']+'/'+name[0]['OprNum']+'/'  + machine.id)
                                        .success(function(comp) {
                                            if (comp.length>0) {
                                                aux.ofCompleted = comp[0]['StkQty'];
                                                aux.ofCompletedPercent = comp[0]['StkQty']*100/qty[0]['OrderQty'];    
                                            }
                                            
                                        $scope.machines[index] =aux; 
                                        })
                                });
                        } else {
                            $scope.machines[index] =aux;
                        }
                    })
            } )
            
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
            console.log(this.lastState);
        }
        this.getState = function() {
            return this.lastState.pop();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1lbnUuY2ZnLmpzIiwidGhlbWUuY2ZnLmpzIiwidmlsb2JpLmNmZy5qcyIsImNvbnRyb2xsZXJzL2JpZ1NjcmVlbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZS5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFjaGluZVJlZ3VsYXIuY3RybC5qcyIsImNvbnRyb2xsZXJzL21hY2hpbmVzUmVndWxhci5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFpbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWVudS5jdHJsLmpzIiwiY29udHJvbGxlcnMvc3VwZXJNYWNoaW5lLmN0cmwuanMiLCJjb250cm9sbGVycy9zdXBlcnZpc29yLmN0cmwuanMiLCJkaXJlY3RpdmVzL3NmQ2xvY2suanMiLCJzZXJ2aWNlcy9kcml2ZXIuc3J2LmpzIiwic2VydmljZXMvc3VwZXJ2aXNvci5zcnYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidmlsb2JpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcsWyd1aS5yb3V0ZXInLCduZ01hdGVyaWFsJywnc2FzcmlvLmFuZ3VsYXItbWF0ZXJpYWwtc2lkZW5hdicsJ25nLW1mYiddKTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyLHNzU2lkZU5hdlNlY3Rpb25zUHJvdmlkZXIpIHtcclxuICAgICAgICBzc1NpZGVOYXZTZWN0aW9uc1Byb3ZpZGVyLmluaXRXaXRoVGhlbWUoJG1kVGhlbWluZ1Byb3ZpZGVyKTtcclxuICAgICAgICAgICAgc3NTaWRlTmF2U2VjdGlvbnNQcm92aWRlci5pbml0V2l0aFNlY3Rpb25zKFt7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICAgICAgICAgJ0hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICdIb21lJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogICAgICAnY29tbW9uLmhvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICAgICAgICdsaW5rJ1xyXG4gICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICAgICAgICAgJ1N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICdTdXBlcnZpc29yJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogICAgICAnY29tbW9uLnN1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICAgICAgICdsaW5rJ1xyXG4gICAgICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1ncmV5JykuYmFja2dyb3VuZFBhbGV0dGUoJ2dyZXknKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLW9yYW5nZScpLmJhY2tncm91bmRQYWxldHRlKCdvcmFuZ2UnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLXB1cnBsZScpLmJhY2tncm91bmRQYWxldHRlKCdkZWVwLXB1cnBsZScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RhcmstYmx1ZScpLmJhY2tncm91bmRQYWxldHRlKCdibHVlJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1yZWQnKS5iYWNrZ3JvdW5kUGFsZXR0ZSgncmVkJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdvcmFuZ2UnKTtcclxuXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ21hY2hpbmVQYWxldGUnLCB7XHJcbiAgICAgICAgICAgICc1MCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzEwMCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzIwMCc6ICdlZjlhOWEnLFxyXG4gICAgICAgICAgICAgICAgJzMwMCc6ICdlNTczNzMnLFxyXG4gICAgICAgICAgICAgICAgJzQwMCc6ICdlZjUzNTAnLFxyXG4gICAgICAgICAgICAgICAgJzUwMCc6ICdmNDQzMzYnLFxyXG4gICAgICAgICAgICAgICAgJzYwMCc6ICdlNTM5MzUnLFxyXG4gICAgICAgICAgICAgICAgJzcwMCc6ICdkMzJmMmYnLFxyXG4gICAgICAgICAgICAgICAgJzgwMCc6ICdjNjI4MjgnLFxyXG4gICAgICAgICAgICAgICAgJzkwMCc6ICdiNzFjMWMnLFxyXG4gICAgICAgICAgICAgICAgJ0ExMDAnOiAnMDAwMDAwJywgIC8vIEJhY2tncm91bmQgQ29sb3JcclxuICAgICAgICAgICAgICAgICdBMjAwJzogJ2ZmNTI1MicsXHJcbiAgICAgICAgICAgICAgICAnQTQwMCc6ICdmZjE3NDQnLFxyXG4gICAgICAgICAgICAgICAgJ0E3MDAnOiAnZDUwMDAwJyxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgIC8vIHdoZXRoZXIsIGJ5IGRlZmF1bHQsIHRleHQgKGNvbnRyYXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhpcyBwYWxldHRlIHNob3VsZCBiZSBkYXJrIG9yIGxpZ2h0XHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCAvL2h1ZXMgd2hpY2ggY29udHJhc3Qgc2hvdWxkIGJlICdkYXJrJyBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbWFjaGluZScpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnbWFjaGluZVBhbGV0ZScpO1xyXG5cclxuXHJcbiAgICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2JyZWFkY3J1bWJzUGFsZXR0ZU5hbWUnLCB7XHJcbiAgICAgICAgICAgICAgICAnNTAnOiAnRkZGRkZGJyxcclxuICAgICAgICAgICAgICAgICcxMDAnOiAnZmZjZGQyJyxcclxuICAgICAgICAgICAgICAgICcyMDAnOiAnZWY5YTlhJyxcclxuICAgICAgICAgICAgICAgICczMDAnOiAnZTU3MzczJyxcclxuICAgICAgICAgICAgICAgICc0MDAnOiAnZWY1MzUwJyxcclxuICAgICAgICAgICAgICAgICc1MDAnOiAnZjQ0MzM2JyxcclxuICAgICAgICAgICAgICAgICc2MDAnOiAnZTUzOTM1JyxcclxuICAgICAgICAgICAgICAgICc3MDAnOiAnZDMyZjJmJyxcclxuICAgICAgICAgICAgICAgICc4MDAnOiAnYzYyODI4JyxcclxuICAgICAgICAgICAgICAgICc5MDAnOiAnYjcxYzFjJyxcclxuICAgICAgICAgICAgICAgICdBMTAwJzogJ2ZmOGE4MCcsXHJcbiAgICAgICAgICAgICAgICAnQTIwMCc6ICdmZjUyNTInLFxyXG4gICAgICAgICAgICAgICAgJ0E0MDAnOiAnZmYxNzQ0JyxcclxuICAgICAgICAgICAgICAgICdBNzAwJzogJ2Q1MDAwMCcsXHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLCAgICAvLyB3aGV0aGVyLCBieSBkZWZhdWx0LCB0ZXh0IChjb250cmFzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIHRoaXMgcGFsZXR0ZSBzaG91bGQgYmUgZGFyayBvciBsaWdodFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFsnNTAnLCAnMTAwJywgLy9odWVzIHdoaWNoIGNvbnRyYXN0IHNob3VsZCBiZSAnZGFyaycgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgJzIwMCcsICczMDAnLCAnNDAwJywgJ0ExMDAnXSxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogdW5kZWZpbmVkICAgIC8vIGNvdWxkIGFsc28gc3BlY2lmeSB0aGlzIGlmIGRlZmF1bHQgd2FzICdkYXJrJ1xyXG4gICAgICAgICAgICB9KTsgICBcclxuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdicmVhZGNydW1icycpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYnJlYWRjcnVtYnNQYWxldHRlTmFtZScsIHtcclxuICAgICAgICAgICAgICAgICdkZWZhdWx0JzogJzUwJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvXCIpO1xyXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcvJztcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbicgLHtcclxuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvX2NvbW1vbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtZW51Q29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24uaG9tZScsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICd0ZW1wbGF0ZXMvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdob21lJ1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24ubWFjaGluZScgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvbWFjaGluZS86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL21hY2hpbmUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdiaXRTY3JlZW5Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ21hY2hpbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLm1hY2hpbmVSZWd1bGFyJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9tYWNoaW5lUmVndWxhci86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL21hY2hpbmVSZWd1bGFyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnbWFjaGluZVJlZ3VsYXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ21hY2hpbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLm1hY2hpbmVzUmVndWxhcicgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvbWFjaGluZXNSZWd1bGFyLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvbWFjaGluZXNSZWd1bGFyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnbWFjaGluZXNSZWd1bGFyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdtYWNoaW5lcydcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24uc3VwZXJ2aXNvcicgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvc3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvc3VwZXJ2aXNvcjIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdzdXBlcnZpc29yQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdzdXBlcnZpc29yJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5zdXBlcnZpc29yTWFjaGluZScgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvc3VwZXJ2aXNvci86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL3N1cGVydmlzb3JNYWNoaW5lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnc3VwZXJNYWNoaW5lQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdkZXRhbGwgc3VwZXJ2aXNvcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9KSIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ2JpdFNjcmVlbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCBkcml2ZXJTcnYsICRsb2NhdGlvbiwgJHN0YXRlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkbWRTaWRlbmF2KSB7XHJcbiAgICAgICAgdmFyIHVybCA9ICRsb2NhdGlvbi5hYnNVcmwoKS5zcGxpdCgnLycpO1xyXG4gICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICRzY29wZS5zZkZpcnN0ID1bXTtcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZU91dCcpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZU91dCcpO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBkcml2ZXJTcnYuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdGUpO1xyXG4gICAgICAgICAgICBpZiAoZHJpdmVyU3J2LmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUseydpZCc6ZHJpdmVyU3J2LmdldCgpfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvJyt1cmxbdXJsLmxlbmd0aCAtMV0pXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNmKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8KCBzZi5sZW5ndGggPDUgPyBzZi5sZW5ndGg6NSk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0W2ldID0gc2ZbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS9uYW1lLycgKyB1cmxbdXJsLmxlbmd0aCAtMSBdKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA+MCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVOYW1lID0gbmFtZVswXVsnTkFNRSddOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lTmFtZSA9IFwiRXJyb3IhXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS9hY3R1YWwvJyt1cmxbdXJsLmxlbmd0aCAtMV0pXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQWN0dWFsID0gbmFtZVswXVsnUHJPZElkJ107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mT3ByID0gbmFtZVswXVsnT3ByTnVtJ107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mU3RhdGUgPSBuYW1lWzBdWydMYXN0VGltZUpvYlR5cGUnXTtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9kZXNjLycgKyBuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVzYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mRGVzY3JpcHRpb24gPSBkZXNjWzBdWydJdGVtRGVzYyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9zbGl0LycrbmFtZVswXVsnUHJPZElkJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHF0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lWzBdWydPcHJOdW0nXSA9PSAxMCAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCRzY29wZS5tYWNoaW5lTmFtZSAhPSAnSU5LTUFLRVInICAmJiAkc2NvcGUubWFjaGluZU5hbWUgIT0gJ05PTUFOJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAkc2NvcGUubWFjaGluZU5hbWUgIT0gJ01BTidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgT0YgaXMgaW4gc3RhdGUgMTAgb3IgbWFjaGluZSBpZCBpcyBkaWZlcmVudCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIElOS01BS0VSIHdlIG5lZWQgZmluZCBvdXQgcXVhbnRpdHkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbm90aGVyIHRhYmxlOiBQck9kQk9NXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvcHJpbnRlci8nICsgbmFtZVswXVsnUHJPZElkJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZRdHlQbGFubmVkID0gcVswXVsncXVhbnRpdHknXTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZlF0eVBsYW5uZWQgPSBxdHlbMF1bJ09yZGVyUXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2NvbXBsZXRlZC8nK25hbWVbMF1bJ1ByT2RJZCddKycvJytuYW1lWzBdWydPcHJOdW0nXSsnLycgICt1cmxbdXJsLmxlbmd0aCAtMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29tcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcC5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQ29tcGxldGVkID0gY29tcFswXVsnU3RrUXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZDb21wbGV0ZWRQZXJjZW50ID0gY29tcFswXVsnU3RrUXR5J10qMTAwL3F0eVswXVsnT3JkZXJRdHknXTsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBtYWNoaW5lTm93KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGludGVydmFsKG1hY2hpbmVOb3csNjAwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInICwgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdtYWNoaW5lUmVndWxhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGVQYXJhbXMsICRsb2NhdGlvbiwgJHN0YXRlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCBkcml2ZXJTcnYpIHtcclxuICAgICAgICB2YXIgbWFjaGluZSA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBkcml2ZXJTcnYuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgaWYgKGRyaXZlclNydi5nZXQoKSAmJiBkcml2ZXJTcnYuZ2V0U3RhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKHN0YXRlLHsnaWQnOmRyaXZlclNydi5nZXQoKX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL25hbWUvJyArIG1hY2hpbmUpXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoID4wICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZU5hbWUgPSBuYW1lWzBdWydOQU1FJ107ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVOYW1lID0gXCJFcnJvciFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1hY2hpbmVOb3coKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL2FjdHVhbC8nK21hY2hpbmUpXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQWN0dWFsID0gbmFtZVswXVsnUHJPZElkJ107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mT3ByID0gbmFtZVswXVsnT3ByTnVtJ107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mU3RhdGUgPSBuYW1lWzBdWydMYXN0VGltZUpvYlR5cGUnXTtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9kZXNjLycgKyBuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVzYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mRGVzY3JpcHRpb24gPSBkZXNjWzBdWydJdGVtRGVzYyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9zbGl0LycrbmFtZVswXVsnUHJPZElkJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHF0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lWzBdWydPcHJOdW0nXSA9PSAxMCAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoJHNjb3BlLm1hY2hpbmVOYW1lICE9ICdJTktNQUtFUicgICYmICRzY29wZS5tYWNoaW5lTmFtZSAhPSAnTk9NQU4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAkc2NvcGUubWFjaGluZU5hbWUgIT0gJ01BTidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIE9GIGlzIGluIHN0YXRlIDEwIG9yIG1hY2hpbmUgaWQgaXMgZGlmZXJlbnQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiBJTktNQUtFUiB3ZSBuZWVkIGZpbmQgb3V0IHF1YW50aXR5IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYW5vdGhlciB0YWJsZTogUHJPZEJPTVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3ByaW50ZXIvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mUXR5UGxhbm5lZCA9IHFbMF1bJ3F1YW50aXR5J107IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZRdHlQbGFubmVkID0gcXR5WzBdWydPcmRlclF0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9jb21wbGV0ZWQvJytuYW1lWzBdWydQck9kSWQnXSsnLycrbmFtZVswXVsnT3ByTnVtJ10rJy8nICArIG1hY2hpbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29tcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcC5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQ29tcGxldGVkID0gY29tcFswXVsnU3RrUXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZDb21wbGV0ZWRQZXJjZW50ID0gY29tcFswXVsnU3RrUXR5J10qMTAwL3F0eVswXVsnT3JkZXJRdHknXTsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBtYWNoaW5lTm93KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGludGVydmFsKG1hY2hpbmVOb3csNjAwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFjaGluZXNSZWd1bGFyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHEsICRodHRwLCBzdXBlcnZpc29yU3J2LCAkc3RhdGVQYXJhbXMsICRsb2NhdGlvbiwgJHN0YXRlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCBkcml2ZXJTcnYpIHtcclxuICAgICAgICB2YXIgbWFjaGluZSA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICB2YXIgbWFjaGluZXMgPSBbXTtcclxuICAgICAgICB2YXIgbWFjaGluZU5hbWVzID0gJHEuZGVmZXIoKTtcclxuICAgICAgICB2YXIgaW50ZXJ2YWxNYWNoaW5lcztcclxuICAgICAgICAkc2NvcGUubWFjaGluZXMgPSBbXTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmdvU3VwZXJ2aXNvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KGxvY2F0ZSk7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZHJpdmVyU3J2LmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yTWFjaGluZScseydpZCc6ZHJpdmVyU3J2LmdldCgpfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLmdvID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBkcml2ZXJTcnYuc2V0KCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lUmVndWxhcicseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb0JpZ1NjcmVlbiA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZHJpdmVyU3J2LnNldCgkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzKCRzdGF0ZVBhcmFtcy5pZClcclxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWNocykge1xyXG5cclxuICAgICAgICAgICAgICAgIG1jaHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXhBdXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL25hbWUvJyArIGVsZW1lbnRbJ1dya0N0cklkJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA+MCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWNoaW5lc1tpbmRleF0gPSB7ICdpZCc6IGVsZW1lbnRbJ1dya0N0cklkJ10sJ25hbWUnIDogbmFtZVswXVsnTkFNRSddIH0gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hY2hpbmVzW2luZGV4XSA9IHsnbmFtZScgOiBcIkVycm9yIVwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJheS5sZW5ndGggPT0gKGluZGV4ICsxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hY2hpbmVOYW1lcy5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1hY2hpbmVOb3coKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkc2NvcGUubWFjaGluZXMgPSBbXTtcclxuICAgICAgICAgICAgbWFjaGluZXMuZm9yRWFjaChmdW5jdGlvbihtYWNoaW5lLCBpbmRleCwgYXJyYXkpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGF1eCA9e307XHJcbiAgICAgICAgICAgICAgICBhdXhbJ25hbWUnXSA9IG1hY2hpbmUubmFtZTtcclxuICAgICAgICAgICAgICAgIGF1eFsnaWQnXSA9IG1hY2hpbmUuaWQ7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvYWN0dWFsLycrbWFjaGluZS5pZClcclxuICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXhbJ29mQWN0dWFsJ10gPSBuYW1lWzBdWydQck9kSWQnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eFsnb2ZPcHInXSA9IG5hbWVbMF1bJ09wck51bSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Lm9mU3RhdGUgPSBuYW1lWzBdWydMYXN0VGltZUpvYlR5cGUnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2Rlc2MvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRlc2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Lm9mRGVzY3JpcHRpb24gPSBkZXNjWzBdWydJdGVtRGVzYyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvc2xpdC8nK25hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHF0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZVswXVsnT3ByTnVtJ10gPT0gMTAgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobWFjaGluZS5uYW1lICE9ICdJTktNQUtFUicgICYmIG1hY2hpbmUubmFtZSAhPSAnTk9NQU4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBtYWNoaW5lLm5hbWUgIT0gJ01BTidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIE9GIGlzIGluIHN0YXRlIDEwIG9yIG1hY2hpbmUgaWQgaXMgZGlmZXJlbnQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiBJTktNQUtFUiB3ZSBuZWVkIGZpbmQgb3V0IHF1YW50aXR5IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYW5vdGhlciB0YWJsZTogUHJPZEJPTVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3ByaW50ZXIvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Lm9mUXR5UGxhbm5lZCA9IHFbMF1bJ3F1YW50aXR5J107IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXgub2ZRdHlQbGFubmVkID0gcXR5WzBdWydPcmRlclF0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9jb21wbGV0ZWQvJytuYW1lWzBdWydQck9kSWQnXSsnLycrbmFtZVswXVsnT3ByTnVtJ10rJy8nICArIG1hY2hpbmUuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihjb21wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXAubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Lm9mQ29tcGxldGVkID0gY29tcFswXVsnU3RrUXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5vZkNvbXBsZXRlZFBlcmNlbnQgPSBjb21wWzBdWydTdGtRdHknXSoxMDAvcXR5WzBdWydPcmRlclF0eSddOyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXNbaW5kZXhdID1hdXg7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lc1tpbmRleF0gPWF1eDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBtYWNoaW5lTmFtZXMucHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbWFjaGluZU5vdygpO1xyXG4gICAgICAgICAgICBpbnRlcnZhbE1hY2hpbmVzID0gJGludGVydmFsKG1hY2hpbmVOb3csNjAwMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInICwgZnVuY3Rpb24oJHNjb3BlLCRyb290U2NvcGUpIHtcclxuICAgICAgICAkc2NvcGUuYm9keVN0eWxlID0gJyc7XHJcbiAgICAgICAgJHNjb3BlLnNob3dNZW51ID0gdHJ1ZTtcclxuICAgICAgICAkc2NvcGUuYnJlYWRjcnVtYnMgPSAnaG9tZSc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2hhbmdlIGJvZHkgY29sb3InKTtcclxuICAgICAgICAgICAgJHNjb3BlLmJvZHlTdHlsZSA9ICd2aWxvYmlNYWNoaW5lJztcclxuICAgICAgICAgICAgJHNjb3BlLnNob3dNZW51ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5iY2tncm5kVGhlbWUgPSAnbWFjaGluZSc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzY29wZS4kb24oJ01hY2hpbmVPdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmJvZHlTdHlsZSA9ICcnOyBcclxuICAgICAgICAgICAgJHNjb3BlLnNob3dNZW51ID0gdHJ1ZTtcclxuICAgICAgICAgICAgJHNjb3BlLmJja2dybmRUaGVtZSA9ICdkZWZhdWx0J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmJyZWFkY3J1bWJzID0gdG9TdGF0ZS5uYW1lO1xyXG4gICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWVudUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoXHJcbiAgICAgICAgICAgICRzY29wZSxcclxuICAgICAgICAgICAgJG1kU2lkZW5hdixcclxuICAgICAgICAgICAgJHRpbWVvdXQsXHJcbiAgICAgICAgICAgICRyb290U2NvcGUsXHJcbiAgICAgICAgICAgICRzdGF0ZSxcclxuICAgICAgICAgICAgc3NTaWRlTmF2LFxyXG4gICAgICAgICAgICBzc1NpZGVOYXZTaGFyZWRTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmJyZWFkQ3J1bWJzID0gICRzdGF0ZS5jdXJyZW50LmJyZWFkQ3J1bWJzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLm9uQ2xpY2tNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZScsZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZSA9IHRydWU7ICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZU91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICRzY29wZS5tZW51ID0gc3NTaWRlTmF2O1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpeyBcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYnJlYWRDcnVtYnMgPSB0b1N0YXRlLmJyZWFkQ3J1bWJzO1xyXG4gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3N1cGVyTWFjaGluZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsIHN1cGVydmlzb3JTcnYsIGRyaXZlclNydiwgJHN0YXRlUGFyYW1zLCRzdGF0ZSkge1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICRzY29wZS5nbyA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmVSZWd1bGFyJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgJHNjb3BlLmdvQmlnU2NyZWVuID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQoJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lcygkc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1hY2hpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXMgPSBtYWNoaW5lcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdzdXBlcnZpc29yQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSxzdXBlcnZpc29yU3J2LCBkcml2ZXJTcnYsJHN0YXRlKSB7XHJcbiAgICAgICAgJHNjb3BlLmdvID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQobG9jYXRlKTtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLmdvR2VuZXJhbCA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KGxvY2F0ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZXNSZWd1bGFyJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN1cGVydmlzb3JTcnYuZGVwYXJ0YW1lbnRzKClcclxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVwdHMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5kZXB0cyA9IGRlcHRzO1xyXG4gICAgICAgICAgICAgICAgZGVwdHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXMoZWxlbWVudC5XQ0dyb3VwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGVwdHNbaW5kZXhdWydtYWNoaW5lcyddID0gZGVwdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5kaXJlY3RpdmUoJ3NmQ2xvY2snLCBmdW5jdGlvbiAoJGludGVydmFsLCBkYXRlRmlsdGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3BUaW1lO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVUaW1lKCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC50ZXh0KGRhdGVGaWx0ZXIobmV3IERhdGUoKSwgJ2RkL01NL3l5eXkgSEg6bW06c3MnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN0b3BUaW1lID0gJGludGVydmFsKGZ1bmN0aW9uKCkgeyB1cGRhdGVUaW1lKCl9LCAxMDAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHN0b3BUaW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5zZXJ2aWNlKCdkcml2ZXJTcnYnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgIHRoaXMubGFzdElkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxhc3RTdGF0ZSA9IFtdXHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5zZXQgPSBmdW5jdGlvbihsYXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdElkID0gbGFzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlID0gZnVuY3Rpb24obGFzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0ZS5wdXNoKGxhc3QpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxhc3RTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0U3RhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdFN0YXRlLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmZhY3RvcnkoJ3N1cGVydmlzb3JTcnYnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgIHZhciB1cmxCYXNlID0gJy4uLy4uL2FwaS9zdXBlcnZpc29yL2RlcHQnO1xyXG4gICAgIFxyXG4gICAgICAgIHRoaXMuZGVwYXJ0YW1lbnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQodXJsQmFzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFjaGluZXMgPSBmdW5jdGlvbihkZXB0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQodXJsQmFzZSsnLycrZGVwdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
