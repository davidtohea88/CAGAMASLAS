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
            var array = [{ReviewMonth:'Mar-2017', Counterparty:'Maybank Berhad', firstNotif:'Yes', secondNotif:'', thirdNotif:'', FinalLetter:'Yes', FilesReceived:'Yes', DateReceived:'Yes'},
                         {ReviewMonth:'Mar-2017', Counterparty:'RHB Bank Berhad', firstNotif:'Yes', secondNotif:'', thirdNotif:'', FinalLetter:'Yes', FilesReceived:'Yes', DateReceived:'Yes'}];
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {idAttribute: 'ReviewMonth'}));
            var docArray = [{DocumentType:'Caga 1', DocumentName:'Review For Quarter / Month Ended January 2016', UploadDate:'10-03-2017', DocPath:'doc/caga1.xlsx'},
                            {DocumentType:'Caga 2', DocumentName:'Recommended Partial Prepayment Remittance Report', UploadDate:'10-03-2017', DocPath:'doc/caga2.xlsx'}];
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