/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    'jquery',
    'knockout',
    'class',
    'signals'
], function ($, ko, Class, Signals) {
    "use strict";
    var CustomURL = Class.extend({
        url: undefined,
        type: undefined,
        init: function (params) {
            var self = this;
            self.url = params.url;
            self.type = params.type;
        }
    });
    return CustomURL;
});

