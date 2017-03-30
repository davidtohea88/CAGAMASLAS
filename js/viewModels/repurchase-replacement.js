define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 
'ojs/ojknockout', 'ojs/ojdialog','ojs/ojtable','ojs/ojdatetimepicker', 
'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset','ojs/ojselectcombobox'],
function(oj, ko, $,configService)
{

  function viewModel()
  {
    var self = this;
    self.config = configService;
    self.pcnolist = ko.observableArray([]);
    self.pcno = ko.observable();
    self.eitags = ko.observableArray([]);
    self.eiName = ko.observable();
    self.selectedDocType = ko.observable();

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
            ];    self.header="Repurchase/Replacement";
    self.eitags = ko.observableArray(self.EIs);
    self.pcnolist = ko.observableArray(self.pclist);    
    var openTrx = [
    {PCNumber: '0001', RepurchaseAmount:'300,000,000', RepurchaseDate:'01-03-2017', Status:'A'},
    {PCNumber: '0002', RepurchaseAmount:'400,000,000', RepurchaseDate:'01-04-2017', Status:'B'},
    {PCNumber: '0003', RepurchaseAmount:'500,000,000', RepurchaseDate:'01-05-2017', Status:'C'}
    ];
    self.openTrxObservableArray = ko.observableArray(openTrx);
    self.datasourceOpenTrx = ko.observable(new oj.ArrayTableDataSource(self.openTrxObservableArray, {idAttribute: 'PCNumber'}));
    var docArray = [{DocumentType:'docx', DocumentName:'Document A', UploadDate:'01-03-2017', DocPath:'doc/readme.txt'},
                    {DocumentType:'xlsx', DocumentName:'Document B', UploadDate:'02-03-2017', DocPath:'doc/readme.txt'}];
    self.docDatasource = ko.observable(new oj.ArrayTableDataSource(docArray, {idAttribute: 'DocumentType'}));
    self.documentType = [{value : 'PDF', label : 'PDF'},{value : 'Doc', label : 'DOC/DOCX'}]


    onClickClose = function(){$("#AttachmentDialog").ojDialog("close");return true;};
    self.onUpload = function(item){
                  oj.Router.rootInstance.go('rr-upload-ui');
    };
    self.onGenerate = function(item){};
    self.onClickAttachment = function(item){
                $("#AttachmentDialog").ojDialog("open");
                return true;
            };
    self.onClickViewDocument = function(item){
        window.open(item.DocPath,'_blank');
        return true;
    };
  }
  return viewModel;
});
