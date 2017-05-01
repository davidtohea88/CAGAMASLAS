/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'data/data', 'jquery', 'services/rendererService', 'services/configService','services/exportService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset'],
        function (oj, ko, data, $, rendererService, configService, exportService)
        {
            function countryMainViewModel() {
                var self = this;
                self.header = "Country";
                self.dialogTitle = "Create/edit "+self.header;
                self.countryModel = ko.observable();
                self.allData = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'countryId'}));
                self.codeSearch = ko.observable('');
                self.nameSearch = ko.observable('');

                self.dateTimeRenderer = function(context) 
                {
                    return rendererService.dateTimeConverter.format(context.data);
                };
                
                self.dateRenderer = function(context) 
                {
                    return rendererService.dateConverter.format(context.data);
                };
                
                self.activeRenderer = function(context) 
                {
                    return rendererService.activeConverter(context.data);
                };
                    
                self.refreshData = function (fnSuccess) {
                    console.log("fetching data");
                    var jsonUrl = "js/data/country.json";

                    $.ajax(jsonUrl,
                            {
                                method: "GET",
                                dataType: "json",
//                                headers: {"Authorization": "Basic " + btoa("username:password")},
                                // Alternative Headers if using JWT Token
                                // headers : {"Authorization" : "Bearer "+ jwttoken; 
                                success: function (data)
                                {
                                    fnSuccess(data);
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    console.log(textStatus, errorThrown);
                                }
                            }
                    );
                };

                self.search = function (code, name) {
                    var temp = ko.utils.arrayFilter(self.allData(),
                        function (rec) {
                            return ((code.length ===0 || (code.length > 0 && rec.countryCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                    (name.length ===0 || (name.length > 0 && rec.countryName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)));
                        });
                    self.allData(temp);
                };
                
                self.createOrEdit = function (model) {
                    self.countryModel(model);
                    $("#CreateEditDialog").ojDialog("open");
                };
                
                self.cancel = function () {
                    $("#CreateEditDialog").ojDialog("close");
                };
                
                self.save = function (model) {
                   console.log("Saving ");
                   console.log(model);
                };

                self.activateDeactivate = function (model) {
                    if (model.active === 'Y'){
                        model.active = 'N';
                    }else if (model.active === 'N'){
                        model.active = 'Y';
                    }
                    self.save(model);
                };

                self.exportxls = function () {
                    exportService.export($("#table").ojTable("option","columns"),self.allData(),'xlsx','data.xlsx');
                };
                
                self.selectedRow = undefined;
                
                // ===============  EVENT HANDLER  ==============
                
                self.onReset = function(){
                    self.codeSearch('');
                    self.nameSearch('');
                    self.refreshData(function(data){
                        self.allData(data.MdCountry);
                    });
                };
                
                self.onSearch = function(){
                    self.refreshData(function(data){
                        self.allData(data.MdCountry);
                        self.search(self.codeSearch(),self.nameSearch());
                    });
                };
                
                self.onCreate = function(){
                    var country = { countryId: undefined,
                        countryName: "",
                        countryCd: "",
                        active: "Y"};
                    self.createOrEdit(country);
                };
                
                self.onEdit = function(){
                    self.createOrEdit(self.selectedRow);
                };
                
                self.onSave = function(model){
                    self.save(model);
                };
                
                self.onActivateDeactivate = function(){
                    self.activateDeactivate(self.selectedRow);
                }
                
                self.onSelectRow = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSource.at(idx).
                        then(function (obj) {
                            self.selectedRow = obj.data;
                        });
                };
                
                self.onExport = function(){
                   self.exportxls(); 
                };

                self.refreshData(function(data){
                    self.allData(data.MdCountry);
                });
            }
            return countryMainViewModel();
        }
); 