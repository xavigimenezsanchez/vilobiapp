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
        /* Semaphor theming */
        $mdThemingProvider.theme('semaphorRed')
            .primaryPalette('red')
            .backgroundPalette('red',{
                'default' : '100'
            })
            .dark();
        $mdThemingProvider.theme('semaphorOrange')
            .primaryPalette('orange')
            .backgroundPalette('orange',{
                'default' : '100'
            })
            .dark();
        $mdThemingProvider.theme('semaphorGreen')
            .primaryPalette('green')
            .backgroundPalette('green',{
                'default' : '100'
            })
            .dark();

        $mdThemingProvider.alwaysWatchTheme(true);
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
            })
            .state('common.material' , {
                url             :   '/material/:id',
                templateUrl    :   '/templates/material.html',
                controller      :   'materialController',
                breadCrumbs : 'material'
            });
        
        
    })
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

        $scope.$on('WorkingOn', function() {
            $scope.working = true;
        });

        $scope.$on('WorkingOff', function() {
            $scope.working = false;
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
    .controller('materialController', function($scope, $http, $stateParams ,$state) {
        $scope.material = [];
        $scope.$emit('WorkingOn');
        $http.get('./api/material/'+$stateParams.id)
            .then(function(res) {
                var auxIndex = 0;
                res.data.forEach(function(ele,index, array) {
                    if (new Date(ele['DATASTART']) > Date.now() && ele['material'].length > 0) {
                        $scope.material[auxIndex++] = ele;
                    }
                });
                $scope.$emit('WorkingOff');

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
            driverSrv.setState($state.current.name);
            $state.go('common.machinesRegular',{'id':locate});
        };
        $scope.goMaterial = function(locate) {
            driverSrv.set(locate);
            driverSrv.setState($state.current.name);
            $state.go('common.material', {'id':locate});
        } 
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
        var deferred; // this variable will be the promise
     
        this.materialAvaliable = function(machine, ofs) {
            var auxCount = 1;
            deferred = $q.defer();
            ofs.forEach(function(element, index, array) {
                $http.get(urlBase + machine + '/' + element.OF)
                    .success(function(bom) {
                        var auxAvaliable= [];
                        if (bom.length == 0 ) auxAvaliable.push({'itemId':'No n\'hi ha', 'avaliable':3});
                        bom.forEach(function(element){
                            /** 
                             * According to "RequiredQty" and "Avalaible" relation
                             * set up the flag:
                             *          2.- green flag
                             *          1.- orange flag
                             *          0.- red flag
                             * */  
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
                        if (++auxCount > array.length) {
                            deferred.resolve(array);
                            
                        }
                    });
                
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
            return $http.get(deptOne + '/' + mach)
        }
        this.machinesAllTimer= null;

        this.killTimers = function() {
            if (this.machinesAllTimer)
                $interval.cancel(this.machinesAllTimer);
        }
        return this;
    });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1lbnUuY2ZnLmpzIiwidGhlbWUuY2ZnLmpzIiwidmlsb2JpLmNmZy5qcyIsImNvbnRyb2xsZXJzL2JpZ1NjcmVlbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZS5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFjaGluZVJlZ3VsYXIuY3RybC5qcyIsImNvbnRyb2xsZXJzL21hY2hpbmVzUmVndWxhci5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFpbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWF0ZXJpYWwuY3RybC5qcyIsImNvbnRyb2xsZXJzL21lbnUuY3RybC5qcyIsImNvbnRyb2xsZXJzL3N1cGVyTWFjaGluZS5jdHJsLmpzIiwiY29udHJvbGxlcnMvc3VwZXJ2aXNvci5jdHJsLmpzIiwiZGlyZWN0aXZlcy9zZkNsb2NrLmpzIiwic2VydmljZXMvZHJpdmVyLnNydi5qcyIsInNlcnZpY2VzL21hY2hpbmVTdGF0ZS5zcnYuanMiLCJzZXJ2aWNlcy9vZlNlcnZlci5qcyIsInNlcnZpY2VzL3N1cGVydmlzb3Iuc3J2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RkE7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ2aWxvYmlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJyxbJ3VpLnJvdXRlcicsJ25nTWF0ZXJpYWwnLCdzYXNyaW8uYW5ndWxhci1tYXRlcmlhbC1zaWRlbmF2J10pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIsc3NTaWRlTmF2U2VjdGlvbnNQcm92aWRlcikge1xyXG4gICAgICAgIHNzU2lkZU5hdlNlY3Rpb25zUHJvdmlkZXIuaW5pdFdpdGhUaGVtZSgkbWRUaGVtaW5nUHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBzc1NpZGVOYXZTZWN0aW9uc1Byb3ZpZGVyLmluaXRXaXRoU2VjdGlvbnMoW3tcclxuICAgICAgICAgICAgICAgICAgICBpZDogICAgICAgICAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogICAgICAgJ0hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAgICAgICdjb21tb24uaG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogICAgICAgJ2xpbmsnXHJcbiAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogICAgICAgICAnU3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogICAgICAgJ1N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAgICAgICdjb21tb24uc3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogICAgICAgJ2xpbmsnXHJcbiAgICAgICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLWdyZXknKS5iYWNrZ3JvdW5kUGFsZXR0ZSgnZ3JleScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2Rhcmstb3JhbmdlJykuYmFja2dyb3VuZFBhbGV0dGUoJ29yYW5nZScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RhcmstcHVycGxlJykuYmFja2dyb3VuZFBhbGV0dGUoJ2RlZXAtcHVycGxlJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1ibHVlJykuYmFja2dyb3VuZFBhbGV0dGUoJ2JsdWUnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLXJlZCcpLmJhY2tncm91bmRQYWxldHRlKCdyZWQnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ29yYW5nZScpO1xyXG5cclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnbWFjaGluZVBhbGV0ZScsIHtcclxuICAgICAgICAgICAgJzUwJzogJ2ZmY2RkMicsXHJcbiAgICAgICAgICAgICAgICAnMTAwJzogJ2ZmY2RkMicsXHJcbiAgICAgICAgICAgICAgICAnMjAwJzogJ2VmOWE5YScsXHJcbiAgICAgICAgICAgICAgICAnMzAwJzogJ2U1NzM3MycsXHJcbiAgICAgICAgICAgICAgICAnNDAwJzogJ2VmNTM1MCcsXHJcbiAgICAgICAgICAgICAgICAnNTAwJzogJ2Y0NDMzNicsXHJcbiAgICAgICAgICAgICAgICAnNjAwJzogJ2U1MzkzNScsXHJcbiAgICAgICAgICAgICAgICAnNzAwJzogJ2QzMmYyZicsXHJcbiAgICAgICAgICAgICAgICAnODAwJzogJ2M2MjgyOCcsXHJcbiAgICAgICAgICAgICAgICAnOTAwJzogJ2I3MWMxYycsXHJcbiAgICAgICAgICAgICAgICAnQTEwMCc6ICcwMDAwMDAnLCAgLy8gQmFja2dyb3VuZCBDb2xvclxyXG4gICAgICAgICAgICAgICAgJ0EyMDAnOiAnZmY1MjUyJyxcclxuICAgICAgICAgICAgICAgICdBNDAwJzogJ2ZmMTc0NCcsXHJcbiAgICAgICAgICAgICAgICAnQTcwMCc6ICdkNTAwMDAnLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JywgICAgLy8gd2hldGhlciwgYnkgZGVmYXVsdCwgdGV4dCAoY29udHJhc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbiB0aGlzIHBhbGV0dGUgc2hvdWxkIGJlIGRhcmsgb3IgbGlnaHRcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbJzUwJywgJzEwMCcsIC8vaHVlcyB3aGljaCBjb250cmFzdCBzaG91bGQgYmUgJ2RhcmsnIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgICAgICcyMDAnLCAnMzAwJywgJzQwMCcsICdBMTAwJ10sXHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IHVuZGVmaW5lZCBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdtYWNoaW5lJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdtYWNoaW5lUGFsZXRlJyk7XHJcblxyXG5cclxuICAgICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnYnJlYWRjcnVtYnNQYWxldHRlTmFtZScsIHtcclxuICAgICAgICAgICAgICAgICc1MCc6ICdGRkZGRkYnLFxyXG4gICAgICAgICAgICAgICAgJzEwMCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzIwMCc6ICdlZjlhOWEnLFxyXG4gICAgICAgICAgICAgICAgJzMwMCc6ICdlNTczNzMnLFxyXG4gICAgICAgICAgICAgICAgJzQwMCc6ICdlZjUzNTAnLFxyXG4gICAgICAgICAgICAgICAgJzUwMCc6ICdmNDQzMzYnLFxyXG4gICAgICAgICAgICAgICAgJzYwMCc6ICdlNTM5MzUnLFxyXG4gICAgICAgICAgICAgICAgJzcwMCc6ICdkMzJmMmYnLFxyXG4gICAgICAgICAgICAgICAgJzgwMCc6ICdjNjI4MjgnLFxyXG4gICAgICAgICAgICAgICAgJzkwMCc6ICdiNzFjMWMnLFxyXG4gICAgICAgICAgICAgICAgJ0ExMDAnOiAnZmY4YTgwJyxcclxuICAgICAgICAgICAgICAgICdBMjAwJzogJ2ZmNTI1MicsXHJcbiAgICAgICAgICAgICAgICAnQTQwMCc6ICdmZjE3NDQnLFxyXG4gICAgICAgICAgICAgICAgJ0E3MDAnOiAnZDUwMDAwJyxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgIC8vIHdoZXRoZXIsIGJ5IGRlZmF1bHQsIHRleHQgKGNvbnRyYXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhpcyBwYWxldHRlIHNob3VsZCBiZSBkYXJrIG9yIGxpZ2h0XHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCAvL2h1ZXMgd2hpY2ggY29udHJhc3Qgc2hvdWxkIGJlICdkYXJrJyBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgICAgLy8gY291bGQgYWxzbyBzcGVjaWZ5IHRoaXMgaWYgZGVmYXVsdCB3YXMgJ2RhcmsnXHJcbiAgICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2JyZWFkY3J1bWJzJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdicmVhZGNydW1ic1BhbGV0dGVOYW1lJywge1xyXG4gICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiAnNTAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgncHJvY2VzcycpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnZ3JlZW4nKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3NldHVwJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdhbWJlcicpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgncHVsbCcpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnYmx1ZScpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZW5kJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdyZWQnKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ25jZG93bicpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnb3JhbmdlJyk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkb3duJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdkZWVwLW9yYW5nZScpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZXJyb3InKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2dyZXknKTtcclxuICAgICAgICAvKiBTZW1hcGhvciB0aGVtaW5nICovXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdzZW1hcGhvclJlZCcpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgncmVkJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdyZWQnLHtcclxuICAgICAgICAgICAgICAgICdkZWZhdWx0JyA6ICcxMDAnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdzZW1hcGhvck9yYW5nZScpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnb3JhbmdlJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdvcmFuZ2UnLHtcclxuICAgICAgICAgICAgICAgICdkZWZhdWx0JyA6ICcxMDAnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdzZW1hcGhvckdyZWVuJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdncmVlbicpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnZ3JlZW4nLHtcclxuICAgICAgICAgICAgICAgICdkZWZhdWx0JyA6ICcxMDAnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5kYXJrKCk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5hbHdheXNXYXRjaFRoZW1lKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL1wiKTtcclxuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnLyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24nICx7XHJcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL19jb21tb24uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWVudUNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLmhvbWUnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAndGVtcGxhdGVzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnaG9tZSdcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLm1hY2hpbmUnICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL21hY2hpbmUvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9tYWNoaW5lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnYml0U2NyZWVuQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdtYWNoaW5lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5tYWNoaW5lUmVndWxhcicgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvbWFjaGluZVJlZ3VsYXIvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9tYWNoaW5lUmVndWxhci5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ21hY2hpbmVSZWd1bGFyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdtYWNoaW5lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5tYWNoaW5lc1JlZ3VsYXInICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL21hY2hpbmVzUmVndWxhci86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL21hY2hpbmVzUmVndWxhci5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ21hY2hpbmVzUmVndWxhckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnbWFjaGluZXMnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLnN1cGVydmlzb3InICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL3N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL3N1cGVydmlzb3IyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnc3VwZXJ2aXNvckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnc3VwZXJ2aXNvcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL3N1cGVydmlzb3IvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9zdXBlcnZpc29yTWFjaGluZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ3N1cGVyTWFjaGluZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnZGV0YWxsIHN1cGVydmlzb3InXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLm1hdGVyaWFsJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9tYXRlcmlhbC86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL21hdGVyaWFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnbWF0ZXJpYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ21hdGVyaWFsJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH0pIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignYml0U2NyZWVuQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRzdGF0ZVBhcmFtcywgb2ZTcnYgLCBtYWNoaW5lU3RhdGVTcnYgLGRyaXZlclNydiwgJGxvY2F0aW9uLCAkc3RhdGUsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRtZFNpZGVuYXYsIHN1cGVydmlzb3JTcnYgKSB7XHJcbiAgICAgICAgdmFyIHVybCA9ICRsb2NhdGlvbi5hYnNVcmwoKS5zcGxpdCgnLycpO1xyXG4gICAgICAgIHZhciBtYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lSW5mbyA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zZkZpcnN0ID1bXTtcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZU91dCcpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZU91dCcpO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBkcml2ZXJTcnYuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZS5pZCx7J2lkJzpzdGF0ZS5wYXJhbX0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICBcclxuICAgICAgICBmdW5jdGlvbiBtYWNoaW5lTm93MigpIHtcclxuICAgICAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lT25lKG1hY2hpbmUpXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtYWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvID0gbWFjaDtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZUluZm9bJ29mU3RhdGUnXSA9IG1hY2hpbmVTdGF0ZVNydi5nZXQobWFjaC5zdGF0dXMpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hY2gucXVhbnRpdHlQbGFubmVkICYmIG1hY2gucXVhbnRpdHlQbGFubmVkICE9IDAgJiYgbWFjaC5vZkNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lSW5mb1snb2ZDb21wbGV0ZWRQZXJjZW50J10gPSBtYWNoLm9mQ29tcGxldGVkKjEwMC9tYWNoLnF1YW50aXR5UGxhbm5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdldE5leHRPRigpO1xyXG4gICAgICAgICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXROZXh0T0YoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvJyttYWNoaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oc2YpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXV4ID0gc2Y7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF1eHNmRmlyc3QgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250U0YgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ID0wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvbnQgPCA2ICYmIGNvbnRTRiA8IHNmLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGF1eFtjb250U0ZdWydEQVRBU1RBUlQnXSkgPiBEYXRlLm5vdygpICYmICRzY29wZS5tYWNoaW5lSW5mby5vZiAhPSBhdXhbY29udFNGXVsnT0YnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4c2ZGaXJzdFtjb250KytdID0gYXV4W2NvbnRTRisrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRTRisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3QgPSBhdXhzZkZpcnN0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZlNydi5tYXRlcmlhbEF2YWxpYWJsZSgkc2NvcGUubWFjaGluZUluZm8uaWQsIGF1eHNmRmlyc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRkMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGQyLmZvckVhY2goZnVuY3Rpb24oZWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS5hdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5hdmFsaWFibGUuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlbGVtZW50LmF2YWxpYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnc2VtYXBob3JSZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnc2VtYXBob3JPcmFuZ2UnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnc2VtYXBob3JHcmVlbic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3QgPSBkZDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgbWFjaGluZU5vdzIoKTsgIFxyXG4gICAgICAgICRpbnRlcnZhbChtYWNoaW5lTm93MiwxMDAwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcblxyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInICwgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdtYWNoaW5lUmVndWxhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGVQYXJhbXMsICRsb2NhdGlvbiwgJHN0YXRlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkcSwgZHJpdmVyU3J2LCBtYWNoaW5lU3RhdGVTcnYsc3VwZXJ2aXNvclNydixvZlNydikge1xyXG4gICAgICAgIHZhciBtYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lSW5mbyA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zZkZpcnN0ID0gW107XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmdvQmlnU2NyZWVuID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQoJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlID0gZHJpdmVyU3J2LmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUuaWQseydpZCc6c3RhdGUucGFyYW19KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdXb3JraW5nT24nKTtcclxuICAgICAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lT25lKG1hY2hpbmUpXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtYWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvID0gbWFjaDtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZUluZm9bJ29mU3RhdGUnXSA9IG1hY2hpbmVTdGF0ZVNydi5nZXQobWFjaC5zdGF0dXMpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hY2gucXVhbnRpdHlQbGFubmVkICYmIG1hY2gucXVhbnRpdHlQbGFubmVkICE9IDAgJiYgbWFjaC5vZkNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lSW5mb1snb2ZDb21wbGV0ZWRQZXJjZW50J10gPSBtYWNoLm9mQ29tcGxldGVkKjEwMC9tYWNoLnF1YW50aXR5UGxhbm5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdldE5leHRPRigpO1xyXG4gICAgICAgICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXROZXh0T0YoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS8nK21hY2hpbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXV4ID0gc2Y7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXV4c2ZGaXJzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udFNGID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ID0wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSB0cnVlOyAvL1RoaXMgTXVzdCBiZSBmYWxzZSwgYnV0IGZvciB0ZXN0IHJlYXNvbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChjb250IDwgMTUgJiYgY29udFNGIDwgc2YubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkc2NvcGUubWFjaGluZUluZm8ub2YgPT0gYXV4W2NvbnRTRl1bJ09GJ10pIHN0YXJ0ID0gdHJ1ZTsgIC8vSSBoYXZlIHRvIHRlc3QsIG5vdyBpcyB1bmF2YWxpYWJsZSwgaXMgbGlrZSB0aGlzIG5vdCBleGlzdHMsIGJlY2F1c2UgYWx3YXlzIGlzIHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3IERhdGUoYXV4W2NvbnRTRl1bJ0RBVEFTVEFSVCddKSA+IERhdGUubm93KCkgJiYgJHNjb3BlLm1hY2hpbmVJbmZvLm9mICE9IGF1eFtjb250U0ZdWydPRiddICYmIHN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eHNmRmlyc3RbY29udCsrXSA9IGF1eFtjb250U0YrK107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udFNGKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0ID0gYXV4c2ZGaXJzdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZlNydi5tYXRlcmlhbEF2YWxpYWJsZSgkc2NvcGUubWFjaGluZUluZm8uaWQsYXV4c2ZGaXJzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihkZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZC5mb3JFYWNoKGZ1bmN0aW9uKGVsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS5hdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmF2YWxpYWJsZS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZWxlbWVudC5hdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XVsnc2VtYXBob3InXSA9ICdzZW1hcGhvclJlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XVsnc2VtYXBob3InXSA9ICdzZW1hcGhvck9yYW5nZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XVsnc2VtYXBob3InXSA9ICdzZW1hcGhvckdyZWVuJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3QgPSBkZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdXb3JraW5nT2ZmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG1hY2hpbmVOb3coKTtcclxuICAgICAgICBcclxuICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzQWxsVGltZXIgPSAkaW50ZXJ2YWwobWFjaGluZU5vdywxMDAwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgLyogICAgYSBSRVZJU0FSXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBvZlNydi5tYXRlcmlhbEF2YWxpYWJsZShhdXhbaV0uT0YpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihhdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhdmFsaWFibGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaj0wOyBqIDwgYXZhbGlhYmxlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXRhdGEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNmRmlyc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdmFsaWFibGVbal1bJ0F2YWxhaWJsZSddIDw9IChhdmFsaWFibGVbal1bJ1JlcXVpcmVkUXR5J10vMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3RbaV1bJ2F2YWxpYWJsZSddID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChhdmFsaWFibGVbal1bJ0F2YWxhaWJsZSddID4gKGF2YWxpYWJsZVtqXVsnUmVxdWlyZWRRdHknXS8yKSkgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhdmFsaWFibGVbal1bJ0F2YWxhaWJsZSddIDwgYXZhbGlhYmxlW2pdWydSZXF1aXJlZFF0eSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXV4W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0W2ldWydhdmFsaWFibGUnXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLnNmRmlyc3RbaV1bJ2F2YWxpYWJsZSddICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0W2ldWydhdmFsaWFibGUnXSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICovIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFjaGluZXNSZWd1bGFyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsIHN1cGVydmlzb3JTcnYsIG1hY2hpbmVTdGF0ZVNydiwgJHN0YXRlUGFyYW1zLCAkbG9jYXRpb24sICRzdGF0ZSwgJGludGVydmFsLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgZHJpdmVyU3J2KSB7XHJcbiAgICAgICAgdmFyIG1hY2hpbmUgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgdmFyIG1hY2hpbmVzID0gW107XHJcbiAgICAgICAgdmFyIGludGVydmFsTWFjaGluZXM7XHJcbiAgICAgICAgJHNjb3BlLm1hY2hpbmVzID0gW107XHJcblxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldChsb2NhdGUpO1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGRyaXZlclNydi5nZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnLHsnaWQnOmRyaXZlclNydi5nZXQoKX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICRzY29wZS5nbyA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUsJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmVSZWd1bGFyJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmlnU2NyZWVuID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSwkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lc0FsbCgkc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWFjaCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1hY2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWNoLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCxpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzW2luZGV4XSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXNbaW5kZXhdWydvZlN0YXRlJ10gPSBtYWNoaW5lU3RhdGVTcnYuZ2V0KGVsZW1lbnQuc3RhdHVzKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5xdWFudGl0eVBsYW5uZWQgJiYgZWxlbWVudC5xdWFudGl0eVBsYW5uZWQgIT0gMCAmJiBlbGVtZW50Lm9mQ29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzW2luZGV4XVsnb2ZDb21wbGV0ZWRQZXJjZW50J10gPSBlbGVtZW50Lm9mQ29tcGxldGVkKjEwMC9lbGVtZW50LnF1YW50aXR5UGxhbm5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG1hY2hpbmVOb3coKTtcclxuICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzQWxsVGltZXIgPSAkaW50ZXJ2YWwobWFjaGluZU5vdyw1MDAwKTtcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJyAsIGZ1bmN0aW9uKCRzY29wZSwkcm9vdFNjb3BlLCBzdXBlcnZpc29yU3J2KSB7XHJcbiAgICAgICAgJHNjb3BlLmJvZHlTdHlsZSA9ICcnO1xyXG4gICAgICAgICRzY29wZS5zaG93TWVudSA9IHRydWU7XHJcbiAgICAgICAgJHNjb3BlLmJyZWFkY3J1bWJzID0gJ2hvbWUnO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS4kb24oJ01hY2hpbmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NoYW5nZSBib2R5IGNvbG9yJyk7XHJcbiAgICAgICAgICAgICRzY29wZS5ib2R5U3R5bGUgPSAndmlsb2JpTWFjaGluZSc7XHJcbiAgICAgICAgICAgICRzY29wZS5zaG93TWVudSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYmNrZ3JuZFRoZW1lID0gJ21hY2hpbmUnO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuJG9uKCdNYWNoaW5lT3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ib2R5U3R5bGUgPSAnJzsgXHJcbiAgICAgICAgICAgICRzY29wZS5zaG93TWVudSA9IHRydWU7XHJcbiAgICAgICAgICAgICRzY29wZS5iY2tncm5kVGhlbWUgPSAnZGVmYXVsdCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbignV29ya2luZ09uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS53b3JraW5nID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbignV29ya2luZ09mZicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUud29ya2luZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmJyZWFkY3J1bWJzID0gdG9TdGF0ZS5uYW1lO1xyXG4gICAgICAgICAgICBzdXBlcnZpc29yU3J2LmtpbGxUaW1lcnMoKTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gZHJpdmVyU3J2LmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIT0xBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBIScpXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUuaWQseydpZCc6c3RhdGUucGFyYW19KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWF0ZXJpYWxDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJHN0YXRlUGFyYW1zICwkc3RhdGUpIHtcclxuICAgICAgICAkc2NvcGUubWF0ZXJpYWwgPSBbXTtcclxuICAgICAgICAkc2NvcGUuJGVtaXQoJ1dvcmtpbmdPbicpO1xyXG4gICAgICAgICRodHRwLmdldCgnLi9hcGkvbWF0ZXJpYWwvJyskc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF1eEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIHJlcy5kYXRhLmZvckVhY2goZnVuY3Rpb24oZWxlLGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXcgRGF0ZShlbGVbJ0RBVEFTVEFSVCddKSA+IERhdGUubm93KCkgJiYgZWxlWydtYXRlcmlhbCddLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hdGVyaWFsW2F1eEluZGV4KytdID0gZWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdXb3JraW5nT2ZmJyk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWVudUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoXHJcbiAgICAgICAgICAgICRzY29wZSxcclxuICAgICAgICAgICAgJG1kU2lkZW5hdixcclxuICAgICAgICAgICAgJHRpbWVvdXQsXHJcbiAgICAgICAgICAgICRyb290U2NvcGUsXHJcbiAgICAgICAgICAgICRzdGF0ZSxcclxuICAgICAgICAgICAgc3NTaWRlTmF2LFxyXG4gICAgICAgICAgICBzc1NpZGVOYXZTaGFyZWRTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmJyZWFkQ3J1bWJzID0gICRzdGF0ZS5jdXJyZW50LmJyZWFkQ3J1bWJzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLm9uQ2xpY2tNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZScsZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZSA9IHRydWU7ICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZU91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICRzY29wZS5tZW51ID0gc3NTaWRlTmF2O1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpeyBcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYnJlYWRDcnVtYnMgPSB0b1N0YXRlLmJyZWFkQ3J1bWJzO1xyXG4gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3N1cGVyTWFjaGluZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsIHN1cGVydmlzb3JTcnYsIGRyaXZlclNydiwgJHN0YXRlUGFyYW1zLCRzdGF0ZSkge1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICRzY29wZS5nbyA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSwkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lUmVndWxhcicseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICRzY29wZS5nb0JpZ1NjcmVlbiA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSwkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGVtaXQoJ01hY2hpbmUnKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZScseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzKCRzdGF0ZVBhcmFtcy5pZClcclxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWFjaGluZXMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lcyA9IG1hY2hpbmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3N1cGVydmlzb3JDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLHN1cGVydmlzb3JTcnYsIGRyaXZlclNydiwkc3RhdGUpIHtcclxuICAgICAgICAkc2NvcGUuZ28gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldChsb2NhdGUpO1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yTWFjaGluZScseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuZ29HZW5lcmFsID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQobG9jYXRlKTtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lc1JlZ3VsYXInLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLmdvTWF0ZXJpYWwgPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldChsb2NhdGUpO1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hdGVyaWFsJywgeydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBzdXBlcnZpc29yU3J2LmRlcGFydGFtZW50cygpXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRlcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGVwdHMgPSBkZXB0cztcclxuICAgICAgICAgICAgICAgIGRlcHRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzKGVsZW1lbnQuV0NHcm91cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVwdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlcHRzW2luZGV4XVsnbWFjaGluZXMnXSA9IGRlcHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuZGlyZWN0aXZlKCdzZkNsb2NrJywgZnVuY3Rpb24gKCRpbnRlcnZhbCwgZGF0ZUZpbHRlcikge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBzdG9wVGltZTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGltZSgpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQudGV4dChkYXRlRmlsdGVyKG5ldyBEYXRlKCksICdkZC9NTS95eXl5IEhIOm1tOnNzJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdG9wVGltZSA9ICRpbnRlcnZhbChmdW5jdGlvbigpIHsgdXBkYXRlVGltZSgpfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbGVtZW50Lm9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChzdG9wVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuc2VydmljZSgnZHJpdmVyU3J2JywgZnVuY3Rpb24oJGh0dHApIHtcclxuICAgICAgICB0aGlzLmxhc3RJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0U3RhdGUgPSBbXVxyXG4gICAgIFxyXG4gICAgICAgIHRoaXMuc2V0ID0gZnVuY3Rpb24obGFzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RJZCA9IGxhc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSA9IGZ1bmN0aW9uKGxhc3QscGFyYW0pIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U3RhdGUucHVzaCh7J2lkJzpsYXN0LCdwYXJhbSc6cGFyYW19KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0U3RhdGUucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuc2VydmljZSgnbWFjaGluZVN0YXRlU3J2JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbihzdGF0ZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYXV4ID0ge307XHJcbiAgICAgICAgICAgIGlmICghc3RhdGUpIHN0YXRlPScnO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnRG93bic6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAnUGFyYXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX3RodW1iX2Rvd25fYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdkb3duJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnUHVsbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAnUFVMTCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfZ2V0X2FwcF9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ3B1bGwnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdOQ0Rvd24nOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ3BhcmF0IHNlbnNlIGNhcnJlYyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfc3luY19kaXNhYmxlZF9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ25jZG93bidcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCBvZiBPcGVyYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ2ZpbmFsIG9wZXJhY2nDsyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfZG9uZV9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ2VuZCdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1NldHVwJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdtYW50ZW5pbWVudCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfYnVpbGRfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdzZXR1cCdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1Byb2Nlc3MnOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ2VuIHByb2PDqXMnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX2xvb3BfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdwcm9jZXNzJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBhdXggPSB7J25hbWUnOidkZXNjb25lZ3V0JywnaWNvbic6J2ljX2Vycm9yX2JsYWNrXzE4cHguc3ZnJywgJ3RoZW1lJyA6ICdlcnJvcid9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhdXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuc2VydmljZSgnb2ZTcnYnLCBmdW5jdGlvbigkaHR0cCwgJHEpIHtcclxuICAgICAgICB2YXIgdXJsQmFzZSA9ICcuLi8uLi9hcGkvYm9tLyc7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkOyAvLyB0aGlzIHZhcmlhYmxlIHdpbGwgYmUgdGhlIHByb21pc2VcclxuICAgICBcclxuICAgICAgICB0aGlzLm1hdGVyaWFsQXZhbGlhYmxlID0gZnVuY3Rpb24obWFjaGluZSwgb2ZzKSB7XHJcbiAgICAgICAgICAgIHZhciBhdXhDb3VudCA9IDE7XHJcbiAgICAgICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgb2ZzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQodXJsQmFzZSArIG1hY2hpbmUgKyAnLycgKyBlbGVtZW50Lk9GKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGJvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXV4QXZhbGlhYmxlPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvbS5sZW5ndGggPT0gMCApIGF1eEF2YWxpYWJsZS5wdXNoKHsnaXRlbUlkJzonTm8gblxcJ2hpIGhhJywgJ2F2YWxpYWJsZSc6M30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib20uZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIEFjY29yZGluZyB0byBcIlJlcXVpcmVkUXR5XCIgYW5kIFwiQXZhbGFpYmxlXCIgcmVsYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHNldCB1cCB0aGUgZmxhZzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICAgICAgICAgIDIuLSBncmVlbiBmbGFnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAxLi0gb3JhbmdlIGZsYWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICAgICAgICAgIDAuLSByZWQgZmxhZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKi8gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF1eEJvbSA9IHsnaXRlbUlkJyA6IGVsZW1lbnRbJ0l0ZW1JZCddLCAnYXZhbGlhYmxlJyA6IDB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRbJ1JlcXVpcmVkUXR5J10gPD0gZWxlbWVudFsnQXZhbGFpYmxlJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXhCb21bJ2F2YWxpYWJsZSddID0gIDI7ICAvLyBTZW1hZm9yIHZlcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudFsnUmVxdWlyZWRRdHknXSA+IGVsZW1lbnRbJ0F2YWxhaWJsZSddICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ1JlcXVpcmVkUXR5J10gPD0gKGVsZW1lbnRbJ0F2YWxhaWJsZSddLzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Qm9tWydhdmFsaWFibGUnXSA9ICAxOyAgLy8gU2VtYWZvciB0YXJvbmphXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXhBdmFsaWFibGUucHVzaChhdXhCb20pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdWydhdmFsaWFibGUnXSA9IGF1eEF2YWxpYWJsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCsrYXV4Q291bnQgPiBhcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuZmFjdG9yeSgnc3VwZXJ2aXNvclNydicsIGZ1bmN0aW9uKCRodHRwLCAkaW50ZXJ2YWwpIHtcclxuICAgICAgICB2YXIgdXJsQmFzZSA9ICcuLi8uLi9hcGkvc3VwZXJ2aXNvci9kZXB0JztcclxuICAgICAgICB2YXIgZGVwdEFsbCA9ICcuLi8uLi9hcGkvc3VwZXJ2aXNvci9kZXB0YWxsJztcclxuICAgICAgICB2YXIgZGVwdE9uZSA9ICcuLi8uLi9hcGkvc3VwZXJ2aXNvci9kZXB0b25lJztcclxuICAgICBcclxuICAgICAgICB0aGlzLmRlcGFydGFtZW50cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHVybEJhc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hY2hpbmVzID0gZnVuY3Rpb24oZGVwdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHVybEJhc2UrJy8nK2RlcHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hY2hpbmVzQWxsID0gZnVuY3Rpb24oZGVwdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGRlcHRBbGwgKyAnLycgKyBkZXB0KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hY2hpbmVPbmUgPSBmdW5jdGlvbihtYWNoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoZGVwdE9uZSArICcvJyArIG1hY2gpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFjaGluZXNBbGxUaW1lcj0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5raWxsVGltZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hY2hpbmVzQWxsVGltZXIpXHJcbiAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHRoaXMubWFjaGluZXNBbGxUaW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
