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

define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojpagingcontrol'], 
      function(oj, ko, $, configService)
      {
        var self = this;
        self.inputFileName1 = ko.observable();
        self.inputFileName2 = ko.observable();
        function mainModel(){
            var self = this;
            self.config = configService;
            self.header = "Notifications";
            self.tmpCounterparty = ko.observable();
            self.tmpReviewMonth = ko.observable();
            self.reviewMonth = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
            createConverter(
            {
              pattern : 'MMM-yy'
            }));
            self.selectedCP = ko.observable();
            var array = [{Counterparty:'Maybank Berhad', ReviewMonth:'3', Status: self.config.status.toUpperCase() == 'UPLOAD' ? self.config.status.toUpperCase() : self.config.status.toUpperCase() == 'CAGA1' ? self.config.status.toUpperCase() : self.config.status.toUpperCase() == 'CAGA2' ? self.config.status.toUpperCase() : "NEW"},
                         {Counterparty:'RHB Bank Berhad', ReviewMonth:'3', Status:'CAGA1'},
                         {Counterparty:'Am Bank Berhad', ReviewMonth:'3', Status:'CAGA2'}];
            self.observableArray = ko.observableArray(array);
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {idAttribute: 'Counterparty'}));
            var docArray = [{DocumentType:'Summary of Loans', DocumentName:'Summary of Loans', UploadDate:'24-03-2017', DocPath:'doc/Summary of Loans.pdf'},
{DocumentType:'Notification Letter', DocumentName:'Notification Letter', UploadDate:'24-03-2017', DocPath:'doc/Summary of Loans.pdf'},
{DocumentType:'Summary of Loans Repurchased', DocumentName:'Summary of Loans Repurchased', UploadDate:'24-03-2017', DocPath:'doc/Summary of Loans Repurchased.pdf'},
{DocumentType:'Partial Prepayment and Defective Listing', DocumentName:'Partial Prepayment and Defective Listing', UploadDate:'24-03-2017', DocPath:'doc/Partial Prepayment and Defective Listing.pdf'}];
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
                self.datasource(new oj.ArrayTableDataSource(self.observableArray, {idAttribute: 'Counterparty'}));
            };
            self.onClickReset = function(){
                self.reviewMonth(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            };
            self.onClickAttachment = function(item){
                $("#AttachmentDialog").ojDialog("open");
                return true;
            };
            self.onClickClose = function(){$("#AttachmentDialog").ojDialog("close");return true;};
            self.onClickUpload = function(item){
                self.tmpCounterparty(item.Counterparty);
                self.tmpReviewMonth(item.ReviewMonth);
                $("#UploadDialog").ojDialog("open");
                return true;
            };
            self.onClickCaga2 = function(){oj.Router.rootInstance.go('quarterly-review-caga-2');};
            self.onClickCaga1 = function(){oj.Router.rootInstance.go('quarterly-review-caga-1');};
            self.onClickGenerate = function(item){
                var currentRow = $('#qrdtable').ojTable('option', 'currentRow');
                if (currentRow != null)
                {
                    self.observableArray.splice(currentRow['rowIndex'], 1, {
                         'Counterparty': item.Counterparty,
                         'ReviewMonth': item.ReviewMonth,
                         'Status': 'GENERATED'
                      });
                }
                self.config.status = "GENERATED";
                self.docDatasource(new oj.ArrayTableDataSource(docArray, {idAttribute: 'DocumentType'}));
            };
            
            self.onClickBack = function(){
                $("#UploadDialog").ojDialog("close");
                return true;
            }
            self.onClickUploadPU = function(item){
                var currentRow = $('#qrdtable').ojTable('option', 'currentRow');
                if (currentRow != null)
                {
                    self.observableArray.splice(currentRow['rowIndex'], 1, {
                         'Counterparty': self.tmpCounterparty(),
                         'ReviewMonth': self.tmpReviewMonth(),
                         'Status': 'UPLOAD'
                      });
                }
                self.config.status = "UPLOAD";
                $("#UploadDialog").ojDialog("close");
            };
            self.onClickViewDocument = function(item){
                window.open(item.DocPath,'_blank');
                return true;
            };
        }
        
        $("document").ready(function(){
            $("#browseFile1").change(function() {
                var x = document.getElementById("browseFile1").files;
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