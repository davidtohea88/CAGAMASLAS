/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService','services/exportService','services/MessageService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojselectcombobox','ojs/ojoffcanvas','ojs/ojknockout-validation'],
        function (oj, ko, $, rendererService, RestService, exportService,MessageService)
        {
            function organizationTypeMainViewModel() {
                var self = this;

                self.header = "Company Database Code Mapping";
                self.dialogTitle = "Create/edit "+self.header;

                var restService = RestService.companyService();
                self.collection = ko.observable(restService.createCollection());
                self.allData = ko.observableArray();
                self.companyDataSource = new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute});
                self.companyModel = ko.observable();

                var restServiceDBCode = RestService.dbCodeService();
                self.collectionDBCode = ko.observable(restServiceDBCode.createCollection());
                self.DBCodeData = ko.observableArray();
                self.DBCodeDataSource =  new oj.ArrayTableDataSource(self.DBCodeData, {idAttribute: self.collectionDBCode().model.idAttribute});
                self.DBCodeModel = ko.observable();

                self.selectedRow = ko.observable(undefined);
                self.selectedRowValue = ko.observable(undefined);
                self.selectedRowDB = ko.observable(undefined);
                
                self.message = ko.observable();
                self.colorType = ko.observable();
                self.tracker = ko.observable();
                self.dialogOffcanvas = {selector: '#dialogDrawer', content: '#dialogContent',
                        modality: 'modeless', autoDismiss: 'none', displayMode: 'overlay'};
                self.pageOffcanvas = {selector: '#pageDrawer', content: '#pageContent',
                        modality: 'modeless', autoDismiss: 'none', displayMode: 'overlay'};
                    
                self.showMessage = function(type,message,afterShow){
                    var canvas = ($("#CreateEditDialog").ojDialog("isOpen"))?self.dialogOffcanvas:self.pageOffcanvas;
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

                self.tracker2 = ko.observable();
                
                // ===============  EVENT HANDLER  ==============
                
                self.refreshData = function(){
                    // fetch from rest service
                    self.collection().fetch({
                        success: function(){
                            self.allData(self.collection().toJSON());
                            $('#databasecode').hide();
                            self.collectionDBCode().fetch({
                                success: function(){
                                    self.DBCodeData(self.collectionDBCode().toJSON());
                                },error: function(resp){
                                    self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                                }
                            }); 
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });  

                };

                self.save = function (model,successMsg) {
                    console.log(model);
                    var user = "LAS";
                    var currentDate = new Date();
                    var defaultAttributes = model.isNew()?{createdBy: user,
                            createdDate: currentDate
                        }:{createdBy: model.attributes.createdBy,
                            createdDate: model.attributes.createdDate,
                            updatedBy: model.isNew()?'':user,
                            updatedDate: model.isNew()?'':currentDate
                        };
                    model.save(defaultAttributes,{
                        success: function(model,resp){
                            self.refreshData();
                            var message = successMsg? successMsg: (model.isNew()?'A new '+self.header+' is successfully created':self.header+' is successfully updated');
                            self.showMessage("SUCCESS",message,function(){
                                $("#CreateEditDialog").ojDialog("close");
                            });
                        },
                        error: function(){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));  
                        }
                    });
                    
                };
                
                self.createOrEdit = function (model) {
                    self.companyModel(model);
                    $("#CreateEditDialog").ojDialog("open");
                };

                self.onAdd = function(){
                    var currentRowSun = $('#sun').ojTable('option', 'currentRow');
                    var res = {
                        AccountId: self.SunGLAccount()[currentRowSun['rowIndex']].AccountId,
                        AccountNo: self.SunGLAccount()[currentRowSun['rowIndex']].AccountNo,
                        AccountName: self.SunGLAccount()[currentRowSun['rowIndex']].AccountName,
                        active:'Y'
                    };
                    var model = restServiceLAS.createModel(res);
                    self.save(model);  
                };
                                

                
                self.createOrEditCompany = function (model) {
                    self.companyModel(model);
                    $("#CreateEditDialog").ojDialog("open");
                };
                self.createOrEditDBCode = function (model) {
                    self.DBCodeModel(model);
                    $("#CreateEditDialogDB").ojDialog("open");
                };

                self.onAddCompany = function(){
                    var model = restService.createModel({active: 'Y'});
                    self.createOrEditCompany(model);
                };
                
                self.onEdit = function(){
                    var model = self.collection().get(self.selectedRow());
                    self.createOrEdit(model);
                };

                self.onSave = function(){
                    var trackerObj = ko.utils.unwrapObservable(self.tracker);
                    if (trackerObj !== undefined){
                        if (trackerObj instanceof oj.InvalidComponentTracker){
                        console.log('invalid');
                            trackerObj.showMessages();
                            trackerObj.focusOnFirstInvalid();
                        }
                    }
                    if (!(trackerObj.invalidHidden || trackerObj.invalidShown)){
                         self.save(self.companyModel());
                    }
                };
                
                self.onSaveDB = function(){
                    var trackerObj2 = ko.utils.unwrapObservable(self.tracker2);
                    if (trackerObj2 !== undefined){
                        if (trackerObj2 instanceof oj.InvalidComponentTracker){
                            trackerObj2.showMessages();
                            trackerObj2.focusOnFirstInvalid();
                        }
                    }
                    if (!(trackerObj2.invalidHidden || trackerObj2.invalidShown)){
                         self.save(self.DBCodeModel());
                    }
                };


                self.onCancel = function(){
                    $("#CreateEditDialog").ojDialog("close");
                };

                self.onCancelDB = function(){
                    $("#CreateEditDialogDB").ojDialog("close");
                };

                self.onSelectRow = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.companyDataSource.at(idx).
                        then(function (obj) {
                            self.selectedRow(obj.data[self.collection().model.idAttribute]);
                            self.selectedRowValue(obj.data['CompanyName']);
                            $('#btn_AddDB').show();
                            $('#btn_EditCompany').show();
                        })
                        .then(self.collectionDBCode().refresh().then(function(obj){
                            $('#databasecode').show();
                            var tmptag = self.collectionDBCode().filter(function(rec){
                                return ((rec.attributes.CompanyId===self.selectedRow()) &&
                                        (rec.attributes.active==='Y'));
                            });
                            self.collectionDBCode().reset(tmptag);
                            self.DBCodeData(self.collectionDBCode().toJSON()); 
                        }));
                };


                self.onAddDB = function(){
                    var model = restServiceDBCode.createModel({active: 'Y',CompanyId:self.selectedRow()});
                    self.createOrEditDBCode(model);                    
                };
 
                self.deactivate = function (model) {
                    model.attributes.active = 'N';
                    self.save(model,self.header +" is successfully deleted");
                };

                self.onDeleteDB = function (){
                    var currentRowLas = $('#dbcode').ojTable('option', 'currentRow');
                    self.DBCodeData()[currentRowLas['rowIndex']].active='N';
                    var model = restServiceDBCode.createModel(self.DBCodeData()[currentRowLas['rowIndex']]);
                    self.deactivate(model);                    
                    self.refreshDataDB();
                };
 
                self.refreshData();
            }
            return organizationTypeMainViewModel();
        }
); 