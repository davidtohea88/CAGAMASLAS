/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
/*
 *  Global Settings and Config service
 */
define(['jquery','ojs/ojcore' ,'knockout'], function($,oj,ko) {
    var ConfigServiceUtilities = function() {
        /**
         * @private
         */
        var self = this;
        self.status = "";
        self.form = "0";
        self.letter = "0";
       
        //self.notificationDailogModel = new NotificationDailogModel(); 
    };
    return new ConfigServiceUtilities();
});

