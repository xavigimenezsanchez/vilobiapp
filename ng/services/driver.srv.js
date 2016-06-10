angular.module('vilobiApp')
    .service('driverSrv', function($http) {
        this.last = null;
     
        this.set = function(last) {
            this.last = last;
        }
        this.get = function() {
            return this.last;
        }
        return this;
    });