/* 
 * To change self license header, choose License Headers in Project Properties.
 * To change self template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

define(['ojs/ojcore' ,'knockout', 'services/configService','ojs/ojmodel'],
    function(oj,ko,config) {
        var BaseRestService = function(url, propertyId, objEnclosure) {
            var self = this;
            
            self.getRestServiceUrl = function(restUrl){
                var url = config.serviceUrl+((config.serviceUrl[config.serviceUrl.length-1]==='/')?"":"/")+restUrl;
                var idx = url.indexOf('://');
                if (idx >= 0){
                    url = url.substr(0,idx)+'://'+url.substr(idx+3).replace('//','/');
                }else{
                    url.replace('//','/');
                }
                if (url[url.length-1]==='/'){
                    url = url.substr(0,url.length-1);
                }
                return url;
            };
            
            self.baseUrl = self.getRestServiceUrl(url);
            self.propertyId = propertyId;
            self.objectEnclosure = objEnclosure;
            
            self.createModel = function(defaultObj){
                var baseModel  = oj.Model.extend({
                    urlRoot: self.baseUrl,
                    customURL: function(operation,model,options){
                        if (operation === 'create'){
                            return {url: self.baseUrl, type: 'PUT'};
                        }else if (operation === 'update'){
                            return {url: self.baseUrl+"?"+propertyId+"="+options.recordID, type: 'PUT'};
                        }else if (operation === 'get'){
                            return {url: self.baseUrl+"?"+propertyId+"="+options.recordID, type: 'GET'};
                        }else if (operation === 'delete'){
                            return {url: self.baseUrl+"?"+propertyId+"="+options.recordID, type: 'DELETE'};
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
                var model = new baseModel();
                if (defaultObj){
                    for (var prop in defaultObj) {
                        if (defaultObj.hasOwnProperty(prop)) {
                            model.attributes[prop] = defaultObj[prop];
                        }
                    }
                }
                return model;
            };
            
            self.createCollection = function(){
                var baseCollection = oj.Collection.extend({
                    url:   self.baseUrl,
                    model: new self.createModel(),
                    parse: function(resp){
                        if (resp.hasOwnProperty(self.objectEnclosure)){
                            var objs = resp[self.objectEnclosure];
                            return objs;
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
                            var result = [];
                            
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
