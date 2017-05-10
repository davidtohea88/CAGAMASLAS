/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService','services/exportService','services/MessageService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset','ojs/ojselectcombobox','ojs/ojoffcanvas','ojs/ojknockout-validation'],
        function (oj, ko, $, rendererService, RestService, exportService,MessageService)
        {
            function fundingSourceMainViewModel() {
                var self = this;
                            
                var restService = RestService.fundingSourceService();
                var restServiceTagging = RestService.fundingSourceTaggingService();
                self.header = "Funding Source";
                self.dialogTitle = "Create/edit "+self.header;
                self.dialogTitleTagging = "Add " + self.header+" Tagging";
                self.allData = ko.observableArray();
                self.allDataTagging = ko.observableArray();
                self.collection = ko.observable(restService.createCollection());
                self.collectionTagging = ko.observable(restServiceTagging.createCollection());
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute}));
                self.dataSourceTagging = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allDataTagging, {idAttribute: self.collectionTagging().model.idAttribute}));
                self.fundingSourceModel = ko.observable();
                self.fundingSourceTaggingModel = ko.observable();
                self.nameSearch = ko.observable('');
                self.codeSearch = ko.observable('');
                self.descSearch = ko.observable('');
                self.selectedProductGroupId = ko.observableArray();
                self.message = ko.observable();
                self.colorType = ko.observable();
                self.tracker = ko.observable();
                self.tracker2 = ko.observable();
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
                
                self.refreshData = function(){
                    // fetch from rest service
                    self.collection().fetch({
                        success: function(){
                            self.allData(self.collection().toJSON()); 
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    }); 
                    
                    self.collectionTagging().fetch({
                                success: function(){
                                    self.allDataTagging(self.collectionTagging().toJSON());
                                },error: function(resp){
                                    self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                                }
                            });
                    
                };
                
                self.search = function (name, desc) {
                    var tmp = self.collection().filter(function(rec){
                        return ((name.length ===0 || (name.length > 0 && rec.attributes.FundSrcName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)) &&
                                (desc.length ===0 || (desc.length > 0 && rec.attributes.FundSrcDesc.toLowerCase().indexOf(desc.toString().toLowerCase()) > -1)));
                    });
                    self.collection().reset(tmp);
                    self.allData(self.collection().toJSON());
                };
                
                self.createOrEdit = function (model) {
                    self.fundingSourceModel(model);
                    $("#CreateEditDialog").ojDialog("open");
                };
                
                self.createOrEdiTagging = function (model) {
                    self.fundingSourceTaggingModel(model);
                    $("#CreateEditDialogTagging").ojDialog("open");
                };

                self.save = function (model,successMsg) {
                    var user = "LAS";
                    var currentDate = new Date().toISOString();
                    var defaultAttributes = {createdBy: model.isNew()?user:model.attributes.createdBy,
                            createdDate: model.isNew()?currentDate:model.attributes.createdDate,
                            updatedBy: user,
                            updatedDate: currentDate
                        };
                    model.save(defaultAttributes,{
                        success: function(model,resp){
                            self.refreshData();
                            var message = successMsg? successMsg: (model.isNew()?'A new '+self.header+' is successfully created':self.header+' is successfully updated');
                            self.showMessage("SUCCESS",message,function(){
                                $("#CreateEditDialog").ojDialog("close");
                            });
                        },
                        error: function(resp){
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
                    self.save(model,self.header+" \""+model.attributes.FundSrcCd+"\" is successfully "+(model.attributes.active==='Y'?'activated':'deactivated'));
                };
                
                self.deactivate = function (model) {
                    model.attributes.active = 'N';
                    self.save(model,self.header+" Tagging \""+model.attributes.fundLineId+"\" is successfully deleted");

                };

                self.exportxls = function () {
                    exportService.export($("#table").ojTable("option","columns"),self.allData(),'xlsx','data.xlsx', function(field,value){
                        if (field === 'active'){
                            return rendererService.activeConverter(value);
                        }else if (field === 'updatedDate'){
                            return rendererService.dateTimeConverter.format(value);
                        }else{
                            return value;
                        }
                    });
                };
                
                self.selectedRow = ko.observable(undefined);
                self.selectedRowValue = ko.observable(undefined);
                self.selectedHdr = ko.observable(undefined);
                self.selectedRowTagging = ko.observable(undefined);
                
                // ===============  EVENT HANDLER  ==============
                
                self.onReset = function(){
                    self.refreshData();  
                    self.codeSearch('');
                    self.nameSearch('');
                    self.selectedRow(undefined);
                    self.selectedRowValue(undefined);
                    self.selectedRowTagging(undefined);
                    $('#btnEdit').hide();
                    $('#btnActivate').hide();
                };
                
                self.onSearch = function(){
                    self.collection().fetch({
                        success: function(){
                            self.search(self.nameSearch(),self.descSearch());
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
                    console.log(trackerObj);
                    if (!(trackerObj.invalidHidden || trackerObj.invalidShown)){
                         self.save(self.fundingSourceModel());
                    }
                };
                
                self.onActivateDeactivate = function(){
                    $("#ConfirmDialog").ojDialog("open");
                };
                
                self.onSelectRow = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSource.at(idx).
                        then(function (obj) {
                            self.selectedHdr(self.collection().model.idAttribute);
                            self.selectedRow(obj.data[self.collection().model.idAttribute]);
                            self.selectedRowValue(obj.data[self.collection().model.idAttribute.replace("Id","Name")]);
                            console.log(self.selectedRowValue());
                            $('#btnEdit').show();
                            $('#btnActivate').show();
                        }).
                        then(self.collectionTagging().refresh().then(function(obj){
                            var tmptag = self.collectionTagging().filter(function(rec){
                                return ((rec.attributes.fundHdrId.toString()===self.selectedRow()) &&
                                        (rec.attributes.active==='Y'));
                            });
                            self.collectionTagging().reset(tmptag);
                            self.allDataTagging(self.collectionTagging().toJSON());                            
                        }));
                    $('#DealTagging').show();
                    

                };
                
                self.onSelectRowTagging = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSourceTagging.at(idx).
                        then(function (obj) {
                            self.selectedRowTagging(obj.data[self.collectionTagging().model.idAttribute]);
                            $('#btnDeleteTagging').show();
                        });
                };

                self.onExport = function(){
                    self.exportxls(); 
                };
                
                self.onCancel = function () {
                    $("#CreateEditDialog").ojDialog("close");
                };
                
                self.onAddTagging = function (){
                    var model = restServiceTagging.createModel();
                    self.createOrEdiTagging(model);
                };
                
                self.onDeleteTagging = function (){
                    var model = self.collectionTagging().get(self.selectedRowTagging());
                        self.deactivate(model);                    
                };
                
                self.onSaveTagging = function(){
                    self.fundingSourceTaggingModel().attributes.fundHdrId = self.selectedRow();
                    self.save(self.fundingSourceTaggingModel());
                    $("#CreateEditDialogTagging").ojDialog("close");                    
                };
                
                self.onCancelTagging = function()
                {
                    $("#CreateEditDialogTagging").ojDialog("close");
                };
                
                self.onConfirmNo = function(){
                    $("#ConfirmDialog").ojDialog("close");
                };
                
                self.onConfirmYes = function(){
                    $("#ConfirmDialog").ojDialog("close");
                    var model = self.collection().get(self.selectedRow());
                    self.activateDeactivate(model);
                };

                self.refreshData();
                    
            }
            return fundingSourceMainViewModel();
        }
); 