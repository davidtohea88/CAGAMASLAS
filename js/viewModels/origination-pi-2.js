/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
                var currencyOptionChangedHandler = function (event, data) {
                    if(data.option=='value'){
                        if (data.value != "MYR") {
                            $('#row_exchangeRate').css('display','flex');
                            $('#row_foreignCurrencyAmount').css('display','flex');
                        }
                        else {
                            $('#row_exchangeRate').hide();
                            $('#row_foreignCurrencyAmount').hide();
                            
                        }
                    }
                };
                var purchaseModeOptionChangedHandler = function(event,data) {
                    if(data.option=='value')
                    {
                        if (data.value == "B2B") {
                            $('#row_vendor').css('display','flex');
                        }
                        else {
                            $('#row_vendor').hide();                            
                        }
                    }
                };
                
                
                        
define(['ojs/ojcore', 'knockout',  'data/data','jquery',
           'ojs/ojknockout', 'ojs/ojinputtext','ojs/ojselectcombobox','ojs/ojdatetimepicker', 'ojs/ojbutton', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource'],
        function (oj, ko,jsonData, $)
        {
            /* 
             * Your application specific code will go here
             */
            function updateReviewDateValue(self)
            {
                var d = new Date(self.purchaseDateValue());
                var year = d.getFullYear();
                var month = d.getMonth();
                var day = d.getDate();
                var c = new Date(year + parseInt(self.tenureYear()), month+parseInt(self.tenureMonth()), day);
                self.reviewDateValue(oj.IntlConverterUtils.dateToLocalIso(c));
            }
            
            function mainViewModel() {
                var self = this;
                self.tenureYear = ko.observable(3);
                self.tenureMonth = ko.observable(0);
                self.reviewDateValue = ko.observable(0);
                self.purchaseDateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date('2017','02','27')));
                self.purchaseDateValue.subscribe(function(newValue) {
                    updateReviewDateValue(self);
                });                
                self.tenureYear.subscribe(function() {
                    updateReviewDateValue(self);
                });
                self.tenureMonth.subscribe(function() {
                    updateReviewDateValue(self);
                });
                self.pricingFactor = [ {value:'premium', label:'Premium'},
  {value:'par', label:'Par'},
   {value:'disc', label:'Discounted'},
{value : 'OC', label :'Over  Collateralization'}];
                self.selectedPricingFactor = ko.observable('Please Select');
                self.header = "Preliminary Indication";
                self.openCPPopUp = function(){$("#CPDialog").ojDialog("open");return true;};
                self.closeCPPopUp = function(){$("#CPDialog").ojDialog("close");return true;};
                self.openVendorPopUp = function(){$("#VendorDialog").ojDialog("open");return true;};
                self.closeVendorPopUp = function(){$("#VendorDialog").ojDialog("close");return true;};
                self.PIstatus = ko.observable('Uploaded');
                self.pricingFactorRate  = ko.observable();
                self.selectedCP = ko.observable();
                self.selectedVendor = ko.observable();
                self.assetType = [{value : 'Housing Loan', label : 'Housing Loan'},
{value : 'HPCL', label : 'Hire Purchase – Consumer Loan'},
{value : 'HPIL', label : 'Hire Purchase – Industrial Loan'},
{value : 'HPLD', label : 'Leasing Debt'},
{value : 'PL', label : 'Personal Loan'},
{value : 'Housing', label : 'Commercial & Industrial Property Loan'},
{value : 'Housing', label : 'Credit Card Receivable'},
{value : 'Housing', label : 'SME Loan'},
{value : 'SMEL', label : 'Infrastructure Loan'},
{value : 'Housing', label : 'Corporate Term Loan'},
{value : 'CTL', label : 'Housing'}];
                self.purchaseMode = [{value : 'Direct', label : 'Direct'},{value : 'B2B', label : 'Back to Back'}];
                self.paymentType = [{value : 'PI', label : 'Principal + Interest'}, {value : 'I', label : 'Interest'}, {value:'H', label:'Hybrid'}];                
                self.paymentFrequency = [{value : 'Daily', label : 'Daily'},
{value : 'Weekly', label : 'Weekly'},
{value : 'Fortnightly', label : 'Fortnightly'},
{value : 'Monthly', label : 'Monthly'},
{value : 'Quarterly', label : 'Quarterly'},
{value : 'Half Yearly', label : 'Half Yearly'},
{value : 'Yearly', label : 'Yearly'},
{value : 'Upon Full Disbursement', label : 'Upon Full Disbursement'},
{value : 'Yearly', label : 'Full 5 Annual'},
{value : 'Yearly', label : 'Yearly'}
];
               // self.pricingFactorRate = [{value : 'Calculated using highest GIR', label :'Calculated using highest GIR'}];
                self.purchaseConsiderationType = [{value: 'Cash', label:'Cash'},{value: 'Bond', label:'Bond'},{value: 'CashBond', label:'Cash + Bond'}];
                self.rateType = [{value : 'fixed', label : 'Fixed'}, {value : 'floating', label : 'Floating'},{value : 'convertible', label : 'convertible'}, {value : 'hybrid', label : 'Hybird'}];
                self.counterPartyType = [
                    {value : 'CORPORATE', label : 'Corporation'}, {value : 'DFIA', label : 'Development Financial Institution'},
                    {value : 'FI', label : 'Financial Institution'}, {value : 'LEASING', label : 'Leasing Company'},
                    {value : 'GLC', label : 'Government-Linked Company'},
                    {value : 'GOV_AGENCY', label : 'Government Agency'},
                    {value : 'GOV_FED', label : 'Federal Government'}, 
                    {value : 'GOV_STATE', label : 'State Government'}, 
                    {value : 'INSURANCE_TAKAFUL', label : 'Insurance/Takaful Company'},
                     {value : 'OTHER_GG', label : 'Others - Government Guaranteed'},
                    {value : 'OTHER_SUB_DEB', label : 'Others - Subordinated Debt'},
                    {value : 'OTHER_SUPRANATIONAL', label : 'Others - Supranational'}
                ];
                self.currency = [{value : 'MYR', label : 'MYR'},{value : 'SGD', label : 'SGD'},{value : 'USD', label : 'USD'}];
                self.selectCurrencyVal = ko.observable('Please Select');
                self.pricingFactorOptionChangedHandler  = function(event,data) {
                    if(data.option=='value')
                    {
                        selectedPricingFactor = data.value;
                        if (data.value == "OC") {
                            self.pricingFactorRate('Calculated using highest GIR');
                        }
                        else {
                            self.pricingFactorRate('');
                        }
                    }
                };
                var CPArray = [
                {CPCode: 'CIMBSD', CPName: 'CIMB Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 3,6,9,12'},
                {CPCode: 'CIMBINV', CPName: 'CIMB Investment Bank BHD', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
                {CPCode: 'CIMBINVSPI', CPName: 'CIMB Investment Bank BHD-SPI', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
                {CPCode: 'CIMBISD', CPName: 'CIMB Islamic Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 2,5,8,11'},
                {CPCode: 'CIMBSD', CPName: 'CIMB Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 3,6,9,12'},
                {CPCode: 'CIMBINV', CPName: 'CIMB Investment Bank BHD', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
                {CPCode: 'CIMBINVSPI', CPName: 'CIMB Investment Bank BHD-SPI', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
                {CPCode: 'CIMBISD', CPName: 'CIMB Islamic Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 2,5,8,11'}
                ];                
                pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray, {idAttribute: 'CPCode'}));
                cpLookUpClick =  function(item) {
                    self.selectedCP(item.CPName);
                    $("#CPDialog").ojDialog("close");
                };
                
                var vendorArray = [
                {VendorCode: 'V0001', VendorName: 'Vendor A', VendorEmail:'vendor1@email.com', VendorPhone:'6017123456', VendorCPName:'John Doe'},
                {VendorCode: 'V0002', VendorName: 'Vendor B', VendorEmail:'vendor2@email.com', VendorPhone:'6017123456', VendorCPName:'Peter Lau'},
                {VendorCode: 'V0003', VendorName: 'Vendor C', VendorEmail:'vendor3@email.com', VendorPhone:'6017123456', VendorCPName:'James Lee'}
                ];                
                vendorPagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(vendorArray, {idAttribute: 'VendorCode'}));
                vendorLookUpClick =  function(item) {
                    self.selectedVendor(item.VendorName);
                    $("#VendorDialog").ojDialog("close");
                };
                validateClick =  function(item) {
                    $("#btn_validate").css('display','none');
                    $("#btn_next").css('display','flex');
                };
                nextClick =  function(item) {
                    $("#btn_next").attr('disabled','disabled');
                    $("#btn_upload_loan").show();
                    $("#btn_temp_pc").show();
                    self.PIstatus('Uploaded');
                };
                redirectToUploadLoan= function(item) {
                  oj.Router.rootInstance.go('upload-loan-detail');
                }     
            
                createPC = function(item) {
                  oj.Router.rootInstance.go('origination-pc');
                }     
            }

            return mainViewModel;        
                      

        });
