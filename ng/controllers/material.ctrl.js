angular.module('vilobiApp')
    .controller('materialController', function($scope, $http, $stateParams ,$state) {
        $scope.material = [];
        $scope.$emit('WorkingOn');
        $http.get('./api/material/'+$stateParams.id)
            .then(function(res) {
                var auxIndex = 0;
                res.data.forEach(function(ele,index, array) {
                    if (new Date(ele['DATASTART']) > Date.now() && ele['material'].length > 0) {
                        if (ele.material) {
                            ele.material.forEach(function(ele1,index1, array1) {
                                ele.material[index1]['semaphor'] = 'semaphorRed';
                                if ( (ele1['RequiredQty'] <= ele1['Avalaible'])) {
                                    ele.material[index1]['semaphor'] = 'semaphorGreen';
                                } else if (ele1['RequiredQty'] > ele1['Avalaible'] &&
                                       ele1['RequiredQty'] <= (ele1['Avalaible']/2)) {
                                        ele.material[index1]['semaphor'] = 'semaphorOrange';
                                    }
                            });
                        }
                        $scope.material[auxIndex++] = ele;
                    }
                });
                $scope.$emit('WorkingOff');
            })
    });