/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService','services/exportService','services/MessageService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset','ojs/ojselectcombobox','ojs/ojoffcanvas','ojs/ojknockout-validation'],
        function (oj, ko, $, rendererService, RestService, exportService,MessageService)
        {
            function organizationTypeMainViewModel() {
                var restService = RestService.exchangeRateTypeService();
                var self = this;
                self.header = "Exchange Rate Type";
                self.dialogTitle = "Create/edit "+self.header;
                self.collection = ko.observable(restService.createCollection());
                self.allData = ko.observableArray();
                self.orgTypeModel = ko.observable();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute}));
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');
                self.codeSearch = ko.observable('');
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
                self.dateTimeRenderer = function(context){
                    return rendererService.dateTimeConverter.format(context.data);
                };
                
                self.dateRenderer = function(context){
                    return rendererService.dateConverter.format(context.data);
                };
                
                self.activeRenderer = function(context){
                    return rendererService.activeConverter(context.data);
                };
                 
                self.refreshData = function () {
                    self.collection().refresh().then(function(){
                            self.allData(self.collection().toJSON());
                        });
                };

                self.search = function (code, name, desc) {
                    var tmp = self.collection().filter(function(rec){
                            return ((code.length ===0 || (code.length > 0 && rec.attributes.orgTypCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                    (name.length ===0 || (name.length > 0 && rec.attributes.orgTypName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)) &&
                                    (desc.length ===0 || (desc.length > 0 && rec.attributes.orgTypDesc.toLowerCase().indexOf(desc.toString().toLowerCase()) > -1)));
                        });
                    self.collection().reset(tmp);
                    self.allData(self.collection().toJSON());
                };
                
                self.createOrEdit = function (model) {
                    self.orgTypeModel(model);
                    $("#CreateEditDialog").ojDialog("open");
                };
                
                self.cancel = function () {
                    $("#CreateEditDialog").ojDialog("close");
                };
                
                self.save = function (model,successMsg) {
                    var user = "LAS";
                    var currentDate = new Date();
                    var defaultAttributes = {createdBy: model.isNew()?user:model.attributes.createdBy,
                            createdDate: model.isNew()?currentDate:model.attributes.createdDate,
                            updatedBy: user,
                            updatedDate: currentDate,
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

                self.activateDeactivate = function (model) {
                    if (model.attributes.active === 'Y'){
                        model.attributes.active = 'N';
                    }else if (model.attributes.active === 'N'){
                        model.attributes.active = 'Y';
                    }
                    self.save(model,self.header+" \""+model.attributes.crncyCd+"\" is successfully "+(model.attributes.active==='Y'?'activated':'deactivated'));
                };

                self.exportxls = function () {
                    exportService.export($("#table").ojTable("option","columns"),self.allData(),'xlsx','data.xlsx', function(field,value){
                        if (field === 'active'){
                            return rendererService.activeConverter(value);
                        }else if (field === 'effectiveDate'){
                            return rendererService.dateConverter.format(value);
                        }else if (field === 'updatedDate'){
                            return rendererService.dateTimeConverter.format(value)
                        }else{
                            return value;
                        }
                    });
                };
                
                self.selectedRow = ko.observable(undefined);
                
                // ===============  EVENT HANDLER  ==============
                
                self.onReset = function(){
                    self.refreshData();
                    
                    self.codeSearch('');
                    self.nameSearch('');
                    
                    self.selectedRow(undefined);
                    $('#btnEdit').hide();
                    $('#btnActivate').hide();

                };
                
                self.onSearch = function(){
                    self.collection().fetch({
                        success: function(){
                        self.search(self.codeSearch(),self.nameSearch(),self.descSearch());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onCreate = function(){
                    var model = restService.createModel({active: 'Y'});
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
                         self.save(self.orgTypeModel());
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
                    var model = self.collection().get(self.selectedRow());
                    self.activateDeactivate(model);
                };
                
                self.refreshData();            }
            return organizationTypeMainViewModel();
        }
); 