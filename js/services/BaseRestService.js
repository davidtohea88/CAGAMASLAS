/* 
 * To change self license header, choose License Headers in Project Properties.
 * To change self template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

define(['ojs/ojcore' ,'knockout', 'services/configService','ojs/ojmodel'],
    function(oj,ko,config) {
        var BaseRestService = function(baseUrl, propertyId, objEnclosure) {
            var self = this;
            
            self.baseUrl = baseUrl;
            self.propertyId = propertyId;
            self.objectEnclosure = objEnclosure;
            
            self.createModel = function(){
                var baseModel  = oj.Model.extend({
                    urlRoot: config.serviceUrl+self.baseUrl,
                    customURL: function(operation,model,options){
                        if (operation === 'create'){
                            return {url: config.serviceUrl+self.baseUrl, type: 'PUT'};
                        }else if (operation === 'update'){
                            return {url: config.serviceUrl+self.baseUrl+"?"+propertyId+"="+options.recordID, type: 'PUT'};
                        }else if (operation === 'get'){
                            return {url: config.serviceUrl+self.baseUrl+"?"+propertyId+"="+options.recordID, type: 'GET'};
                        }
                    },
                    idAttribute: self.propertyId,
                    parse: function(resp){
                        var rec = {};
                        for(var prop in resp){
                            if (resp.hasOwnProperty(prop)){
                                if (resp[prop].hasOwnProperty("@nil") && resp[prop]["@nil"] === "true"){
                                    rec[prop] = undefined;
                                }else{
                                    rec[prop] = resp[prop];
                                }
                            }
                        }
                        return rec;
                    },
                    parseSave: function(rec){
                        var item = {};
                        item[self.objectEnclosure] = [rec];
                        return item;
                    }
                });
                return new baseModel();
            };
            
            self.createCollection = function(){
                var baseCollection = oj.Collection.extend({
                    url:   config.serviceUrl+self.baseUrl,
                    model: new self.createModel(),
                    parse: function(resp){
                        var rates = resp[self.objectEnclosure];
                        if (rates.length>0){
                            return rates;
                        }
                        return undefined;
                    }
                });
                return new baseCollection();
            };
            
            self.fetchAsLOV = function(labelProperty,valueProperty){
                return new Promise(function(resolve, reject) {
                    var collection = self.createCollection();
                    collection.fetch({
                        success: function(coll,resp){
                            var allData = collection.toJSON();
                            var result = [{label: '--Please Select--', value: undefined}];
                            
                            ko.utils.arrayForEach(allData,function(item){
                                if (item.active ==='Y'){
                                    var lbl = item[labelProperty];
                                    var val = item[valueProperty];
                                    result.push({label: lbl, value: val});
                                }
                            });
                            resolve(result);
                        },
                        error: function(coll,xhr){
                            reject("failed");
                        }
                    });
                });
            };
        };
        return BaseRestService;
});
