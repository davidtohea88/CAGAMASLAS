define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {
    openCPPopUp = function(){$("#CPDialog").ojDialog("open");return true;};
    self.DateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
    header="Purchase Contract Specific Final COF";

   var arr = [
    {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', CurrentRateType:'Fixed',FinalCOF:'4.7',Margin:'0.5',Date:'12-09-2017'},
    {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', CurrentRateType:'Floating',FinalCOF:'4.9',Margin:'0.7',Date:'12-09-2016'}
    ];
    self.arrObservableArray = ko.observableArray(arr);
    self.datasource = ko.observable(new oj.ArrayTableDataSource([], {}));

    var arrNew = [
    {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', NewRateType:'Fixed',FinalCOF:'4.7',Margin:'0.5',Date:'12-09-2018',Benchmark:'KLIBOR 3 Months'},
    {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', NewRateType:'Floating',FinalCOF:'4.9',Margin:'0.7',Date:'12-09-2018',Benchmark:'KLIBOR 6 Months'},
    {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', NewRateType:'Floating',FinalCOF:'4.9',Margin:'0.7',Date:'12-09-2018',Benchmark:''}
    ];
    self.ObservableArrayNew = ko.observableArray(arrNew);
    self.pagingDatasourceNew = ko.observable(new oj.ArrayTableDataSource([], {}));

    self.onSearch = function(item){
        self.datasource(new oj.ArrayTableDataSource(self.arrObservableArray, {idAttribute: 'Counterparty'}));
        self.pagingDatasourceNew(new oj.ArrayTableDataSource(self.ObservableArrayNew, {idAttribute: 'Counterparty'}));    
    };
    redirectToPC= function(item) {
      oj.Router.rootInstance.go('origination-pc');
    };
    redirectToSimulations= function(item) {
      oj.Router.rootInstance.go('simulations');
    }
    rateType = [{value : 'fixed', label : 'Fixed'}, {value : 'floating', label : 'Floating'}];
    tenure = [{value : '1', label : '1'}, {value : '2', label : '2'}];
    self.selectedCP = ko.observable();
    cpLookUpClick =  function(item) {
        self.selectedCP(item.CPName);
        $("#CPDialog").ojDialog("close");
    };    
  }
  return viewModel;
});
