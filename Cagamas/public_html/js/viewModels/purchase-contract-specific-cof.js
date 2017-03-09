define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $)
{
     var self = this;
    self.cps = [{value: 'CPT0045', label: 'CIMB Bank Berhad'},
        {value: 'CPT0004', label: 'Affin Bank Berhad'},
        {value: 'CPT0009', label: 'Alliance Bank Malaysia Berhad'},
        {value: 'CPT0013', label: 'Al-Rajhi Banking and Inv. Corp Malaysia Berhad'},
        {value: 'CPT0014', label: 'AmBank Malaysia Berhad'},
        {value: 'CPT0018', label: 'AMMB Holdings Berhad'},
        {value: 'CPT0021', label: 'Asian Development Bank'},
        {value: 'CPT0024', label: 'Bangkok Bank Malaysia Berhad'},
        {value: 'CPT0025', label: 'Bank Islam Malaysia Berhad'},
        {value: 'CPT0026', label: 'Bank Kerjasama Rakyat Malaysia Berhad'}
    ];
    self.cp = ko.observableArray([]);
    self.pcs = [{value: '130/MGPFI/012017/001', label: '130/MGPFI/012017/001'},
        {value: '130/MGPFI/012017/002', label: '130/MGPFI/012017/002'},
        {value: '130/MGPFI/012017/003', label: '130/MGPFI/012017/003'},
        {value: '130/MGPFI/012017/004', label: '130/MGPFI/012017/004'},
        {value: '130/MGPFI/012017/005', label: '130/MGPFI/012017/005'},
        {value: '130/MGPFI/012017/006', label: '130/MGPFI/012017/006'},
        {value: '130/MGPFI/012017/007', label: '130/MGPFI/012017/007'}
    ];
    self.pc = ko.observableArray([]);


  function viewModel()
  {
    self.cp = ko.observableArray(self.cps);
    self.pc = ko.observableArray(self.pcs);
   openCPPopUp = function(){$("#CPDialog").ojDialog("open");return true;};
   self.DateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));

   var deptArray = [
    {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', PCInstallmentSchedule:'IS', Simulation:'View'},
    {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', PCInstallmentSchedule:'IS', Simulation:'Create'},
    ];
    header="Purchase Contract Specific COF";
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
        redirectToPC= function(item) {
        history.pushState(null, '', 'index.html?root=origination-pc&status=final');
        oj.Router.sync();
};

  }
  return viewModel;
});
