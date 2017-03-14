define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $, configService)
      {
      
        var self = this;
        self.config = configService;
        
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
                            {value : '0', label : '0'}]
        self.paymentType = [{value : 'PI', label : 'Principal + Interest'},
                            {value : '0', label : '0'}]
        self.rateType = [{value : 'Fixed', label : 'Fixed'},
                        {value : '0', label : '0'}]
        self.paymentFrequency = [{value : 'Monthly', label : 'Monthly'},
                                {value : 'Yearly', label : 'Yearly'}]
        self.purchaseConsiderationType = [{value : 'CASH', label : 'CASH'},
                                        {value : '0', label : '0'}]
        self.pricingFactor = [{value : 'OC', label : 'Over Collateralization'},
                            {value : '0', label : '0'}]
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
        self.purchaseContractNo = 'T-127/000/2701/179074/TL1';
        self.purchaseAmount= ko.observable('300.000.000');
        
        self.purchaseValue = purchaseAmount;
        self.purchaseDate= ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.tenureYear= ko.observable('1');
        self.tenureMonth= ko.observable('1');
        self.reviewDate= ko.observable(purchaseDate());
        self.pricingFactorPerc=ko.observable();
        pricingFactorPerc='1';
        self.selectedDocType = ko.observable();
        
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
        
        function mainModel(){
            self.header = "Purchase Contract";
            self.filename = ko.observable();
            self.desc = ko.observable();
            self.type = ko.observable();
            self.version = ko.observable();
            self.date = ko.observable();
            self.inputStatus = ko.observable(self.config.status ? self.config.status.toUpperCase() : 'TEMP-NEW');
            
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
                    self.config.status = "temp-final";
                    self.inputStatus("TEMP-FINAL");
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
                }, 2000);
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
            
            if(!self.config.status){
                self.rateISBtn = false;
            }else if(self.config.status.toUpperCase() == "TEMP-NEW"){
                self.rateISBtn = false;
                self.loanDetailBtn = false;
            }else if(self.config.status.toUpperCase() == "TEMP-VALIDATED"){
                self.loanDetailBtn = false;
                self.gisBtn = false;
            }else if(self.config.status.toUpperCase() == "TEMP-IS"){
                self.pwrTermSheetBtn = false;
            }else if(self.config.status.toUpperCase() == "TEMP-PWRTS"){
                self.pwrTermSheetBtn = false;
                self.cosFormBtn = false;
                
                if(self.config.form)
                    if(self.config.form == 1){
                        self.cosLetterBtn = false;
                    }

                if(self.config.letter)
                    if(self.config.letter == 1){
                        self.puchContractBtn = false;
                        self.withdrawBtn = false;
                        self.cancelBtn = false;
                    }
            }else if(self.config.status.toUpperCase() == "FINAL"){
                self.contractRemittanceBtn = false;
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
        }
        return mainModel;
      });