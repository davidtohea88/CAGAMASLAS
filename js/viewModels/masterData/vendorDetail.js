define(['ojs/ojcore', 'knockout','jquery', 'services/rendererService', 'services/RestService', 'services/MessageService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset', 'ojs/ojselectcombobox','ojs/ojoffcanvas','ojs/ojknockout-validation', 'lodash'],
        function (oj, ko, $, rendererService, RestService, MessageService)
        {
            function vendorDetailMainViewModel() {
                var self = this;
                
                var vendorId = oj.Router.rootInstance.retrieve();
                //alert(vendorId);
                              
                // LOV
                var countryService = RestService.countryService();
                self.countryLOV = ko.observableArray();
                countryService.fetchAsLOV('countryName','countryId').then(function(data){
                    self.countryLOV(data);
                });
                self.selectedCountryId = ko.observableArray();

                // Window Dialog LOV
                // Branch
                var branchService = RestService.branchService();
                self.collectionBranch = ko.observable(branchService.createCollection());
                self.allDataBranch = ko.observableArray();
                self.dataSourceBranch = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allDataBranch, {idAttribute: self.collectionBranch().model.idAttribute}));
                self.nameSearchBranch = ko.observable('');
                self.codeSearchBranch = ko.observable('');
                self.selectedRowBranch = ko.observable(undefined);
                
                // State
                var stateService = RestService.stateService();
                self.collectionState = ko.observable(stateService.createCollection());
                self.allDataState = ko.observableArray();
                self.dataSourceState = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allDataState, {idAttribute: self.collectionState().model.idAttribute}));
                self.nameSearchState = ko.observable('');
                self.codeSearchState = ko.observable('');
                self.selectedRowState = ko.observable(undefined);
                                
                // District
                var districtService = RestService.districtService();
                self.collectionDistrict = ko.observable(districtService.createCollection());
                self.allDataDistrict = ko.observableArray();
                self.dataSourceDistrict = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allDataDistrict, {idAttribute: self.collectionDistrict().model.idAttribute}));
                self.nameSearchDistrict = ko.observable('');
                self.codeSearchDistrict = ko.observable('');
                self.selectedRowDistrict = ko.observable(undefined);
                                
                // Postcode
                var postCodeService = RestService.postCodeService();
                self.collectionPostCode = ko.observable(postCodeService.createCollection());
                self.allDataPostCode = ko.observableArray();
                self.dataSourcePostCode = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allDataPostCode, {idAttribute: self.collectionPostCode().model.idAttribute}));
                self.nameSearchPostCode = ko.observable('');
                self.codeSearchPostCode = ko.observable('');
                self.selectedRowPostCode = ko.observable(undefined);
                                
                // Counterparty
                var counterpartyService = RestService.counterpartyService();
                self.collectionCounterparty = ko.observable(counterpartyService.createCollection());
                self.allDataCounterparty = ko.observableArray();
                self.dataSourceCounterparty = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allDataCounterparty, {idAttribute: self.collectionCounterparty().model.idAttribute}));
                self.nameSearchCounterparty = ko.observable('');
                self.codeSearchCounterparty = ko.observable('');
                self.selectedRowCounterparty = ko.observable(undefined);
                                
                // Service
                var restService = RestService.vendorService();
                self.header = "Vendor Detail";
                self.collection = ko.observable(restService.createCollection());    
                self.model = ko.observable();
                self.dateConverter = rendererService.dateConverter;
                self.selectedRow = ko.observable(undefined);
                self.message = ko.observable();
                self.colorType = ko.observable();
                self.tracker = ko.observable();
                
                // Service Detail
                var counterpartyVendorService = RestService.counterpartyVendorService();
                self.collectionCpVendor = ko.observable(counterpartyVendorService.createCollection());   
                self.allDataCpVendor = ko.observableArray();
                self.dataSourceCpVendor = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allDataCpVendor, {idAttribute: self.collectionCpVendor().model.idAttribute}));
                self.modelCpVendor = ko.observable();
                self.selectedRowCpVendor = ko.observable(undefined);
                self.somethingChecked = ko.observable(false);
                
                // Input model
                self.vndrCd = ko.observable();
                self.vndrName = ko.observable();
                self.branch = ko.observable();
                self.bankAct = ko.observable();
                self.address = ko.observable();
                self.email = ko.observable();
                self.phone = ko.observable();
                self.fax = ko.observable();
                self.cntName = ko.observable();
                self.cntNo = ko.observable();
                self.webUrl = ko.observable();
                self.state = ko.observable();
                self.district = ko.observable();
                self.city = ko.observable();
                self.postCode = ko.observable();
                
                self.pageOffcanvas = {selector: '#pageDrawer', content: '#pageContent',
                        modality: 'modeless', autoDismiss: 'none', displayMode: 'overlay'};
                    
                self.showMessage = function(type,message,afterShow){
                    var canvas = self.pageOffcanvas;
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

                self.dateTimeRenderer = function(context){
                    return rendererService.dateTimeConverter.format(context.data);
                };
                
                self.dateRenderer = function(context){
                    return rendererService.dateConverter.format(context.data);
                };
                
                self.activeRenderer = function(context){
                    return rendererService.activeConverter(context.data);
                };
                
                self.countryPartyVendorData = function  () {
                    self.collectionCpVendor().fetch({
                        success: function () {
                            var tmp = self.collectionCpVendor().where({'vndrId':vendorId});
                            self.collectionCpVendor().reset(tmp);
                            var arrResult = self.collectionCpVendor().toJSON();
                            //console.log(arrResult);
                            self.collectionCounterparty().fetch({
                                success: function () {
                                    arrResult = _.map(arrResult, function (obj) {
                                        return _.assign(obj, _.find(self.collectionCounterparty().toJSON(), {
                                            cptId: obj.cptId
                                        }));
                                    });
                                    //console.log(arrResult);
                                    self.allDataCpVendor(arrResult);
                                }
                            });
                            
                        }, error: function (resp) {
                            self.showMessage("ERROR", MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                    
                self.refreshData = function () {
                    self.collection().fetch({
                        success: function(){
                            var model = self.collection().get(vendorId);
                            if (vendorId !== null) {
                                $('#counterParty').show();
                                self.vndrCd(model.attributes.vndrCd);
                                self.vndrName(model.attributes.vndrName);
                                self.branch(model.attributes.branch);
                                self.bankAct(model.attributes.bankAct);
                                self.address(model.attributes.address);
                                self.email(model.attributes.email);
                                self.phone(model.attributes.phone);
                                self.fax(model.attributes.fax);
                                self.cntName(model.attributes.cntName);
                                self.cntNo(model.attributes.cntNo);
                                self.webUrl(model.attributes.webUrl);
                                self.selectedCountryId([model.attributes.countryId]);
                                self.collectionState().fetch({
                                    success: function(){
                                        var state = self.collectionState().get(model.attributes.stateId);
                                        $('#stateId').val(state.attributes.stateId);
                                        self.state(state.attributes.stateName);
                                    }
                                });
                                self.collectionDistrict().fetch({
                                    success: function(){
                                        var district = self.collectionDistrict().get(model.attributes.distId);
                                        $('#districtId').val(district.attributes.distId);
                                        self.district(district.attributes.distName);
                                        self.city(district.attributes.cityName);
                                    }
                                });
                                self.collectionPostCode().fetch({
                                    success: function(){
                                        var postCode = self.collectionPostCode().get(model.attributes.postId);
                                        $('#postCodeId').val(postCode.attributes.postId);
                                        self.postCode(postCode.attributes.postCd);
                                    }
                                });
                                
                                self.countryPartyVendorData();
                                
                            } else {
                                $('#counterParty').hide();
                                self.state('');
                                self.district('');
                                self.city('');
                                self.postCode('');
                                model = restService.createModel({active: 'Y'});
                            }
                            self.model(model);
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };

                // START Branch Window Dialog
                self.btnBranchLOV = function () {
                    $("#BranchDialog").ojDialog("open");
                    self.collectionBranch().fetch({
                        success: function(){
                            self.allDataBranch(self.collectionBranch().toJSON());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onSelectRowBranch = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSourceBranch.at(idx).
                        then(function (obj) {
                            self.selectedRowBranch(obj.data[self.collectionBranch().model.idAttribute]);
                        });
                };
                
                self.chooseBranchOk = function(){
                    var modelBranch = self.collectionBranch().get(self.selectedRowBranch());
                    self.branch(modelBranch.attributes.brName);
                    $("#BranchDialog").ojDialog("close");
                };
                
                self.chooseBranchCancel = function(){
                    $("#BranchDialog").ojDialog("close");
                };
                
                self.onSearchBranch = function () {
                    self.collectionBranch().fetch({
                        success: function () {
                            var code = self.codeSearchBranch();
                            var name = self.nameSearchBranch();
                            var tmp = self.collectionBranch().filter(function(rec){
                                return ((code.length ===0 || (code.length > 0 && rec.attributes.brCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                        (name.length ===0 || (name.length > 0 && rec.attributes.brName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)));
                            });
                            self.collectionBranch().reset(tmp);
                            self.allDataBranch(self.collectionBranch().toJSON());
                            if (self.collectionBranch().isEmpty()) {
                                $('#btnBranchOk').hide();
                            } else {
                                $('#btnBranchOk').show();
                            }
                        }, error: function (resp) {
                            self.showMessage("ERROR", MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onResetBranch = function(){   
                    self.btnBranchLOV();
                    self.codeSearchBranch('');
                    self.nameSearchBranch('');
                    $('#btnBranchOk').show();
                };
                // END Branch Window Dialog
                
                // START State Window Dialog
                self.btnStateLOV = function () {
                    $("#StateDialog").ojDialog("open");
                    self.collectionState().fetch({
                        success: function(){
                            self.allDataState(self.collectionState().toJSON());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onSelectRowState = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSourceState.at(idx).
                        then(function (obj) {
                            self.selectedRowState(obj.data[self.collectionState().model.idAttribute]);
                        });
                };
                
                self.chooseStateOk = function(){
                    var modelState = self.collectionState().get(self.selectedRowState());
                    $('#stateId').val(modelState.attributes.stateId);
                    $('#state').val(modelState.attributes.stateName);
                    $("#StateDialog").ojDialog("close");
                };
                
                self.chooseStateCancel = function(){
                    $("#StateDialog").ojDialog("close");
                };
                
                self.onSearchState = function () {
                    self.collectionState().fetch({
                        success: function () {
                            var code = self.codeSearchState();
                            var name = self.nameSearchState();
                            var tmp = self.collectionState().filter(function(rec){
                                return ((code.length ===0 || (code.length > 0 && rec.attributes.stateCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                        (name.length ===0 || (name.length > 0 && rec.attributes.stateName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)));
                            });
                            self.collectionState().reset(tmp);
                            self.allDataState(self.collectionState().toJSON());
                            if (self.collectionState().isEmpty()) {
                                $('#btnStateOk').hide();
                            } else {
                                $('#btnStateOk').show();
                            }
                        }, error: function (resp) {
                            self.showMessage("ERROR", MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onResetState = function(){   
                    self.btnStateLOV();
                    self.codeSearchState('');
                    self.nameSearchState('');
                    $('#btnStateOk').show();
                };
                // END State Window Dialog
                
                // START District Window Dialog
                self.btnDistrictLOV = function () {
                    $("#DistrictDialog").ojDialog("open");
                    self.collectionDistrict().fetch({
                        success: function(){
                            self.allDataDistrict(self.collectionDistrict().toJSON());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onSelectRowDistrict = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSourceDistrict.at(idx).
                        then(function (obj) {
                            self.selectedRowDistrict(obj.data[self.collectionDistrict().model.idAttribute]);
                        });
                };
                
                self.chooseDistrictOk = function(){
                    var modelDistrict = self.collectionDistrict().get(self.selectedRowDistrict());
                    $('#districtId').val(modelDistrict.attributes.distId);
                    $('#district').val(modelDistrict.attributes.distName);
                    $('#city').val(modelDistrict.attributes.cityName);
                    $("#DistrictDialog").ojDialog("close");
                };
                
                self.chooseDistrictCancel = function(){
                    $("#DistrictDialog").ojDialog("close");
                };
                
                self.onSearchDistrict = function () {
                    self.collectionDistrict().fetch({
                        success: function () {
                            var code = self.codeSearchDistrict();
                            var name = self.nameSearchDistrict();
                            var tmp = self.collectionDistrict().filter(function(rec){
                                return ((code.length ===0 || (code.length > 0 && rec.attributes.distCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                        (name.length ===0 || (name.length > 0 && rec.attributes.distName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)));
                            });
                            self.collectionDistrict().reset(tmp);
                            self.allDataDistrict(self.collectionDistrict().toJSON());
                            if (self.collectionDistrict().isEmpty()) {
                                $('#btnDistrictOk').hide();
                            } else {
                                $('#btnDistrictOk').show();
                            }
                        }, error: function (resp) {
                            self.showMessage("ERROR", MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onResetDistrict = function(){   
                    self.btnDistrictLOV();
                    self.codeSearchDistrict('');
                    self.nameSearchDistrict('');
                    $('#btnDistrictOk').show();
                };
                // END District Window Dialog
                
                // START PostCode Window Dialog
                self.btnPostCodeLOV = function () {
                    $("#PostCodeDialog").ojDialog("open");
                    self.collectionPostCode().fetch({
                        success: function(){
                            self.allDataPostCode(self.collectionPostCode().toJSON());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onSelectRowPostCode = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSourcePostCode.at(idx).
                        then(function (obj) {
                            self.selectedRowPostCode(obj.data[self.collectionPostCode().model.idAttribute]);
                        });
                };
                
                self.choosePostCodeOk = function(){
                    var modelPostCode = self.collectionPostCode().get(self.selectedRowPostCode());
                    $('#postCodeId').val(modelPostCode.attributes.postId);
                    $('#postCode').val(modelPostCode.attributes.postCd);
                    $("#PostCodeDialog").ojDialog("close");
                };
                
                self.choosePostCodeCancel = function(){
                    $("#PostCodeDialog").ojDialog("close");
                };
                
                self.onSearchPostCode = function () {
                    self.collectionPostCode().fetch({
                        success: function () {
                            var code = self.codeSearchPostCode();
                            var name = self.nameSearchPostCode();
                            var tmp = self.collectionPostCode().filter(function(rec){
                                return ((code.length ===0 || (code.length > 0 && rec.attributes.postCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                        (name.length ===0 || (name.length > 0 && rec.attributes.addrName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)));
                            });
                            self.collectionPostCode().reset(tmp);
                            self.allDataPostCode(self.collectionPostCode().toJSON());
                            if (self.collectionPostCode().isEmpty()) {
                                $('#btnPostCodeOk').hide();
                            } else {
                                $('#btnPostCodeOk').show();
                            }
                        }, error: function (resp) {
                            self.showMessage("ERROR", MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onResetPostCode = function(){   
                    self.btnPostCodeLOV();
                    self.codeSearchPostCode('');
                    self.nameSearchPostCode('');
                    $('#btnPostCodeOk').show();
                };
                // END PostCode Window Dialog    
                
                // START Counter Party Window Dialog
                self.btnAddCounterParty = function () {
                    $("#CounterpartyDialog").ojDialog("open");
                    self.collectionCounterparty().fetch({
                        success: function(){
                            //console.log(self.collectionCounterparty().toJSON());
                            self.allDataCounterparty(self.collectionCounterparty().toJSON());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onSelectRowCounterparty = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSourceCounterparty.at(idx).
                        then(function (obj) {
                            self.selectedRowCounterparty(obj.data[self.collectionCounterparty().model.idAttribute]);
                        });
                };
                
                self.chooseCounterpartyOk = function(){
                    var modelCounterparty = self.collectionCounterparty().get(self.selectedRowCounterparty());
                    var modelCpVendor = counterpartyVendorService.createModel({active: 'Y'});
                    modelCpVendor.attributes.vndrId = vendorId;
                    modelCpVendor.attributes.cptId = modelCounterparty.attributes.cptId;
                    self.saveCounterparty(modelCpVendor);                   
                    $("#CounterpartyDialog").ojDialog("close");
                };
                
                self.chooseCounterpartyCancel = function(){
                    $("#CounterpartyDialog").ojDialog("close");
                };
                
                self.onSearchCounterparty = function () {
                    self.collectionCounterparty().fetch({
                        success: function () {
                            var code = self.codeSearchCounterparty();
                            var name = self.nameSearchCounterparty();
                            var tmp = self.collectionCounterparty().filter(function(rec){
                                return ((code.length ===0 || (code.length > 0 && rec.attributes.cptCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                        (name.length ===0 || (name.length > 0 && rec.attributes.cptName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)));
                            });
                            self.collectionCounterparty().reset(tmp);
                            self.allDataCounterparty(self.collectionCounterparty().toJSON());
                            if (self.collectionCounterparty().isEmpty()) {
                                $('#btnCounterpartyOk').hide();
                            } else {
                                $('#btnCounterpartyOk').show();
                            }
                        }, error: function (resp) {
                            self.showMessage("ERROR", MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onResetCounterparty = function(){   
                    self.btnAddCounterParty();
                    self.codeSearchCounterparty('');
                    self.nameSearchCounterparty('');
                    $('#btnCounterpartyOk').show();
                };
                // END Counter Party Window Dialog
                
                self.saveCounterparty = function (modelCpVendor,successMsg) {
                    var user = "LAS";
                    var currentDate = new Date().toISOString();
                    var defaultAttributes = {createdBy: modelCpVendor.isNew()?user:modelCpVendor.attributes.createdBy,
                            createdDate: modelCpVendor.isNew()?currentDate:modelCpVendor.attributes.createdDate,
                            updatedBy: user,
                            updatedDate: currentDate
                        };
                    modelCpVendor.save(defaultAttributes,{
                        success: function(modelCpVendor){
                            self.refreshData();
                            var message = successMsg? successMsg: (modelCpVendor.isNew()?'A new '+self.header+' is successfully created':self.header+' is successfully updated');
                            self.showMessage("SUCCESS",message,function(){
                                self.countryPartyVendorData();
                            });
                        },
                        error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));  
                        }
                    });
                    
                };
                
                self.save = function (model,successMsg) {
                    var user = "LAS";
                    var currentDate = new Date().toISOString();
                    var defaultAttributes = {createdBy: model.isNew()?user:model.attributes.createdBy,
                            createdDate: model.isNew()?currentDate:model.attributes.createdDate,
                            updatedBy: user,
                            updatedDate: currentDate
                        };
                    model.save(defaultAttributes,{
                        success: function(model){
                            self.refreshData();
                            var message = successMsg? successMsg: (model.isNew()?'A new '+self.header+' is successfully created':self.header+' is successfully updated');
                            self.showMessage("SUCCESS",message,function(){
                                //oj.Router.rootInstance.go("vendor");
                                window.location.href = "index.html?root=vendor";
                            });
                        },
                        error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));  
                        }
                    });
                    
                };
                
                self.onSelectRowCpVendor = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSourceCpVendor.at(idx).
                        then(function (obj) {
                            self.selectedRowCpVendor(obj.data[self.collectionCpVendor().model.idAttribute]);
                        });
                };
                
                // ===============  EVENT HANDLER  ==============
                
                self.onSave = function(){
                    var trackerObj = ko.utils.unwrapObservable(self.tracker);
                    if (trackerObj !== undefined){
                        if (trackerObj instanceof oj.InvalidComponentTracker){
                            trackerObj.showMessages();
                            trackerObj.focusOnFirstInvalid();
                        }
                    }
                    if (!(trackerObj.invalidHidden || trackerObj.invalidShown)){
                        if (vendorId !== null) {
                            self.model().attributes.vndrId = vendorId;
                        }
                        self.model().attributes.vndrCd = self.vndrCd();
                        self.model().attributes.vndrName = self.vndrName();
                        self.model().attributes.branch = self.branch();
                        self.model().attributes.bankAct = self.bankAct();
                        self.model().attributes.address = self.address();
                        self.model().attributes.email = self.email();
                        self.model().attributes.phone = self.phone();
                        self.model().attributes.fax = self.fax();
                        self.model().attributes.cntName = self.cntName();
                        self.model().attributes.cntNo = self.cntNo();
                        self.model().attributes.webUrl = self.webUrl();
                        self.model().attributes.countryId = self.selectedCountryId()[0];
                        self.model().attributes.stateId = $('#stateId').val();
                        self.model().attributes.distId = $('#districtId').val();
                        self.model().attributes.postId = $('#postCodeId').val();
                        self.save(self.model());
                    }
                };

                self.enableDelete = function() {
                    if (!$('input[type=checkbox]:checked').length) {
                        self.somethingChecked(false);
                    } else {
                        self.somethingChecked(true);
                    }
                    return true;
                }    
                    
                self.btnDeleteCpVendor = function (data, event) {
                    $("#ConfirmDialog").ojDialog("open");
                };
                
                self.deleteCpVendor = function (data, event) {
                    var cpVendorIds = [];
                    cpVendorIds = self.findCpVendorIds();
                    cpVendorIds.forEach(function(value, index, arr) {
                        var modelCpVendor = self.collectionCpVendor().get(parseInt(value));
                        if (modelCpVendor) {
                            self.collectionCpVendor().remove(modelCpVendor);
                            modelCpVendor.destroy();
                        }
                    });
                    self.enableDelete();
                    self.countryPartyVendorData();
                    //$('#table').ojTable('refresh');
                };
                
                self.findCpVendorIds = function() {
                    var selectedIdsArray = [];
                    $("input:checkbox").each(function() {
                        var $this = $(this);
                        if ($this.is(":checked")) {
                            selectedIdsArray.push($this.attr("id"));
                        }
                    });
                    return selectedIdsArray;
                }
                
                self.onConfirmNo = function(){
                    $("#ConfirmDialog").ojDialog("close");
                };
                
                self.onConfirmYes = function(){
                    $("#ConfirmDialog").ojDialog("close");
                    self.deleteCpVendor();
                };
                
                self.back = function () {
                    oj.Router.rootInstance.go("vendor");
                };
                
                self.refreshData();

            }
            return vendorDetailMainViewModel;
            
        });