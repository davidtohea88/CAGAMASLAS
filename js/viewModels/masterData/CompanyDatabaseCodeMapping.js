/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService','services/exportService','services/MessageService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource',
        'ojs/ojselectcombobox','ojs/ojoffcanvas','ojs/ojknockout-validation','ojs/ojdialog'],
        function (oj, ko, $, rendererService, RestService, exportService,MessageService)
        {
            function organizationTypeMainViewModel() {
                var self = this;

                self.header = "Company Database Code Mapping";
                self.dialogTitle = "Create/edit "+self.header;

                var restService = RestService.companyService();
                self.collection = ko.observable(restService.createCollection());
                self.allData = ko.observableArray();
                self.companyDataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute}));
                self.companyModel = ko.observable();

                var restServiceDBCode = RestService.dbCodeService();
                self.collectionDBCode = ko.observable(restServiceDBCode.createCollection());
                self.DBCodeData = ko.observableArray();
                self.DBCodeDataSource =  new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.DBCodeData, {idAttribute: self.collectionDBCode().model.idAttribute}));
                self.DBCodeModel = ko.observable();
                
                var companyService = RestService.companyService();
                self.companyLOV = ko.observableArray();
                companyService.fetchAsLOV('CompanyName','CompanyId').then(function(data){
                    self.companyLOV(data);
                });
                self.selectedcompanyId = ko.observableArray();
                

                self.selectedRow = ko.observable(undefined);
                self.selectedRowValue = ko.observable(undefined);
                self.selectedRowDB = ko.observable(undefined);
                self.searchDBCode = ko.observable('');
                
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

                // ===============  EVENT HANDLER  ==============
                
                
                self.getCompanyName = function(id){
                    return new Promise(function(resolve,reject){
                       ko.utils.arrayForEach(self.allData(), function(x) {
                            if(x.CompanyId===id){
                                console.log(x.CompanyName);
                                resolve(x.CompanyName);

                            }
                        }); 
                    });
                    
                };
                self.refreshData = function(){
                    // fetch from rest service

                    self.collection().fetch({
                        success: function(){
                            self.allData(self.collection().toJSON());
                            self.DBCodeData.removeAll();
                                self.collectionDBCode().fetch({
                                    success: function(){

                                        var temp = self.collectionDBCode().toJSON();

                                        var idx=0;
                                            ko.utils.arrayForEach(temp, function(item) {
                                                    ko.utils.arrayForEach(self.allData(), function(x) {
                                                        if(x.CompanyId===item.OrgId)
                                                        {
                                                            temp[idx].OrgName=x.CompanyName;
                                                            self.DBCodeData.push(temp[idx]);
                                                            return ;
                                                        }
                                                    });
                                                idx++;

                                            });
            //                                self.DBCodeData(temp);

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
                     var user = "LAS";
                    var currentDate = new Date();
//                    console.log(self.selectedcompanyId()[0]);
                    model.attributes.OrgId=self.selectedcompanyId()[0];
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
                
                self.onAddDB = function(){
                    var currentRowLas = $('#company').ojTable('option', 'currentRow');
                    var  idx = currentRowLas['rowIndex'];
                    self.companyDataSource.at(idx).
                        then(function (obj) {
                            self.selectedRow(obj.data[self.collection().model.idAttribute]);
                        });
                    var model = restServiceDBCode.createModel({active: 'Y',CompanyId:self.selectedRow()});
                    self.createOrEditDBCode(model);                    
                };
                
                self.createOrEdit = function (model) {
                    self.DBCodeModel(model);
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
                                

                self.activeRenderer = function(context){
                    return rendererService.activeConverter(context.data);
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
                    var model = restServiceDBCode.createModel({active: 'Y'});
                    self.createOrEdit(model);
                };
                
                self.onEdit = function(){
                    var model = self.collection().get(self.selectedRow());
                    self.createOrEdit(model);
                };

                self.onSave = function(){
                    var trackerObj = ko.utils.unwrapObservable(self.tracker);
                    if (trackerObj !== undefined){
                        if (trackerObj instanceof oj.InvalidComponentTracker){
                            trackerObj.showMessages();
                            trackerObj.focusOnFirstInvalid();
                        }
                    }
                    if (!(trackerObj.invalidHidden || trackerObj.invalidShown)){
                         self.save(self.DBCodeModel());
                    }
                };
                
                self.onCancel = function(){
                    $("#CreateEditDialog").ojDialog("close");
                };

                self.onSelectRow = function(){
                    var currentRowLas = $('#company').ojTable('option', 'currentRow');
                    var  idx = currentRowLas['rowIndex'];
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


                
 
                self.deactivate = function (model) {
                    model.attributes.active = 'N';
                    self.save(model,self.header +" is successfully deleted");
                };
                

                self.onDeleteDB = function (){
                    var currentRowLas = $('#dbcode').ojTable('option', 'currentRow');
                    
                    self.DBCodeData()[currentRowLas['rowIndex']].active='N';
                    var model = restServiceDBCode.createModel(self.DBCodeData()[currentRowLas['rowIndex']]);
                    self.deactivate(model);                    
                    self.refreshData();
                };
                
                
                self.onDelete = function(){
                    $("#ConfirmDialog").ojDialog("open");
                };
                
                self.activateDeactivate = function (model) {
                    if (model.attributes.active === 'Y'){
                        model.attributes.active = 'N';
                    }else if (model.attributes.active === 'N'){
                        model.attributes.active = 'Y';
                    }
                    self.save(model,"Mapping is successfully "+(model.attributes.active==='Y'?'activated':'deactivated'));
                };
                
                self.onConfirmYes = function(){
//                    $('#btnActivate').ojButton("option", "disabled", true );
//                    $("#ConfirmDialog").ojDialog("close");
//                    var model = self.collection().get(self.selectedRow());
//                    self.activateDeactivate(model);

                    var currentRowLas = $('#dbcode').ojTable('option', 'currentRow');
                    
                    self.DBCodeData()[currentRowLas['rowIndex']].active='N';
                    var model = restServiceDBCode.createModel(self.DBCodeData()[currentRowLas['rowIndex']]);
                    self.activateDeactivate(model);                    
                    self.refreshData();
                };
                
                self.search = function (dbcode, company) {
                    var tmp = self.collectionDBCode().filter(function(rec){
                        return ((dbcode.length ===0 || (dbcode.length > 0 && rec.attributes.DBCode.toLowerCase().indexOf(dbcode.toString().toLowerCase()) > -1)) &&
                                (company ===undefined || (company !== undefined && rec.attributes.OrgId===company)));
                    });
                    self.collectionDBCode().reset(tmp);
                    var tempdata = self.collectionDBCode().toJSON()
                    
                    var idx=0;
                    self.DBCodeData.removeAll();
                    ko.utils.arrayForEach(tempdata, function(item) {
                        if(item.active==='Y'){
                            ko.utils.arrayForEach(self.allData(), function(x) {
                                if(x.CompanyId===item.OrgId)
                                {

                                    tempdata[idx].OrgName=x.CompanyName;
                                    self.DBCodeData.push(tempdata[idx]);
                                    return ;
                                }
                            });
                        }

                        idx++;

                    });
                };

                self.onSearch = function(){
                    
                    self.collectionDBCode().fetch({
                        success: function(){
                    self.search(self.searchDBCode(),self.selectedcompanyId()[0]);

                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                self.onReset = function(){
                    self.refreshData();
                    self.searchDBCode('');
                    self.selectedcompanyId([]);
                };
                
                self.onConfirmNo = function(){
                    $("#ConfirmDialog").ojDialog("close");
                };
                
//                self.onConfirmYes = function(){
//                    $("#ConfirmDialog").ojDialog("close");
//                    var model = self.collection().get(self.selectedRow());
//                    self.activateDeactivate(model);
//                };
                
                self.refreshData();
            }
            return organizationTypeMainViewModel();
        }
); 