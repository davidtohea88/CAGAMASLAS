/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

define(['ojs/ojcore' ,'knockout', 'services/configService','ojs/ojmodel'],
    function(oj,ko,config) {
        var rateTypeService = function() {
            /**
             * @private
             */
            var self = this;
            
            var restUrl= "rateType";
            
            var RateType  = oj.Model.extend({
                urlRoot: config.serviceUrl+restUrl,
                customURL: function(operation,model,options){
                    if (operation === 'create'){
                        return {url: config.serviceUrl+restUrl, type: 'PUT'};
                    }else if (operation === 'update'){
                        return {url: config.serviceUrl+restUrl+"?rateTypeId="+options.recordID, type: 'PUT'};
                    }else if (operation === 'get'){
                        return {url: config.serviceUrl+restUrl+"?rateTypeId="+options.recordID, type: 'GET'};
                    }
                },
                idAttribute: "rateTypeId",
                parseSave: function(rec){
                    return {MdRateType: [rec]};
                }
            });
            var RateTypes = oj.Collection.extend({
                url:   config.serviceUrl+restUrl,
                model: new RateType(),
                initialize: function(){
                    console.log("init");
                },
                parse: function(resp){
                    var rates = resp.MdRateType;
                    if (rates.length>0){
                        return rates;
                    }
                    return undefined;
                }
            });
            
            self.fetchAsLOV = function(labelProperty,valueProperty){
                var all = new self.RateTypes();
                var result = [];
                ko.utils.arrayForEach(all,function(item){
                    if (item.active ==='Y'){
                        var lbl = item[labelProperty];
                        var val = item[valueProperty];
                        result.push({label: lbl, value: val});
                    }
                });
                return result;
            };
            
            self.createCollection = function(){
                return new RateTypes();
            };
            
            self.createModel = function(){
                return new RateType();
            };
        };
        return new rateTypeService();
});
