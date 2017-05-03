define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $ )
      {
        
        function mainModel(){
            var self = this;
            self.header = "Notifications";
            self.startDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.endDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
            createConverter(
            {
              pattern : 'MMM-yy'
            }));
            var array = [{ReviewMonth:'May-2017', Counterparty:'Counterparty A', firstNotif:'Yes', secondNotif:'', thirdNotif:'', FinalLetter:'Yes', FilesReceived:'Yes', DateReceived:'Yes'},
                         {ReviewMonth:'May-2017', Counterparty:'Counterparty B', firstNotif:'Yes', secondNotif:'', thirdNotif:'', FinalLetter:'Yes', FilesReceived:'Yes', DateReceived:'Yes'}];
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {idAttribute: 'ReviewMonth'}));
            var docArray = [{DocumentType:'docx', DocumentName:'Document A', UploadDate:'01-03-2017', DocPath:'doc/Guarantee Notice.docx'},
                            {DocumentType:'xlsx', DocumentName:'Document B', UploadDate:'02-03-2017', DocPath:'doc/Notifications.xlsx'}];
            self.docDatasource = ko.observable(new oj.ArrayTableDataSource(docArray, {idAttribute: 'DocumentType'}));
            
            self.onClickSearch = function(){
                self.datasource(new oj.ArrayTableDataSource(array, {idAttribute: 'ReviewMonth'}));
            };
            self.onClickReset = function(){
                self.startDate(oj.IntlConverterUtils.dateToLocalIso(new Date()));
                self.endDate(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            };
            self.onClickSave = function(){
            };
            self.onClickCancel = function(){
            };
            self.onClickAttachment = function(item){
                $("#AttachmentDialog").ojDialog("open");
                return true;
            };
            self.onClickClose = function(){$("#AttachmentDialog").ojDialog("close");return true;};
            self.onClickViewDocument = function(item){
                window.open(item.DocPath,'_blank');
                return true;
            };
        }
        return mainModel;
      });