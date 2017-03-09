define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $)
      {
        var self = this;
        var urlParams;
        
        //to get url query params on page load
        (window.onpopstate = function () {
            var match,
                pl     = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                query  = window.location.search.substring(1);
        
            urlParams = {};
            while (match = search.exec(query))
               urlParams[decode(match[1])] = decode(match[2]);
            
            console.log(urlParams);
        })(); 
        
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
        self.performOverwrite = [{value : '0', label : 'Please Select'},
                                {value : '1', label : '1'}]
        self.performZeroTest = [{value : '0', label : 'Please Select'},
                                {value : '1', label : '1'}]
        self.documentType = [{value : '0', label : 'Document Type'},
                                {value : 'PDF', label : 'PDF'},
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
        console.log("param : "+urlParams["status"]);
        self.inputStatus = ko.observable(urlParams["status"] ? urlParams["status"].toUpperCase() : 'TEMP-NEW');
        pricingFactorPerc='1';
        
        function mainModel(){
            var self = this;
            self.header = "Purchase Contract";
            var attachmentArray = [{FileName:'...', Description:'...', Type:'...', Version:'...', Date:'...'}];
            datasource = new oj.ArrayTableDataSource(attachmentArray, {idAttribute: 'FileName'});
            
            self.buttonClick = function(data, event){
            }
            
            self.cosForm = function(data, event){
              oj.Router.rootInstance.go('cos-form');            
            };
            self.cosLetter = function(data, event){
              oj.Router.rootInstance.go('cos-letter');            
            };
            self.purchaseContract = function(data, event){
              oj.Router.rootInstance.go('purchase-contract-specific-cof');            
            };
            self.rateAndIsSetup = function(data, event){
              oj.Router.rootInstance.go('validate-loan-detail');            
            };
            self.redirectToRateISSetup = function(item){
              oj.Router.rootInstance.go('rate-is-setup');
            }
            self.redirectToPWRTermSheet = function(item){
              oj.Router.rootInstance.go('pwr-term-sheet');
            }
            
            self.onClickContractRemittance = function(){$("#WithdrawDialog").ojDialog("open");return true;};
            self.onClickWithdraw = function(){$("#WithdrawDialog").ojDialog("open");return true;};
            self.onClickCancel = function(){$("#CancelDialog").ojDialog("open");return true;};
            //Withdraw popup dialog buttons
            self.onClickWithdrawConfirm = function(item){
                window.location = location.href.replace("status="+urlParams["status"], "status=temp-withdraw")
                $("#puchContractButton").ojButton("option", "disabled", true);
                $("#WithdrawDialog").ojDialog("close");
            };
            self.onClickWithdrawCancel = function(item){
                $("#WithdrawDialog").ojDialog("close");
            };
            
            //Cancel popup dialog buttons
            self.onClickCancelConfirm = function(item){
                window.location = location.href.replace("status="+urlParams["status"], "status=cancelled")
                $("#puchContractButton").ojButton("option", "disabled", true);
                $("#CancelDialog").ojDialog("close");
            };
            self.onClickCancelCancel = function(item){
                $("#CancelDialog").ojDialog("close");
            };
            
            
        }
        
        $( document ).ready(function() {
            console.log( "ready!" );
            //Disable/enable button
            if(!urlParams["status"]){
            }else if(urlParams["status"].toUpperCase() == "TEMP-NEW"){
                $("#loanDetailButton").ojButton("option", "disabled", false);
            }else if(urlParams["status"].toUpperCase() == "TEMP-VALIDATED"){
                $("#loanDetailButton").ojButton("option", "disabled", false);
                $("#gisButton").ojButton("option", "disabled", false);
            }else if(urlParams["status"].toUpperCase() == "TEMP-IS"){
                $("#rateISButton").ojButton("option", "disabled", true);
                $("#pwrTermSheetButton").ojButton("option", "disabled", false);
            }else if(urlParams["status"].toUpperCase() == "TEMP-PWRTS"){
                $("#rateISButton").ojButton("option", "disabled", true);
                $("#pwrTermSheetButton").ojButton("option", "disabled", false);
                $("#cosFormButton").ojButton("option", "disabled", false);
                
                if(urlParams["form"])
                    if(urlParams["form"] == 1){
                        console.log("form = 1");
                        $("#cosLetterButton").ojButton("option", "disabled", false);
                    }

                if(urlParams["letter"])
                    if(urlParams["letter"] == 1){
                        $("#puchContractButton").ojButton("option", "disabled", false);
                        $("#withdrawButton").ojButton("option", "disabled", false);
                        $("#cancelButton").ojButton("option", "disabled", false);
                    }
            }else if(urlParams["status"].toUpperCase() == "TEMP-WITHDRAW"){
                console.log(self.inputStatus());self.inputStatus = 'TEMP-WITHDRAW';console.log(self.inputStatus);
                $("#rateISButton").ojButton("option", "disabled", true);
                $("#pwrTermSheetButton").ojButton("option", "disabled", false);
                $("#cosFormButton").ojButton("option", "disabled", false);
                $("#cosLetterButton").ojButton("option", "disabled", false);
                $("#withdrawButton").ojButton("option", "disabled", false);
                $("#cancelButton").ojButton("option", "disabled", false);
            }else if(urlParams["status"].toUpperCase() == "CANCELLED"){
                $("#rateISButton").ojButton("option", "disabled", true);
                $("#pwrTermSheetButton").ojButton("option", "disabled", false);
                $("#cosFormButton").ojButton("option", "disabled", false);
                $("#cosLetterButton").ojButton("option", "disabled", false);
                $("#withdrawButton").ojButton("option", "disabled", false);
                $("#cancelButton").ojButton("option", "disabled", false);
            }else if(urlParams["status"].toUpperCase() == "FINAL"){
                $("#rateISButton").ojButton("option", "disabled", true);
                $("#pwrTermSheetButton").ojButton("option", "disabled", false);
                $("#cosFormButton").ojButton("option", "disabled", false);
                $("#cosLetterButton").ojButton("option", "disabled", false);
                $("#contractRemittanceButton").ojButton("option", "disabled", false);
                $("#withdrawButton").ojButton("option", "disabled", false);
                $("#cancelButton").ojButton("option", "disabled", false);
            }
        });
        return mainModel;
      });