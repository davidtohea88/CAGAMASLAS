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
        var MessageService = function() {
            /**
             * @private
             */
            var self = this;
            
            self.httpStatusToMessage = function(status){
                if (status===404){
                    return "The backend service is not reachable, please contact administrator.";
                }else if (status === 500){
                    return "The message will come from rest";
                }else if (status === 200){
                    return "Success";
                }else if (status === 0){
                    return "The backend service is not reachable, please contact administrator.";
                }else{
                    return status;
                }
            };
            
            self.bgColorError = "#F45229";
            self.bgColorSuccess = "#B4D884";
            self.bgColorDefault = "#DBD6D0";
            self.displayTimeout = 2000;
            
        };
        return new MessageService();
});

