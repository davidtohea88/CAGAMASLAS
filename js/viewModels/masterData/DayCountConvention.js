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
                self.header = "Day Count Convention";
                self.dialogTitle = "Create/edit "+self.header;
                self.emptyPlaceholder = ko.observable(false);
                self.allData = ko.observableArray();
                self.DCConvModel = ko.observable();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'DCConvId'}));
                self.nameSearch = ko.observable('');
                self.codeSearch = ko.observable('');
                self.descSearch = ko.observable('');
                self.numeratorVal = ko.observable('');
                self.denominatorVal = ko.observable('');
                self.numeratorList = ko.observableArray([ 
                    {value: "30", label: "30"},  
                    {value: "Actual", label: "Actual"} 
                ]);
                self.denominatorList = ko.observableArray([ 
                    {value: "360", label: "360"},  
                    {value: "365", label: "365"},  
                    {value: "Actual", label: "Actual"} 
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
                    var jsonUrl = "js/data/dayCountConvention.json";

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

                self.search = function (code, name, desc) {
                    var temp = ko.utils.arrayFilter(self.allData(),
                        function (rec) {
                            return ((code.length ===0 || (code.length > 0 && rec.orgLvlCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                    (name.length ===0 || (name.length > 0 && rec.orgLvlName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)) &&
                                    (desc.length ===0 || (desc.length > 0 && rec.orgLvlDesc.toLowerCase().indexOf(desc.toString().toLowerCase()) > -1)));
                        
                        });
                    self.allData(temp);
                };
                
                self.createOrEdit = function (model) {
                    self.DCConvModel(model);
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
                        self.allData(data.MdDayCountConvention);
                        $('#btnEdit').hide();
                        $('#btnActivate').hide();
                    });
                };
                
                self.onSearch = function(){
                    self.refreshData(function(data){
                        self.allData(data.MdDayCountConvention);
                        self.search(self.codeSearch(),self.nameSearch(),self.descSearch());
                    });
                };
                
                self.onCreate = function(){
                    var newRec = { orgHierId: undefined,
                        DCConvId: undefined,
                        DCConvCd: undefined,
                        DCConvName: undefined,
                        DCConvDesc: undefined,
                        Numerator: undefined,
                        Denominator: undefined,
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