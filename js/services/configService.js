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
        var ConfigServiceUtilities = function() {
            /**
             * @private
             */
            var self = this;
            //self.status = "temp-new";
            //self.loanStatus = "not validated"; 
            self.serviceUrl = 'http://localhost:3000/'; 

            //self.notificationDailogModel = new NotificationDailogModel(); 
        };
        return new ConfigServiceUtilities();
});

