/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService', 'services/exportService', 'services/MessageService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker', 'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojoffcanvas', 'ojs/ojknockout-validation', 'lodash'],
        function (oj, ko, $, rendererService, RestService, exportService, MessageService)
        {
            function counterpartyMainViewModel() {
                var self = this;
                // LOV
                var counterpartyTypeService = RestService.counterpartyTypeService();
                self.counterpartyTypeLOV = ko.observableArray();
                counterpartyTypeService.fetchAsLOV('cptTypeName','cptTypeId').then(function(data){
                    self.counterpartyTypeLOV(data);
                });
                self.selectedCounterpartyTypeId = ko.observableArray();

                var counterpartyGroupService = RestService.counterpartyGroupService();
                self.counterpartyGroupLOV = ko.observableArray();
                counterpartyGroupService.fetchAsLOV('cptGrpName','cptGrpId').then(function(data){
                    self.counterpartyGroupLOV(data);
                });
                self.selectedCounterpartyGroupId = ko.observableArray();

                var counterpartySectorService = RestService.counterpartySectorService();
                self.counterpartySectorLOV = ko.observableArray();
                counterpartySectorService.fetchAsLOV('cptSctrName','cptSctrId').then(function(data){
                    self.counterpartySectorLOV(data);
                });
                self.selectedCounterpartySectorId = ko.observableArray();

                // Service
                var restService = RestService.counterpartyService();
                self.header = "Counterparty";
                self.dialogTitle = "Create/edit "+self.header;
                self.collection = ko.observable(restService.createCollection());
                self.allData = ko.observableArray();
                self.arrResult = ko.observable();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute}));
                self.model = ko.observable();
                self.nameSearch = ko.observable('');
                self.codeSearch = ko.observable('');
                self.dateConverter = rendererService.dateConverter;
                self.message = ko.observable();
                self.colorType = ko.observable();
                self.tracker = ko.observable();
                //self.collectionCpType = ko.observableArray();
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
                
                self.joinCollection = function () {
                    console.log(self.collection().toJSON());
                    var arrResult = self.collection().toJSON();
                    var counterpartyTypeService = RestService.counterpartyTypeService();
                    self.collectionCpType = ko.observable(counterpartyTypeService.createCollection());
                    self.collectionCpType().fetch({
                        success: function () {
                            arrResult = _.map(self.collection().toJSON(), function (obj) {
                                return _.assign(obj, _.find(self.collectionCpType().toJSON(), {
                                    cptTypeId: obj.cptTypeId
                                }));
                            });
                        }
                    });
                    var counterpartyGroupService = RestService.counterpartyGroupService();
                    self.collectionCpGroup = ko.observable(counterpartyGroupService.createCollection());
                    self.collectionCpGroup().fetch({
                        success: function () {
                            arrResult = _.map(arrResult, function (obj) {
                                return _.assign(obj, _.find(self.collectionCpGroup().toJSON(), {
                                    cptGrpId: obj.cptGrpId
                                }));
                            });
                        }
                    });
                    var counterpartySectorService = RestService.counterpartySectorService();
                    self.collectionCpSector = ko.observable(counterpartySectorService.createCollection());
                    self.collectionCpSector().fetch({
                        success: function () {
                            arrResult = _.map(arrResult, function (obj) {
                                return _.assign(obj, _.find(self.collectionCpSector().toJSON(), {
                                    cptSctrId: obj.cptSctrId
                                }));
                            });
                            console.log(arrResult);
                            self.allData(arrResult);
                        }
                    });
                }
                    
                self.refreshData = function(){
                    // fetch from rest service
                    self.collection().fetch({
                        success: function(){
                            self.joinCollection();
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    }); 
                };
                
                self.search = function (code, name, type, group, sector) {
                    var tmp = self.collection().filter(function(rec){
                        return ((code.length ===0 || (code.length > 0 && rec.attributes.cptCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                (name.length ===0 || (name.length > 0 && rec.attributes.cptName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)) &&
                                (type.length ===0 || (type.length > 0 && rec.attributes.cptTypeId.toString().toLowerCase().indexOf(type.toString().toLowerCase()) > -1)) &&
                                (group.length ===0 || (group.length > 0 && rec.attributes.cptGrpId.toString().toLowerCase().indexOf(group.toString().toLowerCase()) > -1)) &&
                                (sector.length ===0 || (sector.length > 0 && rec.attributes.cptSctrId.toString().toLowerCase().indexOf(sector.toString().toLowerCase()) > -1)));
                    });
                    self.collection().reset(tmp);
                    self.joinCollection();
                    //self.allData(self.collection().toJSON());
                };
                
                self.createOrEdit = function (model) {
                    //self.model(model);
                    //$("#CreateEditDialog").ojDialog("open");
                    //oj.Router.rootInstance.store(item);
                    if (typeof model.attributes.cptId == 'undefined') {
                        oj.Router.rootInstance.store(null);
                    } else {
                        oj.Router.rootInstance.store(model.attributes.cptId);
                    }
                    oj.Router.rootInstance.go("counterpartyDetail");
                };
                
                self.btnViewDetail = function(model) {
                    //alert(model.cptName);
                    //console.log(item.cpCd);
                    oj.Router.rootInstance.store(model.cptId);
                    oj.Router.rootInstance.go("counterpartyDetail");
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
                        success: function(model){
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
                    self.save(model,self.header+" \""+model.attributes.cptCd+"\" is successfully "+(model.attributes.active==='Y'?'activated':'deactivated'));
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
                
                // ===============  EVENT HANDLER  ==============
                
                self.onReset = function(){
                    self.refreshData();
                    
                    self.codeSearch('');
                    self.nameSearch('');
                    self.selectedCounterpartyTypeId([]);
                    self.selectedCounterpartyGroupId([]);
                    self.selectedCounterpartySectorId([]);
                    
                    if (self.collection().models.length>1){
                        self.selectedRow(undefined);
                        $('#btnEdit').hide();
                        $('#btnActivate').hide();
                    }
                };
                
                self.onSearch = function(){
                    self.collection().fetch({
                        success: function(){
                            self.search(self.codeSearch(),self.nameSearch(),self.selectedCounterpartyTypeId(),self.selectedCounterpartyGroupId,self.selectedCounterpartySectorId);
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
                    var model = self.collection().get(self.selectedRow());
                    self.activateDeactivate(model);
                };
                
                self.refreshData();
            }
            return counterpartyMainViewModel();
        }
); 