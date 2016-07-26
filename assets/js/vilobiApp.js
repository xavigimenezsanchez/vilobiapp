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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1lbnUuY2ZnLmpzIiwidGhlbWUuY2ZnLmpzIiwidmlsb2JpLmNmZy5qcyIsImNvbnRyb2xsZXJzL2JpZ1NjcmVlbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZS5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFjaGluZVJlZ3VsYXIuY3RybC5qcyIsImNvbnRyb2xsZXJzL21hY2hpbmVzUmVndWxhci5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFpbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWVudS5jdHJsLmpzIiwiY29udHJvbGxlcnMvc3VwZXJNYWNoaW5lLmN0cmwuanMiLCJjb250cm9sbGVycy9zdXBlcnZpc29yLmN0cmwuanMiLCJkaXJlY3RpdmVzL3NmQ2xvY2suanMiLCJzZXJ2aWNlcy9kcml2ZXIuc3J2LmpzIiwic2VydmljZXMvbWFjaGluZVN0YXRlLnNydi5qcyIsInNlcnZpY2VzL29mU2VydmVyLmpzIiwic2VydmljZXMvc3VwZXJ2aXNvci5zcnYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4SkE7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidmlsb2JpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcsWyd1aS5yb3V0ZXInLCduZ01hdGVyaWFsJywnc2FzcmlvLmFuZ3VsYXItbWF0ZXJpYWwtc2lkZW5hdiddKTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyLHNzU2lkZU5hdlNlY3Rpb25zUHJvdmlkZXIpIHtcclxuICAgICAgICBzc1NpZGVOYXZTZWN0aW9uc1Byb3ZpZGVyLmluaXRXaXRoVGhlbWUoJG1kVGhlbWluZ1Byb3ZpZGVyKTtcclxuICAgICAgICAgICAgc3NTaWRlTmF2U2VjdGlvbnNQcm92aWRlci5pbml0V2l0aFNlY3Rpb25zKFt7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICAgICAgICAgJ0hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICdIb21lJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogICAgICAnY29tbW9uLmhvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICAgICAgICdsaW5rJ1xyXG4gICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICAgICAgICAgJ1N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICdTdXBlcnZpc29yJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogICAgICAnY29tbW9uLnN1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICAgICAgICdsaW5rJ1xyXG4gICAgICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1ncmV5JykuYmFja2dyb3VuZFBhbGV0dGUoJ2dyZXknKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLW9yYW5nZScpLmJhY2tncm91bmRQYWxldHRlKCdvcmFuZ2UnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLXB1cnBsZScpLmJhY2tncm91bmRQYWxldHRlKCdkZWVwLXB1cnBsZScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RhcmstYmx1ZScpLmJhY2tncm91bmRQYWxldHRlKCdibHVlJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1yZWQnKS5iYWNrZ3JvdW5kUGFsZXR0ZSgncmVkJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdvcmFuZ2UnKTtcclxuXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ21hY2hpbmVQYWxldGUnLCB7XHJcbiAgICAgICAgICAgICc1MCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzEwMCc6ICdmZmNkZDInLFxyXG4gICAgICAgICAgICAgICAgJzIwMCc6ICdlZjlhOWEnLFxyXG4gICAgICAgICAgICAgICAgJzMwMCc6ICdlNTczNzMnLFxyXG4gICAgICAgICAgICAgICAgJzQwMCc6ICdlZjUzNTAnLFxyXG4gICAgICAgICAgICAgICAgJzUwMCc6ICdmNDQzMzYnLFxyXG4gICAgICAgICAgICAgICAgJzYwMCc6ICdlNTM5MzUnLFxyXG4gICAgICAgICAgICAgICAgJzcwMCc6ICdkMzJmMmYnLFxyXG4gICAgICAgICAgICAgICAgJzgwMCc6ICdjNjI4MjgnLFxyXG4gICAgICAgICAgICAgICAgJzkwMCc6ICdiNzFjMWMnLFxyXG4gICAgICAgICAgICAgICAgJ0ExMDAnOiAnMDAwMDAwJywgIC8vIEJhY2tncm91bmQgQ29sb3JcclxuICAgICAgICAgICAgICAgICdBMjAwJzogJ2ZmNTI1MicsXHJcbiAgICAgICAgICAgICAgICAnQTQwMCc6ICdmZjE3NDQnLFxyXG4gICAgICAgICAgICAgICAgJ0E3MDAnOiAnZDUwMDAwJyxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgIC8vIHdoZXRoZXIsIGJ5IGRlZmF1bHQsIHRleHQgKGNvbnRyYXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gdGhpcyBwYWxldHRlIHNob3VsZCBiZSBkYXJrIG9yIGxpZ2h0XHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCAvL2h1ZXMgd2hpY2ggY29udHJhc3Qgc2hvdWxkIGJlICdkYXJrJyBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbWFjaGluZScpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnbWFjaGluZVBhbGV0ZScpO1xyXG5cclxuXHJcbiAgICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2JyZWFkY3J1bWJzUGFsZXR0ZU5hbWUnLCB7XHJcbiAgICAgICAgICAgICAgICAnNTAnOiAnRkZGRkZGJyxcclxuICAgICAgICAgICAgICAgICcxMDAnOiAnZmZjZGQyJyxcclxuICAgICAgICAgICAgICAgICcyMDAnOiAnZWY5YTlhJyxcclxuICAgICAgICAgICAgICAgICczMDAnOiAnZTU3MzczJyxcclxuICAgICAgICAgICAgICAgICc0MDAnOiAnZWY1MzUwJyxcclxuICAgICAgICAgICAgICAgICc1MDAnOiAnZjQ0MzM2JyxcclxuICAgICAgICAgICAgICAgICc2MDAnOiAnZTUzOTM1JyxcclxuICAgICAgICAgICAgICAgICc3MDAnOiAnZDMyZjJmJyxcclxuICAgICAgICAgICAgICAgICc4MDAnOiAnYzYyODI4JyxcclxuICAgICAgICAgICAgICAgICc5MDAnOiAnYjcxYzFjJyxcclxuICAgICAgICAgICAgICAgICdBMTAwJzogJ2ZmOGE4MCcsXHJcbiAgICAgICAgICAgICAgICAnQTIwMCc6ICdmZjUyNTInLFxyXG4gICAgICAgICAgICAgICAgJ0E0MDAnOiAnZmYxNzQ0JyxcclxuICAgICAgICAgICAgICAgICdBNzAwJzogJ2Q1MDAwMCcsXHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLCAgICAvLyB3aGV0aGVyLCBieSBkZWZhdWx0LCB0ZXh0IChjb250cmFzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIHRoaXMgcGFsZXR0ZSBzaG91bGQgYmUgZGFyayBvciBsaWdodFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFsnNTAnLCAnMTAwJywgLy9odWVzIHdoaWNoIGNvbnRyYXN0IHNob3VsZCBiZSAnZGFyaycgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgJzIwMCcsICczMDAnLCAnNDAwJywgJ0ExMDAnXSxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogdW5kZWZpbmVkICAgIC8vIGNvdWxkIGFsc28gc3BlY2lmeSB0aGlzIGlmIGRlZmF1bHQgd2FzICdkYXJrJ1xyXG4gICAgICAgICAgICB9KTsgICBcclxuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdicmVhZGNydW1icycpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYnJlYWRjcnVtYnNQYWxldHRlTmFtZScsIHtcclxuICAgICAgICAgICAgICAgICdkZWZhdWx0JzogJzUwJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3Byb2Nlc3MnKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2dyZWVuJyk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdzZXR1cCcpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnYW1iZXInKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ3B1bGwnKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2JsdWUnKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2VuZCcpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgncmVkJyk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCduY2Rvd24nKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ29yYW5nZScpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZG93bicpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnZGVlcC1vcmFuZ2UnKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2Vycm9yJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdncmV5Jyk7XHJcbiAgICAgICAgLyogU2VtYXBob3IgdGhlbWluZyAqL1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnc2VtYXBob3JSZWQnKVxyXG4gICAgICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ3JlZCcpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgncmVkJyx7XHJcbiAgICAgICAgICAgICAgICAnZGVmYXVsdCcgOiAnMTAwJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnc2VtYXBob3JPcmFuZ2UnKVxyXG4gICAgICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ29yYW5nZScpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnb3JhbmdlJyx7XHJcbiAgICAgICAgICAgICAgICAnZGVmYXVsdCcgOiAnMTAwJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnc2VtYXBob3JHcmVlbicpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnZ3JlZW4nKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2dyZWVuJyx7XHJcbiAgICAgICAgICAgICAgICAnZGVmYXVsdCcgOiAnMTAwJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZGFyaygpO1xyXG5cclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuYWx3YXlzV2F0Y2hUaGVtZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9cIik7XHJcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJy8nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uJyAse1xyXG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9fY29tbW9uLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21lbnVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5ob21lJywge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnLycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJ3RlbXBsYXRlcy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ2hvbWUnXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5tYWNoaW5lJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9tYWNoaW5lLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvbWFjaGluZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ2JpdFNjcmVlbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnbWFjaGluZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24ubWFjaGluZVJlZ3VsYXInICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL21hY2hpbmVSZWd1bGFyLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvbWFjaGluZVJlZ3VsYXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdtYWNoaW5lUmVndWxhckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnbWFjaGluZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24ubWFjaGluZXNSZWd1bGFyJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9tYWNoaW5lc1JlZ3VsYXIvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9tYWNoaW5lc1JlZ3VsYXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdtYWNoaW5lc1JlZ3VsYXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ21hY2hpbmVzJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5zdXBlcnZpc29yJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9zdXBlcnZpc29yJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9zdXBlcnZpc29yMi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ3N1cGVydmlzb3JDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ3N1cGVydmlzb3InXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLnN1cGVydmlzb3JNYWNoaW5lJyAsIHtcclxuICAgICAgICAgICAgICAgIHVybCAgICAgICAgICAgICA6ICAgJy9zdXBlcnZpc29yLzppZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCAgICA6ICAgJy90ZW1wbGF0ZXMvc3VwZXJ2aXNvck1hY2hpbmUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyICAgICAgOiAgICdzdXBlck1hY2hpbmVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGJyZWFkQ3J1bWJzIDogJ2RldGFsbCBzdXBlcnZpc29yJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH0pIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignYml0U2NyZWVuQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRzdGF0ZVBhcmFtcywgb2ZTcnYgLCBtYWNoaW5lU3RhdGVTcnYgLGRyaXZlclNydiwgJGxvY2F0aW9uLCAkc3RhdGUsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRtZFNpZGVuYXYsIHN1cGVydmlzb3JTcnYgKSB7XHJcbiAgICAgICAgdmFyIHVybCA9ICRsb2NhdGlvbi5hYnNVcmwoKS5zcGxpdCgnLycpO1xyXG4gICAgICAgIHZhciBtYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lSW5mbyA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zZkZpcnN0ID1bXTtcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZU91dCcpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZU91dCcpO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBkcml2ZXJTcnYuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZS5pZCx7J2lkJzpzdGF0ZS5wYXJhbX0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS8nK3VybFt1cmwubGVuZ3RoIC0xXSlcclxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oc2YpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTwoIHNmLmxlbmd0aCA8NSA/IHNmLmxlbmd0aDo1KTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3RbaV0gPSBzZltpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBtYWNoaW5lTm93MigpIHtcclxuICAgICAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lT25lKG1hY2hpbmUpXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtYWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvID0gbWFjaDtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZUluZm9bJ29mU3RhdGUnXSA9IG1hY2hpbmVTdGF0ZVNydi5nZXQobWFjaC5zdGF0dXMpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hY2gucXVhbnRpdHlQbGFubmVkICYmIG1hY2gucXVhbnRpdHlQbGFubmVkICE9IDAgJiYgbWFjaC5vZkNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lSW5mb1snb2ZDb21wbGV0ZWRQZXJjZW50J10gPSBtYWNoLm9mQ29tcGxldGVkKjEwMC9tYWNoLnF1YW50aXR5UGxhbm5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvJyttYWNoaW5lKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oc2YpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXV4ID0gc2Y7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF1eHNmRmlyc3QgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPCggc2YubGVuZ3RoIDwxMCA/IHNmLmxlbmd0aDoxMCk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2F1eFtpXVsnYXZhbGlhYmxlJ10gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXhzZkZpcnN0W2ldID0gYXV4W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IGF1eHNmRmlyc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udFNGID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udCA9MFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChjb250IDwgNiAmJiBjb250U0YgPCBzZi5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXcgRGF0ZShhdXhbY29udFNGXVsnREFUQVNUQVJUJ10pID4gRGF0ZS5ub3coKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4c2ZGaXJzdFtjb250KytdID0gYXV4W2NvbnRTRisrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRTRisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3QgPSBhdXhzZkZpcnN0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvZlNydi5tYXRlcmlhbEF2YWxpYWJsZShhdXhzZkZpcnN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihkZDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkMi5mb3JFYWNoKGZ1bmN0aW9uKGVsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGUuYXZhbGlhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUuYXZhbGlhYmxlLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZWxlbWVudC5hdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdWydzZW1hcGhvciddID0gJ3NlbWFwaG9yUmVkJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdWydzZW1hcGhvciddID0gJ3NlbWFwaG9yT3JhbmdlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdWydzZW1hcGhvciddID0gJ3NlbWFwaG9yR3JlZW4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0ID0gZGQyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hY2hpbmVOb3cyKCk7ICBcclxuICAgICAgICAkaW50ZXJ2YWwobWFjaGluZU5vdzIsMTAwMDAwKTtcclxuICAgICAgICBcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4vKlxyXG4gICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS9uYW1lLycgKyB1cmxbdXJsLmxlbmd0aCAtMSBdKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA+MCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVOYW1lID0gbmFtZVswXVsnTkFNRSddOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lTmFtZSA9IFwiRXJyb3IhXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi8uLi9hcGkvbWFjaGluZS9hY3R1YWwvJyt1cmxbdXJsLmxlbmd0aCAtMV0pXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQWN0dWFsID0gbmFtZVswXVsnUHJPZElkJ107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mT3ByID0gbmFtZVswXVsnT3ByTnVtJ107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mU3RhdGUgPSBuYW1lWzBdWydMYXN0VGltZUpvYlR5cGUnXTtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9kZXNjLycgKyBuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVzYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mRGVzY3JpcHRpb24gPSBkZXNjWzBdWydJdGVtRGVzYyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9zbGl0LycrbmFtZVswXVsnUHJPZElkJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHF0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lWzBdWydPcHJOdW0nXSA9PSAxMCAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCRzY29wZS5tYWNoaW5lTmFtZSAhPSAnSU5LTUFLRVInICAmJiAkc2NvcGUubWFjaGluZU5hbWUgIT0gJ05PTUFOJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAkc2NvcGUubWFjaGluZU5hbWUgIT0gJ01BTidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogSWYgT0YgaXMgaW4gc3RhdGUgMTAgb3IgbWFjaGluZSBpZCBpcyBkaWZlcmVudCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIElOS01BS0VSIHdlIG5lZWQgZmluZCBvdXQgcXVhbnRpdHkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbm90aGVyIHRhYmxlOiBQck9kQk9NXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9wcmludGVyLycgKyBuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZRdHlQbGFubmVkID0gcVswXVsncXVhbnRpdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZlF0eVBsYW5uZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mUXR5UGxhbm5lZCA9IHF0eVswXVsnT3JkZXJRdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLi9hcGkvb2YvY29tcGxldGVkLycrbmFtZVswXVsnUHJPZElkJ10rJy8nK25hbWVbMF1bJ09wck51bSddKycvJyAgK3VybFt1cmwubGVuZ3RoIC0xXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihjb21wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZDb21wbGV0ZWQgPSBjb21wWzBdWydTdGtRdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkNvbXBsZXRlZFBlcmNlbnQgPSBjb21wWzBdWydTdGtRdHknXSoxMDAvcXR5WzBdWydPcmRlclF0eSddOyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAqLyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ2hvbWVDb250cm9sbGVyJyAsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFjaGluZVJlZ3VsYXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJHN0YXRlUGFyYW1zLCAkbG9jYXRpb24sICRzdGF0ZSwgJGludGVydmFsLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJHEsIGRyaXZlclNydiwgbWFjaGluZVN0YXRlU3J2LHN1cGVydmlzb3JTcnYsb2ZTcnYpIHtcclxuICAgICAgICB2YXIgbWFjaGluZSA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICAkc2NvcGUubWFjaGluZUluZm8gPSB7fTtcclxuICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IFtdO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29TdXBlcnZpc29yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5nb0JpZ1NjcmVlbiA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZW1pdCgnTWFjaGluZScpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IGRyaXZlclNydi5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKHN0YXRlLmlkLHsnaWQnOnN0YXRlLnBhcmFtfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1hY2hpbmVOb3coKSB7XHJcbiAgICAgICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZU9uZShtYWNoaW5lKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWFjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lSW5mbyA9IG1hY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvWydvZlN0YXRlJ10gPSBtYWNoaW5lU3RhdGVTcnYuZ2V0KG1hY2guc3RhdHVzKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWNoLnF1YW50aXR5UGxhbm5lZCAmJiBtYWNoLnF1YW50aXR5UGxhbm5lZCAhPSAwICYmIG1hY2gub2ZDb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZUluZm9bJ29mQ29tcGxldGVkUGVyY2VudCddID0gbWFjaC5vZkNvbXBsZXRlZCoxMDAvbWFjaC5xdWFudGl0eVBsYW5uZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lLycrbWFjaGluZSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF1eCA9IHNmO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdXhzZkZpcnN0ID0gW11cclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTwoIHNmLmxlbmd0aCA8MTAgPyBzZi5sZW5ndGg6MTApOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hdXhbaV1bJ2F2YWxpYWJsZSddID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV4c2ZGaXJzdFtpXSA9IGF1eFtpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3QgPSBhdXhzZkZpcnN0O1xyXG4gICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRTRiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnQgPTBcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY29udCA8IDIwICYmIGNvbnRTRiA8IHNmLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGF1eFtjb250U0ZdWydEQVRBU1RBUlQnXSkgPiBEYXRlLm5vdygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXhzZkZpcnN0W2NvbnQrK10gPSBhdXhbY29udFNGKytdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udFNGKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IGF1eHNmRmlyc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9mU3J2Lm1hdGVyaWFsQXZhbGlhYmxlKGF1eHNmRmlyc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZC5mb3JFYWNoKGZ1bmN0aW9uKGVsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGUuYXZhbGlhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUuYXZhbGlhYmxlLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZWxlbWVudC5hdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdWydzZW1hcGhvciddID0gJ3NlbWFwaG9yUmVkJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdWydzZW1hcGhvciddID0gJ3NlbWFwaG9yT3JhbmdlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdWydzZW1hcGhvciddID0gJ3NlbWFwaG9yR3JlZW4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3QgPSBkZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7IFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG1hY2hpbmVOb3coKTtcclxuICAgICAgICBcclxuICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzQWxsVGltZXIgPSAkaW50ZXJ2YWwobWFjaGluZU5vdywxMDAwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgLyogICAgYSBSRVZJU0FSXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBvZlNydi5tYXRlcmlhbEF2YWxpYWJsZShhdXhbaV0uT0YpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihhdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhdmFsaWFibGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaj0wOyBqIDwgYXZhbGlhYmxlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXRhdGEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNmRmlyc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdmFsaWFibGVbal1bJ0F2YWxhaWJsZSddIDw9IChhdmFsaWFibGVbal1bJ1JlcXVpcmVkUXR5J10vMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3RbaV1bJ2F2YWxpYWJsZSddID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChhdmFsaWFibGVbal1bJ0F2YWxhaWJsZSddID4gKGF2YWxpYWJsZVtqXVsnUmVxdWlyZWRRdHknXS8yKSkgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhdmFsaWFibGVbal1bJ0F2YWxhaWJsZSddIDwgYXZhbGlhYmxlW2pdWydSZXF1aXJlZFF0eSddKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXV4W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0W2ldWydhdmFsaWFibGUnXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLnNmRmlyc3RbaV1bJ2F2YWxpYWJsZSddICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0W2ldWydhdmFsaWFibGUnXSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICovIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFjaGluZXNSZWd1bGFyQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsIHN1cGVydmlzb3JTcnYsIG1hY2hpbmVTdGF0ZVNydiwgJHN0YXRlUGFyYW1zLCAkbG9jYXRpb24sICRzdGF0ZSwgJGludGVydmFsLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgZHJpdmVyU3J2KSB7XHJcbiAgICAgICAgdmFyIG1hY2hpbmUgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgdmFyIG1hY2hpbmVzID0gW107XHJcbiAgICAgICAgdmFyIGludGVydmFsTWFjaGluZXM7XHJcbiAgICAgICAgJHNjb3BlLm1hY2hpbmVzID0gW107XHJcblxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldChsb2NhdGUpO1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGRyaXZlclNydi5nZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnLHsnaWQnOmRyaXZlclNydi5nZXQoKX0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICRzY29wZS5nbyA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUsJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmVSZWd1bGFyJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmlnU2NyZWVuID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSwkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lc0FsbCgkc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWFjaCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1hY2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWNoLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCxpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzW2luZGV4XSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXNbaW5kZXhdWydvZlN0YXRlJ10gPSBtYWNoaW5lU3RhdGVTcnYuZ2V0KGVsZW1lbnQuc3RhdHVzKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5xdWFudGl0eVBsYW5uZWQgJiYgZWxlbWVudC5xdWFudGl0eVBsYW5uZWQgIT0gMCAmJiBlbGVtZW50Lm9mQ29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVzW2luZGV4XVsnb2ZDb21wbGV0ZWRQZXJjZW50J10gPSBlbGVtZW50Lm9mQ29tcGxldGVkKjEwMC9lbGVtZW50LnF1YW50aXR5UGxhbm5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG1hY2hpbmVOb3coKTtcclxuICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzQWxsVGltZXIgPSAkaW50ZXJ2YWwobWFjaGluZU5vdyw1MDAwKTtcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJyAsIGZ1bmN0aW9uKCRzY29wZSwkcm9vdFNjb3BlLCBzdXBlcnZpc29yU3J2KSB7XHJcbiAgICAgICAgJHNjb3BlLmJvZHlTdHlsZSA9ICcnO1xyXG4gICAgICAgICRzY29wZS5zaG93TWVudSA9IHRydWU7XHJcbiAgICAgICAgJHNjb3BlLmJyZWFkY3J1bWJzID0gJ2hvbWUnO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS4kb24oJ01hY2hpbmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NoYW5nZSBib2R5IGNvbG9yJyk7XHJcbiAgICAgICAgICAgICRzY29wZS5ib2R5U3R5bGUgPSAndmlsb2JpTWFjaGluZSc7XHJcbiAgICAgICAgICAgICRzY29wZS5zaG93TWVudSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYmNrZ3JuZFRoZW1lID0gJ21hY2hpbmUnO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuJG9uKCdNYWNoaW5lT3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ib2R5U3R5bGUgPSAnJzsgXHJcbiAgICAgICAgICAgICRzY29wZS5zaG93TWVudSA9IHRydWU7XHJcbiAgICAgICAgICAgICRzY29wZS5iY2tncm5kVGhlbWUgPSAnZGVmYXVsdCdcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5icmVhZGNydW1icyA9IHRvU3RhdGUubmFtZTtcclxuICAgICAgICAgICAgc3VwZXJ2aXNvclNydi5raWxsVGltZXJzKCk7XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IGRyaXZlclNydi5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSE9MQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQSEnKVxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKHN0YXRlLmlkLHsnaWQnOnN0YXRlLnBhcmFtfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21lbnVDb250cm9sbGVyJywgZnVuY3Rpb24gKFxyXG4gICAgICAgICAgICAkc2NvcGUsXHJcbiAgICAgICAgICAgICRtZFNpZGVuYXYsXHJcbiAgICAgICAgICAgICR0aW1lb3V0LFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLFxyXG4gICAgICAgICAgICAkc3RhdGUsXHJcbiAgICAgICAgICAgIHNzU2lkZU5hdixcclxuICAgICAgICAgICAgc3NTaWRlTmF2U2hhcmVkU2VydmljZSkge1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5tYWNoaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5icmVhZENydW1icyA9ICAkc3RhdGUuY3VycmVudC5icmVhZENydW1icztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5vbkNsaWNrTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS50b2dnbGUoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJ01hY2hpbmUnLGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmUgPSB0cnVlOyAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJ01hY2hpbmVPdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkc2NvcGUubWVudSA9IHNzU2lkZU5hdjtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmJyZWFkQ3J1bWJzID0gdG9TdGF0ZS5icmVhZENydW1icztcclxuICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdzdXBlck1hY2hpbmVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBzdXBlcnZpc29yU3J2LCBkcml2ZXJTcnYsICRzdGF0ZVBhcmFtcywkc3RhdGUpIHtcclxuICAgICAgICAkc2NvcGUubWFjaGluZSA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICAkc2NvcGUuZ28gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUsJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZVJlZ3VsYXInLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAkc2NvcGUuZ29CaWdTY3JlZW4gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUsJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lcygkc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1hY2hpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXMgPSBtYWNoaW5lcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdzdXBlcnZpc29yQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSxzdXBlcnZpc29yU3J2LCBkcml2ZXJTcnYsJHN0YXRlKSB7XHJcbiAgICAgICAgJHNjb3BlLmdvID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQobG9jYXRlKTtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldFN0YXRlKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLmdvR2VuZXJhbCA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KGxvY2F0ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmVzUmVndWxhcicseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzdXBlcnZpc29yU3J2LmRlcGFydGFtZW50cygpXHJcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRlcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGVwdHMgPSBkZXB0cztcclxuICAgICAgICAgICAgICAgIGRlcHRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzKGVsZW1lbnQuV0NHcm91cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVwdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlcHRzW2luZGV4XVsnbWFjaGluZXMnXSA9IGRlcHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuZGlyZWN0aXZlKCdzZkNsb2NrJywgZnVuY3Rpb24gKCRpbnRlcnZhbCwgZGF0ZUZpbHRlcikge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBzdG9wVGltZTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGltZSgpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQudGV4dChkYXRlRmlsdGVyKG5ldyBEYXRlKCksICdkZC9NTS95eXl5IEhIOm1tOnNzJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdG9wVGltZSA9ICRpbnRlcnZhbChmdW5jdGlvbigpIHsgdXBkYXRlVGltZSgpfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbGVtZW50Lm9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChzdG9wVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuc2VydmljZSgnZHJpdmVyU3J2JywgZnVuY3Rpb24oJGh0dHApIHtcclxuICAgICAgICB0aGlzLmxhc3RJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0U3RhdGUgPSBbXVxyXG4gICAgIFxyXG4gICAgICAgIHRoaXMuc2V0ID0gZnVuY3Rpb24obGFzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RJZCA9IGxhc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSA9IGZ1bmN0aW9uKGxhc3QscGFyYW0pIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U3RhdGUucHVzaCh7J2lkJzpsYXN0LCdwYXJhbSc6cGFyYW19KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0U3RhdGUucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuc2VydmljZSgnbWFjaGluZVN0YXRlU3J2JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbihzdGF0ZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYXV4ID0ge307XHJcbiAgICAgICAgICAgIGlmICghc3RhdGUpIHN0YXRlPScnO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlLnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnRG93bic6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAnUGFyYXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX3RodW1iX2Rvd25fYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdkb3duJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnUHVsbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAnUFVMTCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfZ2V0X2FwcF9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ3B1bGwnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdOQ0Rvd24nOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ3BhcmF0IHNlbnNlIGNhcnJlYyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfc3luY19kaXNhYmxlZF9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ25jZG93bidcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCBvZiBPcGVyYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ2ZpbmFsIG9wZXJhY2nDsyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfZG9uZV9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ2VuZCdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1NldHVwJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdtYW50ZW5pbWVudCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfYnVpbGRfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdzZXR1cCdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1Byb2Nlc3MnOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ2VuIHByb2PDqXMnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5pY29uID0gJ2ljX2xvb3BfYmxhY2tfMThweC5zdmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1eC50aGVtZSA9ICdwcm9jZXNzJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBhdXggPSB7J25hbWUnOidkZXNjb25lZ3V0JywnaWNvbic6J2ljX2Vycm9yX2JsYWNrXzE4cHguc3ZnJywgJ3RoZW1lJyA6ICdlcnJvcid9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhdXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuc2VydmljZSgnb2ZTcnYnLCBmdW5jdGlvbigkaHR0cCwgJHEpIHtcclxuICAgICAgICB2YXIgdXJsQmFzZSA9ICcuLi8uLi9hcGkvYm9tLyc7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkOyAvLyB0aGlzIHZhcmlhYmxlIHdpbGwgYmUgdGhlIHByb21pc2VcclxuICAgICBcclxuICAgICAgICB0aGlzLm1hdGVyaWFsQXZhbGlhYmxlID0gZnVuY3Rpb24ob2ZzKSB7XHJcbiAgICAgICAgICAgIHZhciBhdXhDb3VudCA9IDE7XHJcbiAgICAgICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgb2ZzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQodXJsQmFzZSArIGVsZW1lbnQuT0YpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oYm9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdXhBdmFsaWFibGU9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9tLmxlbmd0aCA9PSAwICkgYXV4QXZhbGlhYmxlLnB1c2goeydpdGVtSWQnOidObyBoaSBoYScsICdhdmFsaWFibGUnOjN9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9tLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBBY2NvcmRpbmcgdG8gXCJSZXF1aXJlZFF0eVwiIGFuZCBcIkF2YWxhaWJsZVwiIHJlbGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBzZXQgdXAgdGhlIGZsYWc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAyLi0gZ3JlZW4gZmxhZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICogICAgICAgICAgMS4tIG9yYW5nZSBmbGFnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAwLi0gcmVkIGZsYWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICovICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdXhCb20gPSB7J2l0ZW1JZCcgOiBlbGVtZW50WydJdGVtSWQnXSwgJ2F2YWxpYWJsZScgOiAwfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50WydSZXF1aXJlZFF0eSddIDw9IGVsZW1lbnRbJ0F2YWxhaWJsZSddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Qm9tWydhdmFsaWFibGUnXSA9ICAyOyAgLy8gU2VtYWZvciB2ZXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnRbJ1JlcXVpcmVkUXR5J10gPiBlbGVtZW50WydBdmFsYWlibGUnXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydSZXF1aXJlZFF0eSddIDw9IChlbGVtZW50WydBdmFsYWlibGUnXS8yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eEJvbVsnYXZhbGlhYmxlJ10gPSAgMTsgIC8vIFNlbWFmb3IgdGFyb25qYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4QXZhbGlhYmxlLnB1c2goYXV4Qm9tKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XVsnYXZhbGlhYmxlJ10gPSBhdXhBdmFsaWFibGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK2F1eENvdW50ID4gYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGFycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmZhY3RvcnkoJ3N1cGVydmlzb3JTcnYnLCBmdW5jdGlvbigkaHR0cCwgJGludGVydmFsKSB7XHJcbiAgICAgICAgdmFyIHVybEJhc2UgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdCc7XHJcbiAgICAgICAgdmFyIGRlcHRBbGwgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdGFsbCc7XHJcbiAgICAgICAgdmFyIGRlcHRPbmUgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdG9uZSc7XHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5kZXBhcnRhbWVudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmxCYXNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lcyA9IGZ1bmN0aW9uKGRlcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmxCYXNlKycvJytkZXB0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lc0FsbCA9IGZ1bmN0aW9uKGRlcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChkZXB0QWxsICsgJy8nICsgZGVwdClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lT25lID0gZnVuY3Rpb24obWFjaCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkZXB0T25lICsgJy8nICsgbWFjaCk7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoZGVwdE9uZSArICcvJyArIG1hY2gpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFjaGluZXNBbGxUaW1lcj0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5raWxsVGltZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hY2hpbmVzQWxsVGltZXIpXHJcbiAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHRoaXMubWFjaGluZXNBbGxUaW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
