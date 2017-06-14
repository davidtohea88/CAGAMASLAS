/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout','jquery', 'services/rendererService', 'services/RestService','services/exportService', 'services/MessageService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset','ojs/ojoffcanvas','ojs/ojknockout-validation','ojs/ojselectcombobox'],
        function (oj, ko, $, rendererService, RestService, exportService, MessageService)
        {
            function revaluationMainViewModel() {
                var self = this;
                //LOV
                var productService = RestService.productService();
                self.productLOV = ko.observableArray();
                productService.fetchAsLOV('prodName','prodId').then(function(data){
                    self.productLOV(data);
                });
                self.selectedProductId = ko.observableArray();

                var companyService = RestService.organizationService();
                self.companyLOV = ko.observableArray();
                companyService.fetchAsLOV('orgName','orgId').then(function(data){
                    self.companyLOV(data);
                });
                self.selectedCompanyId = ko.observableArray();

//                var accountService = RestService.accountService();
//                self.accountLOV = ko.observableArray();
//                accountService.fetchAsLOV('AccountName','AccountNo').then(function(data){
//                    for(item in data)
//                    {
//                        var res = {
//                            Account: data[item].value + ' | '+ data[item].label,
//                            AccountNo: data[item].value,
//                            AccountName: data[item].label
//                        };
//                        if(data[item].value!==undefined){
//                            self.accountLOV.push(res);                            
//                        }                      
//                    }
//                    console.log(self.accountLOV());
//                });
                var accountService = RestService.accountService();
                self.accountLOV = ko.observableArray();
                accountService.fetchAsLOV('AccountName','AccountNo').then(function(data){
                    self.accountLOV(data);
                });
                self.selectedAccountId = ko.observableArray();

                
                self.header = "Revaluation";
                self.dialogTitle = "Create/edit "+self.header;


                var restService = RestService.RevaluationService();
                self.collection = ko.observable(restService.createCollection());
                self.allData = ko.observableArray();
                self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allData, {idAttribute: self.collection().model.idAttribute}));
                self.model = ko.observable();

                self.companySearch = ko.observable('');
                self.dbcdSearch = ko.observable('');
                self.productSearch = ko.observable('');

                self.dateConverter = rendererService.dateConverter;
                self.message = ko.observable();
                self.colorType = ko.observable();
                self.tracker = ko.observable();
                self.dialogOffcanvas = {selector: '#dialogDrawer', content: '#dialogContent',
                        modality: 'modeless', autoDismiss: 'none', displayMode: 'overlay'};
                self.pageOffcanvas = {selector: '#pageDrawer', content: '#pageContent',
                        modality: 'modeless', autoDismiss: 'none', displayMode: 'overlay'};
                    
                self.showMessage = function(type,message,afterShow){
                    var canvas = ($("#CreateEditDialog").ojDialog("isOpen"))?self.dialogOffcanvas:self.pageOffcanvas;
                    self.message(message);
                    if (type==="SUCCESS"){
                        self.colorType(MessageService.bgColorSuccess);
                    }else if (type==="ERROR"){
                        self.colorType(MessageService.bgColorError);
                    }else{
                        self.colorType(MessageService.bgColorDefault);
                    }
                    oj.OffcanvasUtils.open(canvas);
                    setTimeout(function(){
                        oj.OffcanvasUtils.close(canvas);
                        if (afterShow){
                            afterShow();
                        }
                    },MessageService.displayTimeout);
                };
                
                self.accountTypeLOV = ko.observableArray([ 
                    {value: "C", label: "Loss"},  
                    {value: "D", label: "Gain"}
                ]);
                self.selectedAccountType = ko.observable('');
                
                self.accountNameRenderer = function(context){
                    if (context.data){
                        var id = context.data;
                        return rendererService.LOVConverter(self.accountLOV(),id);
                    }
                    return '';
                };

                self.companyNameRenderer = function(context){
                    if (context.data){
                        var id = context.data;
                        return rendererService.LOVConverter(self.companyLOV(),id);
                    }
                    return '';
                };

                self.productNameRenderer = function(context){
                    if (context.data){
                        var id = context.data;
                        return rendererService.LOVConverter(self.productLOV(),id);
                    }
                    return '';
                };

                self.accTypeRenderer = function(context){
                    if (context.data.toString().toLowerCase()==="c"){
                        return "Loss";
                    }
                    else if (context.data.toString().toLowerCase()==="d"){                    
                        return "Gain";                        
                    }
                    
                };

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
                    self.collection().fetch({
                        success: function(){
                            self.allData(self.collection().toJSON());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });  
                };
                
                self.search = function (company, dbcode, product) {
                    var tmp = self.collection().filter(function(rec){
                        console.log(company);
                        console.log(product);
                        console.log(rec.attributes.prodId);
                        return ((company===undefined || (company > 0 && rec.attributes.orgId.toString()===company.toString())) &&
                                (dbcode.length ===0 || (dbcode.length > 0 && rec.attributes.dbCd.toLowerCase().indexOf(dbcode.toString().toLowerCase()) > -1)) &&
                                (product===undefined || (rec.attributes.prodId.toString()===product.toString())));
                    });
                    self.collection().reset(tmp);
                    self.allData(self.collection().toJSON());
                };
                
                self.createOrEdit = function (model) {
                    self.model(model);
                    $("#CreateEditDialog").ojDialog("open");
                };
                
                self.save = function (model,successMsg) {
                    $('#btnSave').ojButton("option", "disabled", true );
                    $('#btnCancel').ojButton("option", "disabled", true );
                    var user = "LAS";
                    var currentDate = new Date().toISOString();
                    var defaultAttributes = model.isNew()?{createdBy: user,
                            createdDate: currentDate
                        }:{createdBy: model.attributes.createdBy,
                            createdDate: model.attributes.createdDate,
                            updatedBy: user,
                            updatedDate: currentDate
                        };
                    model.save(defaultAttributes,{
                        success: function(model){
                            self.refreshData();
                            var message = successMsg? successMsg: (model.isNew()?'A new revaluation data is successfully created':'A revaluation data is successfully updated');
                            self.showMessage("SUCCESS",message,function(){
                                $("#CreateEditDialog").ojDialog("close");
                                $('#btnSave').ojButton("option", "disabled", false );
                                $('#btnCancel').ojButton("option", "disabled", false );
                                $('#btnActivate').ojButton("option", "disabled", false );
                            });
                        },
                        error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status),function(){
                                $('#btnSave').ojButton("option", "disabled", false );
                                $('#btnCancel').ojButton("option", "disabled", false );
                                $('#btnActivate').ojButton("option", "disabled", false );
                            });
                        }
                    });
                    
                };

                self.activateDeactivate = function (model) {
                    if (model.attributes.active === 'Y'){
                        model.attributes.active = 'N';
                    }else if (model.attributes.active === 'N'){
                        model.attributes.active = 'Y';
                    }
                    self.save(model,"A revaluation data is successfully "+(model.attributes.active==='Y'?'activated':'deactivated'));
                };

                self.exportxls = function () {
                    exportService.export($("#table").ojTable("option","columns"),self.allData(),'xlsx','data.xlsx', function(field,value){
                        if (field === 'active'){
                            return rendererService.activeConverter(value);
                        }else if (field === 'updatedDate'){
                            return rendererService.dateTimeConverter.format(value);
                        }else if (field === 'companyId'){
                            return rendererService.LOVConverter(self.companyLOV(),value);
                        }else if (field === 'accCd'){
                            return rendererService.LOVConverter(self.accountLOV(),value);
                        }else if (field === 'productId'){
                            return rendererService.LOVConverter(self.productLOV(),value);
                        }else{
                            return value;
                        }
                    });
                };
                
                self.selectedRow = ko.observable(undefined);
                
                // ===============  EVENT HANDLER  ==============
                
                self.onReset = function(){
                    self.refreshData();
                    
                    self.companySearch('');
                    self.dbcdSearch('');
                    self.productSearch('');
                    
                    if (self.collection().models.length>1){
                        self.selectedRow(undefined);
                        $('#btnEdit').hide();
                        $('#btnActivate').hide();
                    }
                };
                
                self.onSearch = function(){
                    self.collection().fetch({
                        success: function(){
                            self.search(self.companySearch()[0],self.dbcdSearch(),self.productSearch()[0]);
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onCreate = function(){
                    self.selectedCompanyId([]);
                    var model = restService.createModel({active: 'Y'});
                    self.createOrEdit(model);
                };
                
                self.onEdit = function(){
                    var model = self.collection().get(self.selectedRow());
                    self.selectedCompanyId([model.attributes.orgId]);
                    self.selectedAccountId([model.attributes.accCd]);
                    self.selectedProductId([model.attributes.prodId]);
                    self.selectedAccountType(model.attributes.revAccType);
                    self.createOrEdit(model);
                };
                
                self.onSave = function(){
                    var trackerObj = ko.utils.unwrapObservable(self.tracker);
                    if (trackerObj !== undefined){
                        if (trackerObj instanceof oj.InvalidComponentTracker){
                            trackerObj.showMessages();
                            trackerObj.focusOnFirstInvalid();
                        }
                    }
                    if (!(trackerObj.invalidHidden || trackerObj.invalidShown)){
                        self.model().attributes.orgId = self.selectedCompanyId()[0];
                        self.model().attributes.prodId = self.selectedProductId()[0];
                        self.model().attributes.accCd = self.selectedAccountId()[0];
                        self.save(self.model());
                    }
                };
                
                self.onActivateDeactivate = function(){
                    $("#ConfirmDialog").ojDialog("open");
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
                
                self.onConfirmNo = function(){
                    $("#ConfirmDialog").ojDialog("close");
                };
                
                self.onConfirmYes = function(){
                    $("#ConfirmDialog").ojDialog("close");
                    $('#btnActivate').ojButton("option", "disabled", true );
                    var model = self.collection().get(self.selectedRow());
                    self.activateDeactivate(model);
                };
                
                self.refreshData();
                    
            }
            return revaluationMainViewModel();
        }
); 