/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'viewModels/GetRest', 'jquery', 'ojs/ojrouter', 
    'ojs/ojradioset','ojs/ojdialog', 'ojs/ojknockout', 'promise', 
    'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
    'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol','ojs/ojdatetimepicker',
    'ojs/ojpagingtabledatasource', 'moment'],
        function (oj, ko, GetRest, $)
        {
            function prodgroupMainViewModel() {
                var self = this;
                self.productGroupModel = ko.observable();
                self.header = "Product Group";
                self.allPeople = ko.observableArray([{prodGrpCd: "Fetching data"}]);
                self.tempPeople = ko.observableArray([{prodGrpCd: "Fetching data"}]);
                self.prodGrpDataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allPeople, {idAttribute: 'prodGrpCd'}));
                self.codeSearch = ko.observable('');
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');
                
                self.codeItem =  ko.observable('');
                self.nameItem =  ko.observable('');
                self.descItem =  ko.observable('');
                self.statusItem =  ko.observable('');
                self.effectiveDateItem =  ko.observable('');

                self.productGroupCollection = GetRest.createCollection("js/data/productgroup.json","prodGrpCd"),
                self.dataSource = ko.observable();

                /*this.buildModel = function()
                {
                    return {
                        'CODE': this.codeItem(),
                        'NAME': this.nameItem(),
                        'DESCRIPTION': this.descItem(),
                        'STATUS': this.statusItem(),
                        'EFFECTIVE_DATE': this.effectiveDateItem()
                    };
                }; */
        
                clickResetBtn = function () {
                    self.codeSearch('');
                    self.nameSearch('');
                    self.descSearch('');
                    self.initRefresh();
                };
                
                self.init = function(){
                  self.dataSource(new oj.CollectionTableDataSource(self.productGroupCollection));
                  self.productGroupCollection.fetch();  
                };

                self.initRefresh = function () {
                    console.log("fetching data");
                    var jsonUrl = "js/data/productgroup.json";
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
                                    console.log(data);
                                    self.allPeople(data);
                                    self.tempPeople(data);
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
                                if ((r.prodGrpCd.toString().toLowerCase().indexOf(codeSearch) > -1) &&
                                    (r.prodGrpName.toString().toLowerCase().indexOf(nameSearch) > -1) &&
                                    (r.prodGrpDesc.toString().toLowerCase().indexOf(descSearch) > -1)) {
                                    peopleFilter.push(r);

                                }
                            });
                    self.allPeople(peopleFilter);
                };

                self.onCreateBtn = function(){
                    self.productGroupModel(GetRest.createModel("http://movieapp-sitepointdemos.rhcloud.com/api/movies","_id"));
                    self.codeItem('');
                    self.nameItem('');
                    self.descItem('');
                    self.statusItem('');
                    self.effectiveDateItem('');
                    $('#btn_create').show();
                    $('#btn_edit').hide();
                    $("#DataDialog").ojDialog("open");
                    return true;};
                self.onEditBtn = function(){
                    $('#btn_create').hide();
                    $('#btn_edit').show();             
                    self.productGroupModel(GetRest.createModel("js/data/productgroup.json","prodTypCd"));
                    self.productGroupModel().id = self.codeItem();
                    self.productGroupModel().fetch({
                      success: function(model) {
                        self.productGroupModel(model);
                      },
                      error: function(model) {
                        console.log("Fetch error: ", model);
                      }
                    });
                    
                    $("#DataDialog").ojDialog("open");
                    return true;
                };
                self.onRowClick = function(data,event)
                {
                    self.codeItem(data.prodGrpCd);
                    self.nameItem(data.prodGrpName);
                    self.descItem(data.prodGrpDesc);
                    self.statusItem(data.active);
                    self.effectiveDateItem(data.effectiveDate);                  
                    
                };
                self.onStatusBtn = function () {

                };

                self.onCreate = function () {
                    console.log(self.codeItem());
                    console.log(self.nameItem());
                    console.log(self.descItem());
                    console.log(self.statusItem());
                    console.log(self.effectiveDateItem());
                    $("#DataDialog").ojDialog("close");
                };
                self.onEdit = function () {

                };
                self.onCancel = function () {
                    self.codeItem('');
                    self.nameItem('');
                    self.descItem('');
                    self.statusItem('');
                    self.effectiveDateItem('');
                    $("#DataDialog").ojDialog("close");

                };

                self.exportxls = function () {

                };
                
                self.initRefresh();
            }
            return prodgroupMainViewModel();
        
        }
); 