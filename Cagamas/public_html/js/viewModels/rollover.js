var currencyOptionChangedHandler = function (event, data) {
                    if(data.option=='value'){
                        if (data.value != "MYR") {
                            $('#row_exchangeRate').css('display','flex');
                            $('#row_foreignCurrencyAmount').css('display','flex');
                        }
                        else {
                            $('#row_exchangeRate').hide();
                            $('#row_foreignCurrencyAmount').hide();
                            
                        }
                    }
                };

define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojpagingtabledatasource', 'ojs/ojpagingcontrol'], 
      function(oj, ko, $ )
      {
        var self = this;
        self.inputFileName = ko.observable();
        function mainModel(){
            var self = this;
            self.header = "Rollover";
            self.resetDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.attachmentDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.dateConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                                    createConverter(
                                    {
                                      pattern : "dd-MMM-yyyy"
                                    });
            self.tmpCurrDate = self.dateConverter.format(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.inputPurchContractNum = ko.observable();
            var array = [{CounterpartyName:'CIMB Bank', CurrPurchContractNum:'127/000/2701/179', CurrentReviewDate:'31-01-2022', RepurchaseValue:'300.000.000', CurrentPC:'300.000.000', 
                            NewPurchContractNum:'300/012/2701/179', NewPurchValue:'defaulted', NewPurchDate:'defaulted', NewAmountPayable:'calculated'},
                         {CounterpartyName:'CIMB Islamic', CurrPurchContractNum:'492/002/1304/138', CurrentReviewDate:'30-06-2020', RepurchaseValue:'585.000.000', CurrentPC:'585.000.000', 
                            NewPurchContractNum:'289/002/1304/138', NewPurchValue:'defaulted', NewPurchDate:'defaulted', NewAmountPayable:'calculated'}];
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {idAttribute: 'CounterpartyName'}));
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
                self.datasource(new oj.ArrayTableDataSource(array, {idAttribute: 'CounterpartyName'}));
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
            self.onClickCancel = function(){};
            self.onClickViewDocument = function(item){
                window.open(item.DocPath,'_blank');
                return true;
            };
            
            var CPArray = [
                {CPCode: 'CIMBSD', CPName: 'CIMB Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 3,6,9,12'},
                {CPCode: 'CIMBINV', CPName: 'CIMB Investment Bank BHD', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
                {CPCode: 'CIMBINVSPI', CPName: 'CIMB Investment Bank BHD-SPI', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
                {CPCode: 'CIMBISD', CPName: 'CIMB Islamic Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 2,5,8,11'},
                {CPCode: 'CIMBSD', CPName: 'CIMB Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 3,6,9,12'},
                {CPCode: 'CIMBINV', CPName: 'CIMB Investment Bank BHD', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
                {CPCode: 'CIMBINVSPI', CPName: 'CIMB Investment Bank BHD-SPI', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
                {CPCode: 'CIMBISD', CPName: 'CIMB Islamic Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 2,5,8,11'}
                ];                
            pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray, {idAttribute: 'CPCode'}));
            cpLookUpClick =  function(item) {
                self.selectedCP(item.CPName);
                $("#CPDialog").ojDialog("close");
            };
            self.counterPartyType = [{value : 'CPType1', label : 'Counter Party Type 1'}, {value : 'CPType2', label : 'Counter Party Type 2'}];
            self.selectCurrencyVal = ko.observable('');
            self.openCPPopUp = function(){$("#CPDialog").ojDialog("open");return true;};
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