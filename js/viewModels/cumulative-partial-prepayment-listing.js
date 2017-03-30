define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset','ojs/ojselectcombobox'],
function(oj, ko, $,configService)
{
    var self = this;
    self.config = configService;
    self.pcnolist = ko.observableArray([]);
    self.pcno = ko.observable();
    self.eitags = ko.observableArray([]);
    self.eiName = ko.observable();
    self.EIs = [{value: 'CPT0045', label: 'CIMB Bank Berhad'},
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
    self.pclist = [{value: 'CPT0045', label: 'T-127/000/2701/179074/TL1'},
                {value: 'CPT0004', label: 'T-127/000/2701/179074/TL2'},
                {value: 'CPT0004', label: 'T-127/000/2701/179074/TL3'},
                {value: 'CPT0004', label: 'T-127/000/2701/179074/TL4'},
                {value: 'CPT0004', label: 'T-127/000/2701/179074/TL5'}
            ];
  function viewModel()
  {
    self.header="Cumulative Partial Prepayment Listing";
    self.eitags = ko.observableArray(self.EIs);
    self.pcnolist = ko.observableArray(self.pclist);    
    var openTrx = [
    {RentasCPName: '', RentasTrxDate:'', RentasTrxAmount:'', Currency:'', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'', selected:'', checkdisabled:false},
    {RentasCPName: '', RentasTrxDate:'', RentasTrxAmount:'', Currency:'', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'', selected:'', checkdisabled:false},
    ];
    self.openTrxObservableArray = ko.observableArray(openTrx);
    self.datasourceOpenTrx = ko.observable(new oj.ArrayTableDataSource(self.openTrxObservableArray, {idAttribute: 'RentasCPName'}));

  }
  return viewModel;
});
