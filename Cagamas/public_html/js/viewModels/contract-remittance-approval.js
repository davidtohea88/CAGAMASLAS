define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {


   var deptArray = [
    {InstallmentDate: '', OpeningBalance: '', CagamasRate:'', MortgageInstallment:'', MortgageRate:'', MortgageInstallment: '',  DeferredPurchaseValue:'',CagamasInstallment:'', Principal:'',InterestPayable:'', ClosingBalance:'', Total:''},
    {InstallmentDate: '', OpeningBalance: '', CagamasRate:'', MortgageInstallment:'', MortgageRate:'', MortgageInstallment: '',  DeferredPurchaseValue:'',CagamasInstallment:'', Principal:'',InterestPayable:'', ClosingBalance:'', Total:''},
    {InstallmentDate: '', OpeningBalance: '', CagamasRate:'', MortgageInstallment:'', MortgageRate:'', MortgageInstallment: '',  DeferredPurchaseValue:'',CagamasInstallment:'', Principal:'',InterestPayable:'', ClosingBalance:'', Total:''}
    ];
    header="Payment Memo Approval";
    pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'InstallmentDate'}));
    redirectToPC= function(item) {
      oj.Router.rootInstance.go('origination-pc');
    }
    
  }
  return viewModel;
});
