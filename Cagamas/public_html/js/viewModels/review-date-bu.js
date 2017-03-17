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
        function mainModel(){
            var self = this;
            self.header = "Review Date BU";
            self.rollover = [{value : 'Yes', label : 'Yes'},
                            {value : 'No', label : 'No'}];
            self.startDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.endDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            
            self.attachmentDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.dateConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                                    createConverter(
                                    {
                                      pattern : "dd-MMM-yyyy"
                                    });
            self.inputPurchContractNum = ko.observable();
            var array = [{CounterpartyName:'CIMB Bank', CounterpartyType:'127/000/2701/179', PurchContractNum:'31-01-2022', AssetType:'300.000.000', ReviewDate:'300.000.000', 
                            OutstandingBalance:'300/012/2701/179', Tenure:'defaulted', IndicativeCagarate:'defaulted', Rollover:''},
                         {CounterpartyName:'CIMB Bank1', CounterpartyType:'127/000/2701/179', PurchContractNum:'31-01-2022', AssetType:'300.000.000', ReviewDate:'300.000.000', 
                            OutstandingBalance:'300/012/2701/179', Tenure:'defaulted', IndicativeCagarate:'defaulted', Rollover:''}];
            self.observableArray = ko.observableArray(array);
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {idAttribute: 'CounterpartyName'}));
            
            self.selectedRollover = ko.observable('');
            self.onClickSearch = function(){
                self.datasource(new oj.ArrayTableDataSource(self.observableArray, {idAttribute: 'CounterpartyName'}));
            };
            self.onClickReset = function(){
                self.startDate(oj.IntlConverterUtils.dateToLocalIso(new Date()));
                self.endDate(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            };
            
            self.onClickAction = function(){$("#ICRDialog").ojDialog("open");return true;};
            self.onClickCalculate = function(){};
            self.onClickSave = function(){$("#ICRDialog").ojDialog("close");return true;};
            self.onClickApprove = function(){$("#ICRDialog").ojDialog("close");return true;};
            
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
        
        return mainModel;
      });