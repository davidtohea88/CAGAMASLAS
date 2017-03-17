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
      function(oj, ko, $, configService )
      {
        var self = this;
        
        function mainModel(){
            self.header = "Repurchase Review Date";
            self.pcnolist = ko.observableArray([]);
            self.pcno = ko.observable();
            self.startDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.endDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.selectedCP = ko.observable();
            self.purchContractNum = ko.observable();
            self.selectCurrencyVal = ko.observable();
            self.counterPartyType = [{value : 'CPType1', label : 'Counter Party Type 1'}, {value : 'CPType2', label : 'Counter Party Type 2'}];
            
            var array = [{ReviewDate:'01-02-2017', RepurchaseDate:'01-02-2017', Counterparty:'CIMB Bank Sub Debt', PCNumber:'T-127/000/2701/179074/TL5', AssetType:'', Rollover:'Yes', InstallmentAmount:'1,000,000,000'},
                         {ReviewDate:'02-02-2017', RepurchaseDate:'01-02-2017', Counterparty:'CIMB Bank Sub Debt', PCNumber:'T-127/000/2701/179074/TL5', AssetType:'', Rollover:'No', InstallmentAmount:'500,000,000'}];
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {idAttribute: 'Counterparty'}));
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
            self.pclist = [{value: 'CPT0045', label: 'T-127/000/2701/179074/TL1'},
                {value: 'CPT0004', label: 'T-127/000/2701/179074/TL2'},
                {value: 'CPT0004', label: 'T-127/000/2701/179074/TL3'},
                {value: 'CPT0004', label: 'T-127/000/2701/179074/TL4'},
                {value: 'CPT0004', label: 'T-127/000/2701/179074/TL5'}
            ];
            self.pcnolist = ko.observableArray(self.pclist);    
            cpLookUpClick =  function(item) {
                self.selectedCP(item.CPName);
                $("#CPDialog").ojDialog("close");
            };
           onViewDetail =  function(item) {
                oj.Router.rootInstance.go('repurchase-review-date-detail');
            };                
            self.openCPPopUp = function(){$("#CPDialog").ojDialog("open");return true;};
            self.onClickSearch = function(){
                self.datasource(new oj.ArrayTableDataSource(array, {idAttribute: 'Counterparty'}));
            };
            self.onClickReset = function(){
                self.startDate(oj.IntlConverterUtils.dateToLocalIso(new Date()));
                self.endDate(oj.IntlConverterUtils.dateToLocalIso(new Date()));
                self.selectedCP('');
                self.purchContractNum('');
            };
            self.onClickReconciliation = function(){
                oj.Router.rootInstance.go('reconciliation-user-interface');
            };
            self.onClickUpload = function(){
                oj.Router.rootInstance.go('');
            };
        }
        return mainModel;
      });