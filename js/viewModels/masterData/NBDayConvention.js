/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'data/data', 'jquery', 'services/rendererService', 'services/configService','services/exportService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset', 'ojs/ojselectcombobox'],
        function (oj, ko, data, $, rendererService, configService, exportService)
        {
            function organizationMainViewModel() {
                var self = this;
                self.header = "Non Business Day Convention";
                self.dialogTitle = "Create/edit "+self.header;
                self.emptyPlaceholder = ko.observable(false);
                self.allData = ko.observableArray();
                self.NBDConvModel = ko.observable();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'NDBConvId'}));
                self.nameSearch = ko.observable('');
                self.yearSearch = ko.observable('');
                self.fixedDateValue = ko.observable('');
                self.toDateValue = ko.observable('');
                self.yearList = ko.observableArray([ 
                    {value: "2017", label: "2017"},  
                    {value: "2016", label: "2016"},
                    {value: "2015", label: "2015"},
                    {value: "2014", label: "2014"}
                ]);

                self.orgRenderer = function(context) 
                {
                    if (context.data){
                        return context.data.orgName;
                    }
                    return '';
                };

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
                    var jsonUrl = "js/data/nonBusinessConvention.json";

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

                self.search = function (name, year, from, to) {
                    var temp = ko.utils.arrayFilter(self.allData(),
                        function (rec) {
                            return ((name.length ===0 || (name.length > 0 && rec.HolidayName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)) &&
                                    (year.length ===0 || (year.length > 0 && rec.Year.toLowerCase().indexOf(year.toString().toLowerCase()) > -1)) &&
                                    (from.length ===0 || (from.length > 0 && rec.FixedDate>from.toString())) &&
                                    (to.length ===0 || (to.length > 0 && rec.FixedDate<to.toString())));
                        
                        });
                    self.allData(temp);
                };
                
                self.createOrEdit = function (model) {
                    self.NBDConvModel(model);
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
                            return rendererService.dateTimeConverter.format(value);
                        
                        }else{
                            return value;
                        }
                    });
                };
                
                self.selectedRow = ko.observable(undefined);
                
                // ===============  EVENT HANDLER  ==============
                
                self.onReset = function(){
                    self.nameSearch('');
                    self.refreshData(function(data){
                        self.selectedRow(undefined);
                        self.allData(data.MdNonBusinessDayConvention);
                        $('#btnEdit').hide();
                        $('#btnActivate').hide();
                    });
                };
                
                self.onSearch = function(){
                    self.refreshData(function(data){
                        self.allData(data.MdNonBusinessDayConvention);
                        self.search(self.nameSearch(),self.yearSearch(),self.fixedDateValue(),self.toDateValue());
                    });
                };
                
                self.onCreate = function(){
                    var newRec = { NDBConvId: undefined,
                        ConvName: undefined,
                        HolidayName: undefined,
                        FixedDate: undefined,
                        Year: undefined,
                        BusinessRule: undefined,
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
                    self.dataSource.at(idx).
                        then(function (obj) {
                            self.selectedRow(obj.data);
                            $('#btnEdit').show();
                            $('#btnActivate').show();
                        });
                };
                
                self.onExport = function(){
                   self.exportxls(); 
                };

                self.onReset();
            }
            return organizationMainViewModel();
        }
); 