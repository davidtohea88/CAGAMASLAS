
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojtable', 'promise', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojradioset'],
        function (oj, ko, $)
        {

            var self = this;
            self.eitags = ko.observableArray([]);
            self.eiName = ko.observable("CIMB Bank Berhad");
            self.prdtags = ko.observableArray([]);
            self.product = ko.observable();
            self.product = ko.observable("MGP-SRP");
            self.countrpartyStatus = ko.observable("Active");
            self.counterPartyGrp = ko.observable("CIMB");
            self.currentValue = ko.observable("Validated");
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


            self.allData = [{SLNo: '001', LnRefNum: '12345', contractNum: '123/MGP-SRP/012017/001', arrears: '350,000', outstandingamout: '200,00.00'},
                {SLNo: '002', LnRefNum: '12346', contractNum: '123/MGP-SRP/012017/002', arrears: '450,000', outstandingamout: '300,00.00'},
                {SLNo: '003', LnRefNum: '12347', contractNum: '123/MGP-SRP/012017/003', arrears: '550,000', outstandingamout: '400,00.00'},
                {SLNo: '004', LnRefNum: '12348', contractNum: '123/MGP-SRP/012017/004', arrears: '650,000', outstandingamout: '500,00.00'},
                {SLNo: '005', LnRefNum: '12349', contractNum: '123/MGP-SRP/012017/005', arrears: '750,000', outstandingamout: '600,00.00'},
                {SLNo: '006', LnRefNum: '12343', contractNum: '123/MGP-SRP/012017/006', arrears: '350,000', outstandingamout: '200,00.00'}
            ]


            self.products = [{value: 'MGP/SPB', label: 'MGP-SPB'},
                {value: 'MGP/SPR', label: 'MGP-SPR'}
            ]

            self.loanrecovery = [{slno: '001', prodGrpType: 'MGP/SRP-C', masdp1reportDate: '01-Jan-2017', defaultNoticeDate: '30-Jan-2017', contractNum: '123', loanNum: 'L001', defaultoutstanding: '10000', p1outstanding: '10000',guaranteeAmt:'',MIA: '5', state: 'KL'},
                {slno: '002', prodGrpType: 'MGP/SRP-C', masdp1reportDate: '01-Feb-2017', defaultNoticeDate: '26-Feb-2017', contractNum: '456', loanNum: 'L001', defaultoutstanding: '37500', p1outstanding: '37500', guaranteeAmt:'3750',MIA: '1', state: 'KL'},
                {slno: '003', prodGrpType: 'MGP/SRP-C', masdp1reportDate: '04-Feb-2017', defaultNoticeDate: '20-Feb-2017', contractNum: '456', loanNum: 'L001', defaultoutstanding: '55000', p1outstanding: '55000', guaranteeAmt:'5500',MIA: '2', state: 'KL'},
                {slno: '004', prodGrpType: 'MGP/SRP-C', masdp1reportDate: '10-Feb-2017', defaultNoticeDate: '21-Feb-2017', contractNum: '456', loanNum: 'L001', defaultoutstanding: '10000', p1outstanding: '10000', guaranteeAmt:'1000',MIA: '3', state: 'KL'}]

            self.loands = ko.observable(new oj.ArrayTableDataSource([], {}));
            function viewModel()
            {
                self.eitags = ko.observableArray(self.EIs);
                self.prdtags = ko.observableArray(self.products);

                self.assetDataExport = function () {
                    window.location = "/LAS/doc/asset_data.xls";
                };

                self.productgrp = [{value: 'Conventional', label: 'Conventional'},
                    {value: 'Islamic', label: 'Islamic'}]

                self.search = function (data, event) {
                    self.loands(new oj.ArrayTableDataSource(self.loanrecovery, {idAttribute: 'slno'}));
                }

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