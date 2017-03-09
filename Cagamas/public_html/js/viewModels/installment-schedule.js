define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {


   var deptArray = [
    {InstallmentDate: '', OpeningBalance: '', CagamasRate:'', MortgageInstallment:'', MortgageRate:'', MortgageInstallment: '',  DeferredPurchaseValue:'',CagamasInstallment:'', Principal:'',InterestPayable:'', ClosingBalance:'', Total:''}
    ];
    header="Installment Schedule";
    pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'InstallmentDate'}));
    redirectToPC= function(item) {
        history.pushState(null, '', 'index.html?root=origination-pc&status=temp-validated');
        oj.Router.sync();
    }
    
  }
  return viewModel;
});
