/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

define(['jquery','ojs/ojcore' ,'knockout', 'services/configService'],
    function($,oj,ko,config) {
        var rateTypeService = function() {
            /**
             * @private
             */
            var self = this;
            
            var restUrl= "/MD_RateType/RateTypeRestPS";
            
            self.RateType  = oj.Model.extend({
                urlRoot: config.serviceUrl+"/"+restUrl,
                customUrl: function(operation,model,options){
                    if (operation === 'create'){
                        return {url: urlRoot, type: 'PUT'};
                    }else if (operation === 'update'){
                        return {url: urlRoot, type: 'PUT'};
                    }else if (operation === 'get'){
                        return {url: urlRoot+"?rateTypeId="+options.recordID, type: 'GET'};
                    }
                },
                idAttribute: "rateTypeId",
                parse: function(resp){
                    var rates = resp.MdRateType;
                    if (rates.length>0){
                        return resp.MdRateType[0];
                    }
                    return undefined;
                },
                parseSave: function(rec){
                    return {MdRateType: [rec]};
                }
            });
            self.RateTypes = oj.Collection.extend({
                url:   config.serviceUrl+"/"+restUrl,
                model: new RateType()
            });
            
            self.save = function(model){
                var entity = new RateType();

                entity.attributes.rateTypeId = model.rateTypeId;
                entity.attributes.rateTypeCd = model.rateTypeCd;
                entity.attributes.rateTypeName = model.rateTypeName;
                entity.attributes.rateTypeDesc = model.rateTypeDesc;
                entity.attributes.active = model.active;
                entity.attributes.effectiveDate = model.effectiveDate;
                entity.attributes.createdDate = model.createdDate;
                entity.attributes.createdby = model.createdby;
                entity.attributes.updatedDate = "2008-09-29T01:49:45";
                entity.attributes.updatedBy = 'LAS';
                
                entity.save(false,{success: function(model,resp){
                    console.log(model);
                    console.log(resp);
                }});
            };
            
            self.fetchAsLOV = function(labelProperty,valueProperty){
                var all = new RateTypes();
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
            
            self.fetchAll = function(){
                return new RateTypes();
            };
            
        };
        return new rateTypeService();
});
