/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService','services/exportService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset','ojs/ojselectcombobox'],
        function (oj, ko, $, rendererService, RestService, exportService)
        {
            function exchangeRateMainViewModel() {
                var self = this;
                
                var exchangeRateTypeService = RestService.exchangeRateTypeService();
                self.exchangeRateTypeLOV = ko.observableArray();
                exchangeRateTypeService.fetchAsLOV('orgTypName','exRateTypeId').then(function(data){
                    self.exchangeRateTypeLOV(data);
                });
                
                var restService = RestService.exchangeRateService();
                self.header = "Exchange Rate";
                self.dialogTitle = "Create/edit "+self.header;
                self.collection = ko.observable(restService.createCollection());
                self.allData = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute}));
                self.exchangeRateModel = ko.observable();
                self.nameSearch = ko.observable('');
                self.codeSearch = ko.observable('');
                self.rateTypeSearch = ko.observable('');
                self.selectedExRateTypeId = ko.observableArray();
                
                self.LOVNameRenderer = function(context){
                    if (context.data){
                        var id = context.data;
                        return rendererService.LOVConverter(self.exchangeRateTypeLOV(),id);
                    }
                    return '';
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
                    self.collection().refresh().then(function(){
                        self.allData(self.collection().toJSON());
                    });  
                };
                
                self.search = function (name, type) {
                    var tmp = self.collection().filter(function(rec){
                        return ((name.length ===0 || (name.length > 0 && rec.attributes.ExRateName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)) && 
                                (type.length ===0 || (type.length > 0 && rec.attributes.exRateTypeId==type.toString()) )
                                
                                );
                    });
                    self.collection().reset(tmp);
                    self.allData(self.collection().toJSON());
                };
                
                self.createOrEdit = function (model) {
                    self.exchangeRateModel(model);
                    $("#CreateEditDialog").ojDialog("open");
                };
                
                self.save = function (model) {
                    var user = "LAS";
                    var currentDate = new Date();
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
                        },
                        error: function(){
                            console.log("failed saving");
                        }
                    });
                    
                };

                self.activateDeactivate = function (model) {
                    if (model.attributes.active === 'Y'){
                        model.attributes.active = 'N';
                    }else if (model.attributes.active === 'N'){
                        model.attributes.active = 'Y';
                    }
                    self.save(model);
                };

                self.exportxls = function () {
                    exportService.export($("#table").ojTable("option","columns"),self.allData(),'xlsx','data.xlsx', function(field,value){
                        if (field === 'active'){
                            return rendererService.activeConverter(value);
                        }else if (field === 'updatedDate'){
                            return rendererService.dateTimeConverter.format(value);
                        }else if (field === 'exRateTypeId'){
                            return rendererService.LOVConverter(self.exchangeRateTypeLOV(),value);
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
                    self.collection().refresh().then(function(){
                        self.search(self.nameSearch(),self.selectedExRateTypeId());
                    });
                };
                
                self.onCreate = function(){
                    var model = restService.createModel();
                    self.createOrEdit(model);
                };
                
                self.onEdit = function(){
                    var model = self.collection().get(self.selectedRow());
                    self.selectedExRateTypeId([model.attributes.exRateTypeId]);
                    self.createOrEdit(model);
                };
                
                self.onSave = function(){
                    var arr = self.selectedExRateTypeId();
                    self.exchangeRateModel().attributes.exRateTypeId = arr[0];
                    self.save(self.exchangeRateModel());
                    $("#CreateEditDialog").ojDialog("close");
                };
                
                self.onActivateDeactivate = function(){
                    var model = self.collection().get(self.selectedRow());
                    self.activateDeactivate(model);
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
                
                self.refreshData();
                    
            }
            return exchangeRateMainViewModel();
        }
); 