
define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset'],
function(oj, ko, $, configService)
{
     var self = this;
     self.config = configService;

  function viewModel()
  {


   var deptArray = [
    {LoanRefNum: '7014262708600000', BranchCode: '701', BookBalance:'153,000', ForecastedBookBalance:'', MortgageRate:'5.0500', MortgageInstallment: '863', Month:'0.00', InitialPurchaseValue:'', DeferredPurchaseValue:'',CagamasInstallment:'', ReviewDateValue:'',Status:''},
    {LoanRefNum: '7014262708600001', BranchCode: '701', BookBalance:'83,000', ForecastedBookBalance:'', MortgageRate:'4.7500', MortgageInstallment: '1.099', Month:'0.00'},
    {LoanRefNum: '7014262708600002', BranchCode: '701', BookBalance:'12,000', ForecastedBookBalance:'', MortgageRate:'5.1200', MortgageInstallment: '369', Month:'0.00'},
    {LoanRefNum: '7014262708600003', BranchCode: '701', BookBalance:'553,253', ForecastedBookBalance:'', MortgageRate:'5.3500', MortgageInstallment: '1,222', Month:'0.00'},
    {LoanRefNum: '7014262708600004', BranchCode: '701', BookBalance:'123,321', ForecastedBookBalance:'', MortgageRate:'5.5000', MortgageInstallment: '921', Month:'0.00'},
    {LoanRefNum: '7014262708600005', BranchCode: '701', BookBalance:'93,000', ForecastedBookBalance:'', MortgageRate:'5.2000', MortgageInstallment: '2,001', Month:'0.00'}
    ];
    pagingDatasource = ko.observable();
    header="Validate Loan Detail";
    redirectToPC= function(item) {
                    self.config.status = "temp-is";
                    oj.Router.rootInstance.go('origination-pc');
    };
    loadTable=function()
    {
    pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'LoanRefNum'})));
    };
    
  }
  return viewModel;
});
