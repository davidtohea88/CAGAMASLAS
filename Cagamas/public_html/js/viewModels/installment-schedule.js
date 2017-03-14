define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset'],
function(oj, ko, $,configService)
{
               var self = this;
            self.config = configService;
  function viewModel()
  {


   var deptArray = [
    {InstallmentDate: '', OpeningBalance: '', CagamasRate:'', MortgageInstallment:'', MortgageRate:'', MortgageInstallment: '',  DeferredPurchaseValue:'',CagamasInstallment:'', Principal:'',InterestPayable:'', ClosingBalance:'', Total:''}
    ];
    header="Installment Schedule";
    pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'InstallmentDate'}));
    redirectToPC= function(item) {
         self.config.status = "temp-is";
         oj.Router.rootInstance.go('origination-pc');
    }
    
  }
  return viewModel;
});
