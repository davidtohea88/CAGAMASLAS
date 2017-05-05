/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'data/data', 'jquery', 'services/rendererService', 'services/RestService','services/exportService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset'],
        function (oj, ko, data, $, rendererService, RestService, exportService)
        {
            function countryMainViewModel() {
                var self = this;
                var restService = RestService.countryService();
                self.header = "Country";
                self.dialogTitle = "Create/edit "+self.header;
                self.countryModel = ko.observable();
                self.collection = ko.observable(restService.createCollection());
                self.allData = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute}));
                
                self.codeSearch = ko.observable('');
                self.nameSearch = ko.observable('');

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
                
                self.search = function (code, name) {
                    var tmp = self.collection().filter(function(rec){
                        return ((code.length ===0 || (code.length > 0 && rec.attributes.countryCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                (name.length ===0 || (name.length > 0 && rec.attributes.countryName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)));
                    });
                    self.collection().reset(tmp);
                    self.allData(self.collection().toJSON());
                };
                
                self.createOrEdit = function (model) {
                    self.countryModel(model);
                    $("#CreateEditDialog").ojDialog("open");
                };
                
                self.save = function (model) {
                    var user = "LAS";
                    var currentDate = new Date();
                    var defaultAttributes = {createdBy: model.isNew()?user:model.attributes.createdBy,
                            createdDate: model.isNew()?currentDate:model.attributes.createdDate,
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
                    
                    if (self.collection().models.length>1){
                        self.selectedRow(undefined);
                        $('#btnEdit').hide();
                        $('#btnActivate').hide();
                    }
                };
                
                self.onSearch = function(){
                    self.collection().refresh().then(function(){
                        self.search(self.codeSearch(),self.nameSearch());
                    });
                };
                
                self.onCreate = function(){
                    var model = restService.createModel();
                    self.createOrEdit(model);
                };
                
                self.onEdit = function(){
                    var model = self.collection().get(self.selectedRow());
                    self.createOrEdit(model);
                };
                
                self.onSave = function(){
                    self.save(self.countryModel());
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
            return countryMainViewModel();
        }
); 