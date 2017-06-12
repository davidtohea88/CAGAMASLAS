define(['ojs/ojcore', 'knockout','jquery', 'services/rendererService', 'services/RestService','services/exportService', 'services/MessageService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojdialog',
        'ojs/ojdatetimepicker','ojs/ojradioset', 'ojs/ojselectcombobox','ojs/ojoffcanvas','ojs/ojknockout-validation'],
        function (oj, ko, $, rendererService, RestService, exportService, MessageService)
        {
            function counterpartyDetailMainViewModel() {
                var self = this;
                //var cptId = null;//oj.Router.rootInstance.retrieve();
                              
                // LOV
                var counterpartyTypeService = RestService.counterpartyTypeService();
                self.counterpartyTypeLOV = ko.observableArray();
                counterpartyTypeService.fetchAsLOV('cptTypeName','cptTypeId').then(function(data){
                    self.counterpartyTypeLOV(data);
                });
                self.selectedCounterpartyTypeId = ko.observableArray();

                // Window Dialog LOV
                // Counterparty Group
                var counterpartyGroupService = RestService.counterpartyGroupService();
                self.collectionCpGroup = ko.observable(counterpartyGroupService.createCollection());
                self.allDataCpGroup = ko.observableArray();
                self.dataSourceCpGroup = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allDataCpGroup, {idAttribute: self.collectionCpGroup().model.idAttribute}));
                self.nameSearchCpGroup = ko.observable('');
                self.codeSearchCpGroup = ko.observable('');
                self.selectedRowCpGroup = ko.observable(undefined);
                
                // Counterparty Sector
                var counterpartySectorService = RestService.counterpartySectorService();
                self.collectionCpSector = ko.observable(counterpartySectorService.createCollection());
                self.allDataCpSector = ko.observableArray();
                self.dataSourceCpSector = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.allDataCpSector, {idAttribute: self.collectionCpSector().model.idAttribute}));
                self.nameSearchCpSector = ko.observable('');
                self.codeSearchCpSector = ko.observable('');
                self.selectedRowCpSector = ko.observable(undefined);
                                
                // Service
                var restService = RestService.counterpartyService();
                self.header = "Counterparty Detail";
                self.collection = ko.observable(restService.createCollection());    
                self.model = ko.observable();
                self.dateConverter = rendererService.dateConverter;
                self.selectedRow = ko.observable(undefined);

                self.dateTimeRenderer = function(context){
                    return rendererService.dateTimeConverter.format(context.data);
                };
                
                self.dateRenderer = function(context){
                    return rendererService.dateConverter.format(context.data);
                };
                
                self.activeRenderer = function(context){
                    return rendererService.activeConverter(context.data);
                };
                    
                self.agreement = function () {
                //    window.open('doc/mspa.pdf', '_blank');
                }

                self.initRefresh = function () {
                    self.collection().fetch({
                        success: function(){
                            //var model = self.collection().get(cptId);
                            //if (cptId !== null) {
                            //    self.selectedCounterpartyTypeId([model.attributes.cptTypeId]);
                            //    self.selectedCounterpartyGroupId([model.attributes.cptGrpId]);
                            //    self.selectedCounterpartySectorId([model.attributes.cptSctrId]);
                            //} else {
                                model = restService.createModel({active: 'Y'});
                            //}
                            self.model(model);
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };

                // START Product Group Window Dialog
                self.btnCpGroupLOV = function () {
                    $("#CounterpartyGroupDialog").ojDialog("open");
                    self.collectionCpGroup().fetch({
                        success: function(){
                            self.allDataCpGroup(self.collectionCpGroup().toJSON());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onSelectRowCpGroup = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSourceCpGroup.at(idx).
                        then(function (obj) {
                            self.selectedRowCpGroup(obj.data[self.collectionCpGroup().model.idAttribute]);
                        });
                };
                
                self.chooseCpGroupOk = function(){
                    var modelCpGroup = self.collectionCpGroup().get(self.selectedRowCpGroup());
                    $('#cpGroupId').val(modelCpGroup.attributes.cptGrpId);
                    $('#cpGroup').val(modelCpGroup.attributes.cptGrpName);
                    $("#CounterpartyGroupDialog").ojDialog("close");
                };
                
                self.chooseCpGroupCancel = function(){
                    $("#CounterpartyGroupDialog").ojDialog("close");
                };
                
                self.onSearchCpGroup = function () {
                    self.collectionCpGroup().fetch({
                        success: function () {
                            var code = self.codeSearchCpGroup();
                            var name = self.nameSearchCpGroup();
                            var tmp = self.collectionCpGroup().filter(function(rec){
                                return ((code.length ===0 || (code.length > 0 && rec.attributes.cptGrpCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                        (name.length ===0 || (name.length > 0 && rec.attributes.cptGrpName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)));
                            });
                            self.collectionCpGroup().reset(tmp);
                            self.allDataCpGroup(self.collectionCpGroup().toJSON());
                            if (self.collectionCpGroup().isEmpty()) {
                                $('#btnCpGroupOk').hide();
                            } else {
                                $('#btnCpGroupOk').show();
                            }
                        }, error: function (resp) {
                            self.showMessage("ERROR", MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onResetCpGroup = function(){   
                    self.btnCpGroupLOV();
                    self.codeSearchCpGroup('');
                    self.nameSearchCpGroup('');
                    $('#btnCpGroupOk').show();
                };
                // END Product Group Window Dialog
                
                // START Product Sector Window Dialog
                self.btnCpSectorLOV = function () {
                    $("#CounterpartySectorDialog").ojDialog("open");
                    self.collectionCpSector().fetch({
                        success: function(){
                            self.allDataCpSector(self.collectionCpSector().toJSON());
                        },error: function(resp){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onSelectRowCpSector = function(event, ui){
                    var idx = ui.currentRow.rowIndex;
                    self.dataSourceCpSector.at(idx).
                        then(function (obj) {
                            self.selectedRowCpSector(obj.data[self.collectionCpSector().model.idAttribute]);
                        });
                };
                
                self.chooseCpSectorOk = function(){
                    var modelCpSector = self.collectionCpSector().get(self.selectedRowCpSector());
                    $('#cpSectorId').val(modelCpSector.attributes.cptSctrId);
                    $('#cpSector').val(modelCpSector.attributes.cptSctrName);
                    $("#CounterpartySectorDialog").ojDialog("close");
                };
                
                self.chooseCpSectorCancel = function(){
                    $("#CounterpartySectorDialog").ojDialog("close");
                };
                
                self.onSearchCpSector = function () {
                    self.collectionCpSector().fetch({
                        success: function () {
                            var code = self.codeSearchCpSector();
                            var name = self.nameSearchCpSector();
                            var tmp = self.collectionCpSector().filter(function(rec){
                                return ((code.length ===0 || (code.length > 0 && rec.attributes.cptSctrCd.toLowerCase().indexOf(code.toString().toLowerCase()) > -1)) &&
                                        (name.length ===0 || (name.length > 0 && rec.attributes.cptSctrName.toLowerCase().indexOf(name.toString().toLowerCase()) > -1)));
                            });
                            self.collectionCpSector().reset(tmp);
                            self.allDataCpSector(self.collectionCpSector().toJSON());
                            if (self.collectionCpSector().isEmpty()) {
                                $('#btnCpSectorOk').hide();
                            } else {
                                $('#btnCpSectorOk').show();
                            }
                        }, error: function (resp) {
                            self.showMessage("ERROR", MessageService.httpStatusToMessage(resp.status));
                        }
                    });
                };
                
                self.onResetCpSector = function(){   
                    self.btnCpSectorLOV();
                    self.codeSearchCpSector('');
                    self.nameSearchCpSector('');
                    $('#btnCpSectorOk').show();
                };
                // END Product Sector Window Dialog
                
                self.buttonClick = function (data, event) {
                };

                self.rateAndIsSetup = function (data, event) {};
                self.redirectToRateISSetup = function (item) {
                    //oj.Router.rootInstance.go('rate-is-setup');
                }
                self.redirectToPWRTermSheet = function (item) {
                    //oj.Router.rootInstance.go('pwr-term-sheet');
                }

                self.onClickContractRemittance = function () {
                    $("#WithdrawDialog").ojDialog("open");
                    return true;
                };
                self.onClickWithdraw = function () {
                    $("#WithdrawDialog").ojDialog("open");
                    return true;
                };
                self.viewProduct = function () {
                    //$("#viewProductDialog").ojDialog("open");
                    //return true;
                };
                self.viewAgreement = function () {
                    $("#viewAgreementDialog").ojDialog("open");
                    return true;
                };
                self.viewBranch = function () {
                    $("#viewBranchDialog").ojDialog("open");
                    return true;
                };
                self.viewContact = function () {
                    $("#viewContactDialog").ojDialog("open");
                    return true;
                };
                self.viewRating = function () {
                    $("#viewRatingDialog").ojDialog("open");
                    return true;
                };

                //Withdraw popup dialog buttons
                //self.onClickWithdrawConfirm = function (item) {};
               // self.onClickWithdrawCancel = function (item) {};

                //Cancel popup dialog buttons
                //self.onClickCancelConfirm = function (item) {};
                //self.onClickCancelCancel = function (item) {};

                self.back = function () {
                    //oj.Router.rootInstance.go("counterparty");
                };
                self.initRefresh();

            }
            return counterpartyDetailMainViewModel;            
        });