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