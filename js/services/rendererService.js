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
        self.dateTimeConverter = oj.Validation.converterFactory("datetime").createConverter({pattern: 'dd-MM-yyyy HH:mm:ss'});
        self.dateConverter = oj.Validation.converterFactory("datetime").createConverter({pattern: 'dd-MM-yyyy'});
        self.activeConverter = function(str){
            return (str==="Y")?"Active": "Deactive";
        }
    };
    return new RendererServiceUtilities();
});
