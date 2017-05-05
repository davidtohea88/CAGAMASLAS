/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'data/data', 'jquery', 'services/rendererService', 'services/configService','services/exportService','cagutils', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset'],
        function (oj, ko, data, $, rendererService, configService, exportService,cagutils)
        {
            function counterpartyTypeMainViewModel() {
                var self = this;
                var restService = RestService.counterpartyTypeService();
                self.header = "Counterparty Type";
                self.dialogTitle = "Create/edit "+self.header;
                self.collection = ko.observable(restService.createCollection());
                self.allData = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute}));
                self.model = ko.observable();
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');
                self.codeSearch = ko.observable('');
                self.dateConverter = rendererService.dateConverter;

                self.dateTimeRenderer = function(context){
                    return rendererService.dateTimeConverter.format(context.data);
                };
                
                self.dateRenderer = function(context){
                    return rendererService.dateConverter.format(context.data);
                };
                
                self.activeRenderer = function(context){
                    return rendererService.activeConverter(context.data);
                };
                    
                self.refreshData = function (fnSuccess) {
                    console.log("fetching data");
                    var jsonUrl = "js/data/counterpartyType.json";                    
                    self.refreshJsonData(jsonUrl,fnSuccess);                 
                };

                self.search = function (code, name, desc) {                    
                    var Keys = ["counterPrtyTypCd","counterPrtyTypName","counterPrtyTypDesc"];
                    var Vals= [code,name,desc];                    
                    var temp = self.doFilterSearch(Keys,Vals,self.allData());                 
                    self.allData(temp);
                }; 
                
                self.createOrEdit = function (model) {
                    self.model(model);
                    $("#CreateEditDialog").ojDialog("open");
                };
                
                self.save = function (model) {
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
                    self.descSearch('');
                    
                    if (self.collection.model.length>1){
                        self.selectedRow(undefined);
                        $('#btnEdit').hide();
                        $('#btnActivate').hide();
                    }
                    
                };
                
                self.onSearch = function(){
                    self.collection().refresh().then(function(){
                        self.search(self.codeSearch(),self.nameSearch(),self.descSearch());
                        self.selectedRow(undefined);
                        $('#btnEdit').hide();
                        $('#btnActivate').hide();
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
                    self.save(self.model());
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
            return counterpartyTypeMainViewModel();
        }
); 
