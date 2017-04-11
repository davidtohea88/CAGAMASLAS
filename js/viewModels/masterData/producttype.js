/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'viewModels/GetRest', 'jquery', 
    'ojs/ojrouter', 'ojs/ojradioset','ojs/ojdialog','ojs/ojknockout', 'promise', 'ojs/ojlistview', 
    'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 'ojs/ojarraytabledatasource',
    'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdatetimepicker','moment'],
        function (oj, ko, GetRest, $)
        {
            function prodTypeViewModel() {
                var self = this;
                self.productTypeModel = ko.observable();
                self.header = "Product Type";
                self.allPeople = ko.observableArray([{prodTypCd: "Fetching data"}]);
                self.tempPeople = ko.observableArray([{prodTypCd: "Fetching data"}]);
                self.prodTypDataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allPeople, {idAttribute: 'prodTypCd'}));
                self.codeSearch = ko.observable('');
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');

                self.codeItem =  ko.observable('');
                self.nameItem =  ko.observable('');
                self.descItem =  ko.observable('');
                self.statusItem =  ko.observable('');
                self.effectiveDateItem =  ko.observable('');


                clickResetBtn = function () {
                    self.codeSearch('');
                    self.nameSearch('');
                    self.descSearch('');
                    self.initRefresh();
                };

                self.initRefresh = function () {
                    console.log("fetching data");
                    var jsonUrl = "js/data/producttype.json";
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
                                    self.allPeople(data.MdProdTyp);
                                    console.log(self.allPeople());
                                    self.tempPeople(data.MdProdTyp);
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
                                var codeSearch = self.codeSearch().toString().toLowerCase();
                                var nameSearch = self.nameSearch().toString().toLowerCase();
                                var descSearch = self.descSearch().toString().toLowerCase();
                                if ((r.prodTypCd.toString().toLowerCase().indexOf(codeSearch) > -1) &&
                                    (r.prodTypName.toString().toLowerCase().indexOf(nameSearch) > -1) &&
                                    (r.prodTypDesc.toString().toLowerCase().indexOf(descSearch) > -1)) {
                                    peopleFilter.push(r);

                                }
                            });
                    self.allPeople(peopleFilter);
                };

                self.onCreateBtn = function () {
                    self.productTypeModel(GetRest.createModel("http://movieapp-sitepointdemos.rhcloud.com/api/movies","_id"));
                    $('#btn_create').show();
                    $('#btn_edit').hide();
                    $("#DataDialog").ojDialog("open");
                };

                self.onStatusBtn = function () {

                };

                self.onEditBtn = function () {
                    $('#btn_create').hide();
                    $('#btn_edit').show();             
                    self.productTypeModel(GetRest.createModel("js/data/producttype.json","prodTyp   Cd"));
                    self.productTypeModel().id = self.codeItem();
                    self.productTypeModel().fetch({
                      success: function(model) {
                        self.productTypeModel(model);
                      },
                      error: function(model) {
                        console.log("Fetch error: ", model);
                      }
                    });
                    
                    $("#DataDialog").ojDialog("open");
                    return true;
                };

                self.onEdit = function () {

                };

                self.onCreate = function () {
                };

                self.onCancel = function () {
                };


                self.onExportBtn = function () {

                };
                
                self.onRowClick = function(data,event)
                {
                    self.codeItem(data.prodTypCd);
                    self.nameItem(data.prodTypName);
                    self.descItem(data.prodTypDesc);
                    self.statusItem(data.active);
                    self.effectiveDateItem(data.effectiveDate);                  
                    
                };
                self.initRefresh();
            }
            return prodTypeViewModel();
        }
); 