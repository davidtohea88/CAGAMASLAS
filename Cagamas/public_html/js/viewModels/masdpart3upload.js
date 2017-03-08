
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
                  
           
                self.validatedArray = [{SLNo:'001', LnRefNum:'511350052015270', disposalproceeds:'12-FEB-2017', disposalprice:'300000', rm3000:'3000',percent:'6095.57'},
                    {SLNo:'002', LnRefNum:'12346', disposalproceeds:'12-FEB-2017', disposalprice:'350,000', rm3000:'200,00.00',percent:'20'},
                    {SLNo:'003', LnRefNum:'12347', disposalproceeds:'13-FEB-2017', disposalprice:'350,000', rm3000:'200,00.00',percent:'20'},
                    {SLNo:'004', LnRefNum:'12348', disposalproceeds:'14-FEB-2017', disposalprice:'350,000', rm3000:'200,00.00',percent:'20'},
                     {SLNo:'005', LnRefNum:'12349', disposalproceeds:'15-FEB-2017', disposalprice:'350,000', rm3000:'200,00.00',percent:'20'},
                ]
                self.failedArray = [  {SLNo:'006', LnRefNum:'12350', disposalproceeds:'16-FEB-2017', disposalprice:'350,000', rm3000:'200,00.00',percent:'20'}
                ]
               self.allData = [{SLNo:'001', LnRefNum:'511350052015270', disposalproceeds:'12-FEB-2017', disposalprice:'300000', rm3000:'3000',percent:'6095.57'},
                    {SLNo:'002', LnRefNum:'12346', disposalproceeds:'12-FEB-2017', disposalprice:'350,000', rm3000:'200,00.00',percent:'20'},
                    {SLNo:'003', LnRefNum:'12347', disposalproceeds:'13-FEB-2017', disposalprice:'350,000', rm3000:'200,00.00',percent:'20'},
                    {SLNo:'004', LnRefNum:'12348', disposalproceeds:'14-FEB-2017', disposalprice:'350,000', rm3000:'200,00.00',percent:'20'},
                    {SLNo:'005', LnRefNum:'12349', disposalproceeds:'15-FEB-2017', disposalprice:'350,000', rm3000:'200,00.00',percent:'20'},
                    {SLNo:'006', LnRefNum:'12350', disposalproceeds:'16-FEB-2017', disposalprice:'350,000', rm3000:'200,00.00',percent:'20'}
                ]
                
                self.masdpart3summaryData = [{rprtDate:'001', contractNumber:'123/MGP-SRP/012017/001', lnRefNum:'H1234567', gamntrefund2cagamas:'1234.00', accrued:'110.00',total:'1334.00'}
                  
                ]
                
                
                

                self.summaryreportds = ko.observable(new oj.ArrayTableDataSource([], {})); 
                self.masdpart3ds = ko.observable(new oj.ArrayTableDataSource([], {})); 
       
               self.products = [{value: 'MGP/SPB', label: 'MGP-SPB'},
                {value: 'MGP/SPR', label: 'MGP-SPR'}
                ]
            
            function viewModel()
            {
                self.eitags = ko.observableArray(self.EIs);
                self.prdtags = ko.observableArray(self.products);
                
                self.cancel =function() {
                             $('#masdpart3summary').ojPopup('close', '#masdpart3');   
                };
                
                
                self.search =function() {
                           
                      self.masdpart3ds(new oj.ArrayTableDataSource(self.masdpart3summaryData, {idAttribute: 'rprtDate'})); 
                             
                };
                self.getSummary =function() {
                             $('#masdpart3summary').ojPopup('open', '#masdpart3');  
                             // self.masdpart3ds(new oj.ArrayTableDataSource(self.masdpart3summaryData, {idAttribute: 'SLNo'})); 
                             
                };
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
                 self.upload = function () {
                   $('#all')[0].checked= true;
                    self.summaryreportds(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'SLNo'})); 
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