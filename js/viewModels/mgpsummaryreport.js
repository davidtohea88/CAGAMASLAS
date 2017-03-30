
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
            self.originalCapAmt = ko.observable("200,000,000.00");
            self.totalGuranteeFee =  ko.observable("5000.00");
            self.contractStauts = ko.observable("Priced");
            self.product = ko.observable("MGP-SRP");
            self.countrpartyStatus = ko.observable("Active");
            self.counterPartyGrp = ko.observable("CIMB");
            self.applicationId = ko.observable("12345");
            self.caidreportdate = ko.observable("31 March 2017");
            self.tradedate = ko.observable("07 March 2017");
            self.scheduleterminationdate = ko.observable("");
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
             
           
                self.summaryReportArray = [{AssetId:'as-001', prdGrp:'Conventional', valOfProperty:'350,000', netorgCapAmnt:'350,000', loanTenor:'600', catvRatio:'99%', protectionThreshold:'315,000', protectionPerion:'28', guaranteeFee:'xxxxxxxx'},
                ]
                self.summaryreportds = ko.observable(new oj.ArrayTableDataSource(summaryReportArray, {idAttribute: 'AssetId'}));  
               
            
            function viewModel()
            {
                self.eitags = ko.observableArray(self.EIs);
                    
                self.back =function() {
//                        window.location = "?root=mgpcreate";
                    window.close();
                };
                self.assetDataExport= function() {
                    window.location = "doc/asset_data.xls";
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