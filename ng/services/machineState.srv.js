angular.module('vilobiApp')
    .service('machineStateSrv', function() {
        
        this.getState = function(state) {
            var aux = {'name':'desconegut','icon':''}
            switch (state) {
                case 'DOWN':
                    aux.name = 'DOWN';
                    aux.icon = '';
                    break;
                case 'PULL':
                    aux.name = 'PULL';
                    aux.icon = '';
                    break;
                case 'NCDOWN':
                    aux.name = 'NCDOWN';
                    aux.icon = '';
                    break;
                case 'END OF OPERATION':
                    aux.name = 'END OF OPERATION';
                    aux.icon = '';
                    break;
                case 'SETUP':
                    aux.name = 'SETUP';
                    aux.icon = '';
                    break;
                case 'PROCESS':
                    aux.name = 'PROCESS';
                    aux.icon = '';
                    break;
            }
            return aux;
        }
        return this;
    });