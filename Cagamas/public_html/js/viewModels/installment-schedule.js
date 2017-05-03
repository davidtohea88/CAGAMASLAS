define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset'], function (oj, ko, $, configService) {
    var self = this;
    self.config = configService;

    function viewModel() {
        self.purchContractValue = ko.observable('32,999,713.11');
        self.cagamasRate = ko.observable('4,17');
        self.reviewDateValue = ko.observable('31,860,186.56');
        self.defPurchValue = ko.observable('354,731.16');

        var deptArray = [{InstallmentDate : '27/06/2017', OpeningBalance : '32,999,713.11', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '89,638.06', InterestPayable : '344,022.01', ClosingBalance : '32,910,075.05', Total : ''},
                         {InstallmentDate : '27/09/2017', OpeningBalance : '32,910,075.05', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '90,572.54', InterestPayable : '343,087.53', ClosingBalance : '32,819,502.51', Total : ''},
                         {InstallmentDate : '27/12/2017', OpeningBalance : '32,819,502.51', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '91,516.76', InterestPayable : '342,143.31', ClosingBalance : '32,727,985.75', Total : ''},
                         {InstallmentDate : '27/03/2018', OpeningBalance : '32,727,985.75', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '92,470.82', InterestPayable : '341,189.25', ClosingBalance : '32,635,514.93', Total : ''},
                         {InstallmentDate : '27/06/2018', OpeningBalance : '32,635,514.93', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '93,434.83', InterestPayable : '340,225.24', ClosingBalance : '32,542,080.10', Total : ''},
                         {InstallmentDate : '27/09/2018', OpeningBalance : '32,542,080.10', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '94,408.88', InterestPayable : '339,251.19', ClosingBalance : '32,447,671.22', Total : ''},
                         {InstallmentDate : '27/12/2018', OpeningBalance : '32,447,671.22', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '95,393.10', InterestPayable : '338,266.97', ClosingBalance : '32,352,278.12', Total : ''},
                         {InstallmentDate : '27/03/2019', OpeningBalance : '32,352,278.12', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '96,387.57', InterestPayable : '337,272.50', ClosingBalance : '32,255,890.55', Total : ''},
                         {InstallmentDate : '27/06/2019', OpeningBalance : '32,255,890.55', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '97,392.41', InterestPayable : '336,267.66', ClosingBalance : '32,158,498.14', Total : ''},
                         {InstallmentDate : '27/09/2019', OpeningBalance : '32,158,498.14', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '98,407.73', InterestPayable : '335,252.34', ClosingBalance : '32,060,090.41', Total : ''},
                         {InstallmentDate : '27/12/2019', OpeningBalance : '32,060,090.41', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '99,433.63', InterestPayable : '334,226.44', ClosingBalance : '31,960,656.78', Total : ''},
                         {InstallmentDate : '27/03/2020', OpeningBalance : '31,960,656.78', CagamasRate : '4.1700', MortgageInstallment : '463,221.00', DeferredPurchaseValue : '29,560.93', CagamasInstallment : '433,660.07', Principal : '100,470.22', InterestPayable : '333,189.85', ClosingBalance : '31,860,186.56', Total : ''}];
        header = "Installment Schedule";
        pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, 
        {
            idAttribute : 'InstallmentDate'
        }));
        redirectToPC = function (item) {
            self.config.status = "temp-is";
            oj.Router.rootInstance.go('origination-pc');
        }

    }
    return viewModel;
});