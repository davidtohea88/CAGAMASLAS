/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'viewModels/GetRest', 'jquery',
    'ojs/ojrouter', 'ojs/ojradioset', 'ojs/ojdialog', 'ojs/ojknockout', 'promise', 'ojs/ojlistview',
    'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 'ojs/ojarraytabledatasource',
    'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdatetimepicker',
    'ojs/ojselectcombobox', 'ojs/ojknockout-validation', 'moment','blobjs','xlsx-js','file-saverjs','tableexport','exports'],
        function (oj, ko, GetRest, $)
        {
            function productViewModel() {
                var self = this;
                self.serviceURL = 'js/data/product.json';
                //self.serviceURL = 'http://localhost:3000/MdProd';
                self.tracker = ko.observable();
                self.productModel = ko.observable();
                self.header = "Product Type";
                self.productData = ko.observableArray([{prodCd: "Fetching data"}]);
                //self.tempPeople = ko.observableArray([{prodCd: "Fetching data"}]);
                self.productDataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.productData, {idAttribute: 'prodCd'}));
                self.productCol = ko.observable();

                self.codeSearch = ko.observable('');
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');

                self.productGroups = [];
                self.productGroups = ko.observableArray([]);
                self.inputProductCode = ko.observable('');
                self.inputProductName = ko.observable('');
                self.inputProductDesc = ko.observable('');
                self.selectedProductGroup = ko.observableArray([]);
                self.inputStatus = ko.observable('');
                self.inputEffectiveDate = ko.observable('');

                self.codeItem = ko.observable('');
                self.nameItem = ko.observable('');
                self.descItem = ko.observable('');
                self.productGroupItem = ko.observable('');
                self.statusItem = ko.observable('');
                self.effectiveDateItem = ko.observable('');

                self.clickResetBtn = function () {
                    self.codeSearch('');
                    self.nameSearch('');
                    self.descSearch('');
                    self.initRefresh();
                };

                self.resetFormDialog = function () {
                    self.inputProductCode('');
                    self.inputProductName('');
                    self.inputProductDesc('');
                    self.inputStatus('');
                    self.inputEffectiveDate('');
                    $(".selector").ojSelect({"placeholder": "Select a value."});
                };

                self.loadProductGroups = function () {
                    self.productGroups([]);
                    var jsonUrl = "js/data/productgroup.json";
                    $.ajax(jsonUrl,
                            {
                                method: "GET",
                                dataType: "json",
                                success: function (data)
                                {
                                    console.log(data);
                                    for (var model in data) {
                                        self.newProductGroups = Object.create(Object.prototype, {
                                            "label": {writable: true, configurable: true, value: data[model].prodGrpName},
                                            "value": {writable: true, configurable: true, value: data[model].prodGrpCd}
                                        });
                                        console.log(newProductGroups);
                                        self.productGroups.push(newProductGroups);
                                    }
                                    //self.productGroups(data);
                                    //console.log(self.productGroups());
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    console.log(textStatus, errorThrown);
                                }
                            }
                    );
                };

                self.initRefresh = function () {
                    console.log("fetching data");
                    //var jsonUrl = "js/data/product.json";
                    //var serviceURL = "http://localhost:3000/MdProd";
//                    var queryString = "/salesApi/resources/latest/opportunities?onlyData=true&fields=OptyNumber,Name,Revenue,TargetPartyName,StatusCode&q=StatusCode=OPEN&limit=10&offset=" + offset;
//                    console.log(queryString);
//                    $.ajax(hostname + queryString,
                    $.ajax(serviceURL,
                            {
                                method: "GET",
                                //dataType: "json",
//                                headers: {"Authorization": "Basic " + btoa("username:password")},
                                // Alternative Headers if using JWT Token
                                // headers : {"Authorization" : "Bearer "+ jwttoken; 
                                success: function (data)
                                {
                                    self.productData(data.MdProd);
                                    console.log(self.productData());
                                    //self.tempPeople(data);
//                                    console.log('Data returned ' + JSON.stringify(data.MdAssetTyp));
//                                    console.log("Rows Returned" + self.allPeople().length);
//                                    // Enable / Disable the next/prev button based on results of query
//                                    if (self.optyList().length < limit)
//                                    {
//                                        $('#nextButton').attr("disabled", true);
//                                    } else
//                                    {
//                                        $('#nextButton').attr("disabled", false);
//                                    }
//                                    if (self.offset === 0)
//                                        $('#prevButton').attr("disabled", true);
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    console.log(textStatus, errorThrown);
                                }
                            }
                    );
                };

                self.clickSearchBtn = function () {
                    var productFilter = new Array();
                    ko.utils.arrayFilter(self.productData(),
                            function (r) {
                                var codeSearch = self.codeSearch().toString().toLowerCase();
                                var nameSearch = self.nameSearch().toString().toLowerCase();
                                var descSearch = self.descSearch().toString().toLowerCase();
                                if ((r.prodCd.toString().toLowerCase().indexOf(codeSearch) > -1) &&
                                        (r.prodName.toString().toLowerCase().indexOf(nameSearch) > -1) &&
                                        (r.prodDesc.toString().toLowerCase().indexOf(descSearch) > -1)) {
                                    productFilter.push(r);

                                }
                            });
                    self.productData(productFilter);
                };

                self.onCreateBtn = function () {
                    self.resetFormDialog();
                    self.loadProductGroups();
                    self.productModel(GetRest.createModel("http://movieapp-sitepointdemos.rhcloud.com/api/movies", "_id"));
                    $('#btn_create').show();
                    $('#btn_edit').hide();
                    $("#DataDialog").ojDialog("open");
                };

                self.onStatusBtn = function () {
                    alert(self.codeItem());
                };

                self.onEditBtn = function () {
                    $('#btn_edit').show();
                    self.loadProductGroups();
                    self.productModel(GetRest.createModel(serviceURL, "prodCd"));
                    console.log(self.codeItem());
                    self.inputProductCode(self.codeItem());
                    self.inputProductName(self.nameItem());
                    self.inputProductDesc(self.descItem());
                    self.selectedProductGroup(self.productGroupItem());
                    self.inputStatus(self.statusItem());
                    self.inputEffectiveDate(self.effectiveDateItem());

                    self.productModel().id = self.codeItem();
                    self.productModel().fetch({
                        success: function (model) {
                            self.productModel(model);
                        },
                        error: function (model) {
                            console.log("Fetch error: ", model);
                        }
                    });

                    $("#DataDialog").ojDialog("open");
                    $('#btn_create').hide();
                    return true;
                };

                self.onEdit = function (data, event) {
                    self.codeItem(data.prodCd);
                    self.nameItem(data.prodName);
                    self.descItem(data.prodDesc);
                    self.productGroupItem(data.mdProdGrp.prodGrpCd);
                    self.statusItem(data.active);
                    self.effectiveDateItem(data.effectiveDate);
                };

                self._showComponentValidationErrors = function (trackerObj)
                {
                    trackerObj.showMessages();
                    if (trackerObj.focusOnFirstInvalid())
                        return false;

                    return true;
                };

                self.onCreate = function () {
                    var trackerObj = ko.utils.unwrapObservable(self.tracker);
                    /*if (!this._showComponentValidationErrors(trackerObj))
                    {
                        return;
                    }*/
                    console.log("insert...");
                    var Product = oj.Model.extend({urlRoot: serviceURL,
                        idAttribute: "id"});
                    
                    var product = new Product();
                    product.attributes.prodCd = self.inputProductCode().toString();
                    product.attributes.prodName = self.inputProductName().toString();
                    product.attributes.prodDesc = self.inputProductDesc().toString();
                    product.attributes.active = self.inputStatus().toString();
                    product.attributes.effectiveDate = self.inputEffectiveDate().toString();
                    //product.attributes.mdProdGrp.prodGrpCd = self.selectedProductGroup().toString();
                    
                    /*product.save().then(function() {
                        console.log("Saved with product Code: " + product.prodCd);
                    });*/
                    
                    product.save(undefined, {"success": function () {
                        console.log("Saved with product Code: " + product.prodCd);
                    }, "error": function (jqXHR, textStatus, errorThrown) {
                        console.log("Error");
                    }});
                    
                    $("#DataDialog").ojDialog("close");
                };

                self.onCancel = function () {
                    $("#DataDialog").ojDialog("close");
                };


                self.onExportBtn = function () {
                    alert("test");
                    $("#table").tableExport();
                };

                self.onRowClick = function (data, event)
                {
                    self.codeItem(data.prodCd);
                    self.nameItem(data.prodName);
                    self.descItem(data.prodDesc);
                    self.productGroupItem(data.mdProdGrp.prodGrpCd);
                    self.statusItem(data.active);
                    self.effectiveDateItem(data.effectiveDate);

                };
                self.initRefresh();
            }
            return productViewModel();
        }
); 