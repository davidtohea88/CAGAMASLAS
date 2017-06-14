/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService','services/exportService','services/MessageService', 'services/BaseRestService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker'],
        function (oj, ko, $, rendererService, RestService, exportService,MessageService, BaseRestService)
        {
            function organizationTypeMainViewModel() {
                var self = this;
                
//                var testId = oj.Router.rootInstance.retrieve();
//                alert(testId);

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
                
                var productEventService = RestService.productEventCodeService();
                var eventService = RestService.eventService();
                self.eventLOV = ko.observableArray();
                eventService.fetchAsLOV('EventName','eventCd').then(function(data){
                    self.eventLOV(data);
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
                self.searchStartDate = ko.observable();
                self.searchEndDate = ko.observable();

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
                
                self.collectionProductEvent = ko.observable(productEventService.createCollection());
                self.ProductEventData = ko.observableArray();
                self.dataSourceProductEvent = new oj.ArrayTableDataSource(self.ProductEventData, {idAttribute: self.collectionProductEvent().model.idAttribute});
                
                self.collectionEvent = ko.observable(eventService.createCollection());
                self.EventData = ko.observableArray();
                self.dataSourceEvent = new oj.ArrayTableDataSource(self.EventData, {idAttribute: self.collectionEvent().model.idAttribute});

                self.model = ko.observable();
                var restService = RestService.ActPostingRuleService();
                self.params = ko.observableArray([{recordID:self.id(),recordName:'accPostrulesId'}]);
                self.collection = ko.observable(restService.createCollection());
                
                self.detailData = ko.observableArray();
                self.detailDataForRender = ko.observableArray();
                self.dataSource = new oj.ArrayTableDataSource(self.detailData, {idAttribute: self.collection().model.idAttribute});

                var searchPostedBatchesService = RestService.SearchPostedBatchesService();
//                BaseRestService.createVirtualCollection();
                self.searchPostedBatchesCollection = ko.observable(searchPostedBatchesService.createVirtualCollection());
                self.postedBatchesList = ko.observableArray();
                self.postedBatchesDataSource = new oj.ArrayTableDataSource(self.postedBatchesList, {idAttribute: 'glId'});

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
                        self.collectionCompanyDBCode().fetch({
                            success: function(){
                                console.log("success collectionCompanyDBCode");
                                self.companyDBCodeData(self.collectionCompanyDBCode().toJSON());
                                console.log(self.companyDBCodeData());

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
                        if(self.id()!==undefined && self.id()!==null ){
                        }else{
                            console.log("id null");
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
                    else {
                        self.showMessage("SUCCESS",MessageService.httpStatusToMessage('Revaluation is run.'));
                    }
                };      
                
                self.companyChangeHandler = function (context, valueParam) {
                    console.log("companyChangeHandler");
                    if (valueParam.option == "value" && valueParam.value!="") {                     
                        var val = valueParam.value;              
                        console.log("val "+val);            
                        console.log(self.companyDBCodeData());
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
                        }
                        else
                        {
                             self.selecteddbcode([]);                               
                        }

                    };
                };  
                    
                self.productChangeHandler = function (context, valueParam) {
                    if (valueParam.option == "value" && valueParam.value != "") {
                        var val = valueParam.value[0];
                        self.eventOptions([]);
                        var tmp = [];
                        ko.utils.arrayForEach(self.ProductEventData(), function (item) {
                            if (val === item.prodId) {
//                                    tmp.push(self.collectionEvent().filter(function(rec){
//                                            return (item.eventCd===rec.value);
//                                        
//                                    }));   
                                ko.utils.arrayForEach(self.EventData(), function (item2) {
                                    if (item.eventCd === item2.EventId) {
                                        var val = {
                                            eventCd: item2.EventId,
                                            label: item2.EventName,
                                            value: item2.EventId
                                        };
                                        self.eventOptions.push(val);
                                    }
                                });
                            }
                        });

                        if (valueParam.previousValue.length !== 1)
                        {
                            self.selectedEvent(temp_event);
                        } else
                        {
                            self.selectedEvent([]);
                        }
                    }
                    ;
                };
                    
                self.onClickViewDetail = function(data)
                {
                    oj.Router.rootInstance.store('glId='+data.glId);
                    oj.Router.rootInstance.go('glsearchpostedbatches');
//                    oj.Router.rootInstance.go('glsearchpostedbatchesdetail');
                };
                self.onClickSearch = function(data)
                {
                    self.searchPostedBatchesCollection().fetch({
                        success: function(){
                            console.log("=========== search");
                            console.log(self.company());
                            console.log(self.selecteddbcode());
                            console.log(self.selectedProduct());
                            console.log(self.selectedEvent());
                            console.log(self.searchPostedBatchesCollection());
                            var tmp = self.searchPostedBatchesCollection().
                                    where({'glId':self.company()[0]});
                            self.searchPostedBatchesCollection().reset(tmp);
                            console.log(self.searchPostedBatchesCollection());
//                            self.postedBatchesList(self.searchPostedBatchesCollection());
                            console.log("final");
                            console.log(self.postedBatchesList());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                self.id(getParameterByName('id'));
                self.refreshData();
            }
            return organizationTypeMainViewModel();
        }
); 