
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojtable', 'promise', 'ojs/ojarraytabledatasource','ojs/ojdatetimepicker','ojs/ojradioset'],
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
            self.totalGuranteeFee =  ko.observable("400.00");
            self.contractStauts = ko.observable("Priced");
            self.product = ko.observable("MGP-SRP");    
            self.countrpartyStatus = ko.observable("Active");
            self.counterPartyGrp = ko.observable("CIMB");
            self.currentValue = ko.observable("Validated");
            self.reportDate = ko.observable("");
            self.mgpContractNum = ko.observable("123/MGP-SRP/012017/001");
            self.EIs = [ {value: 'CPT0045', label: 'CIMB Bank Berhad'},
                         {value : 'CPT0004', label : 'Affin Bank Berhad'},
                        {value : 'CPT0009', label : 'Alliance Bank Malaysia Berhad'},
                        {value : 'CPT0013', label : 'Al-Rajhi Banking and Inv. Corp Malaysia Berhad'},
                        {value : 'CPT0014', label : 'AmBank Malaysia Berhad'},
                        {value : 'CPT0018', label : 'AMMB Holdings Berhad'},
                        {value : 'CPT0021', label : 'Asian Development Bank'},
                        {value: 'CPT0024', label: 'Bangkok Bank Malaysia Berhad'},
                        {value: 'CPT0025', label: 'Bank Islam Malaysia Berhad'},
                        {value: 'CPT0026', label: 'Bank Kerjasama Rakyat Malaysia Berhad'}                       
                        ]; 
                  
           
                self.validatedArray = [{SLNo:'001', LnRefNum:'12345', contractNum:'123/MGP-SRP/012017/001', arrears:'350,000', outstandingamout:'200,00.00'},
                    {SLNo:'002', LnRefNum:'12346', contractNum:'123/MGP-SRP/012017/002', arrears:'450,000', outstandingamout:'300,00.00'},
                    {SLNo:'003', LnRefNum:'12347', contractNum:'123/MGP-SRP/012017/003', arrears:'550,000', outstandingamout:'400,00.00'},
                    {SLNo:'004', LnRefNum:'12348', contractNum:'123/MGP-SRP/012017/004', arrears:'650,000', outstandingamout:'500,00.00'},
                    {SLNo:'005', LnRefNum:'12349', contractNum:'123/MGP-SRP/012017/005', arrears:'750,000', outstandingamout:'600,00.00'}
                ]
                self.failedArray = [ {SLNo:'006', LnRefNum:'12343', contractNum:'123/MGP-SRP/012017/006', arrears:'350,000', outstandingamout:'200,00.00'}
                ]
               self.allData = [{SLNo:'001', LnRefNum:'12345', contractNum:'123/MGP-SRP/012017/001', arrears:'350,000', outstandingamout:'200,00.00'},
                    {SLNo:'002', LnRefNum:'12346', contractNum:'123/MGP-SRP/012017/002', arrears:'450,000', outstandingamout:'300,00.00'},
                    {SLNo:'003', LnRefNum:'12347', contractNum:'123/MGP-SRP/012017/003', arrears:'550,000', outstandingamout:'400,00.00'},
                    {SLNo:'004', LnRefNum:'12348', contractNum:'123/MGP-SRP/012017/004', arrears:'650,000', outstandingamout:'500,00.00'},
                    {SLNo:'005', LnRefNum:'12349', contractNum:'123/MGP-SRP/012017/005', arrears:'750,000', outstandingamout:'600,00.00'},
                    {SLNo:'006', LnRefNum:'12343', contractNum:'123/MGP-SRP/012017/006', arrears:'350,000', outstandingamout:'200,00.00'}
                ]

               self.summaryreportds = ko.observable(new oj.ArrayTableDataSource([], {}));  
               self.products = [{value: 'MGP/SPB', label: 'MGP-SPB'},
                {value: 'MGP/SPR', label: 'MGP-SPR'}
                ]
            
            function viewModel()
            {
                self.eitags = ko.observableArray(self.EIs);
                self.prdtags = ko.observableArray(self.products);
                           
                self.back =function() {
                        window.location = "?root=mgpcreate";
                };
                self.assetDataExport= function() {
                    window.location = "/LAS/doc/asset_data.xls";
                };
                 self.validate = function () {
                   // self.originalCapAmt("200,000,000.00");
                   // self.contractStauts("Validated");

                };
                self.assetDataEvent = function (event, data) {
                  
                    var assetDataOption = data['value'];
                    if (assetDataOption === self.validated) {
                        self.summaryreportds(new oj.ArrayTableDataSource(self.validatedArray, {idAttribute: 'SLNo'}));
                    } else if (assetDataOption === self.failed) {
                        self.summaryreportds(new oj.ArrayTableDataSource(self.failedArray, {idAttribute: 'SLNo'}));
                    } else if (assetDataOption === self.all) {
                        self.summaryreportds(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'SLNo'}));
                    }

                };
                           
            }
           
              var vm = new viewModel;
               $(document).ready
                (
                  function()
                  {
                   // ko.applyBindings(vm, document.getElementById('table'));
                  }
                );
          
        }
); 