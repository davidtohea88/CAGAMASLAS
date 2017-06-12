/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService','services/exportService','services/MessageService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojselectcombobox'],
        function (oj, ko, $, rendererService, RestService, exportService,MessageService)
        {
            function organizationTypeMainViewModel() {
                var self = this;

                self.message = ko.observable();
                self.colorType = ko.observable();
                self.pageOffcanvas = {selector: '#pageDrawer', content: '#pageContent',
                        modality: 'modeless', autoDismiss: 'none', displayMode: 'overlay'};
                    
                self.showMessage = function(type,message,afterShow){
                    var canvas = self.pageOffcanvas;
                    self.message(message);
                    if (type==="SUCCESS"){
                        self.colorType(MessageService.bgColorSuccess);
                    }else if (type==="ERROR"){
                        self.colorType(MessageService.bgColorError);
                    }else{
                        self.colorType(MessageService.bgColorDefault);
                    }
                    oj.OffcanvasUtils.open(canvas);
                    setTimeout(function(){
                        oj.OffcanvasUtils.close(canvas);
                        if (afterShow){
                            afterShow();
                        }
                    },MessageService.displayTimeout);
                };
                
                //LOV

                var productService = RestService.productService();
                self.productLOV = ko.observableArray();
                productService.fetchAsLOV('prodName','prodCd').then(function(data){
                    self.productLOV(data);
                });

                var companyService = RestService.organizationService();
                self.companyLOV = ko.observableArray();
                companyService.fetchAsLOV('orgName','orgId').then(function(data){
                    self.companyLOV(data);
                });

                var accountService = RestService.accountService();
                self.accountLOV = ko.observableArray();
                accountService.fetchAsLOV('AccountName','AccountNo').then(function(data){
                    for(item in data)
                    {
                        var res = {
                            Account: data[item].value + ' | '+ data[item].label,
                            AccountNo: data[item].value,
                            AccountName: data[item].label
                        };
                        if(data[item].value!==undefined){
                            self.accountLOV.push(res);                            
                        }                      
                    }
                    console.log(self.accountLOV());
                });


                self.header = "Revaluation";
                self.emptyPlaceholder = ko.observable(false);
                self.selectedProductList = ko.observableArray();
                self.selectedProductDataSource = new oj.ArrayTableDataSource(self.selectedProductList, {idAttribute: 'productID'});
                self.company = ko.observable('');
                self.dbCode = ko.observable('');
                self.selectedProduct = ko.observable('');

                var restService = RestService.OrganizationDBCodeService();
                self.collection = ko.observable(restService.createCollection());
                self.OrgDBCodeData = ko.observableArray();
                self.dbCodeDataForRender = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.OrgDBCodeData, {idAttribute: self.collection().model.idAttribute}));

                self.selectedGainAccount = ko.observable('');
                self.selectedGainAccountList = ko.observableArray();
                self.selectedGainAccountDataSource = new oj.ArrayTableDataSource(self.selectedGainAccountList, {idAttribute: 'Account'});
                self.selectedLossAccount = ko.observable('');
                self.selectedLossAccountList = ko.observableArray();
                self.selectedLossAccountDataSource = new oj.ArrayTableDataSource(self.selectedLossAccountList, {idAttribute: 'Account'});
                self.accountData = ko.observableArray();

                
                
                
                
                // ===============  EVENT HANDLER  ==============
                
                self.refreshData = function(){
                    // fetch from rest service
                    self.collection().refresh().then(function(){
                        
                        self.OrgDBCodeData(self.collection().toJSON());
                    });  
                };
                
                self.onRun = function(){
                    if(self.company()==='')
                    {
                        self.showMessage("ERROR",MessageService.httpStatusToMessage('Please select the Company'));
                    }
                    else if(self.dbCode()==='')
                    {
                        self.showMessage("ERROR",MessageService.httpStatusToMessage('Please select the Database Code'));
                    }
                    else if(self.selectedProduct()==='')
                    {
                        self.showMessage("ERROR",MessageService.httpStatusToMessage('Please select the Product'));
                    }
                    else if(self.selectedGainAccountList().length<=0)
                    {
                        self.showMessage("ERROR",MessageService.httpStatusToMessage('Please select the Realized Gain Account'));
                    }
                    else if(self.selectedLossAccountList().length<=0)
                    {
                        self.showMessage("ERROR",MessageService.httpStatusToMessage('Please select the Realized Loss Account'));
                    }
                    else {
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
                        self.showMessage("SUCCESS",MessageService.httpStatusToMessage('Revaluation is run.'));
                    }
                    
                };
                
                self.onAddGain = function () {
                        if(self.selectedGainAccount()[0]!==undefined){
                            var valNo = self.selectedGainAccount()[0].split(' | ')[0];
                            var valName = self.selectedGainAccount()[0].split(' | ')[1];
                            
                            var res = {
                                Account: self.selectedGainAccount()[0],
                                AccountNo: valNo,
                                AccountName: valName
                            };
                            self.selectedGainAccountList.push(res);
                        }
                    };
                self.onAddLoss = function () {
                        if(self.selectedLossAccount()[0]!==undefined){
                            var valNo = self.selectedLossAccount()[0].split(' | ')[0];
                            var valName = self.selectedLossAccount()[0].split(' | ')[1];
                            
                            var res = {
                                Account: self.selectedLossAccount()[0],
                                AccountNo: valNo,
                                AccountName: valName
                            };
                            self.selectedLossAccountList.push(res);
                        }
                    };        
                
                self.companyChangeHandler = function (context, valueParam) {
                    self.dbCodeDataForRender([]);
                        if (valueParam.option == "value" && valueParam.value!="") {                        
//                            var val = valueParam.value;                            
//                            var tmp = self.collection().filter(function(rec){
//                                return (rec.attributes.CompanyId===val[0]);
//                            });
//                            self.collection().reset(tmp);
//                            self.dbCodeData(self.collection().toJSON());
//
                        ko.utils.arrayForEach(self.OrgDBCodeData(),function(item){
                                if (item.orgId === valueParam.value[0]){
                                    var lbl = item['dbCd'];
                                    var val = item['dbCd'];
                                    self.dbCodeDataForRender.push({label: lbl, value: val});
                                }
                            });

                        };
                    };        
                    
                self.onRemoveGain = function(data)
                {
                    self.selectedGainAccountList.remove(function(item) {
                        return item.AccountNo === data.AccountNo;
                    });
                };
                self.onRemoveLoss = function(data)
                {
                    self.selectedLossAccountList.remove(function(item) {
                        return item.AccountNo === data.AccountNo;
                    });
                };

                self.refreshData();
            }
            return organizationTypeMainViewModel();
        }
); 