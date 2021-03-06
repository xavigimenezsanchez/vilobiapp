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