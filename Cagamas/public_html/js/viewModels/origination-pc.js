define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $, configService)
      {
      
        var self = this;
        self.config = configService;
        
        function updateReviewDateValue(self)
        {
            var d = new Date(self.purchaseDate());
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var c = new Date(year + parseInt(self.tenureYear()), month+parseInt(self.tenureMonth()), day);
            self.reviewDate(oj.IntlConverterUtils.dateToLocalIso(c));
        }
//        var urlParams;
        //to get url query params on page load
//        (window.onpopstate = function () {
//            var match,
//                pl     = /\+/g,  // Regex for replacing addition symbol with a space
//                search = /([^&=]+)=?([^&]*)/g,
//                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
//                query  = window.location.search.substring(1);
//        
//            urlParams = {};
//            while (match = search.exec(query))
//               urlParams[decode(match[1])] = decode(match[2]);
//        })();

        self.datasource=ko.observable(new oj.ArrayTableDataSource([], {}));  
        
        self.currency = [{value : 'MYR', label : 'MYR'},
                        {value : 'SGD', label : 'SGD'},
                        {value : 'USD', label : 'USD'}]
                        
        self.years = [{value : '0', label : '0'},
                        {value : '1', label : '1'},
                        {value : '2', label : '2'},
                        {value : '3', label : '3'},
                        {value : '4', label : '4'},
                        {value : '5', label : '5'},
                        {value : '6', label : '6'},
                        {value : '7', label : '7'},
                        {value : '8', label : '8'},
                        {value : '9', label : '9'}]
                        
        self.months = [{value : '0', label : '0'},
                        {value : '1', label : '1'},
                        {value : '2', label : '2'},
                        {value : '3', label : '3'},
                        {value : '4', label : '4'},
                        {value : '5', label : '5'},
                        {value : '6', label : '6'},
                        {value : '7', label : '7'},
                        {value : '8', label : '8'},
                        {value : '9', label : '9'},
                        {value : '10', label : '10'},
                        {value : '11', label : '11'},
                        {value : '12', label : '12'}]
        
        self.purchaseMode = [{value : 'Direct', label : 'Direct'},
                            {value : 'BacktoBack', label : 'Back to Back'}]
        self.paymentType = [{value : 'PI', label : 'Principal + Interest'},
                            {value : 'I', label : 'Interest'},
                            {value : 'H', label : 'Hybrid'}]
        self.rateType = [{value : 'Fixed', label : 'Fixed'},
                        {value : 'Floating', label : 'Floating'}]
        self.paymentFrequency = [{value : 'Monthly', label : 'Monthly'},
                                {value : 'Quarterly', label : 'Quarterly'},
                                {value : 'Annually', label : 'Annually'}]
        self.selectedPaymentFreq = ko.observableArray(["Quarterly"]);
        self.purchaseConsiderationType = [{value : 'CASH', label : 'CASH'},
                                        {value : '0', label : '0'}]
        self.pricingFactor = [{value : 'Par', label : 'Par'},
                            {value : 'OC', label : 'Over Collateralization'}]
        self.dayCountConversion = [{value : '30/360', label : '30/360'},
                                    {value : '0', label : '0'}]
        self.counterpartyRest = [{value : 'Monthly', label : 'Monthly'},
                                {value : 'Yearly', label : 'Yearly'}]
        self.counterpartyRepayFreq = [{value : 'Monthly', label : 'Monthly'},
                                    {value : 'Yearly', label : 'Yearly'}]
        self.performOverwrite = [{value : '1', label : '1'}]
        self.performZeroTest = [{value : '1', label : '1'}]
        self.documentType = [{value : 'PDF', label : 'PDF'},
                                {value : 'Doc', label : 'DOC/DOCX'}]
        
        self.currentFBB = ko.observable("no");
        self.selectedPricingFactor = ko.observable(["Par"]);
        self.purchaseContractNo = ko.observable('T-127/000/2810/159074/TL1/Q/C0-0/0');
        self.purchaseAmount= ko.observable('33.000.000,00');
        
        self.purchaseValue = purchaseAmount;
        self.purchaseDate= ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2017, 2, 27)));
        self.tenureYear= ko.observable('3');
        self.tenureMonth= ko.observable('0');
        self.reviewDate= ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2020, 2, 27)));
        self.pricingFactorPerc=ko.observable(1);
        self.selectedDocType = ko.observable();
        self.purchaseContractDate = ko.observable(self.purchaseDate());
        self.deemedPurchDate = ko.observable(self.purchaseDate());
        self.bookBalanceDate = ko.observable(self.purchaseDate());
        
        self.cagaRate = ko.observable();
        self.cagaInstallment = ko.observable();
        self.reviewCagaVal = ko.observable();
        self.intDebitPractice = ko.observable();
        self.intDebitPeriod = ko.observable();
        function mainModel(){
            self.header = "Purchase Contract";
            self.filename = ko.observable();
            self.desc = ko.observable();
            self.type = ko.observable();
            self.version = ko.observable();
            self.date = ko.observable();
            self.inputStatus = ko.observable(self.config.status ? self.config.status.toUpperCase() : 'TEMP-NEW');
            
            //action-buttons param to set button disabled/not
            self.rateISBtn = true;
            self.loanDetailBtn = true;
            self.commDocBtn = true;
            self.gisBtn = true;
            self.pwrTermSheetBtn = true;
            self.cosFormBtn = true;
            self.cosLetterBtn = true;
            self.puchContractBtn = true;
            self.contractRemittanceBtn = true;
            self.withdrawBtn = true;
            self.cancelBtn = true;
            
            var attachmentArray = [{FileName: '...', Description: '...', Type: '...', Version:'...', Date:'...'}];
            self.observableArray = ko.observableArray(attachmentArray);
            datasource = ko.observable(new oj.ArrayTableDataSource(self.observableArray, {idAttribute: 'FileName'}));
            var firstDataExist = true;
            self.onClickUpload = function(data, event){
                if(firstDataExist){
                    self.observableArray.splice(0, 1);
                    firstDataExist = false;
                }
                var x = document.getElementById("browseFile").files;
                self.filename(x[0].name);
                self.desc('description');
                self.type(self.selectedDocType());
                self.version(1);
                self.dateConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                                    createConverter(
                                    {
                                      pattern : "dd-MMM-yyyy / hh:mm"
                                    });
                self.date = ko.observable(dateConverter.format(oj.IntlConverterUtils.dateToLocalIso(x[0].lastModifiedDate)));
                var ni = {'FileName': self.filename(),
                         'Description': self.desc(),
                         'Type': self.type(),
                         'Version': self.version(),
                         'Date': self.date()};
                self.observableArray.push(ni);
            }
            self.deleteRow = function(data, event){
                var currentRow = $('#table').ojTable('option', 'currentRow');
        
                if (currentRow != null)
                {
                    self.observableArray.splice(currentRow['rowIndex'], 1);
                }
            }
            
            self.cosForm = function(data, event){
              oj.Router.rootInstance.go('cos-form');            
            };
            self.cosLetter = function(data, event){
              oj.Router.rootInstance.go('cos-letter');            
            };
            self.purchaseContract = function(data, event){
//              oj.Router.rootInstance.go('purchase-contract-specific-cof');    
                $('.loader-wrapper').show();
                setTimeout(function () {
                    $('.loader-wrapper').hide();
                    self.config.status = "final";
                    self.inputStatus("FINAL-PC");
                    $("#rateISButton").ojButton("option", "disabled", true);
                    $("#loanDetailButton").ojButton("option", "disabled", true);
                    $("#gisButton").ojButton("option", "disabled", true);
                    $("#pwrTermSheetButton").ojButton("option", "disabled", true);
                    $("#cosFormButton").ojButton("option", "disabled", true);
                    $("#cosLetterButton").ojButton("option", "disabled", true);
                    $("#purchContractButton").ojButton("option", "disabled", true);
                    $("#withdrawButton").ojButton("option", "disabled", true);
                    $("#cancelButton").ojButton("option", "disabled", true);
                    $("#contractRemittanceButton").ojButton("option", "disabled", false);
                    
                    self.addAttachments();
                }, 2000);
            };
            
            self.addAttachments = function(){
            console.log("inside add attachments");
                if(firstDataExist){
                    self.observableArray.splice(0, 1);
                    firstDataExist = false;
                }
                self.dateConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                                createConverter(
                                {
                                  pattern : "dd-MMM-yyyy / hh:mm"
                                });
                self.date = ko.observable(dateConverter.format(oj.IntlConverterUtils.dateToLocalIso(new Date(2017, 2, 27))));
                var ni = {'FileName': 'Purchase Contract',
                     'Description': 'Purchase Contract Document',
                     'Type': 'Doc',
                     'Version': '1.0',
                     'Date': self.date()};
                self.observableArray.push(ni);
                ni = {'FileName': 'Installment Schedule',
                     'Description': 'Installment Schedule Doc',
                     'Type': 'PDF',
                     'Version': '1.0',
                     'Date': self.date()}
                self.observableArray.push(ni);
                ni = {'FileName': 'Summary of Mortgage Loans Offered',
                     'Description': 'Summary of Mortgage Loans Offered',
                     'Type': 'Xls',
                     'Version': '1.0',
                     'Date': self.date()}
                self.observableArray.push(ni);
            };
            
            self.validateLoanDetail = function(data, event){
              oj.Router.rootInstance.go('validate-loan-detail');            
            };
            self.redirectToRateISSetup = function(item){
              oj.Router.rootInstance.go('rate-is-setup');
            }
            self.redirectToPWRTermSheet = function(item){
              oj.Router.rootInstance.go('pwr-term-sheet');
            }
            self.commodityDocument = function(){
            };
            self.generateInstallmentSchedule = function(){
                oj.Router.rootInstance.go('installment-schedule');
            };
            
            self.onClickContractRemittance = function(){
                oj.Router.rootInstance.go('contract-remittance-approval');
            };
            self.onClickWithdraw = function(){$("#WithdrawDialog").ojDialog("open");return true;};
            self.onClickCancel = function(){$("#CancelDialog").ojDialog("open");return true;};
            //Withdraw popup dialog buttons
            self.onClickWithdrawConfirm = function(item){
                self.config.status = "temp-withdraw";
                self.inputStatus("TEMP-WITHDRAW");
                $("#pwrTermSheetButton").ojButton("option", "disabled", true);
                $("#cosFormButton").ojButton("option", "disabled", true);
                $("#cosLetterButton").ojButton("option", "disabled", true);
                $("#purchContractButton").ojButton("option", "disabled", true);
                $("#withdrawButton").ojButton("option", "disabled", true);
                $("#cancelButton").ojButton("option", "disabled", true);
                $("#WithdrawDialog").ojDialog("close");
                oj.Router.rootInstance.go('origination-pc');
            };
            self.onClickWithdrawCancel = function(item){
                $("#WithdrawDialog").ojDialog("close");
            };
            
            //Cancel popup dialog buttons
            self.onClickCancelConfirm = function(item){
                self.config.status = "cancelled";
                self.inputStatus("CANCELLED");
                $("#pwrTermSheetButton").ojButton("option", "disabled", true);
                $("#cosFormButton").ojButton("option", "disabled", true);
                $("#cosLetterButton").ojButton("option", "disabled", true);
                $("#purchContractButton").ojButton("option", "disabled", true);
                $("#withdrawButton").ojButton("option", "disabled", true);
                $("#cancelButton").ojButton("option", "disabled", true);
                $("#CancelDialog").ojDialog("close");
                oj.Router.rootInstance.go('origination-pc');
            };
            self.onClickCancelCancel = function(item){
                $("#CancelDialog").ojDialog("close");
            };
            
            self.openFileDialog = function (){
              document.getElementById("browseFile").click();
            }
            
            if(!self.config.status || self.config.status.toUpperCase() == "TEMP-NEW"){
                self.rateISBtn = false;
            }else if(self.config.status.toUpperCase() == "TEMP-RATE"){
                self.rateISBtn = false;
                self.loanDetailBtn = false;
                self.pwrTermSheetBtn = false;
                self.cosFormBtn = false;
                self.cosLetterBtn = false;
                
                self.cagaRate('4.17');
            }else if(self.config.status.toUpperCase() == "TEMP-VALIDATED"){
                self.rateISBtn = false;
                self.loanDetailBtn = false;
                self.pwrTermSheetBtn = false;
                self.cosFormBtn = false;
                self.cosLetterBtn = false;
                self.gisBtn = false;
                
                self.cagaRate('4.17');
                self.intDebitPractice('0');
                self.intDebitPeriod('0');
            }else if(self.config.status.toUpperCase() == "TEMP-VALID-ERROR"){
                self.rateISBtn = false;
                self.loanDetailBtn = false;
                self.cancelBtn = false;
            }else if(self.config.status.toUpperCase() == "TEMP-IS"){
                self.rateISBtn = false;
                self.loanDetailBtn = false;
                self.pwrTermSheetBtn = false;
                self.cosFormBtn = false;
                self.cosLetterBtn = false;
                self.gisBtn = false;
                self.cancelBtn = false;
                self.withdrawBtn = false;
                
                self.cagaRate('4.17');
                self.intDebitPractice('0');
                self.intDebitPeriod('0');
                self.cagaInstallment('433,660.07');
                self.reviewCagaVal('31,860,186.56');
            }else if(self.config.status.toUpperCase() == "FINAL-CR"){
                self.loanDetailBtn = false;
                self.gisBtn = false;
                self.cancelBtn = false;
                self.rateISBtn = false;
            }else if(self.config.status.toUpperCase() == "FINAL-IS"){
                self.pwrTermSheetBtn = false;
                self.rateISBtn = false;
            }else if(self.config.status.toUpperCase() == "TEMP-PWRTS"){
//                if(self.config.loanStatus.toUpperCase() == "VALIDATED"){
//                    self.cosFormBtn = false;
//                }else{
//                    self.loanDetailBtn = false;
//                }
                self.rateISBtn = false;
                self.loanDetailBtn = false;
                self.pwrTermSheetBtn = false;
                self.cosFormBtn = false;
                self.cosLetterBtn = false;
                self.gisBtn = false;
                self.cancelBtn = false;
                self.withdrawBtn = false;
                
                self.cagaRate('4.17');
                self.intDebitPractice('0');
                self.intDebitPeriod('0');
                self.cagaInstallment('433,660.07');
                self.reviewCagaVal('31,860,186.56');
            }else if(self.config.status.toUpperCase() == "TEMP-COSFORM"){
                self.rateISBtn = false;
                self.loanDetailBtn = false;
                self.pwrTermSheetBtn = false;
                self.cosFormBtn = false;
                self.cosLetterBtn = false;
                self.gisBtn = false;
                self.cancelBtn = false;
                self.withdrawBtn = false;
                
                self.cagaRate('4.17');
                self.intDebitPractice('0');
                self.intDebitPeriod('0');
                self.cagaInstallment('433,660.07');
                self.reviewCagaVal('31,860,186.56');
            }else if(self.config.status.toUpperCase() == "TEMP-COSLETTER"){
                self.purchaseContractNo('127/000/2810/159074/TL1/Q/C0-0/0');
                self.puchContractBtn = false;
                self.rateISBtn = false;
                self.loanDetailBtn = false;
                self.pwrTermSheetBtn = false;
                self.cosFormBtn = false;
                self.cosLetterBtn = false;
                self.gisBtn = false;
                self.cancelBtn = false;
                self.withdrawBtn = false;
                
                self.cagaRate('4.17');
                self.intDebitPractice('0');
                self.intDebitPeriod('0');
                self.cagaInstallment('433,660.07');
                self.reviewCagaVal('31,860,186.56');
            }else if(self.config.status.toUpperCase() == "TEMP-WITHDRAW"){
                self.cancelBtn = false;
                self.rateISBtn = false;
            }else if(self.config.status.toUpperCase() == "FINAL-PC"){
                self.purchaseContractNo('127/000/2810/159074/TL1/Q/C0-0/0');
                self.rateISBtn = false;
                self.contractRemittanceBtn = false;
                self.addAttachments();
                
                self.cagaRate('4.17');
                self.intDebitPractice('0');
                self.intDebitPeriod('0');
                self.cagaInstallment('433,660.07');
                self.reviewCagaVal('31,860,186.56');
            }
            self.currentFBB.subscribe(function(newValue){
                if(self.currentFBB){
                    if(self.currentFBB() == "yes"){
                        $("#fbbDate-wrapper").show();
                    }else{
                        $("#fbbDate-wrapper").hide();
                    }
                }
            });
            self.selectedPricingFactor.subscribe(function(newValue){
                if(self.selectedPricingFactor){
                    if(self.selectedPricingFactor() == "OC"){
                        $("#pricingFactorPerc").show();
                    }else{
                        $("#pricingFactorPerc").hide();
                    }
                }
            });
            self.purchaseDate.subscribe(function(newValue) {
                updateReviewDateValue(self);
            });                
            self.tenureYear.subscribe(function() {
                updateReviewDateValue(self);
            });
            self.tenureMonth.subscribe(function() {
                updateReviewDateValue(self);
            });
        }
        return mainModel;
      });