
/**
 * This function convert an OF's array  to an array with all 
 * OF's information formated with this information:
 * MACHINE: machine id 
 * OF: of number
 * DESCRIPTION: of description
 * DATESETUP: Setup Date
 * SETUP: only datasetup hour in string format
 * DATESTART: Start Date 
 * START: only datastart hour in string format
 * @param {array} info - Array with OF information
 */
function generateOnLine(info) {
                    var i = 0,
                        iaux,
                        aux = [];
                    /**
                     * This function return a string with the hour
                     * from the fields FROMTIME and TOTIME in the 
                     * Data base
                     * @param {time} h 
                     */
                    function hour(h) {
                        var aux     = Math.floor(h/60/60) < 1 ? 0 : Math.floor(h/60/60);
                        var aux2    = Math.floor((h/60- Math.floor(h/60/60)*60));
                        return (aux < 10 ?("" +(100 + aux)).slice(1) : "" + aux) + ':' + (aux2 < 10 ?("" +(100 + aux2)).slice(1) : "" + aux2);
                    }
                    
                    /**
                     * This function create a javascript date format from 
                     * FROMDATE and FROMTIME stored in the data base, specific
                     * add hour and minutes to the data parameter
                     * @param {date} d FROMDATE
                     * @param {string} h FROMTIME 
                     */
                    function createDate(d,h) {
                        var dateout = d;
                        
                        var aux     = Math.floor(h/60/60) < 1 ? 0 : Math.floor(h/60/60);
                        var aux2    = Math.floor((h/60- Math.floor(h/60/60)*60)); 
                        dateout.setHours(aux);
                        dateout.setMinutes(aux2);
                        return dateout;
                    }
                        
                    while (info.length > i) {  /* For each file in         */
                        if (info[i].AFCPRODPOOLSSID == '') {
                            try {
                                iaux = i;
                                while (info[i].PRODID == info[iaux].PRODID) {
                                    i++;
                                    if (i >= info.length) {
                                        break;
                                    }
                                }
                                aux.push({'MACHINE' : info[iaux].WRKCTRID, 'OF':info[iaux].PRODID,'DESCRIPTION':info[iaux].NAME,'DATASETUP':createDate(info[iaux].FROMDATE,info[iaux].FROMTIME),'SETUP':hour(info[iaux].FROMTIME),'DATASTART':createDate(info[iaux].TODATE,info[iaux].TOTIME),'START':hour(info[iaux].TOTIME)});
                                i--;
                            } catch(err) {
                                aux.push({'MACHINE' : info[iaux].WRKCTRID, 'OF':info[iaux].PRODID,'DESCRIPTION':info[iaux].NAME,'DATASETUP':createDate(info[iaux].FROMDATE,info[iaux].FROMTIME),'SETUP':hour(info[iaux].FROMTIME),'DATASTART':createDate(info[iaux].TODATE,info[iaux].TOTIME),'START':hour(info[iaux].TOTIME)});
                                console.log(err);
                                break;
                            }    
                        } else {
                            
                            iaux = i;
                            while (info[i].AFCPRODPOOLSSID == info[iaux].AFCPRODPOOLSSID) {
                                i++;
                                if (i >= info.length) {
                                        break;
                                    }
                            }
                            aux.push({'MACHINE' : info[iaux].WRKCTRID, 'OF':info[iaux].AFCPRODPOOLSSID,'DESCRIPTION':info[iaux].NAME,'DATASETUP':createDate(info[iaux].FROMDATE,info[iaux].FROMTIME),'SETUP':hour(info[iaux].FROMTIME),'DATASTART':createDate(info[iaux].TODATE,info[iaux].TOTIME),'START':hour(info[iaux].TOTIME)});
                            i--;
                        }
                    i++;    
                    }
                    
                    return aux;
                }



var functions = {
    'generateOnLine' : generateOnLine
};
                


module.exports = functions