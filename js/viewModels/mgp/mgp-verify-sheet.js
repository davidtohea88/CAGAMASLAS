/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'services/rendererService', 'services/configService', 
    'services/exportService', 'services/models/customURL', 'jquery', 'ojs/ojrouter',
    'ojs/ojradioset', 'ojs/ojdialog', 'ojs/ojknockout', 'promise',
    'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton',
    'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojdatetimepicker',
    'ojs/ojpagingtabledatasource', 'ojs/ojknockout-validation', 'moment','ojs/ojselectcombobox'],
        function (oj, ko, rendererService, configService, exportService, customURL, $)
        {
            function productgroupMainViewModel() {
                var self = this;
                self.tracker = ko.observable();
                
                var restUrl = configService.serviceUrl + "Product/";
                //var restUrl = configService.serviceUrl + "MD_Product_Group/ProductGroupRestPS/";
                self.productGroupModel = ko.observable();
                self.header = ko.observable("Mortgage Guarantee Program - Verification Sheet");
                self.value = ko.observable('');
                self.allData = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'prodGrpCd'}));
                
                self.prdSerach = ko.observable('');
                self.chlstSearch = ko.observable('');
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
                self.createdByItem = ko.observable('');
                self.createdDateItem = ko.observable('');
                self.updatedByItem = ko.observable('');
                self.updatedDateItem = ko.observable('');     
                
               self.lovProduct =  ko.observableArray([
    
            { value: "Product", label: "Product" },
            { value: "Product2", label: "Product2" },
            { value: "Product3", label: "Product3" } ]);
        self.selectProd  = ko.observable('');    
                
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
                                    console.log(data.MdProdGrp);
                                    self.allData(data.MdProdGrp);
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
                    self.createdByItem(data.createBy);
                    self.createdDateItem(data.createDate);
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
                    
                    var model = oj.Model.extend({
                        urlRoot: restUrl,
                        idAttribute: "prodGrpId",
                        customURL: function (operation, model) {
                            var url;
                            var customURLObj;
                            url = restUrl;
                            customURLObj = new customURL({url: url, type: "PUT"});
                            return customURLObj;
                        }
                    });
                    
                    var productGroupModelNew = new model();
                    productGroupModelNew.attributes.MdProdGrp = [];
                    
                    var prodObject = {};
                    prodObject.prodGrpCd = self.inputProdGrpCd();
                    prodObject.prodGrpName = self.inputProdGrpName();
                    prodObject.prodGrpDesc = self.inputProdGrpDesc();
                    prodObject.active = self.inputActive();
                    prodObject.effectiveDate = self.inputEffectiveDate();
                    prodObject.createdDate = new Date();
                    prodObject.createdBy = "LAS";
                    //prodObject.updatedDate = "";
                    //prodObject.updatedBy = "";
                    productGroupModelNew.attributes.MdProdGrp.push(prodObject);
                    
                    console.log(JSON.stringify(productGroupModelNew));
                    
                    productGroupModelNew.save(undefined, {
                        success: function (model) {
                            $("#AlertDialog").ojDialog("open");
                            self.value("Data : " + self.inputProdGrpName() + "  Created Successfully");
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
                        urlRoot: restUrl,
                        idAttribute: "prodGrpId",
                        customURL: function (operation, model) {
                            var url;
                            var customURLObj;
                            url = restUrl;
                            customURLObj = new customURL({url: url, type: "PUT"});
                            return customURLObj;
                        }
                    });
                    
                    var productGroupModelNew = new model();
                    productGroupModelNew.attributes.MdProdGrp = [];
                    
                    var prodObject = {};
                    prodObject.prodGrpId = self.idItem();
                    prodObject.prodGrpCd = self.inputProdGrpCd();
                    prodObject.prodGrpName = self.inputProdGrpName();
                    prodObject.prodGrpDesc = self.inputProdGrpDesc();
                    prodObject.active = self.inputActive();
                    prodObject.effectiveDate = self.inputEffectiveDate();
                    prodObject.createdDate = self.createdDateItem;
                    prodObject.createdBy = self.createdByItem;
                    prodObject.updatedDate = new Date();
                    prodObject.updatedBy = "LAS";
                    productGroupModelNew.attributes.MdProdGrp.push(prodObject);
                    
                    console.log(JSON.stringify(productGroupModelNew));
                    
                    productGroupModelNew.save(undefined, {
                        success: function () {
                            $("#AlertDialog").ojDialog("open");
                            self.value("Data : " + self.inputProdGrpName() + "  Edited Successfully");
                        }, error: function (jqXHR, textStatus, errorThrown) {
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
                    self.createdByItem('');
                    self.createdDateItem('');
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
                     
                    self.allData(dataFilter);
                };

                self.onResetBtn = function () {
                    self.prdSerach('');
                    self.chlstSearch('');
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
                    $("#ConfirmDialog").ojDialog("open");
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

                self.onExportBtn = function() {
                   self.exportxls(); 
                };
                
                self.onConfirmOK = function () {
                    //alert("ok");
                    var model = oj.Model.extend({
                        urlRoot: restUrl,
                        idAttribute: "prodGrpId",
                        customURL: function (operation, model) {
                            var url;
                            var customURLObj;
                            url = restUrl;
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
                    productGroupModelNew.attributes.MdProdGrp = [];
                    
                    var prodObject = {};
                    
                    prodObject.prodGrpId = self.idItem();
                    prodObject.prodGrpCd = self.codeItem();
                    prodObject.prodGrpName = self.nameItem();
                    prodObject.prodGrpDesc = self.descItem();
                    prodObject.active = status;
                    prodObject.effectiveDate = self.effectiveDateItem();
                    prodObject.createdDate = self.createdDateItem;
                    prodObject.createdBy = self.createdByItem;
                    prodObject.updatedDate = new Date();
                    prodObject.updatedBy = "LAS";
                    productGroupModelNew.attributes.MdProdGrp.push(prodObject);
                    
                    console.log(JSON.stringify(productGroupModelNew));

                    productGroupModelNew.save(undefined, {
                        success: function () {
                            $("#ConfirmDialog").ojDialog("close");
                            self.initRefresh();
                        }, error: function (jqXHR, textStatus, errorThrown) {
                            console.log("Error");
                        }});
                    
                };

                self.onConfirmCancel = function () {
                    $("#ConfirmDialog").ojDialog("close");
                };

                self.onAlertOK = function () {
                    $("#AlertDialog").ojDialog("close");
                    self.initRefresh();
                };

                self.initRefresh();
                
            }

            return productgroupMainViewModel();

            $(document).ready(
                function () {
//                    ko.applybindings(new productgroupMainViewModel(), document.getElementById("container"));
                }
            );

        }
); 