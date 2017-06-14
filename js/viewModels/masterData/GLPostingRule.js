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
                productService.fetchAsLOV('prodName','prodId').then(function(data){
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
                            AccountName: data[item].label,
                            label: data[item].label,
                            value: data[item].value
                        };
                        if(data[item].value!==undefined){
                            self.accountLOV.push(res);                            
                        }                      
                    }

                });
                
                var productEventService = RestService.productEventCodeService();
                
                

                var eventService = RestService.eventService();
                self.eventLOV = ko.observableArray();
                self.collectionEventLOV = ko.observable(eventService.createCollection());
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
                self.selectedEvent = ko.observable([]);
                self.selectedPaymentFreq = ko.observable('');

                self.modelHeader = ko.observable();
                var restServiceHeader = RestService.ActPostingRuleHeaderService();
                self.collectionHeader = ko.observable(restServiceHeader.createCollection());
                self.headerData = ko.observableArray();
                
                self.selecteddbcode = ko.observableArray();
                self.dbcodeoptions = ko.observableArray();
                self.eventOptions = ko.observableArray();
                var temp_dbcode="";
                var temp_event="";
                

                var restServiceCompanyDBCode = RestService.dbCodeService();
                self.collectionCompanyDBCode = ko.observable(restServiceCompanyDBCode.createCollection());
                self.companyDBCodeData = ko.observableArray();
                self.dataSourcecompanyDBCode = new oj.ArrayTableDataSource(self.companyDBCodeData, {idAttribute: self.collectionCompanyDBCode().model.idAttribute});
                
                var restServiceProductEvent = RestService.productEventCodeService();
                self.collectionProductEvent = ko.observable(restServiceProductEvent.createCollection());
                self.ProductEventData = ko.observableArray();
                self.dataSourceProductEvent = new oj.ArrayTableDataSource(self.ProductEventData, {idAttribute: self.collectionProductEvent().model.idAttribute});
                
                var restServiceEvent = RestService.eventService();
                self.collectionEvent = ko.observable(restServiceEvent.createCollection());
                self.EventData = ko.observableArray();
                self.dataSourceEvent = new oj.ArrayTableDataSource(self.EventData, {idAttribute: self.collectionEvent().model.idAttribute});

                self.model = ko.observable();
                var restService = RestService.ActPostingRuleService();
                self.params = ko.observableArray([{recordID:self.id(),recordName:'accPostrulesId'}]);
                self.collection = ko.observable(restService.createCollection());
                
                self.detailData = ko.observableArray();
                self.detailDataForRender = ko.observableArray();
                self.dataSource = new oj.ArrayTableDataSource(self.detailData, {idAttribute: self.collection().model.idAttribute});

                self.collectionGainAccount = ko.observable(restService.createCollection());
                self.selectedGainAccount = ko.observable('');
                self.selectedGainAccountList = ko.observableArray();
                self.selectedGainAccountDataSource = new oj.ArrayTableDataSource(self.selectedGainAccountList, {idAttribute: 'accPostrulesId'});

                self.collectionLossAccount = ko.observable(restService.createCollection());
                self.selectedLossAccount = ko.observable('');
                self.selectedLossAccountList = ko.observableArray();
                self.selectedLossAccountDataSource = new oj.ArrayTableDataSource(self.selectedLossAccountList, {idAttribute: 'accPostrulesId'});
                self.accountData = ko.observableArray();
                
                self.getParameterByName = function(name, url) {
                    if (!url) url = window.location.href;
                    name = name.replace(/[\[\]]/g, "\\$&");
                    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                        results = regex.exec(url);
                    if (!results) return null;
                    if (!results[2]) return '';
                    return decodeURIComponent(results[2].replace(/\+/g, " "));
                };
                
                self.accountNameRenderer = function(context) 
                {
                    if (context.data){
                        var id = context.data;
                        return rendererService.LOVConverter(self.accountLOV(),id);
                    }
                    return '';
                };
                
                // ===============  EVENT HANDLER  ==============
                
                self.refreshData = function(){
                    // fetch from rest service                
                    self.collectionHeader().fetch({
                        success: function(){
                            self.headerData(self.collectionHeader().toJSON());
                            
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    }).then(function(obj){
                        if(self.id()!==undefined && self.id()!==null ){
                            self.params()[0].recordID=self.id();
                                
                            self.collection().fetch({
                                success: function(){
                                    
                                    //detail
                                    var tmp = self.collection().where({'accPostrulesId':parseInt(self.id())});
                                    self.collection().reset(tmp);
                                    self.detailData(self.collection().toJSON());
                                    
                                    var tmpC = self.collection().filter(function(rec){
                                        return (rec.attributes.accType.toLowerCase()==='c');
                                    });
                                    self.collectionGainAccount().reset(tmpC);
                                    self.selectedGainAccountList(self.collectionGainAccount().toJSON());
               
                                    var tmpD = self.collection().filter(function(rec){
                                        return (rec.attributes.accType.toLowerCase()==='d');
                                    });
                                    
                                    self.collectionLossAccount().reset(tmpD);
                                    self.selectedLossAccountList(self.collectionLossAccount().toJSON());
                                    

                                },error: function(resp){
                                    self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                                }
                            }).then(function(obj){
                            
                                self.collectionCompanyDBCode().fetch({
                                    success: function(){
                                        self.companyDBCodeData(self.collectionCompanyDBCode().toJSON());

                                    },error: function(resp){
                                        self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                                    }
                                });
                                                                
                                self.collectionProductEvent().fetch({
                                    success: function(){
                                        self.ProductEventData(self.collectionProductEvent().toJSON());

                                    },error: function(resp){
                                        self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                                    }
                                });   
                                
                                self.collectionEvent().fetch({
                                    success: function(){
                                        self.EventData(self.collectionEvent().toJSON());

                                    },error: function(resp){
                                        self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                                    }
                                });   
                                
                            }).then(function(obj){
                                self.model(self.collectionHeader().get(self.id()));
                                self.company(self.model().attributes.orgId);
 //                               self.selecteddbcode(self.model().attributes.dbCd);
                                self.selectedProduct(self.model().attributes.prodId);
                                self.selectedPaymentFreq(self.model().attributes.pymtFreqId);
//                                self.selectedEvent(self.model().attributes.eventCd);
                                temp_dbcode=self.model().attributes.dbCd;
                                temp_event=self.model().attributes.eventCd;
                             });

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
                    else if(self.selecteddbcode().length===0)
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
                                accPostrulesId :'',
                                Account: self.selectedGainAccount()[0],
                                accCd: valNo,
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
                                accPostrulesId :'',
                                Account: self.selectedLossAccount()[0],
                                accCd: valNo,
                                AccountName: valName
                            };
                            self.selectedLossAccountList.push(res);
                        }
                    };        
                
                self.companyChangeHandler = function (context, valueParam) {
                        console.log('companyChangeHandler triggered');

                        if (valueParam.option == "value" && valueParam.value!="") {                        
                            var val = valueParam.value;                            

                        self.dbcodeoptions([]);
                        ko.utils.arrayForEach(self.companyDBCodeData(),function(item){
                                if (item.orgId === valueParam.value[0]){
                                    var val = {
                                        label: item['dbCd'],
                                        value: item['dbCd']
                                    };
                                    self.dbcodeoptions.push(val);
                                }
                            });

                            if(valueParam.previousValue.length!==1)
                            {
                                self.selecteddbcode(temp_dbcode);
                                console.log('a');
                            }
                            else
                            {
                                 self.selecteddbcode([]);                               
                                console.log('b');
                            }

                        };
                    };  
                    
                self.productChangeHandler = function(context, valueParam){
                    console.log("============================");                    
                    if (valueParam.option == "value" && valueParam.value!="") {                        
                            var val = valueParam.value[0];                            
                        self.eventOptions([]);
                        var tmp = [];
                        ko.utils.arrayForEach(self.ProductEventData(),function(item){
                             if(val===item.prodId){

//                                    tmp.push(self.collectionEvent().filter(function(rec){
//                                            return (item.eventCd===rec.value);
//                                        
//                                    }));   
                                    
                                    ko.utils.arrayForEach(self.EventData(),function(item2){
                                        if(item.eventCd===item2.eventCd){
                                            var val = {
                                                eventCd: item2.eventCd,
                                                label: item2.EventName,
                                                value: item2.eventCd
                                            };

                                            self.eventOptions.push(val);
                                        }
                                       });
                                       

                            }
                            });

                            if(valueParam.previousValue.length!==1)
                            {
                                self.selectedEvent(temp_event);
                                console.log('a');
                            }
                            else
                            {
                                self.selectedEvent([]);
                                console.log('b');
                            }
                            
                            //                        
//                        self.collectionEvent().reset(tmp);
//                        self.EventData(self.collectionEvent().toJSON());
// //                       console.log(tmp);                            
//                        self.eventOptions().push(tmp);
                        
                        
                                           

                        };
                };
                    
                self.onRemoveGain = function(data)
                {
                    self.selectedGainAccountList.remove(function(item) {
                        return item.accCd === data.accCd;
                    });
                };
                self.onRemoveLoss = function(data)
                {
                    self.selectedLossAccountList.remove(function(item) {
                        return item.accCd === data.accCd;
                    });
                };
                self.id(oj.Router.rootInstance.retrieve());
                self.refreshData();
            }
            return organizationTypeMainViewModel();
        }
); 