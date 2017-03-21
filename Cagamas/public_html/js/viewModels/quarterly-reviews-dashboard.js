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
        'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojpagingcontrol'], 
      function(oj, ko, $ )
      {
        var self = this;
        self.inputFileName1 = ko.observable();
        self.inputFileName2 = ko.observable();
        function mainModel(){
            var self = this;
            self.header = "Notifications";
            self.reviewMonth = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
            createConverter(
            {
              pattern : 'MMM-yy'
            }));
            self.selectedCP = ko.observable();
            
            var array = [{Counterparty:'Counterparty A', ReviewMonth:'3', Status:'UPLOAD'},
                         {Counterparty:'Counterparty B', ReviewMonth:'3', Status:'CAGA1'},
                         {Counterparty:'Counterparty C', ReviewMonth:'3', Status:'CAGA2'},
                         {Counterparty:'Counterparty D', ReviewMonth:'3', Status:'CAGA2'}];
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {idAttribute: 'Counterparty'}));
            var docArray = [{DocumentType:'docx', DocumentName:'Document A', UploadDate:'01-03-2017', DocPath:'doc/Guarantee Notice.docx'},
                            {DocumentType:'xlsx', DocumentName:'Document B', UploadDate:'02-03-2017', DocPath:'doc/Notifications.xlsx'}];
            self.docDatasource = ko.observable(new oj.ArrayTableDataSource([], {idAttribute: 'DocumentType'}));
            
            self.selectCurrencyVal = ko.observable();
            self.counterPartyType = [{value : 'CPType1', label : 'Counter Party Type 1'}, {value : 'CPType2', label : 'Counter Party Type 2'}];
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
                
            self.openCPPopUp = function(){$("#CPDialog").ojDialog("open");return true;};
            
            self.onClickSearch = function(){
                self.datasource(new oj.ArrayTableDataSource(array, {idAttribute: 'ReviewMonth'}));
            };
            self.onClickReset = function(){
                self.reviewMonth(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            };
            self.onClickAttachment = function(item){
                $("#AttachmentDialog").ojDialog("open");
                return true;
            };
            self.onClickClose = function(){$("#AttachmentDialog").ojDialog("close");return true;};
            self.onClickUpload = function(){
                $("#UploadDialog").ojDialog("open");
                return true;
            };
            self.onClickCaga2 = function(){oj.Router.rootInstance.go('quarterly-review-caga-2');};
            self.onClickCaga1 = function(){oj.Router.rootInstance.go('quarterly-review-caga-1');};
            self.onClickGenerate = function(){
                self.docDatasource(new oj.ArrayTableDataSource(docArray, {idAttribute: 'DocumentType'}));
            };
            
            self.onClickBack = function(){
                $("#UploadDialog").ojDialog("close");
                return true;
            }
            self.onClickUploadPU = function(item){
                //set status as UPLOAD
            };
            self.onClickViewDocument = function(item){
                window.open(item.DocPath,'_blank');
                return true;
            };
        }
        
        $("document").ready(function(){
            $("#browseFile1").change(function() {
                var x = document.getElementById("browseFile1").files;
                console.log("browseFile1 changes");
                self.inputFileName1(x[0].name);
            });
            
            $("#browseFile2").change(function() {
                var y = document.getElementById("browseFile2").files;
                self.inputFileName2(y[0].name);
            });
        });
        
        self.openFileDialog = function (){
          document.getElementById("browseFile1").click();
        }
        self.openFileDialog2 = function (){
          document.getElementById("browseFile2").click();
        }
        return mainModel;
      });