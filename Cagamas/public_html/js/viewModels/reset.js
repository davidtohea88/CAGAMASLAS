define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $ )
      {
        var self = this;
        self.inputFileName = ko.observable();
        function mainModel(){
            var self = this;
            self.header = "Reset";
            self.resetDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.attachmentDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.dateConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                                    createConverter(
                                    {
                                      pattern : "dd-MMM-yyyy"
                                    });
            self.tmpCurrDate = self.dateConverter.format(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            var array = [{PurchContractNum:'189/001/2101/38914/TL', CounterpartyName:'OCBC Niaga', ResetDate:'01-03-2017', ReviewDate:'01-03-2017', PurchValue:'540.000.000', 
                            NewCagamasRate:'0.35', NewBenchmarkRate:'02-03-2017', Margin:'0', FirstResetDate:'28-02-2017', NextResetDate:'07-03-2017', Status:'Status1'}];
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {idAttribute: 'PurchContractNum'}));
            var docArray = [{DocumentType:'docx', DocumentName:'Document A', UploadDate:'01-Mar-2017', DocPath:'doc/Guarantee Notice.docx'},
                            {DocumentType:'xlsx', DocumentName:'Document B', UploadDate:'02-Mar-2017', DocPath:'doc/Notifications.xlsx'}];
            self.docObservableArray = ko.observableArray(docArray);
            self.docDatasource = ko.observable(new oj.ArrayTableDataSource(self.docObservableArray, {idAttribute: 'DocumentType'}));
            self.documentType = [{value : 'PDF', label : 'PDF'},
                                {value : 'Doc', label : 'DOC/DOCX'}]
            self.selectedDocType = ko.observable('');
            self.onClickUpload = function(){
                console.log(self.selectedDocType());
                var doc = {'DocumentType': self.selectedDocType(),
                         'DocumentName': inputFileName(),
                         'UploadDate': self.tmpCurrDate,
                         'DocPath': ''};
                self.docObservableArray.push(doc);
            }
            self.onClickSearch = function(){
                self.datasource(new oj.ArrayTableDataSource(array, {idAttribute: 'PurchContractNum'}));
            };
            self.onClickReset = function(){
                self.resetDate(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            };
            self.onClickAttachment = function(item){
                $("#AttachmentDialog").ojDialog("open");
                return true;
            };
            self.onClickClose = function(){$("#AttachmentDialog").ojDialog("close");return true;};
            
            self.onClickGenerate = function(){};
            self.onClickViewDocument = function(item){
                window.open(item.DocPath,'_blank');
                return true;
            };
        }
        self.openFileDialog = function (){
          document.getElementById("browseFile").click();
        }
        
        $("document").ready(function(){
            $("#browseFile").change(function() {
                var x = document.getElementById("browseFile").files;
                self.inputFileName(x[0].name);
            });
        });
        
        return mainModel;
      });