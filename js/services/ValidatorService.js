/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
/*
 *  Global Settings and Config service
 */
define(['jquery','ojs/ojcore' ,'knockout'],
    function($,oj,ko) {
        var ValidatorService = function() {
            /**
             * @private
             */
            var self = this;
            
            self.emailValidator = {
                validate: function(email){
                    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (!filter.test(email)){
                        throw new Error("Input is not a valid email address. Please provide a valid email address"); 
                    }
                    return true;
                },
                
            };
            
            self.phoneValidator = {
                validate: function(phone){
                    var filter = /^[0-9]*$/;
                    if (!filter.test(phone)){
                        throw new Error("Input is not a valid phone. Please provide a valid phone number"); 
                    }
                    return true;
                },
                
            };
            
        };
        return new ValidatorService();
});

