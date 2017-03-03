    var redirectToPI = function(item) {
        history.pushState(null, '', 'index.html?root=origination-pi-2' );
        oj.Router.sync();
    };


define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {


   var deptArray = [
    {LoanRefNum: '7014262708600000', BranchCode: '701', BookBalance:'153,000', ForecastedBookBalance:'', MortgageRate:'5.0500', MortgageInstallment: '863', Month:'0.00'},
    {LoanRefNum: '7014262708600001', BranchCode: '701', BookBalance:'83,000', ForecastedBookBalance:'', MortgageRate:'4.7500', MortgageInstallment: '1.099', Month:'0.00'},
    {LoanRefNum: '7014262708600002', BranchCode: '701', BookBalance:'12,000', ForecastedBookBalance:'', MortgageRate:'5.1200', MortgageInstallment: '369', Month:'0.00'},
    {LoanRefNum: '7014262708600003', BranchCode: '701', BookBalance:'553,253', ForecastedBookBalance:'', MortgageRate:'5.3500', MortgageInstallment: '1,222', Month:'0.00'},
    {LoanRefNum: '7014262708600004', BranchCode: '701', BookBalance:'123,321', ForecastedBookBalance:'', MortgageRate:'5.5000', MortgageInstallment: '921', Month:'0.00'},
    {LoanRefNum: '7014262708600005', BranchCode: '701', BookBalance:'93,000', ForecastedBookBalance:'', MortgageRate:'5.2000', MortgageInstallment: '2,001', Month:'0.00'}
    ];
    header="Upload Loan Detail";
    pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'LoanRefNum'}));
    
  }
  return viewModel;
});
