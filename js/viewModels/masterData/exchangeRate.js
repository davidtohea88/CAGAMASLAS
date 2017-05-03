/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'data/data', 'jquery', 'services/rendererService', 'services/configService','services/exportService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 'ojs/ojselectcombobox',
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset'],
        function (oj, ko, data, $, rendererService, configService, exportService)
        {
            function organizationTypeMainViewModel() {
                var self = this;
                self.header = "Exchange Rate";
                self.dialogTitle = "Create/edit "+self.header;
                self.allData = ko.observableArray();
                self.ExRateModel = ko.observable();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'ExRateCd'}));
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');
                self.codeSearch = ko.observable('');
                self.rateTypeSearch = ko.observable('');
                self.rateType = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'ExRateCd'}));

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
                    var jsonUrl = "js/data/exchangeRate.json";

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
                
                self.GetRateType = function(){
                    console.log("fetching data - Rate Type");
                    var jsonUrl = "js/data/exchangeRateType.json";

                    $.ajax(jsonUrl,
                            {
                                method: "GET",
                                dataType: "json",
//                                headers: {"Authorization": "Basic " + btoa("username:password")},
                                // Alternative Headers if using JWT Token
                                // headers : {"Authorization" : "Bearer "+ jwttoken; 
                                success: function (data)
                                {
                                    for(item in data.MDExchangeRateType)
                                    {                               
                                        var res = {
                                            value: data.MDExchangeRateType[item].orgTypName,
                                            label: data.MDExchangeRateType[item].orgTypName
                                        };
                                        self.rateType.push(res);
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    console.log(textStatus, errorThrown);
                                }
                            });
                };

                self.search = function (name, desc) {
                    var temp = ko.utils.arrayFilter(self.allData(),
                        function (rec) {
                            return ((name.length ===0 || (name.length > 0 && rec.ExRateName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)) &&
                                    (desc.length ===0 || (desc.length > 0 && rec.ExRateType.toLowerCase().indexOf(desc.toString().toLowerCase()) > -1)));
                        });
                    self.allData(temp);
                };
                
                self.createOrEdit = function (model) {
                    self.ExRateModel(model);
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
                    self.codeSearch('');
                    self.nameSearch('');
                    self.rateTypeSearch('');
                    self.refreshData(function(data){
                        $('#btnEdit').hide();
                        $('#btnActivate').hide();
                        self.selectedRow(undefined);
                        self.allData(data.MDExchangeRate);
                    });
                };
                
                self.onSearch = function(){
                    self.refreshData(function(data){
                        self.allData(data.MDExchangeRate);
                        console.log(self.rateTypeSearch());
                        self.search(self.nameSearch(),self.rateTypeSearch());
                    });
                };
                
                self.onCreate = function(){
                    var newRec = { ExRateId: undefined,
                        ExRateName: "",
                        Precision: "",
                        ExRateType: "",
                        ExRateSource: "",
                        active: "Y",
                        effectiveDate: ""};
                    self.createOrEdit(newRec);
                };
                
                self.onEdit = function(){
                    self.createOrEdit(self.selectedRow());
                };
                
                self.onSave = function(model){
                    self.save(model);
                };
                
                self.onActivateDeactivate = function(){
                    self.activateDeactivate(self.selectedRow());
                };
                
                self.onSelectRow = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    $('#btnEdit').show();
                    $('#btnActivate').show();
                    self.dataSource.at(idx).
                        then(function (obj) {
                            self.selectedRow(obj.data);
                        });
                };
                
                self.onExport = function(){
                   self.exportxls(); 
                };

                self.onReset();
                self.GetRateType();
            }
            return organizationTypeMainViewModel();
        }
); 