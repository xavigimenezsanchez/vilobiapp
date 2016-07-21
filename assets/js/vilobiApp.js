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
            try {
                $state.go(state.id,{'id':state.param});
            } catch (error) {
                $state.go('common.supervisor');
            }
        }
        
        $http.get('../../api/machine/'+url[url.length -1])
            .success(function(sf) {
                for (var i=0; i<( sf.length <5 ? sf.length:5); i++) {
                    $scope.sfFirst[i] = sf[i];
                }
            });
        
        
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
                                                if (q[0]) {
                                                    $scope.ofQtyPlanned = q[0]['quantity'];
                                                } else {
                                                    $scope.ofQtyPlanned = 0;
                                                }
                                                 
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
angular.module('vilobiApp')
    .controller('machinesRegularController', function($scope, $http, supervisorSrv, machineStateSrv, $stateParams, $location, $state, $interval, $timeout, $mdSidenav, driverSrv) {
        var machine = $stateParams.id;
        var machines = [];
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
                driverSrv.setState($state.current.name,$stateParams.id);
                $state.go('common.machineRegular',{'id':locate});
            };
            
        $scope.goBigScreen = function(locate) {
                driverSrv.setState($state.current.name,$stateParams.id);
                $scope.$emit('Machine');
                $state.go('common.machine',{'id':locate});
            };
       


        
        
        function machineNow() {
            supervisorSrv.machinesAll($stateParams.id)
                    .success(function(mach){
                        console.log(mach);
                        mach.forEach(function(element,index) {
                            $scope.machines[index] = element;
                            $scope.machines[index]['ofState'] = machineStateSrv.get(element.status); 
                            if (element.quantityPlanned && element.quantityPlanned != 0 && element.ofCompleted) {
                                $scope.machines[index]['ofCompletedPercent'] = element.ofCompleted*100/element.quantityPlanned
                            }
                             
                        })
                        

                    },function(err){
                        console.log(err);
                    })
                 
        }
        
        machineNow();
        supervisorSrv.machinesAllTimer = $interval(machineNow,5000);
        
    });
angular.module('vilobiApp')
    .controller('mainController' , function($scope,$rootScope, supervisorSrv) {
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
            supervisorSrv.killTimers();
         });

         $rootScope.$on('$routeChangeStart', function() {
            var state = driverSrv.getState();
            console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!')
            try {
                $state.go(state.id,{'id':state.param});
            } catch (error) {
                $state.go('common.supervisor');
            }
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
            driverSrv.setState($state.current.name,$stateParams.id);
            $state.go('common.machineRegular',{'id':locate});
        };
        $scope.goBack = function() {
            $state.go('common.supervisor');
        }
         $scope.goBigScreen = function(locate) {
            driverSrv.setState($state.current.name,$stateParams.id);
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
        this.setState = function(last,param) {
            this.lastState.push({'id':last,'param':param});
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
            if (!state) state='';
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
    .service('ofSrv', function($http, $q) {
        var urlBase = '../../api/bom/';
        var deferred = $q.defer();
     
        this.materialAvaliable = function(ofs) {
            var auxCount = 1;
            ofs.forEach(function(element, index, array) {
                $http.get(urlBase + element.OF)
                    .success(function(bom) {
                        var auxAvaliable= [];
                        if (bom.length == 0 ) deferred.resolve([{'Avalaible':2,'itemId':''}])
                        bom.forEach(function(element){
                            var auxBom = {'itemId' : element['ItemId'], 'avaliable' : 0};
                            if (element['RequiredQty'] <= element['Avalaible']) {
                                auxBom['avaliable'] =  2;  // Semafor verd
                            } else if (element['RequiredQty'] > element['Avalaible'] &&
                                       element['RequiredQty'] <= (element['Avalaible']/2)) {
                                auxBom['avaliable'] =  1;  // Semafor taronja
                            }
                            auxAvaliable.push(auxBom);
                        });
                        array[index]['avaliable'] = auxAvaliable;
                        if (++auxCount == array.length) {
                            deferred.resolve(array);
                            
                        }
                    })
                
            });
            return deferred.promise;
        }
        return this;
    });
angular.module('vilobiApp')
    .factory('supervisorSrv', function($http, $interval) {
        var urlBase = '../../api/supervisor/dept';
        var deptAll = '../../api/supervisor/deptall';
        var deptOne = '../../api/supervisor/deptone';
     
        this.departaments = function() {
            return $http.get(urlBase);
        }
        this.machines = function(dept) {
            return $http.get(urlBase+'/'+dept);
        }
        this.machinesAll = function(dept) {
            return $http.get(deptAll + '/' + dept)
        }
        this.machineOne = function(mach) {
            console.log(deptOne + '/' + mach);
            return $http.get(deptOne + '/' + mach)
        }
        this.machinesAllTimer= null;

        this.killTimers = function() {
            if (this.machinesAllTimer)
                $interval.cancel(this.machinesAllTimer);
        }
        return this;
    });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1lbnUuY2ZnLmpzIiwidGhlbWUuY2ZnLmpzIiwidmlsb2JpLmNmZy5qcyIsImNvbnRyb2xsZXJzL2JpZ1NjcmVlbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZS5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFjaGluZVJlZ3VsYXIuY3RybC5qcyIsImNvbnRyb2xsZXJzL21hY2hpbmVzUmVndWxhci5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFpbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWVudS5jdHJsLmpzIiwiY29udHJvbGxlcnMvc3VwZXJNYWNoaW5lLmN0cmwuanMiLCJjb250cm9sbGVycy9zdXBlcnZpc29yLmN0cmwuanMiLCJkaXJlY3RpdmVzL3NmQ2xvY2suanMiLCJzZXJ2aWNlcy9kcml2ZXIuc3J2LmpzIiwic2VydmljZXMvbWFjaGluZVN0YXRlLnNydi5qcyIsInNlcnZpY2VzL29mU2VydmVyLmpzIiwic2VydmljZXMvc3VwZXJ2aXNvci5zcnYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckZBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidmlsb2JpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcsWyd1aS5yb3V0ZXInLCduZ01hdGVyaWFsJywnc2FzcmlvLmFuZ3VsYXItbWF0ZXJpYWwtc2lkZW5hdiddKTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyLHNzU2lkZU5hdlNlY3Rpb25zUHJvdmlkZXIpIHtcclxuICAgICAgICBzc1NpZGVOYXZTZWN0aW9uc1Byb3ZpZGVyLmluaXRXaXRoVGhlbWUoJG1kVGhlbWluZ1Byb3ZpZGVyKTtcclxuICAgICAgICAgICAgc3NTaWRlTmF2U2VjdGlvbnNQcm92aWRlci5pbml0V2l0aFNlY3Rpb25zKFt7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICAgICAgICAgJ0hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICdIb21lJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogICAgICAnY29tbW9uLmhvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICAgICAgICdsaW5rJ1xyXG4gICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICAgICAgICAgJ1N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICdTdXBlcnZpc29yJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogICAgICAnY29tbW9uLnN1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICAgICAgICdsaW5rJ1xyXG4gICAgICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1ncmV5JykuYmFja2dyb3VuZFBhbGV0dGUoJ2dyZXknKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLW9yYW5nZScpLmJhY2tncm91bmRQYWxldHRlKCdvcmFuZ2UnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLXB1cnBsZScpLmJhY2tncm91bmRQYWxldHRlKCdkZWVwLXB1cnBsZScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RhcmstYmx1ZScpLmJhY2tncm91bmRQYWxldHRlKCdibHVlJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1yZWQnKS5iYWNrZ3JvdW5kUGFsZXR0ZSgncmVkJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdvcmFuZ2UnKTtcclxuXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ21hY2hpbmVQYWxldGUnLCB7XHJcbiAgICAgICAgICAgICc1MCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzEwMCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzIwMCc6ICdlZjlhOWEnLFxyXG4gICAgICAgICAgICAgICAgJzMwMCc6ICdlNTczNzMnLFxyXG4gICAgICAgICAgICAgICAgJzQwMCc6ICdlZjUzNTAnLFxyXG4gICAgICAgICAgICAgICAgJzUwMCc6ICdmNDQzMzYnLFxyXG4gICAgICAgICAgICAgICAgJzYwMCc6ICdlNTM5MzUnLFxyXG4gICAgICAgICAgICAgICAgJzcwMCc6ICdkMzJmMmYnLFxyXG4gICAgICAgICAgICAgICAgJzgwMCc6ICdjNjI4MjgnLFxyXG4gICAgICAgICAgICAgICAgJzkwMCc6ICdiNzFjMWMnLFxyXG4gICAgICAgICAgICAgICAgJ0ExMDAnOiAnMDAwMDAwJywgIC8vIEJhY2tncm91bmQgQ29sb3JcclxuICAgICAgICAgICAgICAgICdBMjAwJzogJ2ZmNTI1MicsXHJcbiAgICAgICAgICAgICAgICAnQTQwMCc6ICdmZjE3NDQnLFxyXG4gICAgICAgICAgICAgICAgJ0E3MDAnOiAnZDUwMDAwJyxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgIC8vIHdoZXRoZXIsIGJ5IGRlZmF1bHQsIHRleHQgKGNvbnRyYXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhpcyBwYWxldHRlIHNob3VsZCBiZSBkYXJrIG9yIGxpZ2h0XHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCAvL2h1ZXMgd2hpY2ggY29udHJhc3Qgc2hvdWxkIGJlICdkYXJrJyBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbWFjaGluZScpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnbWFjaGluZVBhbGV0ZScpO1xyXG5cclxuXHJcbiAgICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2JyZWFkY3J1bWJzUGFsZXR0ZU5hbWUnLCB7XHJcbiAgICAgICAgICAgICAgICAnNTAnOiAnRkZGRkZGJyxcclxuICAgICAgICAgICAgICAgICcxMDAnOiAnZmZjZGQyJyxcclxuICAgICAgICAgICAgICAgICcyMDAnOiAnZWY5YTlhJyxcclxuICAgICAgICAgICAgICAgICczMDAnOiAnZTU3MzczJyxcclxuICAgICAgICAgICAgICAgICc0MDAnOiAnZWY1MzUwJyxcclxuICAgICAgICAgICAgICAgICc1MDAnOiAnZjQ0MzM2JyxcclxuICAgICAgICAgICAgICAgICc2MDAnOiAnZTUzOTM1JyxcclxuICAgICAgICAgICAgICAgICc3MDAnOiAnZDMyZjJmJyxcclxuICAgICAgICAgICAgICAgICc4MDAnOiAnYzYyODI4JyxcclxuICAgICAgICAgICAgICAgICc5MDAnOiAnYjcxYzFjJyxcclxuICAgICAgICAgICAgICAgICdBMTAwJzogJ2ZmOGE4MCcsXHJcbiAgICAgICAgICAgICAgICAnQTIwMCc6ICdmZjUyNTInLFxyXG4gICAgICAgICAgICAgICAgJ0E0MDAnOiAnZmYxNzQ0JyxcclxuICAgICAgICAgICAgICAgICdBNzAwJzogJ2Q1MDAwMCcsXHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLCAgICAvLyB3aGV0aGVyLCBieSBkZWZhdWx0LCB0ZXh0IChjb250cmFzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIHRoaXMgcGFsZXR0ZSBzaG91bGQgYmUgZGFyayBvciBsaWdodFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFsnNTAnLCAnMTAwJywgLy9odWVzIHdoaWNoIGNvbnRyYXN0IHNob3VsZCBiZSAnZGFyaycgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgJzIwMCcsICczMDAnLCAnNDAwJywgJ0ExMDAnXSxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogdW5kZWZpbmVkICAgIC8vIGNvdWxkIGFsc28gc3BlY2lmeSB0aGlzIGlmIGRlZmF1bHQgd2FzICdkYXJrJ1xyXG4gICAgICAgICAgICB9KTsgICBcclxuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdicmVhZGNydW1icycpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYnJlYWRjcnVtYnNQYWxldHRlTmFtZScsIHtcclxuICAgICAgICAgICAgICAgICdkZWZhdWx0JzogJzUwJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3Byb2Nlc3MnKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2dyZWVuJyk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdzZXR1cCcpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnYW1iZXInKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3B1bGwnKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2JsdWUnKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2VuZCcpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgncmVkJyk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCduY2Rvd24nKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ29yYW5nZScpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZG93bicpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnZGVlcC1vcmFuZ2UnKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2Vycm9yJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdncmV5Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvXCIpO1xyXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcvJztcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbicgLHtcclxuICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvX2NvbW1vbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtZW51Q29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24uaG9tZScsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICd0ZW1wbGF0ZXMvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdob21lJ1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24ubWFjaGluZScgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvbWFjaGluZS86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL21hY2hpbmUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdiaXRTY3JlZW5Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ21hY2hpbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLm1hY2hpbmVSZWd1bGFyJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9tYWNoaW5lUmVndWxhci86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL21hY2hpbmVSZWd1bGFyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnbWFjaGluZVJlZ3VsYXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ21hY2hpbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLm1hY2hpbmVzUmVndWxhcicgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvbWFjaGluZXNSZWd1bGFyLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvbWFjaGluZXNSZWd1bGFyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnbWFjaGluZXNSZWd1bGFyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdtYWNoaW5lcydcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24uc3VwZXJ2aXNvcicgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvc3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvc3VwZXJ2aXNvcjIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdzdXBlcnZpc29yQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdzdXBlcnZpc29yJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5zdXBlcnZpc29yTWFjaGluZScgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvc3VwZXJ2aXNvci86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL3N1cGVydmlzb3JNYWNoaW5lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnc3VwZXJNYWNoaW5lQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdkZXRhbGwgc3VwZXJ2aXNvcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9KSIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ2JpdFNjcmVlbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCBkcml2ZXJTcnYsICRsb2NhdGlvbiwgJHN0YXRlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkbWRTaWRlbmF2KSB7XHJcbiAgICAgICAgdmFyIHVybCA9ICRsb2NhdGlvbi5hYnNVcmwoKS5zcGxpdCgnLycpO1xyXG4gICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICRzY29wZS5zZkZpcnN0ID1bXTtcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZU91dCcpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZU91dCcpO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBkcml2ZXJTcnYuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZS5pZCx7J2lkJzpzdGF0ZS5wYXJhbX0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvJyt1cmxbdXJsLmxlbmd0aCAtMV0pXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNmKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8KCBzZi5sZW5ndGggPDUgPyBzZi5sZW5ndGg6NSk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0W2ldID0gc2ZbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1hY2hpbmVOb3coKSB7XHJcbiAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvbmFtZS8nICsgdXJsW3VybC5sZW5ndGggLTEgXSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPjAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lTmFtZSA9IG5hbWVbMF1bJ05BTUUnXTsgICBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZU5hbWUgPSBcIkVycm9yIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvYWN0dWFsLycrdXJsW3VybC5sZW5ndGggLTFdKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkFjdHVhbCA9IG5hbWVbMF1bJ1ByT2RJZCddO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vZk9wciA9IG5hbWVbMF1bJ09wck51bSddO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vZlN0YXRlID0gbmFtZVswXVsnTGFzdFRpbWVKb2JUeXBlJ107XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvb2YvZGVzYy8nICsgbmFtZVswXVsnUHJPZElkJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRlc2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkRlc2NyaXB0aW9uID0gZGVzY1swXVsnSXRlbURlc2MnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvc2xpdC8nK25hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihxdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZVswXVsnT3ByTnVtJ10gPT0gMTAgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgkc2NvcGUubWFjaGluZU5hbWUgIT0gJ0lOS01BS0VSJyAgJiYgJHNjb3BlLm1hY2hpbmVOYW1lICE9ICdOT01BTidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgJHNjb3BlLm1hY2hpbmVOYW1lICE9ICdNQU4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIElmIE9GIGlzIGluIHN0YXRlIDEwIG9yIG1hY2hpbmUgaWQgaXMgZGlmZXJlbnQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZiBJTktNQUtFUiB3ZSBuZWVkIGZpbmQgb3V0IHF1YW50aXR5IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYW5vdGhlciB0YWJsZTogUHJPZEJPTVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3ByaW50ZXIvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZlF0eVBsYW5uZWQgPSBxWzBdWydxdWFudGl0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mUXR5UGxhbm5lZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZRdHlQbGFubmVkID0gcXR5WzBdWydPcmRlclF0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9jb21wbGV0ZWQvJytuYW1lWzBdWydQck9kSWQnXSsnLycrbmFtZVswXVsnT3ByTnVtJ10rJy8nICArdXJsW3VybC5sZW5ndGggLTFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXAubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkNvbXBsZXRlZCA9IGNvbXBbMF1bJ1N0a1F0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQ29tcGxldGVkUGVyY2VudCA9IGNvbXBbMF1bJ1N0a1F0eSddKjEwMC9xdHlbMF1bJ09yZGVyUXR5J107ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbWFjaGluZU5vdygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRpbnRlcnZhbChtYWNoaW5lTm93LDYwMDAwKTtcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ2hvbWVDb250cm9sbGVyJyAsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFjaGluZVJlZ3VsYXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJHN0YXRlUGFyYW1zLCAkbG9jYXRpb24sICRzdGF0ZSwgJGludGVydmFsLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJHEsIGRyaXZlclNydiwgbWFjaGluZVN0YXRlU3J2LHN1cGVydmlzb3JTcnYsb2ZTcnYpIHtcclxuICAgICAgICB2YXIgbWFjaGluZSA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICAkc2NvcGUubWFjaGluZUluZm8gPSB7fTtcclxuICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IFtdO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5nb0JpZ1NjcmVlbiA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IGRyaXZlclNydi5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKHN0YXRlLmlkLHsnaWQnOnN0YXRlLnBhcmFtfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1hY2hpbmVOb3coKSB7XHJcbiAgICAgICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZU9uZShtYWNoaW5lKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWFjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lSW5mbyA9IG1hY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvWydvZlN0YXRlJ10gPSBtYWNoaW5lU3RhdGVTcnYuZ2V0KG1hY2guc3RhdHVzKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWNoLnF1YW50aXR5UGxhbm5lZCAmJiBtYWNoLnF1YW50aXR5UGxhbm5lZCAhPSAwICYmIG1hY2gub2ZDb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZUluZm9bJ29mQ29tcGxldGVkUGVyY2VudCddID0gbWFjaC5vZkNvbXBsZXRlZCoxMDAvbWFjaC5xdWFudGl0eVBsYW5uZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lLycrbWFjaGluZSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF1eCA9IHNmO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdXhzZkZpcnN0ID0gW11cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8KCBzZi5sZW5ndGggPDEwID8gc2YubGVuZ3RoOjEwKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYXV4W2ldWydhdmFsaWFibGUnXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1eHNmRmlyc3RbaV0gPSBhdXhbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9mU3J2Lm1hdGVyaWFsQXZhbGlhYmxlKGF1eHNmRmlyc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXN0aWMgYXF1w61paWlpaWknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IGRkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBtYWNoaW5lTm93KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lc0FsbFRpbWVyID0gJGludGVydmFsKG1hY2hpbmVOb3csMTAwMDAwKTtcclxuICAgICAgICBcclxuICAgIH0pO1xyXG5cclxuICAgIC8qICAgIGEgUkVWSVNBUlxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogb2ZTcnYubWF0ZXJpYWxBdmFsaWFibGUoYXV4W2ldLk9GKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oYXZhbGlhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXZhbGlhYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGo9MDsgaiA8IGF2YWxpYWJsZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGF0YXRhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zZkZpcnN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZhbGlhYmxlW2pdWydBdmFsYWlibGUnXSA8PSAoYXZhbGlhYmxlW2pdWydSZXF1aXJlZFF0eSddLzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0W2ldWydhdmFsaWFibGUnXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoYXZhbGlhYmxlW2pdWydBdmFsYWlibGUnXSA+IChhdmFsaWFibGVbal1bJ1JlcXVpcmVkUXR5J10vMikpICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYXZhbGlhYmxlW2pdWydBdmFsYWlibGUnXSA8IGF2YWxpYWJsZVtqXVsnUmVxdWlyZWRRdHknXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF1eFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdFtpXVsnYXZhbGlhYmxlJ10gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5zZkZpcnN0W2ldWydhdmFsaWFibGUnXSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdFtpXVsnYXZhbGlhYmxlJ10gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAqLyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21hY2hpbmVzUmVndWxhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCBzdXBlcnZpc29yU3J2LCBtYWNoaW5lU3RhdGVTcnYsICRzdGF0ZVBhcmFtcywgJGxvY2F0aW9uLCAkc3RhdGUsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRtZFNpZGVuYXYsIGRyaXZlclNydikge1xyXG4gICAgICAgIHZhciBtYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgIHZhciBtYWNoaW5lcyA9IFtdO1xyXG4gICAgICAgIHZhciBpbnRlcnZhbE1hY2hpbmVzO1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lcyA9IFtdO1xyXG5cclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQobG9jYXRlKTtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChkcml2ZXJTcnYuZ2V0KCkpIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3JNYWNoaW5lJyx7J2lkJzpkcml2ZXJTcnYuZ2V0KCl9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAkc2NvcGUuZ28gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lLCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lUmVndWxhcicseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb0JpZ1NjcmVlbiA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUsJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZScseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICBcclxuXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1hY2hpbmVOb3coKSB7XHJcbiAgICAgICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXNBbGwoJHN0YXRlUGFyYW1zLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1hY2gpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtYWNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFjaC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lc1tpbmRleF0gPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzW2luZGV4XVsnb2ZTdGF0ZSddID0gbWFjaGluZVN0YXRlU3J2LmdldChlbGVtZW50LnN0YXR1cyk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQucXVhbnRpdHlQbGFubmVkICYmIGVsZW1lbnQucXVhbnRpdHlQbGFubmVkICE9IDAgJiYgZWxlbWVudC5vZkNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lc1tpbmRleF1bJ29mQ29tcGxldGVkUGVyY2VudCddID0gZWxlbWVudC5vZkNvbXBsZXRlZCoxMDAvZWxlbWVudC5xdWFudGl0eVBsYW5uZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBtYWNoaW5lTm93KCk7XHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lc0FsbFRpbWVyID0gJGludGVydmFsKG1hY2hpbmVOb3csNTAwMCk7XHJcbiAgICAgICAgXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdtYWluQ29udHJvbGxlcicgLCBmdW5jdGlvbigkc2NvcGUsJHJvb3RTY29wZSwgc3VwZXJ2aXNvclNydikge1xyXG4gICAgICAgICRzY29wZS5ib2R5U3R5bGUgPSAnJztcclxuICAgICAgICAkc2NvcGUuc2hvd01lbnUgPSB0cnVlO1xyXG4gICAgICAgICRzY29wZS5icmVhZGNydW1icyA9ICdob21lJztcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuJG9uKCdNYWNoaW5lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDaGFuZ2UgYm9keSBjb2xvcicpO1xyXG4gICAgICAgICAgICAkc2NvcGUuYm9keVN0eWxlID0gJ3ZpbG9iaU1hY2hpbmUnO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2hvd01lbnUgPSBmYWxzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmJja2dybmRUaGVtZSA9ICdtYWNoaW5lJztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZU91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuYm9keVN0eWxlID0gJyc7IFxyXG4gICAgICAgICAgICAkc2NvcGUuc2hvd01lbnUgPSB0cnVlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYmNrZ3JuZFRoZW1lID0gJ2RlZmF1bHQnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICAgICAkc2NvcGUuYnJlYWRjcnVtYnMgPSB0b1N0YXRlLm5hbWU7XHJcbiAgICAgICAgICAgIHN1cGVydmlzb3JTcnYua2lsbFRpbWVycygpO1xyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICRyb290U2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBkcml2ZXJTcnYuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0hPTEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUEhJylcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZS5pZCx7J2lkJzpzdGF0ZS5wYXJhbX0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdtZW51Q29udHJvbGxlcicsIGZ1bmN0aW9uIChcclxuICAgICAgICAgICAgJHNjb3BlLFxyXG4gICAgICAgICAgICAkbWRTaWRlbmF2LFxyXG4gICAgICAgICAgICAkdGltZW91dCxcclxuICAgICAgICAgICAgJHJvb3RTY29wZSxcclxuICAgICAgICAgICAgJHN0YXRlLFxyXG4gICAgICAgICAgICBzc1NpZGVOYXYsXHJcbiAgICAgICAgICAgIHNzU2lkZU5hdlNoYXJlZFNlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkc2NvcGUubWFjaGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYnJlYWRDcnVtYnMgPSAgJHN0YXRlLmN1cnJlbnQuYnJlYWRDcnVtYnM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkc2NvcGUub25DbGlja01lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCdNYWNoaW5lJyxmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lID0gdHJ1ZTsgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCdNYWNoaW5lT3V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJHNjb3BlLm1lbnUgPSBzc1NpZGVOYXY7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcyl7IFxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5icmVhZENydW1icyA9IHRvU3RhdGUuYnJlYWRDcnVtYnM7XHJcbiAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignc3VwZXJNYWNoaW5lQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgc3VwZXJ2aXNvclNydiwgZHJpdmVyU3J2LCAkc3RhdGVQYXJhbXMsJHN0YXRlKSB7XHJcbiAgICAgICAgJHNjb3BlLm1hY2hpbmUgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgJHNjb3BlLmdvID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lLCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmVSZWd1bGFyJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgJHNjb3BlLmdvQmlnU2NyZWVuID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lLCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXMoJHN0YXRlUGFyYW1zLmlkKVxyXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtYWNoaW5lcykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzID0gbWFjaGluZXM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignc3VwZXJ2aXNvckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsc3VwZXJ2aXNvclNydiwgZHJpdmVyU3J2LCRzdGF0ZSkge1xyXG4gICAgICAgICRzY29wZS5nbyA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KGxvY2F0ZSk7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3JNYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5nb0dlbmVyYWwgPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldChsb2NhdGUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc3RhdGUuY3VycmVudC5uYW1lKTtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lc1JlZ3VsYXInLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5kZXBhcnRhbWVudHMoKVxyXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXB0cykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmRlcHRzID0gZGVwdHM7XHJcbiAgICAgICAgICAgICAgICBkZXB0cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lcyhlbGVtZW50LldDR3JvdXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRlcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kZXB0c1tpbmRleF1bJ21hY2hpbmVzJ10gPSBkZXB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmRpcmVjdGl2ZSgnc2ZDbG9jaycsIGZ1bmN0aW9uICgkaW50ZXJ2YWwsIGRhdGVGaWx0ZXIpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICB2YXIgc3RvcFRpbWU7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWUoKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnRleHQoZGF0ZUZpbHRlcihuZXcgRGF0ZSgpLCAnZGQvTU0veXl5eSBISDptbTpzcycpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3RvcFRpbWUgPSAkaW50ZXJ2YWwoZnVuY3Rpb24oKSB7IHVwZGF0ZVRpbWUoKX0sIDEwMDApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWxlbWVudC5vbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoc3RvcFRpbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KSIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLnNlcnZpY2UoJ2RyaXZlclNydicsIGZ1bmN0aW9uKCRodHRwKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0SWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGFzdFN0YXRlID0gW11cclxuICAgICBcclxuICAgICAgICB0aGlzLnNldCA9IGZ1bmN0aW9uKGxhc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0SWQgPSBsYXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0SWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUgPSBmdW5jdGlvbihsYXN0LHBhcmFtKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFN0YXRlLnB1c2goeydpZCc6bGFzdCwncGFyYW0nOnBhcmFtfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0U3RhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdFN0YXRlLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLnNlcnZpY2UoJ21hY2hpbmVTdGF0ZVNydicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oc3RhdGUpIHtcclxuICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGF1eCA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoIXN0YXRlKSBzdGF0ZT0nJztcclxuICAgICAgICAgICAgc3dpdGNoIChzdGF0ZS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0Rvd24nOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ1BhcmF0JztcclxuICAgICAgICAgICAgICAgICAgICBhdXguaWNvbiA9ICdpY190aHVtYl9kb3duX2JsYWNrXzE4cHguc3ZnJztcclxuICAgICAgICAgICAgICAgICAgICBhdXgudGhlbWUgPSAnZG93bidcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1B1bGwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ1BVTEwnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX2dldF9hcHBfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdwdWxsJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnTkNEb3duJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdwYXJhdCBzZW5zZSBjYXJyZWMnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX3N5bmNfZGlzYWJsZWRfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICduY2Rvd24nXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQgb2YgT3BlcmF0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdmaW5hbCBvcGVyYWNpw7MnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX2RvbmVfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdlbmQnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdTZXR1cCc6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAnbWFudGVuaW1lbnQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX2J1aWxkX2JsYWNrXzE4cHguc3ZnJztcclxuICAgICAgICAgICAgICAgICAgICBhdXgudGhlbWUgPSAnc2V0dXAnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdQcm9jZXNzJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdlbiBwcm9jw6lzJztcclxuICAgICAgICAgICAgICAgICAgICBhdXguaWNvbiA9ICdpY19sb29wX2JsYWNrXzE4cHguc3ZnJztcclxuICAgICAgICAgICAgICAgICAgICBhdXgudGhlbWUgPSAncHJvY2VzcydcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4ID0geyduYW1lJzonZGVzY29uZWd1dCcsJ2ljb24nOidpY19lcnJvcl9ibGFja18xOHB4LnN2ZycsICd0aGVtZScgOiAnZXJyb3InfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLnNlcnZpY2UoJ29mU3J2JywgZnVuY3Rpb24oJGh0dHAsICRxKSB7XHJcbiAgICAgICAgdmFyIHVybEJhc2UgPSAnLi4vLi4vYXBpL2JvbS8nO1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbEF2YWxpYWJsZSA9IGZ1bmN0aW9uKG9mcykge1xyXG4gICAgICAgICAgICB2YXIgYXV4Q291bnQgPSAxO1xyXG4gICAgICAgICAgICBvZnMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICRodHRwLmdldCh1cmxCYXNlICsgZWxlbWVudC5PRilcclxuICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihib20pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF1eEF2YWxpYWJsZT0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib20ubGVuZ3RoID09IDAgKSBkZWZlcnJlZC5yZXNvbHZlKFt7J0F2YWxhaWJsZSc6MiwnaXRlbUlkJzonJ31dKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib20uZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdXhCb20gPSB7J2l0ZW1JZCcgOiBlbGVtZW50WydJdGVtSWQnXSwgJ2F2YWxpYWJsZScgOiAwfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50WydSZXF1aXJlZFF0eSddIDw9IGVsZW1lbnRbJ0F2YWxhaWJsZSddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Qm9tWydhdmFsaWFibGUnXSA9ICAyOyAgLy8gU2VtYWZvciB2ZXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnRbJ1JlcXVpcmVkUXR5J10gPiBlbGVtZW50WydBdmFsYWlibGUnXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydSZXF1aXJlZFF0eSddIDw9IChlbGVtZW50WydBdmFsYWlibGUnXS8yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eEJvbVsnYXZhbGlhYmxlJ10gPSAgMTsgIC8vIFNlbWFmb3IgdGFyb25qYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4QXZhbGlhYmxlLnB1c2goYXV4Qm9tKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XVsnYXZhbGlhYmxlJ10gPSBhdXhBdmFsaWFibGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK2F1eENvdW50ID09IGFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShhcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmZhY3RvcnkoJ3N1cGVydmlzb3JTcnYnLCBmdW5jdGlvbigkaHR0cCwgJGludGVydmFsKSB7XHJcbiAgICAgICAgdmFyIHVybEJhc2UgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdCc7XHJcbiAgICAgICAgdmFyIGRlcHRBbGwgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdGFsbCc7XHJcbiAgICAgICAgdmFyIGRlcHRPbmUgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdG9uZSc7XHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5kZXBhcnRhbWVudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmxCYXNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lcyA9IGZ1bmN0aW9uKGRlcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmxCYXNlKycvJytkZXB0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lc0FsbCA9IGZ1bmN0aW9uKGRlcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChkZXB0QWxsICsgJy8nICsgZGVwdClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lT25lID0gZnVuY3Rpb24obWFjaCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkZXB0T25lICsgJy8nICsgbWFjaCk7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoZGVwdE9uZSArICcvJyArIG1hY2gpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFjaGluZXNBbGxUaW1lcj0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5raWxsVGltZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hY2hpbmVzQWxsVGltZXIpXHJcbiAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHRoaXMubWFjaGluZXNBbGxUaW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
