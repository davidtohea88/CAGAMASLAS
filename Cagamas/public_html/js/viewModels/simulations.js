define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $)
      {
        var self = this;
        self.datasource=ko.observable(new oj.ArrayTableDataSource([], {}));
        
        //Hardcoded value
        self.simulationName = ko.observable();
        self.tenureYear = ko.observable('1');
        self.tenureMonth = ko.observable('0');
        self.interestRate = ko.observable('0');
        self.purchaseDate= ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.reviewDate= ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.purcContractValue = ko.observable();
        self.cagamasRate = ko.observable();
        self.reviewDateValue = ko.observable();
        
        self.paymentType = [{value : 'PI', label : 'Principal + Interest'},
                            {value : '0', label : '0'}]
        self.rateType = [{value : 'Fixed', label : 'Fixed'},
                        {value : 'Convertible', label : 'Convertible'}]
                        
        function mainModel(){
            var self = this;
            self.header = "Simulations";
            var attachmentArray = [
            ];
            datasource = new oj.ArrayTableDataSource(attachmentArray, {idAttribute: 'InstallmentDate'});
            
            var simulateArr = [
            {Date:'01-01-2017',OpeningBalance:'360,000',CagamasRate:'3.1',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'330,000',Totals:'31,000'},
            {Date:'01-02-2017',OpeningBalance:'330,000',CagamasRate:'3.1',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'300,000',Totals:'31,000'},
            {Date:'01-03-2017',OpeningBalance:'300,000',CagamasRate:'3.1',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'270,000',Totals:'31,000'},
            {Date:'01-04-2017',OpeningBalance:'270,000',CagamasRate:'3.2',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'240,000',Totals:'31,000'},
            {Date:'01-05-2017',OpeningBalance:'240,000',CagamasRate:'3.3',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'210,000',Totals:'31,000'},
            {Date:'01-06-2017',OpeningBalance:'210,000',CagamasRate:'3.3',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'180,000',Totals:'31,000'},
            {Date:'01-07-2017',OpeningBalance:'180,000',CagamasRate:'3.5',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'150,000',Totals:'31,000'},
            {Date:'01-08-2017',OpeningBalance:'150,000',CagamasRate:'4.0',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'120,000',Totals:'31,000'},
            {Date:'01-09-2017',OpeningBalance:'120,000',CagamasRate:'3.7',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'90,000',Totals:'31,000'},
            {Date:'01-10-2017',OpeningBalance:'90,000',CagamasRate:'3.8',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'60,000',Totals:'31,000'},
            {Date:'01-11-2017',OpeningBalance:'60,000',CagamasRate:'3.8',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'30,000',Totals:'31,000'},
            {Date:'01-12-2017',OpeningBalance:'30,000',CagamasRate:'4.0',MortgageInstallment:'30,000',DeferredPurchaseValue:'1,000',CagamasInstallment:'1,000',Principal:'1.0',InterestPayable:'5',ClosingBalance:'0',Totals:'31,000'}
            ];
            self.simObservableArray = ko.observableArray(simulateArr);
            self.pagingDatasource = ko.observable(new oj.ArrayTableDataSource([], {}));
            

            self.onSimulate = function(item){
                self.pagingDatasource(new oj.ArrayTableDataSource(self.simObservableArray, {idAttribute: 'Date'}));    
            };
            self.onClickSave = function(item){};
            self.onClickExport = function(item){};
            self.onClickBack = function(item){};
            self.openSNPopUp = function(){$("#SNDialog").ojDialog("open");return true;};
        }
        
        return mainModel;
      });