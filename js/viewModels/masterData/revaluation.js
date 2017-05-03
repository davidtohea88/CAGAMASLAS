/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'data/data', 'jquery', 'services/rendererService', 'services/configService','services/exportService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojselectcombobox'],
        function (oj, ko, data, $, rendererService, configService, exportService)
        {
            function organizationTypeMainViewModel() {
                var self = this;
                self.header = "Revaluation";
                self.emptyPlaceholder = ko.observable(false);
                self.selectedProductList = ko.observableArray();
                self.selectedProductDataSource = new oj.ArrayTableDataSource(self.selectedProductList, {idAttribute: 'productID'});
                self.company = ko.observable('');
                self.dbCode = ko.observable('');
                self.selectedProduct = ko.observable('');
                self.dbCodeData = ko.observableArray([ 
                    {value: "AK", label: "AK - Alaska"},  
                    {value: "HI", label: "HI - Hawaii"} 
                ]);
                self.companyData = ko.observableArray([ 
                    {value: "AK", label: "AK - Alaska"},  
                    {value: "HI", label: "HI - Hawaii"} 
                ]);
                self.productData = ko.observableArray([ 
                    {value: "AK", label: "AK - Alaska"},  
                    {value: "HI", label: "HI - Hawaii"} 
                ]);
                self.selectedGainAccount = ko.observable('');
                self.selectedGainAccountList = ko.observableArray();
                self.selectedGainAccountDataSource = new oj.ArrayTableDataSource(self.selectedGainAccountList, {idAttribute: 'Account'});
                self.selectedLossAccount = ko.observable('');
                self.selectedLossAccountList = ko.observableArray();
                self.selectedLossAccountDataSource = new oj.ArrayTableDataSource(self.selectedLossAccountList, {idAttribute: 'Account'});
                self.accountData = ko.observableArray();

                self.GetGLAccount = function(){
                    console.log("fetching data - GL Account");
                    var jsonUrl = "js/data/GLAccount.json";

                    $.ajax(jsonUrl,
                            {
                                method: "GET",
                                dataType: "json",
//                                headers: {"Authorization": "Basic " + btoa("username:password")},
                                // Alternative Headers if using JWT Token
                                // headers : {"Authorization" : "Bearer "+ jwttoken; 
                                success: function (data)
                                {
                                    for(item in data.MdGLAccount)
                                    {                               
                                        var res = {
                                            Account: data.MdGLAccount[item].AccountNo + ' | '+ data.MdGLAccount[item].AccountName,
                                            AccountNo: data.MdGLAccount[item].AccountNo,
                                            AccountName: data.MdGLAccount[item].AccountName
                                        };
                                        self.accountData.push(res);
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    console.log(textStatus, errorThrown);
                                }
                            });
                };
                
                self.refreshData = function (fnSuccess) {
                    console.log("fetching data");
                    var jsonUrl = "js/data/exchangeRateDateEntry.json";

                    $.ajax(jsonUrl,
                            {
                                method: "GET",
                                dataType: "json",
//                                headers: {"Authorization": "Basic " + btoa("username:password")},
                                // Alternative Headers if using JWT Token
                                // headers : {"Authorization" : "Bearer "+ jwttoken; 
                                success: function (data)
                                {
                                    fnSuccess(data);
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    console.log(textStatus, errorThrown);
                                }
                            }
                    );
                };

                
                
                // ===============  EVENT HANDLER  ==============
                
                self.onLoad = function(){
                    self.refreshData(function(data){
                        self.selectedRow(undefined);
                        self.allData(data.MDExchangeRateDateEntry);
                    });
                };
                
                self.onRun = function(){
                    console.log(self.company()+', '+self.dbCode()+', '+self.selectedProduct());
                    var gainAccount = [];
                    var lossAccount = [];
                    for(item in self.selectedGainAccountList())
                    {
                        gainAccount.push(self.selectedGainAccountList()[item].AccountNo);
                    }
                    for(item in self.selectedLossAccountList())
                    {
                        lossAccount.push(self.selectedLossAccountList()[item].AccountNo);
                    }
                    
                    console.log(gainAccount);
                    console.log(lossAccount);
                    
                };
                
                self.gainAccountChangeHandler = function (context, valueParam) {
                     if (valueParam.option == "value" && valueParam.value!="") {                        
                            var valNo = valueParam.value.toString().split('|')[0];
                            var valName = valueParam.value.toString().split('|')[1];
                            
                            var res = {
                                Account: valueParam.value,
                                AccountNo: valNo,
                                AccountName: valName
                            };
                            console.log(self.selectedGainAccountList.indexOf('Account'));
                            self.selectedGainAccountList.push(res);
                        };
                    };
                self.lossAccountChangeHandler = function (context, valueParam) {
                     if (valueParam.option == "value" && valueParam.value!="") {                        
                            var valNo = valueParam.value.toString().split('|')[0];
                            var valName = valueParam.value.toString().split('|')[1];
                            
                            var res = {
                                Account: valueParam.value,
                                AccountNo: valNo,
                                AccountName: valName
                            };
                            self.selectedLossAccountList.push(res);
                        };
                    };        
                self.onRemoveGain = function(data)
                {
                    self.selectedGainAccountList.remove(function(item) {
                        return item.AccountNo == data.AccountNo;
                    });
                };
                self.onRemoveLoss = function(data)
                {
                    self.selectedLossAccountList.remove(function(item) {
                        return item.AccountNo == data.AccountNo;
                    });
                };

                //self.onLoad();
                self.GetGLAccount();
            }
            return organizationTypeMainViewModel();
        }
); 