/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jlinq', 'jquery', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource'],
        function (oj, ko, jlinq, $)
        {
            function prodMainViewModel() {
                var self = this;
                self.header = "Product";
                self.allPeople = ko.observableArray([{prodCd: "Fetching data"}]);
                self.tempPeople = ko.observableArray([{prodCd: "Fetching data"}]);
                self.prodDataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allPeople, {idAttribute: 'prodCd'}));
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');
                self.product = ko.observableArray([]);
                self.productgroup = ko.observableArray([]);
                self.productSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.product, {idAttribute: 'prodCd'}));
                self.productgroupSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.productgroup, {idAttribute: 'prodGrpId'}));

                clickResetBtn = function () {
                    self.nameSearch('');
                    self.descSearch('');
                };
                
                callAjax  = function(url)
                {
                    return $.ajax(url,
                            {
                                method: "GET",
                                dataType: "json",
                                async:false
                            }                                    
                    );
                };

                
                self.initRefresh = function () {
                    console.log("fetching data");
                    var jsonUrl = "js/data/product.json";
                    var jsonUrl2 = "js/data/productgroup.json";
//                    var hostname = "https://yourCRMServer.domain.com";
//                    var queryString = "/salesApi/resources/latest/opportunities?onlyData=true&fields=OptyNumber,Name,Revenue,TargetPartyName,StatusCode&q=StatusCode=OPEN&limit=10&offset=" + offset;
//                    console.log(queryString);
//                    $.ajax(hostname + queryString,
                    
                    var promiseProduct = callAjax(jsonUrl);
                    promiseProduct.done(function(data)
                    {
                        self.product(data.MdProd); 
                    });
 
                   var promiseProductGroup = callAjax(jsonUrl2);
                    promiseProductGroup.done(function(data)
                    {
                       self.productgroup(data); 
                    });
                 console.log(self.product());
                console.log(self.productgroup());
                
                 for (var i = 0; i < self.product().length; i++)
                    console.log(self.product()[i].prodGrpCd);
//                        roles[i].members[j] = users.lookup[roles[i].members[j]];

                jlinq.from(self.productSource)
                        .join(self.productgroupSource,
                    "orders",
                    "id", 
                    "ownerId")
                  .select(function(rec) {
                    return {
                      first:rec.first,
                      total:rec.orders.length
                    };
                  });
            
                };

                self.clickSearchBtn = function () {
                    var peopleFilter = new Array();
                    ko.utils.arrayFilter(self.tempPeople(),
                            function (r) {
                                var nameSearch = self.nameSearch().toString().toLowerCase();
                                var descSearch = self.descSearch().toString().toLowerCase();
                                if (r.prodDesc.toString().toLowerCase().indexOf(nameSearch) !== -1 || r.prodName.toString().toLowerCase().indexOf(nameSearch) !== -1) {
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
            return prodMainViewModel();
        }
); 