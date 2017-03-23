define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {


   var deptArray = [
    {Counterparty:'CIMB Niaga', PCNo: '127/000/2810/159074/TL1/Q/C0-0/0',purchaseValue:'32,999,713.11', CagamasRate:'4.17', MortgageRate:'', MortgageInstallment: ' 5,558,652.00',  DeferredPurchaseValue:' 354,731.16',CagamasInstallment:' 5,203,920.84 ', purchaseDate:'23-03-2017', reviewValue:'31,860,186.56', reviewDate:'23-03-2020', Principal:' 1,139,526.55',InterestPayable:' 4,064,394.29 ', ClosingBalance:'', Total:'', source:'Reuters', RepaymentFrequency:'Quarterly',RepaymentType:'Fixed',NoofLoan:'110', Status:''},
    ];
   var deptArray2 = [
    {Counterparty:'CIMB Niaga', PCNo: '127/000/2810/159074/TL1/Q/C0-0/0',purchaseValue:'32,999,713.11', CagamasRate:'4.17', MortgageRate:'', MortgageInstallment: ' 5,558,652.00',  DeferredPurchaseValue:' 354,731.16',CagamasInstallment:' 5,203,920.84 ', purchaseDate:'23-03-2017', reviewValue:'31,860,186.56', reviewDate:'23-03-2020', Principal:' 1,139,526.55',InterestPayable:' 4,064,394.29 ', ClosingBalance:'', Total:'', source:'Reuters', RepaymentFrequency:'Quarterly',RepaymentType:'Fixed',NoofLoan:'110', Status:'Pending Approval'},
    ];
    self.deptArrayObservableArray = ko.observableArray(deptArray);
    self.deptArray2ObservableArray = ko.observableArray(deptArray2);
    self.pagingDatasource = ko.observable(new oj.ArrayTableDataSource([], {}));
    
    header="Contract Remittance Approval";
    self.pagingDatasource(new oj.ArrayTableDataSource(self.deptArrayObservableArray, {idAttribute: 'Counterparty'}));
    redirectToPC= function(item) {
      oj.Router.rootInstance.go('origination-pc');
    }
    onApprove = function(item)
    {
        self.pagingDatasource(new oj.ArrayTableDataSource(self.deptArray2ObservableArray, {idAttribute: 'Counterparty'}));
    
    };
    
  }
  return viewModel;
});
