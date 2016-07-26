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
                    while (cont < 6 && contSF < sf.length ) {
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
                                                        array[index]['semaphor'] = 'end';
                                                        break;
                                                    case 1 :
                                                        array[index]['semaphor'] = 'ncdown';
                                                        break;
                                                    case 2 :
                                                        array[index]['semaphor'] = 'process';
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
        
        $interval(machineNow,60000);
        
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
                                                        array[index]['semaphor'] = 'end';
                                                        break;
                                                    case 1 :
                                                        array[index]['semaphor'] = 'ncdown';
                                                        break;
                                                    case 2 :
                                                        array[index]['semaphor'] = 'process';
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
        var deferred = $q.defer();
     
        this.materialAvaliable = function(ofs) {
            var auxCount = 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1lbnUuY2ZnLmpzIiwidGhlbWUuY2ZnLmpzIiwidmlsb2JpLmNmZy5qcyIsImNvbnRyb2xsZXJzL2JpZ1NjcmVlbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZS5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFjaGluZVJlZ3VsYXIuY3RybC5qcyIsImNvbnRyb2xsZXJzL21hY2hpbmVzUmVndWxhci5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWFpbi5jdHJsLmpzIiwiY29udHJvbGxlcnMvbWVudS5jdHJsLmpzIiwiY29udHJvbGxlcnMvc3VwZXJNYWNoaW5lLmN0cmwuanMiLCJjb250cm9sbGVycy9zdXBlcnZpc29yLmN0cmwuanMiLCJkaXJlY3RpdmVzL3NmQ2xvY2suanMiLCJzZXJ2aWNlcy9kcml2ZXIuc3J2LmpzIiwic2VydmljZXMvbWFjaGluZVN0YXRlLnNydi5qcyIsInNlcnZpY2VzL29mU2VydmVyLmpzIiwic2VydmljZXMvc3VwZXJ2aXNvci5zcnYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdKQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InZpbG9iaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnLFsndWkucm91dGVyJywnbmdNYXRlcmlhbCcsJ3Nhc3Jpby5hbmd1bGFyLW1hdGVyaWFsLXNpZGVuYXYnXSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcixzc1NpZGVOYXZTZWN0aW9uc1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgc3NTaWRlTmF2U2VjdGlvbnNQcm92aWRlci5pbml0V2l0aFRoZW1lKCRtZFRoZW1pbmdQcm92aWRlcik7XHJcbiAgICAgICAgICAgIHNzU2lkZU5hdlNlY3Rpb25zUHJvdmlkZXIuaW5pdFdpdGhTZWN0aW9ucyhbe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAgICAgICAgICdIb21lJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAgICAgICAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6ICAgICAgJ2NvbW1vbi5ob21lJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAgICAgICAnbGluaydcclxuICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAgICAgICAgICdTdXBlcnZpc29yJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAgICAgICAnU3VwZXJ2aXNvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6ICAgICAgJ2NvbW1vbi5zdXBlcnZpc29yJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAgICAgICAnbGluaydcclxuICAgICAgICAgICAgICAgIH1dKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RhcmstZ3JleScpLmJhY2tncm91bmRQYWxldHRlKCdncmV5JykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1vcmFuZ2UnKS5iYWNrZ3JvdW5kUGFsZXR0ZSgnb3JhbmdlJykuZGFyaygpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGFyay1wdXJwbGUnKS5iYWNrZ3JvdW5kUGFsZXR0ZSgnZGVlcC1wdXJwbGUnKS5kYXJrKCk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkYXJrLWJsdWUnKS5iYWNrZ3JvdW5kUGFsZXR0ZSgnYmx1ZScpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RhcmstcmVkJykuYmFja2dyb3VuZFBhbGV0dGUoJ3JlZCcpLmRhcmsoKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gICAgICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ2JsdWUnKVxyXG4gICAgICAgICAgICAuYWNjZW50UGFsZXR0ZSgnb3JhbmdlJyk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdtYWNoaW5lUGFsZXRlJywge1xyXG4gICAgICAgICAgICAnNTAnOiAnZmZjZGQyJyxcclxuICAgICAgICAgICAgICAgICcxMDAnOiAnZmZjZGQyJyxcclxuICAgICAgICAgICAgICAgICcyMDAnOiAnZWY5YTlhJyxcclxuICAgICAgICAgICAgICAgICczMDAnOiAnZTU3MzczJyxcclxuICAgICAgICAgICAgICAgICc0MDAnOiAnZWY1MzUwJyxcclxuICAgICAgICAgICAgICAgICc1MDAnOiAnZjQ0MzM2JyxcclxuICAgICAgICAgICAgICAgICc2MDAnOiAnZTUzOTM1JyxcclxuICAgICAgICAgICAgICAgICc3MDAnOiAnZDMyZjJmJyxcclxuICAgICAgICAgICAgICAgICc4MDAnOiAnYzYyODI4JyxcclxuICAgICAgICAgICAgICAgICc5MDAnOiAnYjcxYzFjJyxcclxuICAgICAgICAgICAgICAgICdBMTAwJzogJzAwMDAwMCcsICAvLyBCYWNrZ3JvdW5kIENvbG9yXHJcbiAgICAgICAgICAgICAgICAnQTIwMCc6ICdmZjUyNTInLFxyXG4gICAgICAgICAgICAgICAgJ0E0MDAnOiAnZmYxNzQ0JyxcclxuICAgICAgICAgICAgICAgICdBNzAwJzogJ2Q1MDAwMCcsXHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLCAgICAvLyB3aGV0aGVyLCBieSBkZWZhdWx0LCB0ZXh0IChjb250cmFzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIHRoaXMgcGFsZXR0ZSBzaG91bGQgYmUgZGFyayBvciBsaWdodFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFsnNTAnLCAnMTAwJywgLy9odWVzIHdoaWNoIGNvbnRyYXN0IHNob3VsZCBiZSAnZGFyaycgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgJzIwMCcsICczMDAnLCAnNDAwJywgJ0ExMDAnXSxcclxuICAgICAgICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogdW5kZWZpbmVkIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ21hY2hpbmUnKVxyXG4gICAgICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ2JsdWUnKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ21hY2hpbmVQYWxldGUnKTtcclxuXHJcblxyXG4gICAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdicmVhZGNydW1ic1BhbGV0dGVOYW1lJywge1xyXG4gICAgICAgICAgICAgICAgJzUwJzogJ0ZGRkZGRicsXHJcbiAgICAgICAgICAgICAgICAnMTAwJzogJ2ZmY2RkMicsXHJcbiAgICAgICAgICAgICAgICAnMjAwJzogJ2VmOWE5YScsXHJcbiAgICAgICAgICAgICAgICAnMzAwJzogJ2U1NzM3MycsXHJcbiAgICAgICAgICAgICAgICAnNDAwJzogJ2VmNTM1MCcsXHJcbiAgICAgICAgICAgICAgICAnNTAwJzogJ2Y0NDMzNicsXHJcbiAgICAgICAgICAgICAgICAnNjAwJzogJ2U1MzkzNScsXHJcbiAgICAgICAgICAgICAgICAnNzAwJzogJ2QzMmYyZicsXHJcbiAgICAgICAgICAgICAgICAnODAwJzogJ2M2MjgyOCcsXHJcbiAgICAgICAgICAgICAgICAnOTAwJzogJ2I3MWMxYycsXHJcbiAgICAgICAgICAgICAgICAnQTEwMCc6ICdmZjhhODAnLFxyXG4gICAgICAgICAgICAgICAgJ0EyMDAnOiAnZmY1MjUyJyxcclxuICAgICAgICAgICAgICAgICdBNDAwJzogJ2ZmMTc0NCcsXHJcbiAgICAgICAgICAgICAgICAnQTcwMCc6ICdkNTAwMDAnLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JywgICAgLy8gd2hldGhlciwgYnkgZGVmYXVsdCwgdGV4dCAoY29udHJhc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbiB0aGlzIHBhbGV0dGUgc2hvdWxkIGJlIGRhcmsgb3IgbGlnaHRcclxuICAgICAgICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbJzUwJywgJzEwMCcsIC8vaHVlcyB3aGljaCBjb250cmFzdCBzaG91bGQgYmUgJ2RhcmsnIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgICAgICcyMDAnLCAnMzAwJywgJzQwMCcsICdBMTAwJ10sXHJcbiAgICAgICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IHVuZGVmaW5lZCAgICAvLyBjb3VsZCBhbHNvIHNwZWNpZnkgdGhpcyBpZiBkZWZhdWx0IHdhcyAnZGFyaydcclxuICAgICAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnYnJlYWRjcnVtYnMnKVxyXG4gICAgICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ2JyZWFkY3J1bWJzUGFsZXR0ZU5hbWUnLCB7XHJcbiAgICAgICAgICAgICAgICAnZGVmYXVsdCc6ICc1MCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdwcm9jZXNzJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdncmVlbicpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnc2V0dXAnKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2FtYmVyJyk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdwdWxsJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdibHVlJyk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdlbmQnKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ3JlZCcpO1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnbmNkb3duJylcclxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdvcmFuZ2UnKTtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2Rvd24nKVxyXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2RlZXAtb3JhbmdlJyk7XHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdlcnJvcicpXHJcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnZ3JleScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5hbHdheXNXYXRjaFRoZW1lKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL1wiKTtcclxuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnLyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24nICx7XHJcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL19jb21tb24uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWVudUNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLmhvbWUnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAndGVtcGxhdGVzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnaG9tZSdcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLm1hY2hpbmUnICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL21hY2hpbmUvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9tYWNoaW5lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnYml0U2NyZWVuQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdtYWNoaW5lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5tYWNoaW5lUmVndWxhcicgLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgOiAgICcvbWFjaGluZVJlZ3VsYXIvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9tYWNoaW5lUmVndWxhci5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ21hY2hpbmVSZWd1bGFyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBicmVhZENydW1icyA6ICdtYWNoaW5lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbW1vbi5tYWNoaW5lc1JlZ3VsYXInICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL21hY2hpbmVzUmVndWxhci86aWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL21hY2hpbmVzUmVndWxhci5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ21hY2hpbmVzUmVndWxhckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnbWFjaGluZXMnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tbW9uLnN1cGVydmlzb3InICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL3N1cGVydmlzb3InLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgICAgOiAgICcvdGVtcGxhdGVzL3N1cGVydmlzb3IyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlciAgICAgIDogICAnc3VwZXJ2aXNvckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnc3VwZXJ2aXNvcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21tb24uc3VwZXJ2aXNvck1hY2hpbmUnICwge1xyXG4gICAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgIDogICAnL3N1cGVydmlzb3IvOmlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsICAgIDogICAnL3RlbXBsYXRlcy9zdXBlcnZpc29yTWFjaGluZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIgICAgICA6ICAgJ3N1cGVyTWFjaGluZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgYnJlYWRDcnVtYnMgOiAnZGV0YWxsIHN1cGVydmlzb3InXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfSkiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdiaXRTY3JlZW5Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJHN0YXRlUGFyYW1zLCBvZlNydiAsIG1hY2hpbmVTdGF0ZVNydiAsZHJpdmVyU3J2LCAkbG9jYXRpb24sICRzdGF0ZSwgJGludGVydmFsLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgc3VwZXJ2aXNvclNydiApIHtcclxuICAgICAgICB2YXIgdXJsID0gJGxvY2F0aW9uLmFic1VybCgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgdmFyIG1hY2hpbmUgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvID0ge307XHJcbiAgICAgICAgJHNjb3BlLnNmRmlyc3QgPVtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lT3V0Jyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5nb0JhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lT3V0Jyk7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IGRyaXZlclNydi5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKHN0YXRlLmlkLHsnaWQnOnN0YXRlLnBhcmFtfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLypcclxuICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lLycrdXJsW3VybC5sZW5ndGggLTFdKVxyXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihzZikge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPCggc2YubGVuZ3RoIDw1ID8gc2YubGVuZ3RoOjUpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdFtpXSA9IHNmW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG1hY2hpbmVOb3coKSB7XHJcbiAgICAgICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZU9uZShtYWNoaW5lKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWFjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lSW5mbyA9IG1hY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvWydvZlN0YXRlJ10gPSBtYWNoaW5lU3RhdGVTcnYuZ2V0KG1hY2guc3RhdHVzKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWNoLnF1YW50aXR5UGxhbm5lZCAmJiBtYWNoLnF1YW50aXR5UGxhbm5lZCAhPSAwICYmIG1hY2gub2ZDb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZUluZm9bJ29mQ29tcGxldGVkUGVyY2VudCddID0gbWFjaC5vZkNvbXBsZXRlZCoxMDAvbWFjaC5xdWFudGl0eVBsYW5uZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lLycrbWFjaGluZSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHNmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF1eCA9IHNmO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdXhzZkZpcnN0ID0gW11cclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTwoIHNmLmxlbmd0aCA8MTAgPyBzZi5sZW5ndGg6MTApOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hdXhbaV1bJ2F2YWxpYWJsZSddID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV4c2ZGaXJzdFtpXSA9IGF1eFtpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3QgPSBhdXhzZkZpcnN0O1xyXG4gICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRTRiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnQgPTBcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY29udCA8IDYgJiYgY29udFNGIDwgc2YubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3IERhdGUoYXV4W2NvbnRTRl1bJ0RBVEFTVEFSVCddKSA+IERhdGUubm93KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eHNmRmlyc3RbY29udCsrXSA9IGF1eFtjb250U0YrK107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250U0YrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0ID0gYXV4c2ZGaXJzdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2ZTcnYubWF0ZXJpYWxBdmFsaWFibGUoYXV4c2ZGaXJzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkLmZvckVhY2goZnVuY3Rpb24oZWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS5hdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5hdmFsaWFibGUuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlbGVtZW50LmF2YWxpYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnZW5kJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdWydzZW1hcGhvciddID0gJ25jZG93bic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XVsnc2VtYXBob3InXSA9ICdwcm9jZXNzJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IGRkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICBcclxuICAgICAgICBtYWNoaW5lTm93KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGludGVydmFsKG1hY2hpbmVOb3csNjAwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbi8qXHJcbiAgICAgICBmdW5jdGlvbiBtYWNoaW5lTm93KCkge1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL25hbWUvJyArIHVybFt1cmwubGVuZ3RoIC0xIF0pXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoID4wICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZU5hbWUgPSBuYW1lWzBdWydOQU1FJ107ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVOYW1lID0gXCJFcnJvciFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4uLy4uL2FwaS9tYWNoaW5lL2FjdHVhbC8nK3VybFt1cmwubGVuZ3RoIC0xXSlcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZBY3R1YWwgPSBuYW1lWzBdWydQck9kSWQnXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZPcHIgPSBuYW1lWzBdWydPcHJOdW0nXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZTdGF0ZSA9IG5hbWVbMF1bJ0xhc3RUaW1lSm9iVHlwZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL29mL2Rlc2MvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZEZXNjcmlwdGlvbiA9IGRlc2NbMF1bJ0l0ZW1EZXNjJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3NsaXQvJytuYW1lWzBdWydQck9kSWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWVbMF1bJ09wck51bSddID09IDEwICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoJHNjb3BlLm1hY2hpbmVOYW1lICE9ICdJTktNQUtFUicgICYmICRzY29wZS5tYWNoaW5lTmFtZSAhPSAnTk9NQU4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICRzY29wZS5tYWNoaW5lTmFtZSAhPSAnTUFOJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBJZiBPRiBpcyBpbiBzdGF0ZSAxMCBvciBtYWNoaW5lIGlkIGlzIGRpZmVyZW50IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgSU5LTUFLRVIgd2UgbmVlZCBmaW5kIG91dCBxdWFudGl0eSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGFub3RoZXIgdGFibGU6IFByT2RCT01cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAvKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRodHRwLmdldCgnLi4vYXBpL3ByaW50ZXIvJyArIG5hbWVbMF1bJ1ByT2RJZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKHEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZlF0eVBsYW5uZWQgPSBxWzBdWydxdWFudGl0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mUXR5UGxhbm5lZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUub2ZRdHlQbGFubmVkID0gcXR5WzBdWydPcmRlclF0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJy4uL2FwaS9vZi9jb21wbGV0ZWQvJytuYW1lWzBdWydQck9kSWQnXSsnLycrbmFtZVswXVsnT3ByTnVtJ10rJy8nICArdXJsW3VybC5sZW5ndGggLTFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGNvbXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXAubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5vZkNvbXBsZXRlZCA9IGNvbXBbMF1bJ1N0a1F0eSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9mQ29tcGxldGVkUGVyY2VudCA9IGNvbXBbMF1bJ1N0a1F0eSddKjEwMC9xdHlbMF1bJ09yZGVyUXR5J107ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICovIiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInICwgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdtYWNoaW5lUmVndWxhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGVQYXJhbXMsICRsb2NhdGlvbiwgJHN0YXRlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCAkcSwgZHJpdmVyU3J2LCBtYWNoaW5lU3RhdGVTcnYsc3VwZXJ2aXNvclNydixvZlNydikge1xyXG4gICAgICAgIHZhciBtYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lSW5mbyA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zZkZpcnN0ID0gW107XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5nb1N1cGVydmlzb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmdvQmlnU2NyZWVuID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQoJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdNYWNoaW5lJyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmdvQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlID0gZHJpdmVyU3J2LmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUuaWQseydpZCc6c3RhdGUucGFyYW19KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWFjaGluZU5vdygpIHtcclxuICAgICAgICAgICAgc3VwZXJ2aXNvclNydi5tYWNoaW5lT25lKG1hY2hpbmUpXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtYWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmVJbmZvID0gbWFjaDtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZUluZm9bJ29mU3RhdGUnXSA9IG1hY2hpbmVTdGF0ZVNydi5nZXQobWFjaC5zdGF0dXMpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hY2gucXVhbnRpdHlQbGFubmVkICYmIG1hY2gucXVhbnRpdHlQbGFubmVkICE9IDAgJiYgbWFjaC5vZkNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lSW5mb1snb2ZDb21wbGV0ZWRQZXJjZW50J10gPSBtYWNoLm9mQ29tcGxldGVkKjEwMC9tYWNoLnF1YW50aXR5UGxhbm5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICRodHRwLmdldCgnLi4vLi4vYXBpL21hY2hpbmUvJyttYWNoaW5lKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oc2YpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXV4ID0gc2Y7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF1eHNmRmlyc3QgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPCggc2YubGVuZ3RoIDwxMCA/IHNmLmxlbmd0aDoxMCk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2F1eFtpXVsnYXZhbGlhYmxlJ10gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXhzZkZpcnN0W2ldID0gYXV4W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IGF1eHNmRmlyc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udFNGID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udCA9MFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChjb250IDwgMjAgJiYgY29udFNGIDwgc2YubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3IERhdGUoYXV4W2NvbnRTRl1bJ0RBVEFTVEFSVCddKSA+IERhdGUubm93KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eHNmRmlyc3RbY29udCsrXSA9IGF1eFtjb250U0YrK107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250U0YrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZkZpcnN0ID0gYXV4c2ZGaXJzdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2ZTcnYubWF0ZXJpYWxBdmFsaWFibGUoYXV4c2ZGaXJzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkLmZvckVhY2goZnVuY3Rpb24oZWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS5hdmFsaWFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5hdmFsaWFibGUuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlbGVtZW50LmF2YWxpYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVtpbmRleF1bJ3NlbWFwaG9yJ10gPSAnZW5kJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaW5kZXhdWydzZW1hcGhvciddID0gJ25jZG93bic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XVsnc2VtYXBob3InXSA9ICdwcm9jZXNzJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdCA9IGRkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbWFjaGluZU5vdygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXNBbGxUaW1lciA9ICRpbnRlcnZhbChtYWNoaW5lTm93LDEwMDAwMCk7XHJcbiAgICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiAgICBhIFJFVklTQVJcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIG9mU3J2Lm1hdGVyaWFsQXZhbGlhYmxlKGF1eFtpXS5PRilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGF2YWxpYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF2YWxpYWJsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqPTA7IGogPCBhdmFsaWFibGUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhdGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2ZGaXJzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF2YWxpYWJsZVtqXVsnQXZhbGFpYmxlJ10gPD0gKGF2YWxpYWJsZVtqXVsnUmVxdWlyZWRRdHknXS8yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2ZGaXJzdFtpXVsnYXZhbGlhYmxlJ10gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGF2YWxpYWJsZVtqXVsnQXZhbGFpYmxlJ10gPiAoYXZhbGlhYmxlW2pdWydSZXF1aXJlZFF0eSddLzIpKSAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGF2YWxpYWJsZVtqXVsnQXZhbGFpYmxlJ10gPCBhdmFsaWFibGVbal1bJ1JlcXVpcmVkUXR5J10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhdXhbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3RbaV1bJ2F2YWxpYWJsZSddID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuc2ZGaXJzdFtpXVsnYXZhbGlhYmxlJ10gIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNmRmlyc3RbaV1bJ2F2YWxpYWJsZSddID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgKi8iLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdtYWNoaW5lc1JlZ3VsYXJDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgc3VwZXJ2aXNvclNydiwgbWFjaGluZVN0YXRlU3J2LCAkc3RhdGVQYXJhbXMsICRsb2NhdGlvbiwgJHN0YXRlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkbWRTaWRlbmF2LCBkcml2ZXJTcnYpIHtcclxuICAgICAgICB2YXIgbWFjaGluZSA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICB2YXIgbWFjaGluZXMgPSBbXTtcclxuICAgICAgICB2YXIgaW50ZXJ2YWxNYWNoaW5lcztcclxuICAgICAgICAkc2NvcGUubWFjaGluZXMgPSBbXTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmdvU3VwZXJ2aXNvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0KGxvY2F0ZSk7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24uc3VwZXJ2aXNvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZHJpdmVyU3J2LmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yTWFjaGluZScseydpZCc6ZHJpdmVyU3J2LmdldCgpfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLmdvID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSwkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZVJlZ3VsYXInLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ29CaWdTY3JlZW4gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lLCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGVtaXQoJ01hY2hpbmUnKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLm1hY2hpbmUnLHsnaWQnOmxvY2F0ZX0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgXHJcblxyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBtYWNoaW5lTm93KCkge1xyXG4gICAgICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzQWxsKCRzdGF0ZVBhcmFtcy5pZClcclxuICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihtYWNoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWFjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hY2guZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXNbaW5kZXhdID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lc1tpbmRleF1bJ29mU3RhdGUnXSA9IG1hY2hpbmVTdGF0ZVNydi5nZXQoZWxlbWVudC5zdGF0dXMpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnF1YW50aXR5UGxhbm5lZCAmJiBlbGVtZW50LnF1YW50aXR5UGxhbm5lZCAhPSAwICYmIGVsZW1lbnQub2ZDb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZXNbaW5kZXhdWydvZkNvbXBsZXRlZFBlcmNlbnQnXSA9IGVsZW1lbnQub2ZDb21wbGV0ZWQqMTAwL2VsZW1lbnQucXVhbnRpdHlQbGFubmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbWFjaGluZU5vdygpO1xyXG4gICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXNBbGxUaW1lciA9ICRpbnRlcnZhbChtYWNoaW5lTm93LDUwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInICwgZnVuY3Rpb24oJHNjb3BlLCRyb290U2NvcGUsIHN1cGVydmlzb3JTcnYpIHtcclxuICAgICAgICAkc2NvcGUuYm9keVN0eWxlID0gJyc7XHJcbiAgICAgICAgJHNjb3BlLnNob3dNZW51ID0gdHJ1ZTtcclxuICAgICAgICAkc2NvcGUuYnJlYWRjcnVtYnMgPSAnaG9tZSc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2hhbmdlIGJvZHkgY29sb3InKTtcclxuICAgICAgICAgICAgJHNjb3BlLmJvZHlTdHlsZSA9ICd2aWxvYmlNYWNoaW5lJztcclxuICAgICAgICAgICAgJHNjb3BlLnNob3dNZW51ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5iY2tncm5kVGhlbWUgPSAnbWFjaGluZSc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzY29wZS4kb24oJ01hY2hpbmVPdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmJvZHlTdHlsZSA9ICcnOyBcclxuICAgICAgICAgICAgJHNjb3BlLnNob3dNZW51ID0gdHJ1ZTtcclxuICAgICAgICAgICAgJHNjb3BlLmJja2dybmRUaGVtZSA9ICdkZWZhdWx0J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmJyZWFkY3J1bWJzID0gdG9TdGF0ZS5uYW1lO1xyXG4gICAgICAgICAgICBzdXBlcnZpc29yU3J2LmtpbGxUaW1lcnMoKTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gZHJpdmVyU3J2LmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIT0xBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBIScpXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oc3RhdGUuaWQseydpZCc6c3RhdGUucGFyYW19KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ZpbG9iaUFwcCcpXHJcbiAgICAuY29udHJvbGxlcignbWVudUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoXHJcbiAgICAgICAgICAgICRzY29wZSxcclxuICAgICAgICAgICAgJG1kU2lkZW5hdixcclxuICAgICAgICAgICAgJHRpbWVvdXQsXHJcbiAgICAgICAgICAgICRyb290U2NvcGUsXHJcbiAgICAgICAgICAgICRzdGF0ZSxcclxuICAgICAgICAgICAgc3NTaWRlTmF2LFxyXG4gICAgICAgICAgICBzc1NpZGVOYXZTaGFyZWRTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLm1hY2hpbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmJyZWFkQ3J1bWJzID0gICRzdGF0ZS5jdXJyZW50LmJyZWFkQ3J1bWJzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLm9uQ2xpY2tNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZScsZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWFjaGluZSA9IHRydWU7ICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJHNjb3BlLiRvbignTWFjaGluZU91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICRzY29wZS5tZW51ID0gc3NTaWRlTmF2O1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpeyBcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYnJlYWRDcnVtYnMgPSB0b1N0YXRlLmJyZWFkQ3J1bWJzO1xyXG4gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3N1cGVyTWFjaGluZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsIHN1cGVydmlzb3JTcnYsIGRyaXZlclNydiwgJHN0YXRlUGFyYW1zLCRzdGF0ZSkge1xyXG4gICAgICAgICRzY29wZS5tYWNoaW5lID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICRzY29wZS5nbyA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSwkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5tYWNoaW5lUmVndWxhcicseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuZ29CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnY29tbW9uLnN1cGVydmlzb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICRzY29wZS5nb0JpZ1NjcmVlbiA9IGZ1bmN0aW9uKGxvY2F0ZSkge1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSwkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGVtaXQoJ01hY2hpbmUnKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZScseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzdXBlcnZpc29yU3J2Lm1hY2hpbmVzKCRzdGF0ZVBhcmFtcy5pZClcclxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24obWFjaGluZXMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5tYWNoaW5lcyA9IG1hY2hpbmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3N1cGVydmlzb3JDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLHN1cGVydmlzb3JTcnYsIGRyaXZlclNydiwkc3RhdGUpIHtcclxuICAgICAgICAkc2NvcGUuZ28gPSBmdW5jdGlvbihsb2NhdGUpIHtcclxuICAgICAgICAgICAgZHJpdmVyU3J2LnNldChsb2NhdGUpO1xyXG4gICAgICAgICAgICBkcml2ZXJTcnYuc2V0U3RhdGUoJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2NvbW1vbi5zdXBlcnZpc29yTWFjaGluZScseydpZCc6bG9jYXRlfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuZ29HZW5lcmFsID0gZnVuY3Rpb24obG9jYXRlKSB7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXQobG9jYXRlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHN0YXRlLmN1cnJlbnQubmFtZSk7XHJcbiAgICAgICAgICAgIGRyaXZlclNydi5zZXRTdGF0ZSgkc3RhdGUuY3VycmVudC5uYW1lKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdjb21tb24ubWFjaGluZXNSZWd1bGFyJyx7J2lkJzpsb2NhdGV9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN1cGVydmlzb3JTcnYuZGVwYXJ0YW1lbnRzKClcclxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGVwdHMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5kZXB0cyA9IGRlcHRzO1xyXG4gICAgICAgICAgICAgICAgZGVwdHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVydmlzb3JTcnYubWFjaGluZXMoZWxlbWVudC5XQ0dyb3VwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkZXB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGVwdHNbaW5kZXhdWydtYWNoaW5lcyddID0gZGVwdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5kaXJlY3RpdmUoJ3NmQ2xvY2snLCBmdW5jdGlvbiAoJGludGVydmFsLCBkYXRlRmlsdGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3BUaW1lO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVUaW1lKCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC50ZXh0KGRhdGVGaWx0ZXIobmV3IERhdGUoKSwgJ2RkL01NL3l5eXkgSEg6bW06c3MnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN0b3BUaW1lID0gJGludGVydmFsKGZ1bmN0aW9uKCkgeyB1cGRhdGVUaW1lKCl9LCAxMDAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHN0b3BUaW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5zZXJ2aWNlKCdkcml2ZXJTcnYnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgIHRoaXMubGFzdElkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxhc3RTdGF0ZSA9IFtdXHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5zZXQgPSBmdW5jdGlvbihsYXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdElkID0gbGFzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlID0gZnVuY3Rpb24obGFzdCxwYXJhbSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0ZS5wdXNoKHsnaWQnOmxhc3QsJ3BhcmFtJzpwYXJhbX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFN0YXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RTdGF0ZS5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5zZXJ2aWNlKCdtYWNoaW5lU3RhdGVTcnYnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmdldCA9IGZ1bmN0aW9uKHN0YXRlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBhdXggPSB7fTtcclxuICAgICAgICAgICAgaWYgKCFzdGF0ZSkgc3RhdGU9Jyc7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdEb3duJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdQYXJhdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfdGh1bWJfZG93bl9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ2Rvd24nXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdQdWxsJzpcclxuICAgICAgICAgICAgICAgICAgICBhdXgubmFtZSA9ICdQVUxMJztcclxuICAgICAgICAgICAgICAgICAgICBhdXguaWNvbiA9ICdpY19nZXRfYXBwX2JsYWNrXzE4cHguc3ZnJztcclxuICAgICAgICAgICAgICAgICAgICBhdXgudGhlbWUgPSAncHVsbCdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ05DRG93bic6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAncGFyYXQgc2Vuc2UgY2FycmVjJztcclxuICAgICAgICAgICAgICAgICAgICBhdXguaWNvbiA9ICdpY19zeW5jX2Rpc2FibGVkX2JsYWNrXzE4cHguc3ZnJztcclxuICAgICAgICAgICAgICAgICAgICBhdXgudGhlbWUgPSAnbmNkb3duJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kIG9mIE9wZXJhdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAnZmluYWwgb3BlcmFjacOzJztcclxuICAgICAgICAgICAgICAgICAgICBhdXguaWNvbiA9ICdpY19kb25lX2JsYWNrXzE4cHguc3ZnJztcclxuICAgICAgICAgICAgICAgICAgICBhdXgudGhlbWUgPSAnZW5kJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnU2V0dXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eC5uYW1lID0gJ21hbnRlbmltZW50JztcclxuICAgICAgICAgICAgICAgICAgICBhdXguaWNvbiA9ICdpY19idWlsZF9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ3NldHVwJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnUHJvY2Vzcyc6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lm5hbWUgPSAnZW4gcHJvY8Opcyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4Lmljb24gPSAnaWNfbG9vcF9ibGFja18xOHB4LnN2Zyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV4LnRoZW1lID0gJ3Byb2Nlc3MnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGF1eCA9IHsnbmFtZSc6J2Rlc2NvbmVndXQnLCdpY29uJzonaWNfZXJyb3JfYmxhY2tfMThweC5zdmcnLCAndGhlbWUnIDogJ2Vycm9yJ307XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGF1eDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgndmlsb2JpQXBwJylcclxuICAgIC5zZXJ2aWNlKCdvZlNydicsIGZ1bmN0aW9uKCRodHRwLCAkcSkge1xyXG4gICAgICAgIHZhciB1cmxCYXNlID0gJy4uLy4uL2FwaS9ib20vJztcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgIFxyXG4gICAgICAgIHRoaXMubWF0ZXJpYWxBdmFsaWFibGUgPSBmdW5jdGlvbihvZnMpIHtcclxuICAgICAgICAgICAgdmFyIGF1eENvdW50ID0gMTtcclxuICAgICAgICAgICAgb2ZzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQodXJsQmFzZSArIGVsZW1lbnQuT0YpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oYm9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdXhBdmFsaWFibGU9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9tLmxlbmd0aCA9PSAwICkgYXV4QXZhbGlhYmxlLnB1c2goeydpdGVtSWQnOidObyBoaSBoYScsICdhdmFsaWFibGUnOjN9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9tLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBBY2NvcmRpbmcgdG8gXCJSZXF1aXJlZFF0eVwiIGFuZCBcIkF2YWxhaWJsZVwiIHJlbGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBzZXQgdXAgdGhlIGZsYWc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAyLi0gZ3JlZW4gZmxhZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICogICAgICAgICAgMS4tIG9yYW5nZSBmbGFnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAgICAgICAgICAwLi0gcmVkIGZsYWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICovICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdXhCb20gPSB7J2l0ZW1JZCcgOiBlbGVtZW50WydJdGVtSWQnXSwgJ2F2YWxpYWJsZScgOiAwfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50WydSZXF1aXJlZFF0eSddIDw9IGVsZW1lbnRbJ0F2YWxhaWJsZSddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4Qm9tWydhdmFsaWFibGUnXSA9ICAyOyAgLy8gU2VtYWZvciB2ZXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnRbJ1JlcXVpcmVkUXR5J10gPiBlbGVtZW50WydBdmFsYWlibGUnXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydSZXF1aXJlZFF0eSddIDw9IChlbGVtZW50WydBdmFsYWlibGUnXS8yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1eEJvbVsnYXZhbGlhYmxlJ10gPSAgMTsgIC8vIFNlbWFmb3IgdGFyb25qYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV4QXZhbGlhYmxlLnB1c2goYXV4Qm9tKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XVsnYXZhbGlhYmxlJ10gPSBhdXhBdmFsaWFibGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK2F1eENvdW50ID09IGFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShhcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCd2aWxvYmlBcHAnKVxyXG4gICAgLmZhY3RvcnkoJ3N1cGVydmlzb3JTcnYnLCBmdW5jdGlvbigkaHR0cCwgJGludGVydmFsKSB7XHJcbiAgICAgICAgdmFyIHVybEJhc2UgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdCc7XHJcbiAgICAgICAgdmFyIGRlcHRBbGwgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdGFsbCc7XHJcbiAgICAgICAgdmFyIGRlcHRPbmUgPSAnLi4vLi4vYXBpL3N1cGVydmlzb3IvZGVwdG9uZSc7XHJcbiAgICAgXHJcbiAgICAgICAgdGhpcy5kZXBhcnRhbWVudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmxCYXNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lcyA9IGZ1bmN0aW9uKGRlcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmxCYXNlKycvJytkZXB0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lc0FsbCA9IGZ1bmN0aW9uKGRlcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChkZXB0QWxsICsgJy8nICsgZGVwdClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWNoaW5lT25lID0gZnVuY3Rpb24obWFjaCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkZXB0T25lICsgJy8nICsgbWFjaCk7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoZGVwdE9uZSArICcvJyArIG1hY2gpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFjaGluZXNBbGxUaW1lcj0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5raWxsVGltZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hY2hpbmVzQWxsVGltZXIpXHJcbiAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHRoaXMubWFjaGluZXNBbGxUaW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
