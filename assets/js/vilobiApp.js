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
        
        /*
        $http.get('../../api/machine/'+url[url.length -1])
            .success(function(sf) {
                for (var i=0; i<( sf.length <5 ? sf.length:5); i++) {
                    $scope.sfFirst[i] = sf[i];
                }
            });
        */
        function machineNow2() {
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
                    /*
                    for (var i=0; i<( sf.length <10 ? sf.length:10); i++) {
                        //aux[i]['avaliable'] = 0;
                        auxsfFirst[i] = aux[i];
                    }
                    $scope.sfFirst = auxsfFirst;
                    */
                    
                    var contSF = 0;
                    var cont =0
                    while (cont < 6 && contSF < sf.length ) {
                        if (new Date(aux[contSF]['DATASTART']) > Date.now()) {
                            auxsfFirst[cont++] = aux[contSF++];
                        } else {
                            contSF++;
                        }
                        
                    }

                    $scope.sfFirst = auxsfFirst;

                    ofSrv.materialAvaliable(auxsfFirst)
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
        machineNow2();  
        $interval(machineNow2,100000);
        
    });



/*
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
          /*                              $http.get('../api/printer/' + name[0]['PrOdId'])
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

        */
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
                },function(err){
                        console.log(err);
                    });

             $http.get('../../api/machine/'+machine)
                .success(function(sf) {
                    var aux = sf;
                    var auxsfFirst = []
                    /*
                    for (var i=0; i<( sf.length <10 ? sf.length:10); i++) {
                        //aux[i]['avaliable'] = 0;
                        auxsfFirst[i] = aux[i];
                    }
                    $scope.sfFirst = auxsfFirst;
                    */
                    
                    var contSF = 0;
                    var cont =0
                    while (cont < 20 && contSF < sf.length ) {
                        if (new Date(aux[contSF]['DATASTART']) > Date.now()) {
                            auxsfFirst[cont++] = aux[contSF++];
                        } else {
                            contSF++;
                        }
                        
                    }

                    $scope.sfFirst = auxsfFirst;

                    ofSrv.materialAvaliable(auxsfFirst)
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
        var deferred; // this variable will be the promise
     
        this.materialAvaliable = function(ofs) {
            var auxCount = 1;
            deferred = $q.defer();
            ofs.forEach(function(element, index, array) {
                $http.get(urlBase + element.OF)
                    .success(function(bom) {
                        var auxAvaliable= [];
                        if (bom.length == 0 ) auxAvaliable.push({'itemId':'No hi ha', 'avaliable':3});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1lbnUuY2ZnLmpzIiwidGhlbWUuY2ZnLmpzIiwidmlsb2JpLmNmZy5qcyIsImNvbnRyb2xsZXJzL2JpZ1NjcmVlbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZS5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFjaGluZVJlZ3VsYXIuY3RybC5qcyIsImNvbnRyb2xsZXJzL21hY2hpbmVzUmVndWxhci5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFpbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWVudS5jdHJsLmpzIiwiY29udHJvbGxlcnMvc3VwZXJNYWNoaW5lLmN0cmwuanMiLCJjb250cm9sbGVycy9zdXBlcnZpc29yLmN0cmwuanMiLCJkaXJlY3RpdmVzL3NmQ2xvY2suanMiLCJzZXJ2aWNlcy9kcml2ZXIuc3J2LmpzIiwic2VydmljZXMvbWFjaGluZVN0YXRlLnNydi5qcyIsInNlcnZpY2VzL29mU2VydmVyLmpzIiwic2VydmljZXMvc3VwZXJ2aXNvci5zcnYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4SkE7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ2aWxvYmlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJyxbJ3VpLnJvdXRlcicsJ25nTWF0ZXJpYWwnLCdzYXNyaW8uYW5ndWxhci1tYXRlcmlhbC1zaWRlbmF2J10pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIsc3NTaWRlTmF2U2VjdGlvbnNQcm92aWRlcikge1xyXG4gICAgICAgIHNzU2lkZU5hdlNlY3Rpb25zUHJvdmlkZXIuaW5pdFdpdGhUaGVtZSgkbWRUaGVtaW5nUHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBzc1NpZGVOYXZTZWN0aW9uc1Byb3ZpZGVyLmluaXRXaXRoU2VjdGlvbnMoW3tcclxuICAgICAgICAgICAgICAgICAgICBpZDogICAgICAgICAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogICAgICAgJ0hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAgICAgICdjb21tb24uaG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogICAgICAgJ2xpbmsnXHJcbiAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogICAgICAgICAnU3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogICAgICAgJ1N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAgICAgICdjb21tb24uc3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogICAgICAgJ2xpbmsnXHJcbiAgICAgICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLWdyZXknKS5iYWNrZ3JvdW5kUGFsZXR0ZSgnZ3JleScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2Rhcmstb3JhbmdlJykuYmFja2dyb3VuZFBhbGV0dGUoJ29yYW5nZScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RhcmstcHVycGxlJykuYmFja2dyb3VuZFBhbGV0dGUoJ2RlZXAtcHVycGxlJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1ibHVlJykuYmFja2dyb3VuZFBhbGV0dGUoJ2JsdWUnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLXJlZCcpLmJhY2tncm91bmRQYWxldHRlKCdyZWQnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ29yYW5nZScpO1xyXG5cclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnbWFjaGluZVBhbGV0ZScsIHtcclxuICAgICAgICAgICAgJzUwJzogJ2ZmY2RkMicsXHJcbiAgICAgICAgICAgICAgICAnMTAwJzogJ2ZmY2RkMicsXHJcbiAgICAgICAgICAgICAgICAnMjAwJzogJ2VmOWE5YScsXHJcbiAgICAgICAgICAgICAgICAnMzAwJzogJ2U1NzM3MycsXHJcbiAgICAgICAgICAgICAgICAnNDAwJzogJ2VmNTM1MCcsXHJcbiAgICAgICAgICAgICAgICAnNTAwJzogJ2Y0NDMzNicsXHJcbiAgICAgICAgICAgICAgICAnNjAwJzogJ2U1MzkzNScsXHJcbiAgICAgICAgICAgICAgICAnNzAwJzogJ2QzMmYyZicsXHJcbiAgICAgICAgICAgICAgICAnODAwJzogJ2M2MjgyOCcsXHJcbiAgICAgICAgICAgICAgICAnOTAwJzogJ2I3MWMxYycsXHJcbiAgICAgICAgICAgICAgICAnQTEwMCc6ICcwMDAwMDAnLCAgLy8gQmFja2dyb3VuZCBDb2xvclxyXG4gICAgICAgICAgICAgICAgJ0EyMDAnOiAnZmY1MjUyJyxcclxuICAgICAgICAgICAgICAgICdBNDAwJzogJ2ZmMTc0NCcsXHJcbiAgICAgICAgICAgICAgICAnQTcwMCc6ICdkNTAwMDAnLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JywgICAgLy8gd2hldGhlciwgYnkgZGVmYXVsdCwgdGV4dCAoY29udHJhc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbiB0aGlzIHBhbGV0dGUgc2hvdWxkIGJlIGRhcmsgb3IgbGlnaHRcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbJzUwJywgJzEwMCcsIC8vaHVlcyB3aGljaCBjb250cmFzdCBzaG91bGQgYmUgJ2RhcmsnIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgICAgICcyMDAnLCAnMzAwJywgJzQwMCcsICdBMTAwJ10sXHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IHVuZGVmaW5lZCBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdtYWNoaW5lJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdtYWNoaW5lUGFsZXRlJyk7XHJcblxyXG5cclxuICAgICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnYnJlYWRjcnVtYnNQYWxldHRlTmFtZScsIHtcclxuICAgICAgICAgICAgICAgICc1MCc6ICdGRkZGRkYnLFxyXG4gICAgICAgICAgICAgICAgJzEwMCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzIwMCc6ICdlZjlhOWEnLFxyXG4gICAgICAgICAgICAgICAgJzMwMCc6ICdlNTczNzMnLFxyXG4gICAgICAgICAgICAgICAgJzQwMCc6ICdlZjUzNTAnLFxyXG4gICAgICAgICAgICAgICAgJzUwMCc6ICdmNDQzMzYnLFxyXG4gICAgICAgICAgICAgICAgJzYwMCc6ICdlNTM5MzUnLFxyXG4gICAgICAgICAgICAgICAgJzcwMCc6ICdkMzJmMmYnLFxyXG4gICAgICAgICAgICAgICAgJzgwMCc6ICdjNjI4MjgnLFxyXG4gICAgICAgICAgICAgICAgJzkwMCc6ICdiNzFjMWMnLFxyXG4gICAgICAgICAgICAgICAgJ0ExMDAnOiAnZmY4YTgwJyxcclxuICAgICAgICAgICAgICAgICdBMjAwJzogJ2ZmNTI1MicsXHJcbiAgICAgICAgICAgICAgICAnQTQwMCc6ICdmZjE3NDQnLFxyXG4gICAgICAgICAgICAgICAgJ0E3MDAnOiAnZDUwMDAwJyxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgIC8vIHdoZXRoZXIsIGJ5IGRlZmF1bHQsIHRleHQgKGNvbnRyYXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhpcyBwYWxldHRlIHNob3VsZCBiZSBkYXJrIG9yIGxpZ2h0XHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCAvL2h1ZXMgd2hpY2ggY29udHJhc3Qgc2hvdWxkIGJlICdkYXJrJyBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgICAgLy8gY291bGQgYWxzbyBzcGVjaWZ5IHRoaXMgaWYgZGVmYXVsdCB3YXMgJ2RhcmsnXHJcbiAgICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2JyZWFkY3J1bWJzJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdicmVhZGNydW1ic1BhbGV0dGVOYW1lJywge1xyXG4gICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiAnNTAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgncHJvY2VzcycpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnZ3JlZW4nKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3NldHVwJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdhbWJlcicpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgncHVsbCcpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnYmx1ZScpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZW5kJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdyZWQnKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ25jZG93bicpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnb3JhbmdlJyk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkb3duJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdkZWVwLW9yYW5nZScpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZXJyb3InKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2dyZXknKTtcclxuICAgICAgICAvKiBTZW1hcGhvciB0aGVtaW5nICovXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdzZW1hcGhvclJlZCcpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgncmVkJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdyZWQnLHtcclxuICAgICAgICAgICAgICAgICdkZWZhdWx0JyA6ICcxMDAnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdzZW1hcGhvck9yYW5nZScpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnb3JhbmdlJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdvcmFuZ2UnLHtcclxuICAgICAgICAgICAgICAgICdkZWZhdWx0JyA6ICcxMDAnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdzZW1hcGhvckdyZWVuJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdncmVlbicpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnZ3JlZW4nLHtcclxuICAgICAgICAgICAgICAgICdkZWZhdWx0JyA6ICcxMDAnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5kYXJrKCk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5hbHdheXNXYXRjaFRoZW1lKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL1wiKTtcclxuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnLyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24nICx7XHJcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL19jb21tb24uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWVudUNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLmhvbWUnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAndGVtcGxhdGVzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnaG9tZSdcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLm1hY2hpbmUnICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL21hY2hpbmUvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9tYWNoaW5lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnYml0U2NyZWVuQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdtYWNoaW5lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5tYWNoaW5lUmVndWxhcicgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvbWFjaGluZVJlZ3VsYXIvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9tYWNoaW5lUmVndWxhci5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ21hY2hpbmVSZWd1bGFyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdtYWNoaW5lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5tYWNoaW5lc1JlZ3VsYXInICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL21hY2hpbmVzUmVndWxhci86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL21hY2hpbmVzUmVndWxhci5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ21hY2hpbmVzUmVndWxhckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnbWFjaGluZXMnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLnN1cGVydmlzb3InICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL3N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL3N1cGVydmlzb3IyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnc3VwZXJ2aXNvckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnc3VwZXJ2aXNvcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL3N1cGVydmlzb3IvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9zdXBlcnZpc29yTWFjaGluZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ3N1cGVyTWFjaGluZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnZGV0YWxsIHN1cGVydmlzb3InXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfSkiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdiaXRTY3JlZW5Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJHN0YXRlUGFyYW1zLCBvZlNydiAsIG1hY2hpbmVTdGF0ZVNydiAsZHJpdmVyU3J2LCAkbG9jYXRpb24sICRzdGF0ZSwgJGludGVydmFsLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgc3VwZXJ2aXNvclNydiApIHtcclxuICAgICAgICB2YXIgdXJsID0gJGxvY2F0aW9uLmFic1VybCgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdmFyIG1hY2hpbmUgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvID0ge307XHJcbiAgICAgICAgJHNjb3BlLnNmRmlyc3QgPVtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lT3V0Jyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lT3V0Jyk7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IGRyaXZlclNydi5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKHN0YXRlLmlkLHsnaWQnOnN0YXRlLnBhcmFtfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLypcclxuICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lLycrdXJsW3VybC5sZW5ndGggLTFdKVxyXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihzZikge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPCggc2YubGVuZ3RoIDw1ID8gc2YubGVuZ3RoOjUpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdFtpXSA9IHNmW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG1hY2hpbmVOb3cyKCkge1xyXG4gICAgICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVPbmUobWFjaGluZSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1hY2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZUluZm8gPSBtYWNoO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lSW5mb1snb2ZTdGF0ZSddID0gbWFjaGluZVN0YXRlU3J2LmdldChtYWNoLnN0YXR1cyk7ICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFjaC5xdWFudGl0eVBsYW5uZWQgJiYgbWFjaC5xdWFudGl0eVBsYW5uZWQgIT0gMCAmJiBtYWNoLm9mQ29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvWydvZkNvbXBsZXRlZFBlcmNlbnQnXSA9IG1hY2gub2ZDb21wbGV0ZWQqMTAwL21hY2gucXVhbnRpdHlQbGFubmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS8nK21hY2hpbmUpXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihzZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdXggPSBzZjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXV4c2ZGaXJzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8KCBzZi5sZW5ndGggPDEwID8gc2YubGVuZ3RoOjEwKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYXV4W2ldWydhdmFsaWFibGUnXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1eHNmRmlyc3RbaV0gPSBhdXhbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0ID0gYXV4c2ZGaXJzdDtcclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250U0YgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ID0wXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvbnQgPCA2ICYmIGNvbnRTRiA8IHNmLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGF1eFtjb250U0ZdWydEQVRBU1RBUlQnXSkgPiBEYXRlLm5vdygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXhzZkZpcnN0W2NvbnQrK10gPSBhdXhbY29udFNGKytdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udFNGKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IGF1eHNmRmlyc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9mU3J2Lm1hdGVyaWFsQXZhbGlhYmxlKGF1eHNmRmlyc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRkMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGQyLmZvckVhY2goZnVuY3Rpb24oZWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS5hdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5hdmFsaWFibGUuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlbGVtZW50LmF2YWxpYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnc2VtYXBob3JSZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnc2VtYXBob3JPcmFuZ2UnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnc2VtYXBob3JHcmVlbic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3QgPSBkZDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgbWFjaGluZU5vdzIoKTsgIFxyXG4gICAgICAgICRpbnRlcnZhbChtYWNoaW5lTm93MiwxMDAwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbi8qXHJcbiAgICAgICBmdW5jdGlvbiBtYWNoaW5lTm93KCkge1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL25hbWUvJyArIHVybFt1cmwubGVuZ3RoIC0xIF0pXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoID4wICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZU5hbWUgPSBuYW1lWzBdWydOQU1FJ107ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVOYW1lID0gXCJFcnJvciFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL2FjdHVhbC8nK3VybFt1cmwubGVuZ3RoIC0xXSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZBY3R1YWwgPSBuYW1lWzBdWydQck9kSWQnXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZPcHIgPSBuYW1lWzBdWydPcHJOdW0nXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZTdGF0ZSA9IG5hbWVbMF1bJ0xhc3RUaW1lSm9iVHlwZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2Rlc2MvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZEZXNjcmlwdGlvbiA9IGRlc2NbMF1bJ0l0ZW1EZXNjJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3NsaXQvJytuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWVbMF1bJ09wck51bSddID09IDEwICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoJHNjb3BlLm1hY2hpbmVOYW1lICE9ICdJTktNQUtFUicgICYmICRzY29wZS5tYWNoaW5lTmFtZSAhPSAnTk9NQU4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICRzY29wZS5tYWNoaW5lTmFtZSAhPSAnTUFOJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBJZiBPRiBpcyBpbiBzdGF0ZSAxMCBvciBtYWNoaW5lIGlkIGlzIGRpZmVyZW50IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgSU5LTUFLRVIgd2UgbmVlZCBmaW5kIG91dCBxdWFudGl0eSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGFub3RoZXIgdGFibGU6IFByT2RCT01cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAvKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3ByaW50ZXIvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZlF0eVBsYW5uZWQgPSBxWzBdWydxdWFudGl0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mUXR5UGxhbm5lZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZRdHlQbGFubmVkID0gcXR5WzBdWydPcmRlclF0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9jb21wbGV0ZWQvJytuYW1lWzBdWydQck9kSWQnXSsnLycrbmFtZVswXVsnT3ByTnVtJ10rJy8nICArdXJsW3VybC5sZW5ndGggLTFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXAubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkNvbXBsZXRlZCA9IGNvbXBbMF1bJ1N0a1F0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQ29tcGxldGVkUGVyY2VudCA9IGNvbXBbMF1bJ1N0a1F0eSddKjEwMC9xdHlbMF1bJ09yZGVyUXR5J107ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICovIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInICwgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdtYWNoaW5lUmVndWxhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGVQYXJhbXMsICRsb2NhdGlvbiwgJHN0YXRlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkcSwgZHJpdmVyU3J2LCBtYWNoaW5lU3RhdGVTcnYsc3VwZXJ2aXNvclNydixvZlNydikge1xyXG4gICAgICAgIHZhciBtYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lSW5mbyA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zZkZpcnN0ID0gW107XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmdvQmlnU2NyZWVuID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQoJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlID0gZHJpdmVyU3J2LmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUuaWQseydpZCc6c3RhdGUucGFyYW19KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdXb3JraW5nT24nKTtcclxuICAgICAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lT25lKG1hY2hpbmUpXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtYWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvID0gbWFjaDtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZUluZm9bJ29mU3RhdGUnXSA9IG1hY2hpbmVTdGF0ZVNydi5nZXQobWFjaC5zdGF0dXMpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hY2gucXVhbnRpdHlQbGFubmVkICYmIG1hY2gucXVhbnRpdHlQbGFubmVkICE9IDAgJiYgbWFjaC5vZkNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lSW5mb1snb2ZDb21wbGV0ZWRQZXJjZW50J10gPSBtYWNoLm9mQ29tcGxldGVkKjEwMC9tYWNoLnF1YW50aXR5UGxhbm5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvJyttYWNoaW5lKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oc2YpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXV4ID0gc2Y7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF1eHNmRmlyc3QgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPCggc2YubGVuZ3RoIDwxMCA/IHNmLmxlbmd0aDoxMCk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2F1eFtpXVsnYXZhbGlhYmxlJ10gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXhzZkZpcnN0W2ldID0gYXV4W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IGF1eHNmRmlyc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udFNGID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udCA9MFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChjb250IDwgMjAgJiYgY29udFNGIDwgc2YubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3IERhdGUoYXV4W2NvbnRTRl1bJ0RBVEFTVEFSVCddKSA+IERhdGUubm93KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eHNmRmlyc3RbY29udCsrXSA9IGF1eFtjb250U0YrK107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250U0YrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0ID0gYXV4c2ZGaXJzdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2ZTcnYubWF0ZXJpYWxBdmFsaWFibGUoYXV4c2ZGaXJzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkLmZvckVhY2goZnVuY3Rpb24oZWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS5hdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5hdmFsaWFibGUuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlbGVtZW50LmF2YWxpYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnc2VtYXBob3JSZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnc2VtYXBob3JPcmFuZ2UnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnc2VtYXBob3JHcmVlbic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IGRkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdXb3JraW5nT2ZmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyBcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBtYWNoaW5lTm93KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lc0FsbFRpbWVyID0gJGludGVydmFsKG1hY2hpbmVOb3csMTAwMDAwKTtcclxuICAgICAgICBcclxuICAgIH0pO1xyXG5cclxuICAgIC8qICAgIGEgUkVWSVNBUlxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogb2ZTcnYubWF0ZXJpYWxBdmFsaWFibGUoYXV4W2ldLk9GKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oYXZhbGlhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXZhbGlhYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGo9MDsgaiA8IGF2YWxpYWJsZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGF0YXRhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zZkZpcnN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZhbGlhYmxlW2pdWydBdmFsYWlibGUnXSA8PSAoYXZhbGlhYmxlW2pdWydSZXF1aXJlZFF0eSddLzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0W2ldWydhdmFsaWFibGUnXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoYXZhbGlhYmxlW2pdWydBdmFsYWlibGUnXSA+IChhdmFsaWFibGVbal1bJ1JlcXVpcmVkUXR5J10vMikpICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYXZhbGlhYmxlW2pdWydBdmFsYWlibGUnXSA8IGF2YWxpYWJsZVtqXVsnUmVxdWlyZWRRdHknXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF1eFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdFtpXVsnYXZhbGlhYmxlJ10gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5zZkZpcnN0W2ldWydhdmFsaWFibGUnXSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdFtpXVsnYXZhbGlhYmxlJ10gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAqLyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21hY2hpbmVzUmVndWxhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCBzdXBlcnZpc29yU3J2LCBtYWNoaW5lU3RhdGVTcnYsICRzdGF0ZVBhcmFtcywgJGxvY2F0aW9uLCAkc3RhdGUsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRtZFNpZGVuYXYsIGRyaXZlclNydikge1xyXG4gICAgICAgIHZhciBtYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgIHZhciBtYWNoaW5lcyA9IFtdO1xyXG4gICAgICAgIHZhciBpbnRlcnZhbE1hY2hpbmVzO1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lcyA9IFtdO1xyXG5cclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQobG9jYXRlKTtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChkcml2ZXJTcnYuZ2V0KCkpIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3JNYWNoaW5lJyx7J2lkJzpkcml2ZXJTcnYuZ2V0KCl9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAkc2NvcGUuZ28gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lLCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lUmVndWxhcicseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb0JpZ1NjcmVlbiA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUsJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZScseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICBcclxuXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1hY2hpbmVOb3coKSB7XHJcbiAgICAgICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXNBbGwoJHN0YXRlUGFyYW1zLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1hY2gpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtYWNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFjaC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lc1tpbmRleF0gPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzW2luZGV4XVsnb2ZTdGF0ZSddID0gbWFjaGluZVN0YXRlU3J2LmdldChlbGVtZW50LnN0YXR1cyk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQucXVhbnRpdHlQbGFubmVkICYmIGVsZW1lbnQucXVhbnRpdHlQbGFubmVkICE9IDAgJiYgZWxlbWVudC5vZkNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lc1tpbmRleF1bJ29mQ29tcGxldGVkUGVyY2VudCddID0gZWxlbWVudC5vZkNvbXBsZXRlZCoxMDAvZWxlbWVudC5xdWFudGl0eVBsYW5uZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBtYWNoaW5lTm93KCk7XHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lc0FsbFRpbWVyID0gJGludGVydmFsKG1hY2hpbmVOb3csNTAwMCk7XHJcbiAgICAgICAgXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdtYWluQ29udHJvbGxlcicgLCBmdW5jdGlvbigkc2NvcGUsJHJvb3RTY29wZSwgc3VwZXJ2aXNvclNydikge1xyXG4gICAgICAgICRzY29wZS5ib2R5U3R5bGUgPSAnJztcclxuICAgICAgICAkc2NvcGUuc2hvd01lbnUgPSB0cnVlO1xyXG4gICAgICAgICRzY29wZS5icmVhZGNydW1icyA9ICdob21lJztcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuJG9uKCdNYWNoaW5lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDaGFuZ2UgYm9keSBjb2xvcicpO1xyXG4gICAgICAgICAgICAkc2NvcGUuYm9keVN0eWxlID0gJ3ZpbG9iaU1hY2hpbmUnO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2hvd01lbnUgPSBmYWxzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmJja2dybmRUaGVtZSA9ICdtYWNoaW5lJztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZU91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuYm9keVN0eWxlID0gJyc7IFxyXG4gICAgICAgICAgICAkc2NvcGUuc2hvd01lbnUgPSB0cnVlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYmNrZ3JuZFRoZW1lID0gJ2RlZmF1bHQnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oJ1dvcmtpbmdPbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUud29ya2luZyA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oJ1dvcmtpbmdPZmYnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLndvcmtpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5icmVhZGNydW1icyA9IHRvU3RhdGUubmFtZTtcclxuICAgICAgICAgICAgc3VwZXJ2aXNvclNydi5raWxsVGltZXJzKCk7XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IGRyaXZlclNydi5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSE9MQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQSEnKVxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKHN0YXRlLmlkLHsnaWQnOnN0YXRlLnBhcmFtfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21lbnVDb250cm9sbGVyJywgZnVuY3Rpb24gKFxyXG4gICAgICAgICAgICAkc2NvcGUsXHJcbiAgICAgICAgICAgICRtZFNpZGVuYXYsXHJcbiAgICAgICAgICAgICR0aW1lb3V0LFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLFxyXG4gICAgICAgICAgICAkc3RhdGUsXHJcbiAgICAgICAgICAgIHNzU2lkZU5hdixcclxuICAgICAgICAgICAgc3NTaWRlTmF2U2hhcmVkU2VydmljZSkge1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5tYWNoaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5icmVhZENydW1icyA9ICAkc3RhdGUuY3VycmVudC5icmVhZENydW1icztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5vbkNsaWNrTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS50b2dnbGUoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJ01hY2hpbmUnLGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmUgPSB0cnVlOyAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJ01hY2hpbmVPdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkc2NvcGUubWVudSA9IHNzU2lkZU5hdjtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmJyZWFkQ3J1bWJzID0gdG9TdGF0ZS5icmVhZENydW1icztcclxuICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdzdXBlck1hY2hpbmVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBzdXBlcnZpc29yU3J2LCBkcml2ZXJTcnYsICRzdGF0ZVBhcmFtcywkc3RhdGUpIHtcclxuICAgICAgICAkc2NvcGUubWFjaGluZSA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICAkc2NvcGUuZ28gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUsJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZVJlZ3VsYXInLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAkc2NvcGUuZ29CaWdTY3JlZW4gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUsJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lcygkc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1hY2hpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXMgPSBtYWNoaW5lcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdzdXBlcnZpc29yQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSxzdXBlcnZpc29yU3J2LCBkcml2ZXJTcnYsJHN0YXRlKSB7XHJcbiAgICAgICAgJHNjb3BlLmdvID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQobG9jYXRlKTtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLmdvR2VuZXJhbCA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KGxvY2F0ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmVzUmVndWxhcicseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzdXBlcnZpc29yU3J2LmRlcGFydGFtZW50cygpXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRlcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGVwdHMgPSBkZXB0cztcclxuICAgICAgICAgICAgICAgIGRlcHRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzKGVsZW1lbnQuV0NHcm91cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVwdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlcHRzW2luZGV4XVsnbWFjaGluZXMnXSA9IGRlcHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuZGlyZWN0aXZlKCdzZkNsb2NrJywgZnVuY3Rpb24gKCRpbnRlcnZhbCwgZGF0ZUZpbHRlcikge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBzdG9wVGltZTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGltZSgpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQudGV4dChkYXRlRmlsdGVyKG5ldyBEYXRlKCksICdkZC9NTS95eXl5IEhIOm1tOnNzJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdG9wVGltZSA9ICRpbnRlcnZhbChmdW5jdGlvbigpIHsgdXBkYXRlVGltZSgpfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbGVtZW50Lm9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChzdG9wVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuc2VydmljZSgnZHJpdmVyU3J2JywgZnVuY3Rpb24oJGh0dHApIHtcclxuICAgICAgICB0aGlzLmxhc3RJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0U3RhdGUgPSBbXVxyXG4gICAgIFxyXG4gICAgICAgIHRoaXMuc2V0ID0gZnVuY3Rpb24obGFzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RJZCA9IGxhc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSA9IGZ1bmN0aW9uKGxhc3QscGFyYW0pIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U3RhdGUucHVzaCh7J2lkJzpsYXN0LCdwYXJhbSc6cGFyYW19KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0U3RhdGUucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuc2VydmljZSgnbWFjaGluZVN0YXRlU3J2JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbihzdGF0ZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYXV4ID0ge307XHJcbiAgICAgICAgICAgIGlmICghc3RhdGUpIHN0YXRlPScnO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnRG93bic6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAnUGFyYXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX3RodW1iX2Rvd25fYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdkb3duJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnUHVsbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAnUFVMTCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfZ2V0X2FwcF9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ3B1bGwnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdOQ0Rvd24nOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ3BhcmF0IHNlbnNlIGNhcnJlYyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfc3luY19kaXNhYmxlZF9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ25jZG93bidcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCBvZiBPcGVyYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ2ZpbmFsIG9wZXJhY2nDsyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfZG9uZV9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ2VuZCdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1NldHVwJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdtYW50ZW5pbWVudCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfYnVpbGRfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdzZXR1cCdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1Byb2Nlc3MnOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ2VuIHByb2PDqXMnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX2xvb3BfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdwcm9jZXNzJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBhdXggPSB7J25hbWUnOidkZXNjb25lZ3V0JywnaWNvbic6J2ljX2Vycm9yX2JsYWNrXzE4cHguc3ZnJywgJ3RoZW1lJyA6ICdlcnJvcid9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhdXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuc2VydmljZSgnb2ZTcnYnLCBmdW5jdGlvbigkaHR0cCwgJHEpIHtcclxuICAgICAgICB2YXIgdXJsQmFzZSA9ICcuLi8uLi9hcGkvYm9tLyc7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkOyAvLyB0aGlzIHZhcmlhYmxlIHdpbGwgYmUgdGhlIHByb21pc2VcclxuICAgICBcclxuICAgICAgICB0aGlzLm1hdGVyaWFsQXZhbGlhYmxlID0gZnVuY3Rpb24ob2ZzKSB7XHJcbiAgICAgICAgICAgIHZhciBhdXhDb3VudCA9IDE7XHJcbiAgICAgICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgb2ZzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQodXJsQmFzZSArIGVsZW1lbnQuT0YpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oYm9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdXhBdmFsaWFibGU9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9tLmxlbmd0aCA9PSAwICkgYXV4QXZhbGlhYmxlLnB1c2goeydpdGVtSWQnOidObyBoaSBoYScsICdhdmFsaWFibGUnOjN9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9tLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBBY2NvcmRpbmcgdG8gXCJSZXF1aXJlZFF0eVwiIGFuZCBcIkF2YWxhaWJsZVwiIHJlbGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBzZXQgdXAgdGhlIGZsYWc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAyLi0gZ3JlZW4gZmxhZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICogICAgICAgICAgMS4tIG9yYW5nZSBmbGFnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAwLi0gcmVkIGZsYWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICovICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdXhCb20gPSB7J2l0ZW1JZCcgOiBlbGVtZW50WydJdGVtSWQnXSwgJ2F2YWxpYWJsZScgOiAwfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50WydSZXF1aXJlZFF0eSddIDw9IGVsZW1lbnRbJ0F2YWxhaWJsZSddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Qm9tWydhdmFsaWFibGUnXSA9ICAyOyAgLy8gU2VtYWZvciB2ZXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnRbJ1JlcXVpcmVkUXR5J10gPiBlbGVtZW50WydBdmFsYWlibGUnXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydSZXF1aXJlZFF0eSddIDw9IChlbGVtZW50WydBdmFsYWlibGUnXS8yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eEJvbVsnYXZhbGlhYmxlJ10gPSAgMTsgIC8vIFNlbWFmb3IgdGFyb25qYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4QXZhbGlhYmxlLnB1c2goYXV4Qm9tKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XVsnYXZhbGlhYmxlJ10gPSBhdXhBdmFsaWFibGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK2F1eENvdW50ID4gYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGFycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmZhY3RvcnkoJ3N1cGVydmlzb3JTcnYnLCBmdW5jdGlvbigkaHR0cCwgJGludGVydmFsKSB7XHJcbiAgICAgICAgdmFyIHVybEJhc2UgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdCc7XHJcbiAgICAgICAgdmFyIGRlcHRBbGwgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdGFsbCc7XHJcbiAgICAgICAgdmFyIGRlcHRPbmUgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdG9uZSc7XHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5kZXBhcnRhbWVudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmxCYXNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lcyA9IGZ1bmN0aW9uKGRlcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmxCYXNlKycvJytkZXB0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lc0FsbCA9IGZ1bmN0aW9uKGRlcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChkZXB0QWxsICsgJy8nICsgZGVwdClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lT25lID0gZnVuY3Rpb24obWFjaCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkZXB0T25lICsgJy8nICsgbWFjaCk7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoZGVwdE9uZSArICcvJyArIG1hY2gpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFjaGluZXNBbGxUaW1lcj0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5raWxsVGltZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hY2hpbmVzQWxsVGltZXIpXHJcbiAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHRoaXMubWFjaGluZXNBbGxUaW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
