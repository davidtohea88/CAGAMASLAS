/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService','services/exportService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset','ojs/ojselectcombobox'],
        function (oj, ko, $, rendererService, RestService, exportService)

        {
            function exchangeRateTypeMainViewModel() {
                var restService = RestService.exchangeRateDataEntryService();
                var self = this;
                self.header = "Exchange Rate Data Entry";
                self.dialogTitle = "Create/edit "+self.header;
                self.allData = ko.observableArray();
                self.ExRateModel = ko.observable();
                self.collection = ko.observable(restService.createCollection());
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute}));
                self.nameSearch = ko.observable('');
                self.currSearch = ko.observable('');
                self.startDateSearch = ko.observable('');
                self.endDateSearch = ko.observable('');
//                self.originCurrency = ko.observable('');
//                self.targetCurrency = ko.observable('');
//                self.rate = ko.observable('');
//                self.reverseRate = ko.observable('');
//                self.startDate = ko.observable('');
//                self.endDate = ko.observable('');

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


                self.search = function (name, curr,start, end) {
                    var tmp = ko.utils.arrayFilter(self.allData(),
                        function (rec) {
                            return ((name.length ===0 || (name.length > 0 && rec.ExRateName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)) &&
                                    (start.length ===0 || (start.length > 0 && rec.StartDate.toLowerCase().indexOf(start.toString().toLowerCase()) > -1)) &&
                                    (end.length ===0 || (end.length > 0 && rec.EndDate.toLowerCase().indexOf(end.toString().toLowerCase()) > -1)) &&
                                    (curr.length ===0 || curr.length > 0 && rec.OrgCurr.toLowerCase().indexOf(curr.toString().toLowerCase()) > -1));
                        });
                    self.collection().reset(tmp);
                    self.allData(self.collection().toJSON());
                };
                
                self.createOrEdit = function (model) {
                    self.ExRateModel(model);
                    $("#CreateEditDialog").ojDialog("open");
                };
                
                self.cancel = function () {
                    $("#CreateEditDialog").ojDialog("close");
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
                        }else if (field === 'updatedDate'){
                            return rendererService.dateTimeConverter.format(value);
                        }else if (field === 'countryId'){
                            return rendererService.LOVConverter(self.countryLOV(),value);
                        }else{
                            return value;
                        }
                    });
                };
                
                self.selectedRow = ko.observable(undefined);
                
                // ===============  EVENT HANDLER  ==============
                
                self.onReset = function(){
                    self.refreshData();  
                    self.currSearch('');
                    self.nameSearch('');
                    self.startDateSearch('');
                    self.endDateSearch('');
                };
                
                self.onSearch = function(){
                    self.collection().refresh().then(function(){
                        self.search(self.nameSearch(),self.currSearch(),self.startDateSearch(),self.endDateSearch());
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
                    self.save(self.ExRateModel());
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
            return exchangeRateTypeMainViewModel();
        }
); 