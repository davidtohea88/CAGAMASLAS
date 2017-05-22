
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
                  
           
                self.validatedArray = [
                    
                    {reportDate:'17-03-2017',SLNo:'001', LnRefNum:'6055080027641',arrears:'3',closingBal:'396940.79',dateHome:'17-07-2016',recCode:'FL7',forLegal:'NODT on 17/07/2016 via Tetuan Abdul Razak & Zulkifli; 20/07/2016 Instruct; 12/02/2017- Waiting for inquiry date from Jerantut Land Office; 03/03/2017- Court Order For Sale',propDis:'',dispos:'',finTer:'',valRep:'01-01-2017',order:'03-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'},
{reportDate:'17-03-2017',SLNo:'002', LnRefNum:'5058080052480',arrears:'3',closingBal:'208384.8',dateHome:'17-07-2016',recCode:'FL7',forLegal:'05/03/2017- Court Order For Sale',propDis:'Y',dispos:'08/03/2017',finTer:'',valRep:'01-12-2016',order:'05-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'},
{reportDate:'17-03-2017',SLNo:'003', LnRefNum:'6055080027231',arrears:'3',closingBal:'396940.79',dateHome:'17-07-2016',recCode:'FL7',forLegal:'NODT on 17/07/2016 via Tetuan Abdul Razak & Zulkifli; 20/07/2016 Instruct; 12/02/2017- Waiting for inquiry date from Jerantut Land Office; 03/03/2017- Court Order For Sale',propDis:'',dispos:'',finTer:'',valRep:'01-01-2017',order:'03-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'},
{reportDate:'17-03-2017',SLNo:'004', LnRefNum:'5058083535450',arrears:'3',closingBal:'208384.8',dateHome:'17-07-2016',recCode:'FL7',forLegal:'05/03/2017- Court Order For Sale',propDis:'Y',dispos:'08/03/2017',finTer:'',valRep:'01-12-2016',order:'05-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'}
                ]
                self.failedArray = [ 
                    {reportDate:'17-03-2017',SLNo:'005', LnRefNum:'4535080027553',arrears:'3',closingBal:'396940.79',dateHome:'17-07-2016',recCode:'FL7',forLegal:'NODT on 17/07/2016 via Tetuan Abdul Razak & Zulkifli; 20/07/2016 Instruct; 12/02/2017- Waiting for inquiry date from Jerantut Land Office; 03/03/2017- Court Order For Sale',propDis:'',dispos:'',finTer:'',valRep:'01-01-2017',order:'03-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'},
{reportDate:'17-03-2017',SLNo:'006', LnRefNum:'4058080033404',arrears:'3',closingBal:'208384.8',dateHome:'17-07-2016',recCode:'FL7',forLegal:'05/03/2017- Court Order For Sale',propDis:'Y',dispos:'08/03/2017',finTer:'',valRep:'01-12-2016',order:'05-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'}
                ]
               self.allData = [
                   {reportDate:'17-03-2017',SLNo:'001', LnRefNum:'6055080027641',arrears:'3',closingBal:'396940.79',dateHome:'17-07-2016',recCode:'FL7',forLegal:'NODT on 17/07/2016 via Tetuan Abdul Razak & Zulkifli; 20/07/2016 Instruct; 12/02/2017- Waiting for inquiry date from Jerantut Land Office; 03/03/2017- Court Order For Sale',propDis:'',dispos:'',finTer:'',valRep:'01-01-2017',order:'03-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'},
{reportDate:'17-03-2017',SLNo:'002', LnRefNum:'5058080052480',arrears:'3',closingBal:'208384.8',dateHome:'17-07-2016',recCode:'FL7',forLegal:'05/03/2017- Court Order For Sale',propDis:'Y',dispos:'08/03/2017',finTer:'',valRep:'01-12-2016',order:'05-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'},
{reportDate:'17-03-2017',SLNo:'003', LnRefNum:'6055080027231',arrears:'3',closingBal:'396940.79',dateHome:'17-07-2016',recCode:'FL7',forLegal:'NODT on 17/07/2016 via Tetuan Abdul Razak & Zulkifli; 20/07/2016 Instruct; 12/02/2017- Waiting for inquiry date from Jerantut Land Office; 03/03/2017- Court Order For Sale',propDis:'',dispos:'',finTer:'',valRep:'01-01-2017',order:'03-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'},
{reportDate:'17-03-2017',SLNo:'004', LnRefNum:'5058083535450',arrears:'3',closingBal:'208384.8',dateHome:'17-07-2016',recCode:'FL7',forLegal:'05/03/2017- Court Order For Sale',propDis:'Y',dispos:'08/03/2017',finTer:'',valRep:'01-12-2016',order:'05-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'},
{reportDate:'17-03-2017',SLNo:'005', LnRefNum:'4535080027553',arrears:'3',closingBal:'396940.79',dateHome:'17-07-2016',recCode:'FL7',forLegal:'NODT on 17/07/2016 via Tetuan Abdul Razak & Zulkifli; 20/07/2016 Instruct; 12/02/2017- Waiting for inquiry date from Jerantut Land Office; 03/03/2017- Court Order For Sale',propDis:'',dispos:'',finTer:'',valRep:'01-01-2017',order:'03-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'},
{reportDate:'17-03-2017',SLNo:'006', LnRefNum:'4058080033404',arrears:'3',closingBal:'208384.8',dateHome:'17-07-2016',recCode:'FL7',forLegal:'05/03/2017- Court Order For Sale',propDis:'Y',dispos:'08/03/2017',finTer:'',valRep:'01-12-2016',order:'05-03-2017',suitCd:'CS7',suitDet:'Pending judgement in default'}
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
                self.upload = function () {
                   $('#all')[0].checked= true;
                   self.reportDate("17 March 2017");
                    self.summaryreportds(new oj.ArrayTableDataSource(self.allData, {idAttribute: 'SLNo'}));
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