define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $,configService)
{
     var self = this;
            self.config = configService;

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
    self.pcs = [{value: '127/000/2810/159074/TL1/Q/C0-0/0', label: '127/000/2810/159074/TL1/Q/C0-0/0'},
        {value: '127/000/2810/159074/TL1/Q/C0-0/0', label: '127/000/2810/159074/TL1/Q/C0-0/0'}
    ];
    self.pc = ko.observableArray([]);


  function viewModel()
  {
    self.cp = ko.observableArray(self.cps);
    self.pc = ko.observableArray(self.pcs);
   openCPPopUp = function(){$("#CPDialog").ojDialog("open");return true;};
   self.DateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
   self.deptArray = ko.observableArray([{cp: 'CIMB Bank', pc: '127/000/2810/159074/TL1/Q/C0-0/0', date:'24-03-2017', type:'Fixed',
    bch:'',bchsrc:'',status:'Saved',cof:'4.17'}]);
   

    header="Purchase Contract Specific COF";
    self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.deptArray, {idAttribute: 'cp'}));
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
    {Date:  '1/2/2017'}
    ];                
//    pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray, {idAttribute: 'Date'}));
    cpLookUpClick =  function(item) {
        self.selectedCP(item.CPName);
        $("#CPDialog").ojDialog("close");
    };    
        redirectToPC= function(item) {
            self.config.status = "final";
            self.deptArray([
            {cp: 'CIMB Bank', pc: '127/000/2810/159074/TL1/Q/C0-0/0', date:'24-03-2017', type:'Fixed',
            bch:'',bchsrc:'',status:'Pending Approval',cof:'4.17'}
            ]);
//            oj.Router.rootInstance.go('origination-pc');
};

  }
  return viewModel;
});
