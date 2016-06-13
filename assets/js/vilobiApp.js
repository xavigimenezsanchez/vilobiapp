angular.module('vilobiApp',['ui.router','ngMaterial','sasrio.angular-material-sidenav']);
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
                            $scope.ofQtyPlanned = qty[0]['OrderQty'];
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
                            $scope.ofQtyPlanned = qty[0]['OrderQty'];
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
                                    aux.ofQtyPlanned = qty[0]['OrderQty'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1lbnUuY2ZnLmpzIiwidGhlbWUuY2ZnLmpzIiwidmlsb2JpLmNmZy5qcyIsImNvbnRyb2xsZXJzL2JpZ1NjcmVlbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZS5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFjaGluZVJlZ3VsYXIuY3RybC5qcyIsImNvbnRyb2xsZXJzL21hY2hpbmVzUmVndWxhci5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFpbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWVudS5jdHJsLmpzIiwiY29udHJvbGxlcnMvc3VwZXJNYWNoaW5lLmN0cmwuanMiLCJjb250cm9sbGVycy9zdXBlcnZpc29yLmN0cmwuanMiLCJkaXJlY3RpdmVzL3NmQ2xvY2suanMiLCJzZXJ2aWNlcy9kcml2ZXIuc3J2LmpzIiwic2VydmljZXMvc3VwZXJ2aXNvci5zcnYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEVBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ2aWxvYmlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJyxbJ3VpLnJvdXRlcicsJ25nTWF0ZXJpYWwnLCdzYXNyaW8uYW5ndWxhci1tYXRlcmlhbC1zaWRlbmF2J10pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIsc3NTaWRlTmF2U2VjdGlvbnNQcm92aWRlcikge1xyXG4gICAgICAgIHNzU2lkZU5hdlNlY3Rpb25zUHJvdmlkZXIuaW5pdFdpdGhUaGVtZSgkbWRUaGVtaW5nUHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBzc1NpZGVOYXZTZWN0aW9uc1Byb3ZpZGVyLmluaXRXaXRoU2VjdGlvbnMoW3tcclxuICAgICAgICAgICAgICAgICAgICBpZDogICAgICAgICAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogICAgICAgJ0hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAgICAgICdjb21tb24uaG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogICAgICAgJ2xpbmsnXHJcbiAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogICAgICAgICAnU3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogICAgICAgJ1N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAgICAgICdjb21tb24uc3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogICAgICAgJ2xpbmsnXHJcbiAgICAgICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLWdyZXknKS5iYWNrZ3JvdW5kUGFsZXR0ZSgnZ3JleScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2Rhcmstb3JhbmdlJykuYmFja2dyb3VuZFBhbGV0dGUoJ29yYW5nZScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RhcmstcHVycGxlJykuYmFja2dyb3VuZFBhbGV0dGUoJ2RlZXAtcHVycGxlJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1ibHVlJykuYmFja2dyb3VuZFBhbGV0dGUoJ2JsdWUnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLXJlZCcpLmJhY2tncm91bmRQYWxldHRlKCdyZWQnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ29yYW5nZScpO1xyXG5cclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnbWFjaGluZVBhbGV0ZScsIHtcclxuICAgICAgICAgICAgJzUwJzogJ2ZmY2RkMicsXHJcbiAgICAgICAgICAgICAgICAnMTAwJzogJ2ZmY2RkMicsXHJcbiAgICAgICAgICAgICAgICAnMjAwJzogJ2VmOWE5YScsXHJcbiAgICAgICAgICAgICAgICAnMzAwJzogJ2U1NzM3MycsXHJcbiAgICAgICAgICAgICAgICAnNDAwJzogJ2VmNTM1MCcsXHJcbiAgICAgICAgICAgICAgICAnNTAwJzogJ2Y0NDMzNicsXHJcbiAgICAgICAgICAgICAgICAnNjAwJzogJ2U1MzkzNScsXHJcbiAgICAgICAgICAgICAgICAnNzAwJzogJ2QzMmYyZicsXHJcbiAgICAgICAgICAgICAgICAnODAwJzogJ2M2MjgyOCcsXHJcbiAgICAgICAgICAgICAgICAnOTAwJzogJ2I3MWMxYycsXHJcbiAgICAgICAgICAgICAgICAnQTEwMCc6ICcwMDAwMDAnLCAgLy8gQmFja2dyb3VuZCBDb2xvclxyXG4gICAgICAgICAgICAgICAgJ0EyMDAnOiAnZmY1MjUyJyxcclxuICAgICAgICAgICAgICAgICdBNDAwJzogJ2ZmMTc0NCcsXHJcbiAgICAgICAgICAgICAgICAnQTcwMCc6ICdkNTAwMDAnLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JywgICAgLy8gd2hldGhlciwgYnkgZGVmYXVsdCwgdGV4dCAoY29udHJhc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbiB0aGlzIHBhbGV0dGUgc2hvdWxkIGJlIGRhcmsgb3IgbGlnaHRcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbJzUwJywgJzEwMCcsIC8vaHVlcyB3aGljaCBjb250cmFzdCBzaG91bGQgYmUgJ2RhcmsnIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgICAgICcyMDAnLCAnMzAwJywgJzQwMCcsICdBMTAwJ10sXHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IHVuZGVmaW5lZCBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdtYWNoaW5lJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdtYWNoaW5lUGFsZXRlJyk7XHJcblxyXG5cclxuICAgICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnYnJlYWRjcnVtYnNQYWxldHRlTmFtZScsIHtcclxuICAgICAgICAgICAgICAgICc1MCc6ICdGRkZGRkYnLFxyXG4gICAgICAgICAgICAgICAgJzEwMCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzIwMCc6ICdlZjlhOWEnLFxyXG4gICAgICAgICAgICAgICAgJzMwMCc6ICdlNTczNzMnLFxyXG4gICAgICAgICAgICAgICAgJzQwMCc6ICdlZjUzNTAnLFxyXG4gICAgICAgICAgICAgICAgJzUwMCc6ICdmNDQzMzYnLFxyXG4gICAgICAgICAgICAgICAgJzYwMCc6ICdlNTM5MzUnLFxyXG4gICAgICAgICAgICAgICAgJzcwMCc6ICdkMzJmMmYnLFxyXG4gICAgICAgICAgICAgICAgJzgwMCc6ICdjNjI4MjgnLFxyXG4gICAgICAgICAgICAgICAgJzkwMCc6ICdiNzFjMWMnLFxyXG4gICAgICAgICAgICAgICAgJ0ExMDAnOiAnZmY4YTgwJyxcclxuICAgICAgICAgICAgICAgICdBMjAwJzogJ2ZmNTI1MicsXHJcbiAgICAgICAgICAgICAgICAnQTQwMCc6ICdmZjE3NDQnLFxyXG4gICAgICAgICAgICAgICAgJ0E3MDAnOiAnZDUwMDAwJyxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgIC8vIHdoZXRoZXIsIGJ5IGRlZmF1bHQsIHRleHQgKGNvbnRyYXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhpcyBwYWxldHRlIHNob3VsZCBiZSBkYXJrIG9yIGxpZ2h0XHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCAvL2h1ZXMgd2hpY2ggY29udHJhc3Qgc2hvdWxkIGJlICdkYXJrJyBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgICAgLy8gY291bGQgYWxzbyBzcGVjaWZ5IHRoaXMgaWYgZGVmYXVsdCB3YXMgJ2RhcmsnXHJcbiAgICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2JyZWFkY3J1bWJzJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdicmVhZGNydW1ic1BhbGV0dGVOYW1lJywge1xyXG4gICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiAnNTAnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9cIik7XHJcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJy8nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uJyAse1xyXG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9fY29tbW9uLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21lbnVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5ob21lJywge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnLycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJ3RlbXBsYXRlcy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ2hvbWUnXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5tYWNoaW5lJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9tYWNoaW5lLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvbWFjaGluZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ2JpdFNjcmVlbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnbWFjaGluZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24ubWFjaGluZVJlZ3VsYXInICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL21hY2hpbmVSZWd1bGFyLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvbWFjaGluZVJlZ3VsYXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdtYWNoaW5lUmVndWxhckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnbWFjaGluZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24ubWFjaGluZXNSZWd1bGFyJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9tYWNoaW5lc1JlZ3VsYXIvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9tYWNoaW5lc1JlZ3VsYXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdtYWNoaW5lc1JlZ3VsYXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ21hY2hpbmVzJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5zdXBlcnZpc29yJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9zdXBlcnZpc29yJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9zdXBlcnZpc29yMi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ3N1cGVydmlzb3JDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ3N1cGVydmlzb3InXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLnN1cGVydmlzb3JNYWNoaW5lJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9zdXBlcnZpc29yLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvc3VwZXJ2aXNvck1hY2hpbmUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdzdXBlck1hY2hpbmVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ2RldGFsbCBzdXBlcnZpc29yJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH0pIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignYml0U2NyZWVuQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsIGRyaXZlclNydiwgJGxvY2F0aW9uLCAkc3RhdGUsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRtZFNpZGVuYXYpIHtcclxuICAgICAgICB2YXIgdXJsID0gJGxvY2F0aW9uLmFic1VybCgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgJHNjb3BlLnNmRmlyc3QgPVtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lT3V0Jyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lT3V0Jyk7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IGRyaXZlclNydi5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChkcml2ZXJTcnYuZ2V0KCkpIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSx7J2lkJzpkcml2ZXJTcnYuZ2V0KCl9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS8nK3VybFt1cmwubGVuZ3RoIC0xXSlcclxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oc2YpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTwoIHNmLmxlbmd0aCA8NSA/IHNmLmxlbmd0aDo1KTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3RbaV0gPSBzZltpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBtYWNoaW5lTm93KCkge1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL25hbWUvJyArIHVybFt1cmwubGVuZ3RoIC0xIF0pXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoID4wICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZU5hbWUgPSBuYW1lWzBdWydOQU1FJ107ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVOYW1lID0gXCJFcnJvciFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL2FjdHVhbC8nK3VybFt1cmwubGVuZ3RoIC0xXSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZBY3R1YWwgPSBuYW1lWzBdWydQck9kSWQnXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZPcHIgPSBuYW1lWzBdWydPcHJOdW0nXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZTdGF0ZSA9IG5hbWVbMF1bJ0xhc3RUaW1lSm9iVHlwZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2Rlc2MvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZEZXNjcmlwdGlvbiA9IGRlc2NbMF1bJ0l0ZW1EZXNjJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3NsaXQvJytuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZRdHlQbGFubmVkID0gcXR5WzBdWydPcmRlclF0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvb2YvY29tcGxldGVkLycrbmFtZVswXVsnUHJPZElkJ10rJy8nK25hbWVbMF1bJ09wck51bSddKycvJyAgK3VybFt1cmwubGVuZ3RoIC0xXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihjb21wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZDb21wbGV0ZWQgPSBjb21wWzBdWydTdGtRdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkNvbXBsZXRlZFBlcmNlbnQgPSBjb21wWzBdWydTdGtRdHknXSoxMDAvcXR5WzBdWydPcmRlclF0eSddOyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG1hY2hpbmVOb3coKTtcclxuICAgICAgICBcclxuICAgICAgICAkaW50ZXJ2YWwobWFjaGluZU5vdyw2MDAwMCk7XHJcbiAgICAgICAgXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicgLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21hY2hpbmVSZWd1bGFyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRzdGF0ZVBhcmFtcywgJGxvY2F0aW9uLCAkc3RhdGUsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRtZFNpZGVuYXYsIGRyaXZlclNydikge1xyXG4gICAgICAgIHZhciBtYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IGRyaXZlclNydi5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoZHJpdmVyU3J2LmdldCgpICYmIGRyaXZlclNydi5nZXRTdGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUseydpZCc6ZHJpdmVyU3J2LmdldCgpfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvbmFtZS8nICsgbWFjaGluZSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPjAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lTmFtZSA9IG5hbWVbMF1bJ05BTUUnXTsgICBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZU5hbWUgPSBcIkVycm9yIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvYWN0dWFsLycrbWFjaGluZSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZBY3R1YWwgPSBuYW1lWzBdWydQck9kSWQnXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZPcHIgPSBuYW1lWzBdWydPcHJOdW0nXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZTdGF0ZSA9IG5hbWVbMF1bJ0xhc3RUaW1lSm9iVHlwZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2Rlc2MvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZEZXNjcmlwdGlvbiA9IGRlc2NbMF1bJ0l0ZW1EZXNjJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3NsaXQvJytuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZRdHlQbGFubmVkID0gcXR5WzBdWydPcmRlclF0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvb2YvY29tcGxldGVkLycrbmFtZVswXVsnUHJPZElkJ10rJy8nK25hbWVbMF1bJ09wck51bSddKycvJyAgKyBtYWNoaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXAubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkNvbXBsZXRlZCA9IGNvbXBbMF1bJ1N0a1F0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQ29tcGxldGVkUGVyY2VudCA9IGNvbXBbMF1bJ1N0a1F0eSddKjEwMC9xdHlbMF1bJ09yZGVyUXR5J107ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbWFjaGluZU5vdygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRpbnRlcnZhbChtYWNoaW5lTm93LDYwMDAwKTtcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21hY2hpbmVzUmVndWxhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRxLCAkaHR0cCwgc3VwZXJ2aXNvclNydiwgJHN0YXRlUGFyYW1zLCAkbG9jYXRpb24sICRzdGF0ZSwgJGludGVydmFsLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgZHJpdmVyU3J2KSB7XHJcbiAgICAgICAgdmFyIG1hY2hpbmUgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgdmFyIG1hY2hpbmVzID0gW107XHJcbiAgICAgICAgdmFyIG1hY2hpbmVOYW1lcyA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgdmFyIGludGVydmFsTWFjaGluZXM7XHJcbiAgICAgICAgJHNjb3BlLm1hY2hpbmVzID0gW107XHJcblxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldChsb2NhdGUpO1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGRyaXZlclNydi5nZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnLHsnaWQnOmRyaXZlclNydi5nZXQoKX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICRzY29wZS5nbyA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZHJpdmVyU3J2LnNldCgkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZVJlZ3VsYXInLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29CaWdTY3JlZW4gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGRyaXZlclNydi5zZXQoJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZScseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lcygkc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1jaHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtY2hzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4QXV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS9uYW1lLycgKyBlbGVtZW50WydXcmtDdHJJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPjAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFjaGluZXNbaW5kZXhdID0geyAnaWQnOiBlbGVtZW50WydXcmtDdHJJZCddLCduYW1lJyA6IG5hbWVbMF1bJ05BTUUnXSB9ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWNoaW5lc1tpbmRleF0gPSB7J25hbWUnIDogXCJFcnJvciFcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID09IChpbmRleCArMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWNoaW5lTmFtZXMucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBtYWNoaW5lTm93KCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzID0gW107XHJcbiAgICAgICAgICAgIG1hY2hpbmVzLmZvckVhY2goZnVuY3Rpb24obWFjaGluZSwgaW5kZXgsIGFycmF5KXtcclxuICAgICAgICAgICAgICAgIHZhciBhdXggPXt9O1xyXG4gICAgICAgICAgICAgICAgYXV4WyduYW1lJ10gPSBtYWNoaW5lLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBhdXhbJ2lkJ10gPSBtYWNoaW5lLmlkO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL2FjdHVhbC8nK21hY2hpbmUuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4WydvZkFjdHVhbCddID0gbmFtZVswXVsnUHJPZElkJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXhbJ29mT3ByJ10gPSBuYW1lWzBdWydPcHJOdW0nXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5vZlN0YXRlID0gbmFtZVswXVsnTGFzdFRpbWVKb2JUeXBlJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9kZXNjLycgKyBuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5vZkRlc2NyaXB0aW9uID0gZGVzY1swXVsnSXRlbURlc2MnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3NsaXQvJytuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihxdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Lm9mUXR5UGxhbm5lZCA9IHF0eVswXVsnT3JkZXJRdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvb2YvY29tcGxldGVkLycrbmFtZVswXVsnUHJPZElkJ10rJy8nK25hbWVbMF1bJ09wck51bSddKycvJyAgKyBtYWNoaW5lLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29tcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5vZkNvbXBsZXRlZCA9IGNvbXBbMF1bJ1N0a1F0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXgub2ZDb21wbGV0ZWRQZXJjZW50ID0gY29tcFswXVsnU3RrUXR5J10qMTAwL3F0eVswXVsnT3JkZXJRdHknXTsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzW2luZGV4XSA9YXV4OyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXNbaW5kZXhdID1hdXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgbWFjaGluZU5hbWVzLnByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1hY2hpbmVOb3coKTtcclxuICAgICAgICAgICAgaW50ZXJ2YWxNYWNoaW5lcyA9ICRpbnRlcnZhbChtYWNoaW5lTm93LDYwMDAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJyAsIGZ1bmN0aW9uKCRzY29wZSwkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgJHNjb3BlLmJvZHlTdHlsZSA9ICcnO1xyXG4gICAgICAgICRzY29wZS5zaG93TWVudSA9IHRydWU7XHJcbiAgICAgICAgJHNjb3BlLmJyZWFkY3J1bWJzID0gJ2hvbWUnO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS4kb24oJ01hY2hpbmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NoYW5nZSBib2R5IGNvbG9yJyk7XHJcbiAgICAgICAgICAgICRzY29wZS5ib2R5U3R5bGUgPSAndmlsb2JpTWFjaGluZSc7XHJcbiAgICAgICAgICAgICRzY29wZS5zaG93TWVudSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYmNrZ3JuZFRoZW1lID0gJ21hY2hpbmUnO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuJG9uKCdNYWNoaW5lT3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ib2R5U3R5bGUgPSAnJzsgXHJcbiAgICAgICAgICAgICRzY29wZS5zaG93TWVudSA9IHRydWU7XHJcbiAgICAgICAgICAgICRzY29wZS5iY2tncm5kVGhlbWUgPSAnZGVmYXVsdCdcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5icmVhZGNydW1icyA9IHRvU3RhdGUubmFtZTtcclxuICAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21lbnVDb250cm9sbGVyJywgZnVuY3Rpb24gKFxyXG4gICAgICAgICAgICAkc2NvcGUsXHJcbiAgICAgICAgICAgICRtZFNpZGVuYXYsXHJcbiAgICAgICAgICAgICR0aW1lb3V0LFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLFxyXG4gICAgICAgICAgICAkc3RhdGUsXHJcbiAgICAgICAgICAgIHNzU2lkZU5hdixcclxuICAgICAgICAgICAgc3NTaWRlTmF2U2hhcmVkU2VydmljZSkge1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5tYWNoaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5icmVhZENydW1icyA9ICAkc3RhdGUuY3VycmVudC5icmVhZENydW1icztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5vbkNsaWNrTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS50b2dnbGUoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJ01hY2hpbmUnLGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmUgPSB0cnVlOyAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJ01hY2hpbmVPdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkc2NvcGUubWVudSA9IHNzU2lkZU5hdjtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmJyZWFkQ3J1bWJzID0gdG9TdGF0ZS5icmVhZENydW1icztcclxuICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdzdXBlck1hY2hpbmVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBzdXBlcnZpc29yU3J2LCBkcml2ZXJTcnYsICRzdGF0ZVBhcmFtcywkc3RhdGUpIHtcclxuICAgICAgICAkc2NvcGUubWFjaGluZSA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICAkc2NvcGUuZ28gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldCgkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lUmVndWxhcicseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICRzY29wZS5nb0JpZ1NjcmVlbiA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXMoJHN0YXRlUGFyYW1zLmlkKVxyXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtYWNoaW5lcykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzID0gbWFjaGluZXM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignc3VwZXJ2aXNvckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsc3VwZXJ2aXNvclNydiwgZHJpdmVyU3J2LCRzdGF0ZSkge1xyXG4gICAgICAgICRzY29wZS5nbyA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KGxvY2F0ZSk7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3JNYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5nb0dlbmVyYWwgPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldChsb2NhdGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmVzUmVndWxhcicseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzdXBlcnZpc29yU3J2LmRlcGFydGFtZW50cygpXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRlcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGVwdHMgPSBkZXB0cztcclxuICAgICAgICAgICAgICAgIGRlcHRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzKGVsZW1lbnQuV0NHcm91cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVwdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlcHRzW2luZGV4XVsnbWFjaGluZXMnXSA9IGRlcHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuZGlyZWN0aXZlKCdzZkNsb2NrJywgZnVuY3Rpb24gKCRpbnRlcnZhbCwgZGF0ZUZpbHRlcikge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBzdG9wVGltZTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGltZSgpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQudGV4dChkYXRlRmlsdGVyKG5ldyBEYXRlKCksICdkZC9NTS95eXl5IEhIOm1tOnNzJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdG9wVGltZSA9ICRpbnRlcnZhbChmdW5jdGlvbigpIHsgdXBkYXRlVGltZSgpfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbGVtZW50Lm9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChzdG9wVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuc2VydmljZSgnZHJpdmVyU3J2JywgZnVuY3Rpb24oJGh0dHApIHtcclxuICAgICAgICB0aGlzLmxhc3RJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0U3RhdGUgPSBbXVxyXG4gICAgIFxyXG4gICAgICAgIHRoaXMuc2V0ID0gZnVuY3Rpb24obGFzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RJZCA9IGxhc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSA9IGZ1bmN0aW9uKGxhc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U3RhdGUucHVzaChsYXN0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5sYXN0U3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFN0YXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RTdGF0ZS5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5mYWN0b3J5KCdzdXBlcnZpc29yU3J2JywgZnVuY3Rpb24oJGh0dHApIHtcclxuICAgICAgICB2YXIgdXJsQmFzZSA9ICcuLi8uLi9hcGkvc3VwZXJ2aXNvci9kZXB0JztcclxuICAgICBcclxuICAgICAgICB0aGlzLmRlcGFydGFtZW50cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHVybEJhc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hY2hpbmVzID0gZnVuY3Rpb24oZGVwdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHVybEJhc2UrJy8nK2RlcHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
