/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'services/rendererService', 'services/configService', 
    'services/exportService', 'services/models/customURL', 'jquery', 'ojs/ojrouter',
    'ojs/ojradioset', 'ojs/ojdialog', 'ojs/ojknockout', 'promise',
    'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton',
    'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojdatetimepicker',
    'ojs/ojpagingtabledatasource', 'ojs/ojknockout-validation', 'moment'],
        function (oj, ko, rendererService, configService, exportService, customURL, $)
        {
            function productgroupMainViewModel() {
                var self = this;
                self.tracker = ko.observable();
                
                var restUrl = configService.serviceUrl + "MdProdGrp/";
                self.productGroupModel = ko.observable();
                self.header = "Product Group";
                self.allData = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'prodGrpCd'}));
                
                self.codeSearch = ko.observable('');
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');

                self.inputProdGrpCd = ko.observable();
                self.inputProdGrpName = ko.observable('');
                self.inputProdGrpDesc = ko.observable('');
                self.inputActive = ko.observable('');
                self.inputEffectiveDate = ko.observable('');

                self.idItem = ko.observable('');
                self.codeItem = ko.observable('');
                self.nameItem = ko.observable('');
                self.descItem = ko.observable('');
                self.statusItem = ko.observable('');
                self.effectiveDateItem = ko.observable('');
                self.createByItem = ko.observable('');
                self.createDateItem = ko.observable('');
                self.updatedByItem = ko.observable('');
                self.updatedDateItem = ko.observable('');               
                
                var model = oj.Model.extend({
                    urlRoot: restUrl, 
                    idAttribute: "prodGrpId"
                });

                self.dateTimeRenderer = function(context){
                    return rendererService.dateTimeConverter.format(context.data);
                };
                
                self.dateRenderer = function(context){
                    return rendererService.dateConverter.format(context.data);
                };
                
                self.activeRenderer = function(context){
                    return rendererService.activeConverter(context.data);
                };
                    
                self.initRefresh = function () {
                    console.log("fetching data");
                    $.ajax(restUrl,
                            {
                                method: "GET",
                                dataType: "json",
                                success: function (data) {
                                    console.log(data);
                                    self.allData(data);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.log(textStatus, errorThrown);
                                }
                            }
                    );
                };

                self.selectedRow = ko.observable(undefined);
                
                self.onRowClick = function (data, event) {
                    self.idItem(data.prodGrpId);
                    self.codeItem(data.prodGrpCd);
                    self.nameItem(data.prodGrpName);
                    self.descItem(data.prodGrpDesc);
                    self.statusItem(data.active);
                    self.effectiveDateItem(data.effectiveDate);
                    self.createByItem(data.createBy);
                    self.createDateItem(data.createDate);
                    self.updatedByItem(data.updatedBy);
                    self.updatedDateItem(data.updatedDate);
                    self.selectedRow(data);
                };

                self.shouldDisableCreate = function () {
                    var trackerObj = ko.utils.unwrapObservable(self.tracker),
                            hasInvalidComponents = ko.utils.unwrapObservable(trackerObj["invalidShown"]);
                    return  hasInvalidComponents;
                };
        
                self._showComponentValidationErrors = function (trackerObj) {
                    trackerObj.showMessages();
                    if (trackerObj.focusOnFirstInvalid())
                        return false;
                    return true;
                };
                
                self.onCreate = function (data, event) {
                    var trackerObj = ko.utils.unwrapObservable(self.tracker);
                    if (!self._showComponentValidationErrors(trackerObj)){
                        return;
                    }
                    
                    var productGroupModelNew = new model();
                    productGroupModelNew.attributes.prodGrpCd = self.inputProdGrpCd();
                    productGroupModelNew.attributes.prodGrpName = self.inputProdGrpName();
                    productGroupModelNew.attributes.prodGrpDesc = self.inputProdGrpDesc();
                    productGroupModelNew.attributes.active = self.inputActive();
                    productGroupModelNew.attributes.effectiveDate = self.inputEffectiveDate();
                    productGroupModelNew.attributes.createDate = new Date();
                    productGroupModelNew.attributes.createBy = "LAS";
                    productGroupModelNew.attributes.updatedDate = "";
                    productGroupModelNew.attributes.updatedBy = "";
                    
                    productGroupModelNew.save(undefined, {
                        success: function (model) {
                            alert("Data : " + productGroupModelNew.attributes.prodGrpCd + "  Created Successfully");
                            self.initRefresh();
                        }, error: function (jqXHR, textStatus, errorThrown) {
                            console.log("Error");
                        }}
                    );
                    $("#DataDialog").ojDialog("close");
                };
                
                self.onEdit = function () {
                    var trackerObj = ko.utils.unwrapObservable(self.tracker);
                    if (!self._showComponentValidationErrors(trackerObj)){
                        return;
                    }
                    
                    var model = oj.Model.extend({
                        urlRoot: restUrl + self.idItem(),
                        idAttribute: "prodGrpId",
                        customURL: function (operation, model) {
                            var url;
                            var customURLObj;
                            url = restUrl + self.idItem();
                            customURLObj = new customURL({url: url, type: "PUT"});
                            return customURLObj;
                        }
                    });
                    
                    var productGroupModelNew = new model();
                    productGroupModelNew.attributes.prodGrpId = self.idItem();
                    productGroupModelNew.attributes.prodGrpCd = self.inputProdGrpCd();
                    productGroupModelNew.attributes.prodGrpName = self.inputProdGrpName();
                    productGroupModelNew.attributes.prodGrpDesc = self.inputProdGrpDesc();
                    productGroupModelNew.attributes.active = self.inputActive();
                    productGroupModelNew.attributes.effectiveDate = self.inputEffectiveDate();
                    productGroupModelNew.attributes.createDate = self.createDateItem;
                    productGroupModelNew.attributes.createBy = self.createByItem;
                    productGroupModelNew.attributes.updatedDate = new Date();
                    productGroupModelNew.attributes.updatedBy = "LAS";

                    productGroupModelNew.save(undefined, {"success": function () {
                            alert("Data : " + productGroupModelNew.attributes.prodGrpCd + "  Edited Successfully");
                            self.initRefresh();
                        }, "error": function (jqXHR, textStatus, errorThrown) {
                            console.log("Error");
                        }});
                    $("#DataDialog").ojDialog("close");

                };
                
                self.resetDialogValue = function () {
                    self.idItem('');
                    self.codeItem('');
                    self.nameItem('');
                    self.descItem('');
                    self.statusItem('');
                    self.effectiveDateItem('');
                    self.createByItem('');
                    self.createDateItem('');
                    self.updatedByItem('');
                    self.updatedDateItem('');
                    
                    self.inputProdGrpCd('');
                    self.inputProdGrpName('');
                    self.inputProdGrpDesc('');
                    self.inputActive('');
                    self.inputEffectiveDate('');
                };
                
                self.onCancel = function () {
                    self.resetDialogValue();
                    self.selectedRow(undefined);
                    $("#DataDialog").ojDialog("close");
                };
                
                self.exportxls = function () {
                    exportService.export($("#table").ojTable("option","columns"),self.allData(),'xlsx','data.xlsx', function(field,value){
                        if (field === 'active'){
                            return rendererService.activeConverter(value);
                        }else if (field === 'updatedDate'){
                            return rendererService.dateTimeConverter.format(value)
                        }else{
                            return value;
                        }
                    });
                };
                
                // ===============  EVENT HANDLER  ==============
                
                self.onSearchBtn = function () {
                    var dataFilter = new Array();
                    ko.utils.arrayFilter(self.allData(),
                            function (r) {
                                var codeSearch = self.codeSearch().toString().toLowerCase();
                                var nameSearch = self.nameSearch().toString().toLowerCase();
                                var descSearch = self.descSearch().toString().toLowerCase();
                                if ((r.prodGrpCd.toString().toLowerCase().indexOf(codeSearch) > -1) &&
                                        (r.prodGrpName.toString().toLowerCase().indexOf(nameSearch) > -1) &&
                                        (r.prodGrpDesc.toString().toLowerCase().indexOf(descSearch) > -1)) {
                                    dataFilter.push(r);

                                }
                            });
                    self.allData(dataFilter);
                };

                self.onResetBtn = function () {
                    self.codeSearch('');
                    self.nameSearch('');
                    self.descSearch('');
                    self.selectedRow(undefined);
                    self.initRefresh();
                };

                self.onCreateBtn = function () {
                    self.productGroupModel(new model());
                    self.resetDialogValue();
                    $('#btn_create').show();
                    $('#btn_edit').hide();
                    $("#DataDialog").ojDialog("open");
                    return true;
                };

                self.onStatusBtn = function () {
                    var model = oj.Model.extend({
                        urlRoot: restUrl + self.idItem(),
                        idAttribute: "prodGrpId",
                        customURL: function (operation, model) {
                            var url;
                            var customURLObj;
                            url = restUrl + self.idItem();
                            customURLObj = new customURL({url: url, type: "PUT"});
                            return customURLObj;
                        }
                    });
                    
                    var status = "";
                    if (self.statusItem() === "N") {
                        status = "Y";
                    } else {
                        status = "N";
                    }
                    
                    var productGroupModelNew = new model();
                    productGroupModelNew.attributes.prodGrpId = self.idItem();
                    productGroupModelNew.attributes.prodGrpCd = self.codeItem();
                    productGroupModelNew.attributes.prodGrpName = self.nameItem();
                    productGroupModelNew.attributes.prodGrpDesc = self.descItem();
                    productGroupModelNew.attributes.active = status;
                    productGroupModelNew.attributes.effectiveDate = self.effectiveDateItem();
                    productGroupModelNew.attributes.createDate = self.createDateItem();
                    productGroupModelNew.attributes.createBy = self.createByItem();
                    productGroupModelNew.attributes.updatedDate = new Date();
                    productGroupModelNew.attributes.updatedBy = "LAS";

                    productGroupModelNew.save(undefined, {
                        success: function () {
                            alert("Data : " + productGroupModelNew.attributes.prodGrpCd + "  Edited Status Successfully");
                            self.initRefresh();
                        }, error: function (jqXHR, textStatus, errorThrown) {
                            console.log("Error");
                        }});

                };

                self.onEditBtn = function () {
                    self.productGroupModel(new model());
                    self.inputProdGrpCd(self.codeItem());
                    self.inputProdGrpName(self.nameItem());
                    self.inputProdGrpDesc(self.descItem());
                    self.inputActive(self.statusItem());
                    self.inputEffectiveDate(self.effectiveDateItem());

                    $('#btn_create').hide();
                    $('#btn_edit').show();
                    $("#DataDialog").ojDialog("open");
                    return true;
                };

                self.onExportBtn = function(){
                   self.exportxls(); 
                };

                self.initRefresh();
                
            }

            return productgroupMainViewModel();

            $(document).ready(
                function () {
                    ko.applybindings(new productgroupMainViewModel(), document.getElementById("validator"));
                }
            );

        }
); 