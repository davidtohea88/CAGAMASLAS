/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'data/data', 'jquery', 'services/rendererService', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource'],
        function (oj, ko, data, $, rendererService)
        {
            function priceFctrMainViewModel() {
                var self = this;
                self.header = "Price Factor";
                self.allData = ko.observableArray([{priceFctrCd: "Fetching data"}]);
                self.priceFctrDataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'priceFctrCd'}));
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');

                clickResetBtn = function () {
                    self.nameSearch('');
                    self.descSearch('');
                };

                self.dateTimeRenderer = function(context) 
                {
                    return rendererService.dateTimeConverter.format(context.data);
                };
                
                self.dateRenderer = function(context) 
                {
                    return rendererService.dateConverter.format(context.data);
                };
                
                self.activeRenderer = function(context) 
                {
                    return rendererService.activeConverter(context.data);
                };
                    
                self.initRefresh = function () {
                    console.log("fetching data");
                    var jsonUrl = "js/data/pricefactor.json";
//                    var hostname = "https://yourCRMServer.domain.com";
//                    var queryString = "/salesApi/resources/latest/opportunities?onlyData=true&fields=OptyNumber,Name,Revenue,TargetPartyName,StatusCode&q=StatusCode=OPEN&limit=10&offset=" + offset;
//                    console.log(queryString);
//                    $.ajax(hostname + queryString,
                    $.ajax(jsonUrl,
                            {
                                method: "GET",
                                dataType: "json",
//                                headers: {"Authorization": "Basic " + btoa("username:password")},
                                // Alternative Headers if using JWT Token
                                // headers : {"Authorization" : "Bearer "+ jwttoken; 
                                success: function (data)
                                {
                                    self.allData(data.MdPriceFctr);
//                                    console.log('Data returned ' + JSON.stringify(data.MdAssetTyp));
//                                    console.log("Rows Returned" + self.allPeople().length);
//                                    // Enable / Disable the next/prev button based on results of query
//                                    if (self.optyList().length < limit)
//                                    {
//                                        $('#nextButton').attr("disabled", true);
//                                    } else
//                                    {
//                                        $('#nextButton').attr("disabled", false);
//                                    }
//                                    if (self.offset === 0)
//                                        $('#prevButton').attr("disabled", true);
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    console.log(textStatus, errorThrown);
                                }
                            }
                    );
                };

                self.clickSearchBtn = function () {
                    var peopleFilter = new Array();
                    ko.utils.arrayFilter(self.tempPeople(),
                            function (r) {
                                var nameSearch = self.nameSearch().toString().toLowerCase();
                                var descSearch = self.descSearch().toString().toLowerCase();
                                if (r.priceFctrDesc.toString().toLowerCase().indexOf(nameSearch) !== -1 || r.priceFctrName.toString().toLowerCase().indexOf(nameSearch) !== -1) {
                                    peopleFilter.push(r);

                                }
                            });
                    self.allData(peopleFilter);
                };

                self.create = function () {

                };

                self.activedeactive = function () {

                };

                self.edit = function () {

                };

                self.exportxls = function () {

                };

                self.initRefresh();
            }
            return priceFctrMainViewModel();
        }
); 