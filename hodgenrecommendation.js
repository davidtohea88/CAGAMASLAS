
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojtable', 'promise', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojradioset','ojs/ojcheckboxset'],
        function (oj, ko, $)
        {

            var self = this;
            self.validated = "Validated";
            self.failed = "Failed";
            self.all = "All";
            self.eitags = ko.observableArray([]);
            self.eiName = ko.observable("CIMB Bank Berhad");
            self.prdtags = ko.observableArray([]);
            self.product = ko.observable();
            self.originalCapAmt = ko.observable("500,000.00");
            self.totalGuranteeFee = ko.observable("400.00");
            self.contractStauts = ko.observable("Priced");
            self.product = ko.observable("MGP-SRP");
            self.countrpartyStatus = ko.observable("Active");
            self.counterPartyGrp = ko.observable("CIMB");
            self.currentValue = ko.observable("Validated");
            self.contractStauts = ko.observable("Pending for Recommedation");
            self.attachmentds = ko.observable(new oj.ArrayTableDataSource([], {}));
            self.mgpContractNum = ko.observable("123/MGP-SRP/012017/001");
            self.EIs = [{value: 'CPT0045', label: 'CIMB Bank Berhad'},
                {value: 'CPT0004', label: 'Affin Bank Berhad'},
                {value: 'CPT0009', label: 'Alliance Bank Malaysia Berhad'},
                {value: 'CPT0013', label: 'Al-Rajhi Banking and Inv. Corp Malaysia Berhad'},
                {value: 'CPT0014', label: 'AmBank Malaysia Berhad'},
                {value: 'CPT0018', label: 'AMMB Holdings Berhad'},
                {value: 'CPT0021', label: 'Asian Development Bank'},
                {value: 'CPT0024', label: 'Bangkok Bank Malaysia Berhad'},
                {value: 'CPT0025', label: 'Bank Islam Malaysia Berhad'},
                {value: 'CPT0026', label: 'Bank Kerjasama Rakyat Malaysia Berhad'}
            ];


            self.validatedArray = [{SLNo: '001', LnRefNum: '12345', disposalproceeds: '12-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'},
                {SLNo: '002', LnRefNum: '12346', disposalproceeds: '12-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'},
                {SLNo: '003', LnRefNum: '12347', disposalproceeds: '13-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'},
                {SLNo: '004', LnRefNum: '12348', disposalproceeds: '14-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'},
                {SLNo: '005', LnRefNum: '12349', disposalproceeds: '15-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'},
            ]
            self.failedArray = [{SLNo: '006', LnRefNum: '12350', disposalproceeds: '16-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'}
            ]
            self.allData = [{SLNo: '001', LnRefNum: '12345', disposalproceeds: '12-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'},
                {SLNo: '002', LnRefNum: '12346', disposalproceeds: '12-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'},
                {SLNo: '003', LnRefNum: '12347', disposalproceeds: '13-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'},
                {SLNo: '004', LnRefNum: '12348', disposalproceeds: '14-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'},
                {SLNo: '005', LnRefNum: '12349', disposalproceeds: '15-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'},
                {SLNo: '006', LnRefNum: '12350', disposalproceeds: '16-FEB-2017', disposalprice: '350,000', rm3000: '200,00.00', percent: '20'}
            ]

            self.gends = ko.observable(new oj.ArrayTableDataSource([], {}));
            self.products = [{value: 'MGP/SPB', label: 'MGP-SPB'},
                {value: 'MGP/SPR', label: 'MGP-SPR'}
            ] 
            self.attachmentArray = [{AttachmentName: 'Assets Assesment Form'}];
            self.genArray = [{transactionDate:'',gclaimNumber:'ddddd',gName:'',accNumber:'',contractNumber:''}]
            function viewModel()
            {
                self.eitags = ko.observableArray(self.EIs);
                self.prdtags = ko.observableArray(self.products);

                self.buttonClick = function () {
                    // self.attachmentds(new oj.ArrayTableDataSource([], {}));
                };
                self.back = function () {
                    window.location = "?root=mgpcreate";
                };

                self.uploadAttachment = function () {
                    self.attachmentds(new oj.ArrayTableDataSource(self.attachmentArray, {idAttribute: 'AttachmentName'}));

                };
                self.getRowTemplate = function(data, context)
                    {
                        var mode = context.$rowContext['mode'];

                        if (mode === 'edit')
                        {
                            return 'editRowTemplate';
                        }
                        else if (mode === 'navigation')
                        {
                            return 'rowTemplate';
                        }
                    };
                self.assetDataExport = function () {
                    window.location = "/LAS/doc/asset_data.xls";
                };
                self.search = function () {
                    self.gends(new oj.ArrayTableDataSource(self.genArray, {idAttribute: 'transactionDate    '}));
                };
                self.verify = function () {
                    $('#checklistpopup').ojPopup('open', '#verify');
                };
                 self.reommend = function () {
                    //self.contractStauts("Pending for Approval");
                     $('#recommendationpopup').ojPopup('open', '#reommend');
                    // $('#approvalpopup').ojPopup('open', '#justification');
                };
                
                self.cancel = function () {
                    //self.contractStauts("Pending for Approval");
                    $('#recommendationpopup').ojPopup('close', '#cancel');
                

                };
                self.validate = function () {
                    // self.originalCapAmt("200,000,000.00");
                    // self.contractStauts("Validated");

                };


            }

            var vm = new viewModel;
            $(document).ready
                    (
                            function ()
                            {
                                // ko.applyBindings(vm, document.getElementById('table'));
                            }
                    );

        }
); 