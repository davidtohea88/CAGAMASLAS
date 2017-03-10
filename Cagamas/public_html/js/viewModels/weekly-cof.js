define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $, configService)
{
     var self = this;
  function viewModel()
  {

   openCPPopUp = function(){$("#CPDialog").ojDialog("open");return true;};
   self.DateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));

   var deptArray = [
    {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', PCInstallmentSchedule:'IS', Simulation:'View'},
    {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', PCInstallmentSchedule:'IS', Simulation:'Create'},
    ];
    header="Weekly COF";
    pagingDatasourceIS = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'Counterparty'}));
    redirectToPC= function(item) {
      oj.Router.rootInstance.go('origination-pc');
    }
        redirectToSimulations= function(item) {
      oj.Router.rootInstance.go('simulations');
    }
                rateType = [{value : 'fixed', label : 'Fixed'}, {value : 'floating', label : 'Floating'}];
                tenure = [{value : '1', label : '1'}, {value : '2', label : '2'}];
                self.selectedCP = ko.observable();
                var CPArray = [
                {Date:  '1/2/2017'},
                {Date:  '3/2/2017'},
                {Date:  '5/2/2017'},
                {Date:  '6/2/2017'}
                ];                
                pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray, {idAttribute: 'Date'}));
                cpLookUpClick =  function(item) {
                    self.selectedCP(item.CPName);
                    $("#CPDialog").ojDialog("close");
                };    
  }
  return viewModel;
});
