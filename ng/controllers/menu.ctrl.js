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
            console.log($state);
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