var moment = require('moment');
var filterBuilder = {
    'buildFilterFromPrimeNgLazyEvent': buildFilterFromPrimeNgLazyEvent
};

module.exports = filterBuilder;

function buildFilterFromPrimeNgLazyEvent(aLazyEvt, opt){
    console.log(aLazyEvt);
    var optDef =  typeof opt  !== 'undefined' ?  opt  : {dateFields : []};
    var arr = {};
    for(var a in aLazyEvt.filters){
        if(isInDate(a, aLazyEvt.filters[a].value, optDef.dateFields)){
            arr[a] = moment(aLazyEvt.filters[a].value).toISOString();
            // arr[a] = moment(aLazyEvt.filters[a].value,"D_M_YYYY").toISOString();
        }else{
            arr[a] = { "$regex": aLazyEvt.filters[a].value, "$options": "i" };
        }
    }

    console.log(arr);
    return arr;
}

function isInDate(aFieldName, aFieldVal, aDtFieldsArray){
    return ((aDtFieldsArray.indexOf(aFieldName) > -1) && moment(aFieldVal).isValid());
    // return ((aDtFieldsArray.indexOf(aFieldName) > -1) && moment(aFieldVal,"D_M_YYYY").isValid());
}