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
        this.setState = function(last) {
            this.lastState.push(last);
            console.log(this.lastState);
        }
        this.getState = function() {
            return this.lastState.pop();
        }
        return this;
    });