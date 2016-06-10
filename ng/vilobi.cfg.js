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