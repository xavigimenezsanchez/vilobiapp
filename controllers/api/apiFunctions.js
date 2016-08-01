var functions = {
    'generateOnLine' : function (info) {
                    var i = 0,
                        iaux,
                        aux = [];
                    function hour(h) {
                        var aux     = Math.floor(h/60/60) < 1 ? 0 : Math.floor(h/60/60);
                        var aux2    = Math.floor((h/60- Math.floor(h/60/60)*60));
                        
                        //return Math.floor(h/60/60) + ':' + Math.floor((h/60- Math.floor(h/60/60)*60));
                        return (aux < 10 ?("" +(100 + aux)).slice(1) : "" + aux) + ':' + (aux2 < 10 ?("" +(100 + aux2)).slice(1) : "" + aux2);
                    }
                    
                    function createDate(d,h) {
                        //var aux = new Date(d.substring(0,10) + ' ' + h);
                        
                        var aux     = Math.floor(h/60/60) < 1 ? 0 : Math.floor(h/60/60);
                        var aux2    = Math.floor((h/60- Math.floor(h/60/60)*60)); 
                        d.setHours(aux);
                        d.setMinutes(aux2);
                        return d;
                    }
                        
                    while (info.length > i) {        
                        if (info[i].AFCPRODPOOLSSID == '') {
                            try {
                                iaux = i;
                                while (info[i].PRODID == info[iaux].PRODID) {
                                    i++;
                                    if (i >= info.length) {
                                        break;
                                    }
                                }
                                //createDate(info[iaux].FROMDATE,hour(info[iaux].FROMTIME))
                                //if (info[iaux].PRODID== 'OFT046873') console.log('*********************************************************');
                                aux.push({'OF':info[iaux].PRODID,'DESCRIPTION':info[iaux].NAME,'DATASETUP':createDate(info[iaux].FROMDATE,info[iaux].FROMTIME),'SETUP':hour(info[iaux].FROMTIME),'DATASTART':createDate(info[iaux].TODATE,info[iaux].TOTIME),'START':hour(info[iaux].TOTIME)});
                                i--;
                            } catch(err) {
                                aux.push({'OF':info[iaux].PRODID,'DESCRIPTION':info[iaux].NAME,'DATASETUP':createDate(info[iaux].FROMDATE,info[iaux].FROMTIME),'SETUP':hour(info[iaux].FROMTIME),'DATASTART':createDate(info[iaux].TODATE,info[iaux].TOTIME),'START':hour(info[iaux].TOTIME)});
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
                            aux.push({'OF':info[iaux].AFCPRODPOOLSSID,'DESCRIPTION':info[iaux].NAME,'DATASETUP':createDate(info[iaux].FROMDATE,info[iaux].FROMTIME),'SETUP':hour(info[iaux].FROMTIME),'DATASTART':createDate(info[iaux].TODATE,info[iaux].TOTIME),'START':hour(info[iaux].TOTIME)});
                            i--;
                        }
                    i++;    
                    }
                    
                    return aux;
                }
};
                


module.exports = functions