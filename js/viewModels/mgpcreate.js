
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojtable', 'promise', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojradioset'],
        function (oj, ko, $)
        {

            var self = this;
            self.validated = "Validated";
            self.failed = "Failed";
            self.all = "All";
            self.eitags = ko.observableArray([]);
            self.eiName = ko.observable();
            self.t6code = ko.observable();
            self.prdtags = ko.observableArray([]);
            self.product = ko.observable();
            self.originalCapAmt = ko.observable();
            self.totalGuranteeFee = ko.observable();
            self.contractStauts = ko.observable("Draft");
            self.mgpContractNum = ko.observable("T-123/MGP-SRP/012017/001");
            self.attachmentds = ko.observable(new oj.ArrayTableDataSource([], {}));
            self.currentValue = ko.observable("Validated");
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
            self.t6Codes = [{value: 'BAI AL-DAYN', label: 'BAI AL-DAYN'},
                {value: 'BAI AL-INAH', label: 'BAI AL-INAH'},
                {value: 'AL BAI BITHAMAN AJIL', label: 'AL BAI BITHAMAN AJIL'},
                {value: 'IJARAH', label: 'IJARAH'},
                {value: 'ISTITHMAR', label: 'ISTITHMAR'},
                {value: 'ISTISNA', label: 'ISTISNA'},
                {value: 'MUDHARABAH', label: 'MUDHARABAH'},
                {value: 'MURABAHAH', label: 'MURABAHAH'},
                {value: 'MUSYARAKAH', label: 'MUSYARAKAH'},
                {value: 'QARD AL-HASAN', label: 'QARD AL-HASAN'},
                {value: 'WAKALAH', label: 'WAKALAH'},
                {value: 'WAKALAH BIL ISTIHMAR', label: 'WAKALAH BIL ISTIHMAR'},
                {value: 'WADIAH', label: 'WADIAH'},
                {value: 'WA\’D', label: 'WA\’D'},
                {value: 'BAI Al A\'YAAN', label: 'BAI Al A\'YAAN'},
                {value: 'BAI AL-DAYN AL SILA\' II', label: 'BAI AL-DAYN AL SILA\' II'},
                {value: 'HIBAH', label: 'HIBAH'},
                {value: 'MUSAWAMAH', label: 'MUSAWAMAH'},
                {value: 'HAWALA AL DAYN', label: 'HAWALA AL DAYN'},
                {value: 'HIWALAH AL HAQQ', label: 'HIWALAH AL HAQQ'},
                {value: 'Al UJR', label: 'Al UJR'},
                {value: 'RAHN', label: 'RAHN'},
                {value: 'TA\’WIDH', label: 'TA\’WIDH'},
                {value: 'IBRA', label: 'IBRA'}
            ];
            self.contracts = [{value: '130/MGPFI/01201  7/001', label: '130/MGPFI/012017/001'},
                {value: '130/MGPFI/012017/002', label: '130/MGPFI/012017/002'},
                {value: '130/MGPFI/012018/001', label: '130/MGPFI/012018/001'}
            ]
            self.products = [{value: 'MGP/SPB', label: 'MGP-SPB'},
                {value: 'MGP/SRP', label: 'MGP-SRP'}
            ]
            self.productgrp = [{value: 'Conventional', label: 'Conventional'},
                {value: 'Islamic', label: 'Islamic'}
            ]

            self.allAssetArray = [{AssetId: 'as-001', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '15%'},
                {AssetId: 'as-002', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '5%'},
                {AssetId: 'as-003', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '15%'},
                {AssetId: 'as-004', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '5%'},
                {AssetId: 'as-005', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '15%'},
                {AssetId: 'as-006', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '5%'},
                {AssetId: 'as-007', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '5%'}]

            self.failedAssetArray = [{AssetId: 'as-006', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '5%'},
                {AssetId: 'as-007', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '5%'}]

            self.validatedArray = [{AssetId: 'as-001', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '15%'},
                {AssetId: 'as-002', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '5%'},
                {AssetId: 'as-003', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '15%'},
                {AssetId: 'as-004', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '5%'},
                {AssetId: 'as-005', prdGrp: 'Conventional', orgCapAmnt: '500.00', orgAssetVal: '400.00', totalAssetVal: '500.00', ror: '15%'}
            ]

            self.assetds = ko.observable(new oj.ArrayTableDataSource([], {}));
            self.attachmentArray = [{AttachmentName: 'Assets Assesment Form', Type: 'Asset Document'}];

            self.fileTypes = [{value: 'AssetAssementForm', label: 'Asset Assessment Form'},
                {value: 'CDS', label: 'CDS'},
                {value: 'GNotice', label: 'Guarantee Notice'},
                {value: 'DFLTNotice', label: 'Default Notice'},
                {value: 'GEventNotice', label: 'Guarantee Event Notice'}
            ]


            function viewModel()
            {
            
                self.selVal = "";

                self.eitags = ko.observableArray(self.EIs);
                self.prdtags = ko.observableArray(self.products);
                t6tags = ko.observableArray(self.t6Codes);
                
                self.approveStatus = function(){
                    self.contractStauts("Approved");
                };
                
                self.generatetransdoc = function(item) {
//                    oj.Router.rootInstance.go("mgpsummaryreport");
//                    window.location.blank = "?root=mgpsummaryreport";
                    self.contractStauts("Document Processing");
                    window.open('?root=generatetransdoc','_blank');
                  };

                
                self.goToSummaryReport = function(item) {
//                    oj.Router.rootInstance.go("mgpsummaryreport");
//                    window.location.blank = "?root=mgpsummaryreport";
                    window.open('?root=mgpsummaryreport','_blank');
                  };

                self.buttonClick = function () {
                    self.attachmentds(new oj.ArrayTableDataSource([], {}));
                };
                self.addAttachment = function () {
                    if(selVal == 'CDS' || selVal == 'GNotice' ){
                        self.contractStauts("Document Signed");
                    }
                    self.attachmentds(new oj.ArrayTableDataSource(self.attachmentArray, {idAttribute: 'AttachmentName'}));

                };
                self.assetDataExport = function () {
                    window.location = "doc/asset_data.xls";

                };
                self.assetDataEvent = function (event, data) {

                    var assetDataOption = data['value'];
                    if (assetDataOption === self.validated) {
                        self.assetds(new oj.ArrayTableDataSource(self.validatedArray, {idAttribute: 'AssetId'}));
                    } else if (assetDataOption === self.failed) {
                        self.assetds(new oj.ArrayTableDataSource(self.failedAssetArray, {idAttribute: 'AssetId'}));
                    } else if (assetDataOption === self.all) {
                        self.assetds(new oj.ArrayTableDataSource(self.allAssetArray, {idAttribute: 'AssetId'}));
                    }

                };

                self.calculateGuranteFee = function () {
                    //window.location = 
                    self.totalGuranteeFee("5000.00");
                    self.contractStauts("Priced");
                };
                
                self.validate = function () {
                    self.originalCapAmt("200,000,000.00");
                    self.contractStauts("Validated");

                };

                self.upload = function () {
                   $('#all')[0].checked= true;
                   self.assetds(new oj.ArrayTableDataSource(self.allAssetArray, {idAttribute: 'AssetId'}));
                };
                self.save = function () {   
                    self.mgpContractNum("123/MGP-SRP/012017/001");
                };
                self.approve = function () {
                    self.contractStauts("Pending For Approval");
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