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

                self.isNative = ko.observable(true);
                self.message = ko.observable();
                self.id = ko.observable(undefined);
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

                var companyService = RestService.companyService();
                self.companyLOV = ko.observableArray();
                companyService.fetchAsLOV('CompanyName','CompanyId').then(function(data){
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

                });

                var eventService = RestService.eventService();
                self.eventLOV = ko.observableArray();
                eventService.fetchAsLOV('EventName','eventCd').then(function(data){
                    self.eventLOV(data);
                });
                var paymentFrequencyService = RestService.paymentFrequencyService();
                self.paymentFrequencyLOV = ko.observableArray();
                paymentFrequencyService.fetchAsLOV('pymtFreqName','pymtFreqId').then(function(data){
                    self.paymentFrequencyLOV(data);
                });
 
                self.header = "GL Posting Rule";
                self.emptyPlaceholder = ko.observable(false);
                self.selectedProductList = ko.observableArray();
                self.selectedProductDataSource = new oj.ArrayTableDataSource(self.selectedProductList, {idAttribute: 'productID'});
                self.company = ko.observable('');
                self.dbCode = ko.observable('');
                self.selectedProduct = ko.observable('');
                self.selectedEvent = ko.observable('');
                self.selectedPaymentFreq = ko.observable('');

                self.model = ko.observable();
                var restService = RestService.ActPostingRuleService();
                self.collection = ko.observable(restService.createCollection());
                self.dbCodeData = ko.observableArray();
                self.dbCodeDataForRender = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.dbCodeData, {idAttribute: self.collection().model.idAttribute}));

                self.selectedGainAccount = ko.observable('');
                self.selectedGainAccountList = ko.observableArray();
                self.selectedGainAccountDataSource = new oj.ArrayTableDataSource(self.selectedGainAccountList, {idAttribute: 'Account'});
                self.selectedLossAccount = ko.observable('');
                self.selectedLossAccountList = ko.observableArray();
                self.selectedLossAccountDataSource = new oj.ArrayTableDataSource(self.selectedLossAccountList, {idAttribute: 'Account'});
                self.accountData = ko.observableArray();

                self.selectedProduct.subscribe(function(newValue){
                    console.log(newValue);
//                    var tmp = self.collection().filter(function(rec){
//                        return ((code.length ===0 || (code.length > 0 && rec.attributes.stateCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
//                                (name.length ===0 || (name.length > 0 && rec.attributes.stateName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)));
//                    });
//                    self.collection().reset(tmp);
//                    self.allData(self.collection().toJSON());
                });
                
                
                self.getParameterByName = function(name, url) {
                    if (!url) url = window.location.href;
                    name = name.replace(/[\[\]]/g, "\\$&");
                    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                        results = regex.exec(url);
                    if (!results) return null;
                    if (!results[2]) return '';
                    return decodeURIComponent(results[2].replace(/\+/g, " "));
                };
                // ===============  EVENT HANDLER  ==============
                
                self.refreshData = function(){
                    // fetch from rest service
                    

                    
                self.collection().fetch({
                        success: function(){
                            self.dbCodeData(self.collection().toJSON());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    }).then(function(obj){
                        console.log(self.id());
                        if(self.id()!==undefined && self.id()!==null ){
                            self.model(self.collection().get(self.id()));
                            self.company(self.model().attributes.orgId);
                            self.selectedProduct(self.model().attributes.prodCd);
                            self.selectedPaymentFreq(self.model().attributes.pymtFreqId);
                            self.selectedEvent(self.model().attributes.eventCd);
                            console.log(self.model().attributes);
                        }
                        else
                        {
                            self.model(restService.createModel({active: 'Y',dbCd:'',}));
                            self.company('');
                            self.selectedProduct('');
                            self.selectedPaymentFreq('');
                            self.selectedEvent('');
                           
                        }
                        
                    }); 
                };
                
                self.onRun = function(){
                    if(self.company()==='')
                    {
                        self.showMessage("ERROR",MessageService.httpStatusToMessage('Please select the Company'));
                    }
                    else if(self.dbCodeDataForRender().length===0)
                    {
                        self.showMessage("ERROR",MessageService.httpStatusToMessage('No Database Code for this Company'));
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
                            var val = valueParam.value;                            
//                            var tmp = self.collection().filter(function(rec){
//                                return (rec.attributes.CompanyId===val[0]);
//                            });
//                            self.collection().reset(tmp);
//                            self.dbCodeData(self.collection().toJSON());
//

                        ko.utils.arrayForEach(self.dbCodeData(),function(item){
                                if (item.CompanyId === valueParam.value[0]){
                                    var val = item['dbCodeId'];
                                    self.dbCodeDataForRender.push(val);
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
                self.id(getParameterByName('id'));
                self.refreshData();
            }
            return organizationTypeMainViewModel();
        }
); 