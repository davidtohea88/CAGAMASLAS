/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'data/data', 'jquery', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource'],
        function (oj, ko, data, $)
        {
            function prodTypeViewModel() {
                var self = this;
                self.header = "Payment Frequency";
                self.allPeople = ko.observableArray([{pymtFreqCd: "Fetching data"}]);
                self.tempPeople = ko.observableArray([{pymtFreqCd: "Fetching data"}]);
                self.pymtFreqDataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allPeople, {idAttribute: 'pymtFreqCd'}));
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');

                clickResetBtn = function () {
                    self.nameSearch('');
                    self.descSearch('');
                };

                self.initRefresh = function () {
                    console.log("fetching data");
                    var jsonUrl = "js/data/paymentfreq.json";
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
                                    self.allPeople(data.MdPymtFreq);
                                    self.tempPeople(data.MdPymtFreq);
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
                                if (r.prodTypDesc.toString().toLowerCase().indexOf(nameSearch) !== -1 || r.prodTypName.toString().toLowerCase().indexOf(nameSearch) !== -1) {
                                    peopleFilter.push(r);

                                }
                            });
                    self.allPeople(peopleFilter);
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
            return prodTypeViewModel();
        }
); 