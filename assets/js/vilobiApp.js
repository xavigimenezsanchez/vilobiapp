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
            if (driverSrv.get()) {
                $state.go('common.supervisorMachine',{'id':driverSrv.get()});
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
            if (driverSrv.get()) {
                $state.go('common.supervisorMachine',{'id':driverSrv.get()});
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
            $state.go('common.supervisor');
        }
        
        $scope.goBack = function() {
            if (driverSrv.get()) {
                $state.go('common.supervisorMachine',{'id':driverSrv.get()});
            } else {
                $state.go('common.supervisor');
            }
            
        }

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
    .controller('supervisorController', function($scope,supervisorSrv, $state) {
        $scope.go = function(locate) {
            $state.go('common.supervisorMachine',{'id':locate});
        };
        $scope.goGeneral = function(locate) {
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
        this.last = null;
     
        this.set = function(last) {
            this.last = last;
        }
        this.get = function() {
            return this.last;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1lbnUuY2ZnLmpzIiwidGhlbWUuY2ZnLmpzIiwidmlsb2JpLmNmZy5qcyIsImNvbnRyb2xsZXJzL2JpZ1NjcmVlbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZS5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFjaGluZVJlZ3VsYXIuY3RybC5qcyIsImNvbnRyb2xsZXJzL21hY2hpbmVzUmVndWxhci5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFpbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWVudS5jdHJsLmpzIiwiY29udHJvbGxlcnMvc3VwZXJNYWNoaW5lLmN0cmwuanMiLCJjb250cm9sbGVycy9zdXBlcnZpc29yLmN0cmwuanMiLCJkaXJlY3RpdmVzL3NmQ2xvY2suanMiLCJzZXJ2aWNlcy9kcml2ZXIuc3J2LmpzIiwic2VydmljZXMvc3VwZXJ2aXNvci5zcnYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidmlsb2JpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcsWyd1aS5yb3V0ZXInLCduZ01hdGVyaWFsJywnc2FzcmlvLmFuZ3VsYXItbWF0ZXJpYWwtc2lkZW5hdiddKTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyLHNzU2lkZU5hdlNlY3Rpb25zUHJvdmlkZXIpIHtcclxuICAgICAgICBzc1NpZGVOYXZTZWN0aW9uc1Byb3ZpZGVyLmluaXRXaXRoVGhlbWUoJG1kVGhlbWluZ1Byb3ZpZGVyKTtcclxuICAgICAgICAgICAgc3NTaWRlTmF2U2VjdGlvbnNQcm92aWRlci5pbml0V2l0aFNlY3Rpb25zKFt7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICAgICAgICAgJ0hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICdIb21lJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogICAgICAnY29tbW9uLmhvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICAgICAgICdsaW5rJ1xyXG4gICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICAgICAgICAgJ1N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICdTdXBlcnZpc29yJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogICAgICAnY29tbW9uLnN1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICAgICAgICdsaW5rJ1xyXG4gICAgICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1ncmV5JykuYmFja2dyb3VuZFBhbGV0dGUoJ2dyZXknKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLW9yYW5nZScpLmJhY2tncm91bmRQYWxldHRlKCdvcmFuZ2UnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLXB1cnBsZScpLmJhY2tncm91bmRQYWxldHRlKCdkZWVwLXB1cnBsZScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RhcmstYmx1ZScpLmJhY2tncm91bmRQYWxldHRlKCdibHVlJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1yZWQnKS5iYWNrZ3JvdW5kUGFsZXR0ZSgncmVkJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdvcmFuZ2UnKTtcclxuXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ21hY2hpbmVQYWxldGUnLCB7XHJcbiAgICAgICAgICAgICc1MCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzEwMCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzIwMCc6ICdlZjlhOWEnLFxyXG4gICAgICAgICAgICAgICAgJzMwMCc6ICdlNTczNzMnLFxyXG4gICAgICAgICAgICAgICAgJzQwMCc6ICdlZjUzNTAnLFxyXG4gICAgICAgICAgICAgICAgJzUwMCc6ICdmNDQzMzYnLFxyXG4gICAgICAgICAgICAgICAgJzYwMCc6ICdlNTM5MzUnLFxyXG4gICAgICAgICAgICAgICAgJzcwMCc6ICdkMzJmMmYnLFxyXG4gICAgICAgICAgICAgICAgJzgwMCc6ICdjNjI4MjgnLFxyXG4gICAgICAgICAgICAgICAgJzkwMCc6ICdiNzFjMWMnLFxyXG4gICAgICAgICAgICAgICAgJ0ExMDAnOiAnMDAwMDAwJywgIC8vIEJhY2tncm91bmQgQ29sb3JcclxuICAgICAgICAgICAgICAgICdBMjAwJzogJ2ZmNTI1MicsXHJcbiAgICAgICAgICAgICAgICAnQTQwMCc6ICdmZjE3NDQnLFxyXG4gICAgICAgICAgICAgICAgJ0E3MDAnOiAnZDUwMDAwJyxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgIC8vIHdoZXRoZXIsIGJ5IGRlZmF1bHQsIHRleHQgKGNvbnRyYXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhpcyBwYWxldHRlIHNob3VsZCBiZSBkYXJrIG9yIGxpZ2h0XHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCAvL2h1ZXMgd2hpY2ggY29udHJhc3Qgc2hvdWxkIGJlICdkYXJrJyBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbWFjaGluZScpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnbWFjaGluZVBhbGV0ZScpO1xyXG5cclxuXHJcbiAgICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2JyZWFkY3J1bWJzUGFsZXR0ZU5hbWUnLCB7XHJcbiAgICAgICAgICAgICAgICAnNTAnOiAnRkZGRkZGJyxcclxuICAgICAgICAgICAgICAgICcxMDAnOiAnZmZjZGQyJyxcclxuICAgICAgICAgICAgICAgICcyMDAnOiAnZWY5YTlhJyxcclxuICAgICAgICAgICAgICAgICczMDAnOiAnZTU3MzczJyxcclxuICAgICAgICAgICAgICAgICc0MDAnOiAnZWY1MzUwJyxcclxuICAgICAgICAgICAgICAgICc1MDAnOiAnZjQ0MzM2JyxcclxuICAgICAgICAgICAgICAgICc2MDAnOiAnZTUzOTM1JyxcclxuICAgICAgICAgICAgICAgICc3MDAnOiAnZDMyZjJmJyxcclxuICAgICAgICAgICAgICAgICc4MDAnOiAnYzYyODI4JyxcclxuICAgICAgICAgICAgICAgICc5MDAnOiAnYjcxYzFjJyxcclxuICAgICAgICAgICAgICAgICdBMTAwJzogJ2ZmOGE4MCcsXHJcbiAgICAgICAgICAgICAgICAnQTIwMCc6ICdmZjUyNTInLFxyXG4gICAgICAgICAgICAgICAgJ0E0MDAnOiAnZmYxNzQ0JyxcclxuICAgICAgICAgICAgICAgICdBNzAwJzogJ2Q1MDAwMCcsXHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLCAgICAvLyB3aGV0aGVyLCBieSBkZWZhdWx0LCB0ZXh0IChjb250cmFzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIHRoaXMgcGFsZXR0ZSBzaG91bGQgYmUgZGFyayBvciBsaWdodFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFsnNTAnLCAnMTAwJywgLy9odWVzIHdoaWNoIGNvbnRyYXN0IHNob3VsZCBiZSAnZGFyaycgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgJzIwMCcsICczMDAnLCAnNDAwJywgJ0ExMDAnXSxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogdW5kZWZpbmVkICAgIC8vIGNvdWxkIGFsc28gc3BlY2lmeSB0aGlzIGlmIGRlZmF1bHQgd2FzICdkYXJrJ1xyXG4gICAgICAgICAgICB9KTsgICBcclxuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdicmVhZGNydW1icycpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYnJlYWRjcnVtYnNQYWxldHRlTmFtZScsIHtcclxuICAgICAgICAgICAgICAgICdkZWZhdWx0JzogJzUwJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvXCIpO1xyXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcvJztcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbicgLHtcclxuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvX2NvbW1vbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtZW51Q29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24uaG9tZScsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICd0ZW1wbGF0ZXMvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdob21lJ1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24ubWFjaGluZScgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvbWFjaGluZS86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL21hY2hpbmUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdiaXRTY3JlZW5Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ21hY2hpbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLm1hY2hpbmVSZWd1bGFyJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9tYWNoaW5lUmVndWxhci86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL21hY2hpbmVSZWd1bGFyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnbWFjaGluZVJlZ3VsYXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ21hY2hpbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLm1hY2hpbmVzUmVndWxhcicgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvbWFjaGluZXNSZWd1bGFyLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvbWFjaGluZXNSZWd1bGFyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnbWFjaGluZXNSZWd1bGFyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdtYWNoaW5lcydcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24uc3VwZXJ2aXNvcicgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvc3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvc3VwZXJ2aXNvcjIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdzdXBlcnZpc29yQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdzdXBlcnZpc29yJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5zdXBlcnZpc29yTWFjaGluZScgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvc3VwZXJ2aXNvci86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL3N1cGVydmlzb3JNYWNoaW5lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnc3VwZXJNYWNoaW5lQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdkZXRhbGwgc3VwZXJ2aXNvcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9KSIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ2JpdFNjcmVlbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCBkcml2ZXJTcnYsICRsb2NhdGlvbiwgJHN0YXRlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkbWRTaWRlbmF2KSB7XHJcbiAgICAgICAgdmFyIHVybCA9ICRsb2NhdGlvbi5hYnNVcmwoKS5zcGxpdCgnLycpO1xyXG4gICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICRzY29wZS5zZkZpcnN0ID1bXTtcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZU91dCcpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZU91dCcpO1xyXG4gICAgICAgICAgICBpZiAoZHJpdmVyU3J2LmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yTWFjaGluZScseydpZCc6ZHJpdmVyU3J2LmdldCgpfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvJyt1cmxbdXJsLmxlbmd0aCAtMV0pXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNmKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8KCBzZi5sZW5ndGggPDUgPyBzZi5sZW5ndGg6NSk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0W2ldID0gc2ZbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS9uYW1lLycgKyB1cmxbdXJsLmxlbmd0aCAtMSBdKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA+MCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVOYW1lID0gbmFtZVswXVsnTkFNRSddOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lTmFtZSA9IFwiRXJyb3IhXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS9hY3R1YWwvJyt1cmxbdXJsLmxlbmd0aCAtMV0pXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQWN0dWFsID0gbmFtZVswXVsnUHJPZElkJ107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mT3ByID0gbmFtZVswXVsnT3ByTnVtJ107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mU3RhdGUgPSBuYW1lWzBdWydMYXN0VGltZUpvYlR5cGUnXTtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9kZXNjLycgKyBuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVzYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mRGVzY3JpcHRpb24gPSBkZXNjWzBdWydJdGVtRGVzYyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9zbGl0LycrbmFtZVswXVsnUHJPZElkJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHF0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mUXR5UGxhbm5lZCA9IHF0eVswXVsnT3JkZXJRdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2NvbXBsZXRlZC8nK25hbWVbMF1bJ1ByT2RJZCddKycvJytuYW1lWzBdWydPcHJOdW0nXSsnLycgICt1cmxbdXJsLmxlbmd0aCAtMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29tcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcC5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQ29tcGxldGVkID0gY29tcFswXVsnU3RrUXR5J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZDb21wbGV0ZWRQZXJjZW50ID0gY29tcFswXVsnU3RrUXR5J10qMTAwL3F0eVswXVsnT3JkZXJRdHknXTsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBtYWNoaW5lTm93KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGludGVydmFsKG1hY2hpbmVOb3csNjAwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInICwgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdtYWNoaW5lUmVndWxhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGVQYXJhbXMsICRsb2NhdGlvbiwgJHN0YXRlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCBkcml2ZXJTcnYpIHtcclxuICAgICAgICB2YXIgbWFjaGluZSA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoZHJpdmVyU3J2LmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yTWFjaGluZScseydpZCc6ZHJpdmVyU3J2LmdldCgpfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvbmFtZS8nICsgbWFjaGluZSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPjAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lTmFtZSA9IG5hbWVbMF1bJ05BTUUnXTsgICBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZU5hbWUgPSBcIkVycm9yIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvYWN0dWFsLycrbWFjaGluZSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZBY3R1YWwgPSBuYW1lWzBdWydQck9kSWQnXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZPcHIgPSBuYW1lWzBdWydPcHJOdW0nXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZTdGF0ZSA9IG5hbWVbMF1bJ0xhc3RUaW1lSm9iVHlwZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2Rlc2MvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZEZXNjcmlwdGlvbiA9IGRlc2NbMF1bJ0l0ZW1EZXNjJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3NsaXQvJytuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZRdHlQbGFubmVkID0gcXR5WzBdWydPcmRlclF0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvb2YvY29tcGxldGVkLycrbmFtZVswXVsnUHJPZElkJ10rJy8nK25hbWVbMF1bJ09wck51bSddKycvJyAgKyBtYWNoaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXAubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkNvbXBsZXRlZCA9IGNvbXBbMF1bJ1N0a1F0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQ29tcGxldGVkUGVyY2VudCA9IGNvbXBbMF1bJ1N0a1F0eSddKjEwMC9xdHlbMF1bJ09yZGVyUXR5J107ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbWFjaGluZU5vdygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRpbnRlcnZhbChtYWNoaW5lTm93LDYwMDAwKTtcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21hY2hpbmVzUmVndWxhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRxLCAkaHR0cCwgc3VwZXJ2aXNvclNydiwgJHN0YXRlUGFyYW1zLCAkbG9jYXRpb24sICRzdGF0ZSwgJGludGVydmFsLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgZHJpdmVyU3J2KSB7XHJcbiAgICAgICAgdmFyIG1hY2hpbmUgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgdmFyIG1hY2hpbmVzID0gW107XHJcbiAgICAgICAgdmFyIG1hY2hpbmVOYW1lcyA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgdmFyIGludGVydmFsTWFjaGluZXM7XHJcbiAgICAgICAgJHNjb3BlLm1hY2hpbmVzID0gW107XHJcblxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChkcml2ZXJTcnYuZ2V0KCkpIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3JNYWNoaW5lJyx7J2lkJzpkcml2ZXJTcnYuZ2V0KCl9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXMoJHN0YXRlUGFyYW1zLmlkKVxyXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtY2hzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbWNocy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleEF1eCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvbmFtZS8nICsgZWxlbWVudFsnV3JrQ3RySWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoID4wICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hY2hpbmVzW2luZGV4XSA9IHsgJ2lkJzogZWxlbWVudFsnV3JrQ3RySWQnXSwnbmFtZScgOiBuYW1lWzBdWydOQU1FJ10gfSAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFjaGluZXNbaW5kZXhdID0geyduYW1lJyA6IFwiRXJyb3IhXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PSAoaW5kZXggKzEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFjaGluZU5hbWVzLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5tYWNoaW5lcyA9IFtdO1xyXG4gICAgICAgICAgICBtYWNoaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKG1hY2hpbmUsIGluZGV4LCBhcnJheSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXV4ID17fTtcclxuICAgICAgICAgICAgICAgIGF1eFsnbmFtZSddID0gbWFjaGluZS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL2FjdHVhbC8nK21hY2hpbmUuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4WydvZkFjdHVhbCddID0gbmFtZVswXVsnUHJPZElkJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXhbJ29mT3ByJ10gPSBuYW1lWzBdWydPcHJOdW0nXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5vZlN0YXRlID0gbmFtZVswXVsnTGFzdFRpbWVKb2JUeXBlJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9kZXNjLycgKyBuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5vZkRlc2NyaXB0aW9uID0gZGVzY1swXVsnSXRlbURlc2MnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3NsaXQvJytuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihxdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Lm9mUXR5UGxhbm5lZCA9IHF0eVswXVsnT3JkZXJRdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvb2YvY29tcGxldGVkLycrbmFtZVswXVsnUHJPZElkJ10rJy8nK25hbWVbMF1bJ09wck51bSddKycvJyAgKyBtYWNoaW5lLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oY29tcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eC5vZkNvbXBsZXRlZCA9IGNvbXBbMF1bJ1N0a1F0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXgub2ZDb21wbGV0ZWRQZXJjZW50ID0gY29tcFswXVsnU3RrUXR5J10qMTAwL3F0eVswXVsnT3JkZXJRdHknXTsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzW2luZGV4XSA9YXV4OyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXNbaW5kZXhdID1hdXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgbWFjaGluZU5hbWVzLnByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1hY2hpbmVOb3coKTtcclxuICAgICAgICAgICAgaW50ZXJ2YWxNYWNoaW5lcyA9ICRpbnRlcnZhbChtYWNoaW5lTm93LDYwMDAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJyAsIGZ1bmN0aW9uKCRzY29wZSwkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgJHNjb3BlLmJvZHlTdHlsZSA9ICcnO1xyXG4gICAgICAgICRzY29wZS5zaG93TWVudSA9IHRydWU7XHJcbiAgICAgICAgJHNjb3BlLmJyZWFkY3J1bWJzID0gJ2hvbWUnO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS4kb24oJ01hY2hpbmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NoYW5nZSBib2R5IGNvbG9yJyk7XHJcbiAgICAgICAgICAgICRzY29wZS5ib2R5U3R5bGUgPSAndmlsb2JpTWFjaGluZSc7XHJcbiAgICAgICAgICAgICRzY29wZS5zaG93TWVudSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYmNrZ3JuZFRoZW1lID0gJ21hY2hpbmUnO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuJG9uKCdNYWNoaW5lT3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ib2R5U3R5bGUgPSAnJzsgXHJcbiAgICAgICAgICAgICRzY29wZS5zaG93TWVudSA9IHRydWU7XHJcbiAgICAgICAgICAgICRzY29wZS5iY2tncm5kVGhlbWUgPSAnZGVmYXVsdCdcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5icmVhZGNydW1icyA9IHRvU3RhdGUubmFtZTtcclxuICAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21lbnVDb250cm9sbGVyJywgZnVuY3Rpb24gKFxyXG4gICAgICAgICAgICAkc2NvcGUsXHJcbiAgICAgICAgICAgICRtZFNpZGVuYXYsXHJcbiAgICAgICAgICAgICR0aW1lb3V0LFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLFxyXG4gICAgICAgICAgICAkc3RhdGUsXHJcbiAgICAgICAgICAgIHNzU2lkZU5hdixcclxuICAgICAgICAgICAgc3NTaWRlTmF2U2hhcmVkU2VydmljZSkge1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5tYWNoaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5icmVhZENydW1icyA9ICAkc3RhdGUuY3VycmVudC5icmVhZENydW1icztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5vbkNsaWNrTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS50b2dnbGUoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJ01hY2hpbmUnLGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmUgPSB0cnVlOyAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJ01hY2hpbmVPdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkc2NvcGUubWVudSA9IHNzU2lkZU5hdjtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmJyZWFkQ3J1bWJzID0gdG9TdGF0ZS5icmVhZENydW1icztcclxuICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdzdXBlck1hY2hpbmVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBzdXBlcnZpc29yU3J2LCBkcml2ZXJTcnYsICRzdGF0ZVBhcmFtcywkc3RhdGUpIHtcclxuICAgICAgICAkc2NvcGUubWFjaGluZSA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICAkc2NvcGUuZ28gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldCgkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lUmVndWxhcicseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICRzY29wZS5nb0JpZ1NjcmVlbiA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXMoJHN0YXRlUGFyYW1zLmlkKVxyXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtYWNoaW5lcykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzID0gbWFjaGluZXM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignc3VwZXJ2aXNvckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsc3VwZXJ2aXNvclNydiwgJHN0YXRlKSB7XHJcbiAgICAgICAgJHNjb3BlLmdvID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3JNYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5nb0dlbmVyYWwgPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZXNSZWd1bGFyJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN1cGVydmlzb3JTcnYuZGVwYXJ0YW1lbnRzKClcclxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVwdHMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5kZXB0cyA9IGRlcHRzO1xyXG4gICAgICAgICAgICAgICAgZGVwdHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXMoZWxlbWVudC5XQ0dyb3VwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGVwdHNbaW5kZXhdWydtYWNoaW5lcyddID0gZGVwdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5kaXJlY3RpdmUoJ3NmQ2xvY2snLCBmdW5jdGlvbiAoJGludGVydmFsLCBkYXRlRmlsdGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3BUaW1lO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVUaW1lKCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC50ZXh0KGRhdGVGaWx0ZXIobmV3IERhdGUoKSwgJ2RkL01NL3l5eXkgSEg6bW06c3MnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN0b3BUaW1lID0gJGludGVydmFsKGZ1bmN0aW9uKCkgeyB1cGRhdGVUaW1lKCl9LCAxMDAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHN0b3BUaW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5zZXJ2aWNlKCdkcml2ZXJTcnYnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgIHRoaXMubGFzdCA9IG51bGw7XHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5zZXQgPSBmdW5jdGlvbihsYXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdCA9IGxhc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuZmFjdG9yeSgnc3VwZXJ2aXNvclNydicsIGZ1bmN0aW9uKCRodHRwKSB7XHJcbiAgICAgICAgdmFyIHVybEJhc2UgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdCc7XHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5kZXBhcnRhbWVudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmxCYXNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lcyA9IGZ1bmN0aW9uKGRlcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmxCYXNlKycvJytkZXB0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
