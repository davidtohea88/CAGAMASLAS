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
            
            var restUrl= "MD_RateType/RateTypeRestPS";
            
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
                idAttribute: "countryTypeId",
                parseSave: function(rec){
                    return {MdCountry: [rec]};
                }
            });
            var RateTypes = oj.Collection.extend({
                url:   config.serviceUrl+restUrl,
                model: new RateType(),
                parse: function(resp){
                    var rates = resp.MdCountry;
                    if (rates.length>0){
                        return rates;
                    }
                    return undefined;
                }
            });
            
            self.createModel = function(){
                return new RateType();
            };
            
            self.createCollection = function(){
                return new RateTypes();
            };
            
            self.fetchAsLOV = function(labelProperty,valueProperty){
                var collection = self.createCollection();
                collection.refresh().then(function(){
                    var allData = self.toJSON();
                    var result = [];
                    ko.utils.arrayForEach(allData,function(item){
                        if (item.active ==='Y'){
                            var lbl = item[labelProperty];
                            var val = item[valueProperty];
                            result.push({label: lbl, value: val});
                        }
                    });
                    return result;
                });
                return [];
            };
            
            
            
            
        };
        return new rateTypeService();
});
