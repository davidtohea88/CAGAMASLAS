/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

define(['jquery','ojs/ojcore' ,'knockout', 'services/configService'],
    function($,oj,ko,config) {
        var countryService = function() {
            /**
             * @private
             */
            var self = this;
            
            self.fetchLOV = function(lov){
                var jsonUrl = "js/data/country.json";
                $.ajax(jsonUrl,{ method: "GET", dataType: "json",
                    success: function (data){
                        /*var tmp = [];
                        ko.utils.arrayForEach(data.MdCountry,function(item){
                            tmp.push({label: item.countryName, value: item.countryId});
                        });*/
                        lov(data.MdCountry);
                    },
                    error: function (jqXHR, textStatus, errorThrown){
                        console.log(textStatus, errorThrown);
                    }
                });
            };
        };
        return new countryService();
});
