/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService','services/exportService',
        'services/MessageService','services/ValidatorService','ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset','ojs/ojoffcanvas','ojs/ojknockout-validation','ojs/ojswitch'],
        function (oj, ko, $, rendererService, RestService, exportService,MessageService,ValidatorService)
        {
            function assetTypeMainViewModel() {
                var self = this;
                var restService = RestService.contactService();
                self.header = "Contact";
                self.dialogTitle = "Create/edit "+self.header;
                self.collection = ko.observable(restService.createCollection());
                self.allData = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute}));
                self.model = ko.observable();
                self.nameSearch = ko.observable('');
                self.phoneSearch = ko.observable('');
                self.emailSearch = ko.observable('');
                self.isPrimaryContact = ko.observable();
                self.dateConverter = rendererService.dateConverter;
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
                
                self.primaryRenderer = function(context){
                    return rendererService.switchConverter(context.data);
                };

                self.dateTimeRenderer = function(context){
                    return rendererService.dateTimeConverter.format(context.data);
                };
                
                self.dateRenderer = function(context){
                    return rendererService.dateConverter.format(context.data);
                };
                
                self.activeRenderer = function(context){
                    return rendererService.activeConverter(context.data);
                };
                    
                self.refreshData = function(){
                    // fetch from rest service
                    self.collection().fetch({
                        success: function(){
                            self.allData(self.collection().toJSON());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    }); 
                };
                
                self.search = function (phone,name,email) {
                    var tmp = self.collection().filter(function(rec){
                        return ((phone.length ===0 || (phone.length > 0 && rec.attributes.ctcPhone.toLowerCase().indexOf(phone.toString().toLowerCase()) > -1))&&
                                (name.length ===0 || (name.length > 0 && rec.attributes.ctcName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1))&&
                                (email.length ===0 || (email.length > 0 && rec.attributes.ctcName.toLowerCase().indexOf(email.toString().toLowerCase()) > -1)));
                    });
                    self.collection().reset(tmp);
                    self.allData(self.collection().toJSON());
                };
                
                self.createOrEdit = function (model) {
                    self.model(model);
                    $("#CreateEditDialog").ojDialog("open");
                };
                
                self.save = function (model,successMsg) {
                    $('#btnSave').ojButton("option", "disabled", true );
                    $('#btnCancel').ojButton("option", "disabled", true );
                    var user = "LAS";
                    var currentDate = new Date().toISOString();
                    var defaultAttributes = model.isNew()?{createdBy: user,
                            createdDate: currentDate
                        }:{createdBy: model.attributes.createdBy,
                            createdDate: model.attributes.createdDate,
                            updatedBy: user,
                            updatedDate: currentDate
                        };
                    model.save(defaultAttributes,{
                        success: function(model,resp){
                            self.refreshData();
                            var message = successMsg? successMsg: (model.isNew()?'A new contact is successfully created':'Contact is successfully updated');
                            self.showMessage("SUCCESS",message,function(){
                                $("#CreateEditDialog").ojDialog("close");
                                $('#btnSave').ojButton("option", "disabled", false );
                                $('#btnCancel').ojButton("option", "disabled", false );
                                $('#btnActivate').ojButton("option", "disabled", false );
                            });
                        },
                        error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status),function(){
                                $('#btnSave').ojButton("option", "disabled", false );
                                $('#btnCancel').ojButton("option", "disabled", false );
                                $('#btnActivate').ojButton("option", "disabled", false );
                            });
                        }
                    });
                    
                };

                self.activateDeactivate = function (model) {
                    if (model.attributes.active === 'Y'){
                        model.attributes.active = 'N';
                    }else if (model.attributes.active === 'N'){
                        model.attributes.active = 'Y';
                    }
                    self.save(model,"Contact \""+model.attributes.contactName+"\" is successfully "+(model.attributes.active==='Y'?'activated':'deactivated'));
                };

                self.exportxls = function () {
                    exportService.export($("#table").ojTable("option","columns"),self.allData(),'xlsx','data.xlsx', function(field,value){
                        if (field === 'active'){
                            return rendererService.activeConverter(value);
                        }else if (field === 'effectiveDate'){
                            return rendererService.dateConverter.format(value);
                        }else if (field === 'updatedDate'){
                            return rendererService.dateTimeConverter.format(value);
                        }else{
                            return value;
                        }
                    });
                };
                
                self.selectedRow = ko.observable(undefined);
                
                // =============== VALIDATOR ====================
                
                self.emailValidator = ValidatorService.emailValidator;
                self.phoneValidator = ValidatorService.phoneValidator;
                
                // ===============  EVENT HANDLER  ==============
                
                self.onReset = function(){
                    self.refreshData();
                    
                    self.nameSearch('');
                    self.phoneSearch('');
                    self.emailSearch('');
                    
                    if (self.collection().models.length>1){
                        self.selectedRow(undefined);
                        $('#btnEdit').hide();
                        $('#btnActivate').hide();
                    }
                    
                };
                
                self.onSearch = function(){
                    self.collection().fetch({
                        success: function(){
                            self.search(self.phoneSearch(),self.nameSearch(),self.emailSearch());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onCreate = function(){
                    var model = restService.createModel({'active': 'Y','ctcPrimary': 0,'contactId': 1});
                    self.isPrimaryContact(model.attributes.ctcPrimary===1);
                    self.createOrEdit(model);
                };
                
                self.onEdit = function(){
                    var model = self.collection().get(self.selectedRow());
                    self.isPrimaryContact(model.attributes.ctcPrimary===1);
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
                        self.model().attributes.ctcPrimary = self.isPrimaryContact()?1:0;
                        self.save(self.model());
                    }
                };
                
                self.onActivateDeactivate = function(){
                    $("#ConfirmDialog").ojDialog("open");
                };
                
                self.onSelectRow = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSource.at(idx).
                        then(function (obj) {
                            self.selectedRow(obj.data[self.collection().model.idAttribute]);
                            $('#btnEdit').show();
                            $('#btnActivate').show();
                        });
                };
                
                self.onExport = function(){
                    self.exportxls(); 
                };
                
                self.onCancel = function () {
                    $("#CreateEditDialog").ojDialog("close");
                };
                
                self.onConfirmNo = function(){
                    $("#ConfirmDialog").ojDialog("close");
                };
                
                self.onConfirmYes = function(){
                    $("#ConfirmDialog").ojDialog("close");
                    $('#btnActivate').ojButton("option", "disabled", true );
                    var model = self.collection().get(self.selectedRow());
                    self.activateDeactivate(model);
                };
                
                self.refreshData();
                
            }
            return assetTypeMainViewModel();
        }
); 