/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

define(['jquery','ojs/ojcore' ,'knockout'], function($,oj,ko) {
    var RendererServiceUtilities = function() {
        /**
         * @private
         */
        var self = this;
        self.dateTimeConverter = oj.Validation.converterFactory("datetime").createConverter({pattern: 'dd-MMM-yyyy HH:mm:ss'});
        self.dateConverter = oj.Validation.converterFactory("datetime").createConverter({pattern: 'dd-MMM-yyyy'});
        self.activeConverter = function(str){
            return (str==="Y")?"Active": "Inactive";
        };
        self.LOVConverter = function(LOV,id){
            var filtered = ko.utils.arrayFirst(LOV,function(item){
                return item.value === id;
            });
            if (filtered){
                return filtered.label;
            }else{
                return id;
            }
        };
        self.renderYear = function(start,year)
        {
            var arr = [];
            for (var i = start; i <= year; i++)
                {
                    var res = {
                        value: i,
                        label: i
                    };
                    arr.push(res);
                }
                return arr;
        };
    };
    return new RendererServiceUtilities();
});
