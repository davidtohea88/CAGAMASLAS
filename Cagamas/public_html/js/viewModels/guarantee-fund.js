define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojinputnumber', 'ojs/ojarraytabledatasource'], 
      function(oj, ko, $)
      {
        function mainModel(){
            var self = this;
            var currentRow = '';
            self.header = "Monthly Cost and Fund";
            self.subHeader = "Guarantee Fund";
            self.months = [{value : '0', label : 'Month'},
                        {value : '1', label : 'January'},
                        {value : '2', label : 'February'},
                        {value : '3', label : 'March'},
                        {value : '4', label : 'April'},
                        {value : '5', label : 'May'},
                        {value : '6', label : 'June'},
                        {value : '7', label : 'July'},
                        {value : '8', label : 'August'},
                        {value : '9', label : 'September'},
                        {value : '10', label : 'October'},
                        {value : '11', label : 'November'},
                        {value : '12', label : 'December'}];
            self.years = [{value : '0', label : 'Year'},
                        {value : '2015', label : '2015'},
                        {value : '2016', label : '2016'},
                        {value : '2017', label : '2017'}];
            self.selectedMonth = ko.observable('0');
            self.selectedYear = ko.observable('0');
            var gfArray = [{Month:'February', Year:'2017', InitialGuaranteeFund:'50,000,000.00', AdditionalFund:'33,000,000.00', AvailableGuaranteeFund:'17,000,000.00', Status:'Pending Confirmation', EffectivePeriod:'Mar-2017', GuaranteeFundTres:'98'},
                        {Month:'January', Year:'2017', InitialGuaranteeFund:'50,000,000.00', AdditionalFund:'29,000,000.00', AvailableGuaranteeFund:'21,000,000.00', Status:'Confirmed', EffectivePeriod:'Jan-2017', GuaranteeFundTres:'97'},
                        {Month:'December', Year:'2016', InitialGuaranteeFund:'50,000,000.00', AdditionalFund:'30,000,000.00', AvailableGuaranteeFund:'20,000,000.00', Status:'Confirmed', EffectivePeriod:'Feb-2015', GuaranteeFundTres:'96'}];
//            var gfArrayJan = [{Month:'January', Year:'2017', InitialGuaranteeFund:'50,000,000.00', AdditionalFund:'29,000,000.00', AvailableGuaranteeFund:'21,000,000.00', Status:'Confirmed', EffectivePeriod:'Jan-2017'}];
//            var gfArrayFeb = [{Month:'February', Year:'2017', InitialGuaranteeFund:'50,000,000.00', AdditionalFund:'33,000,000.00', AvailableGuaranteeFund:'17,000,000.00', Status:'Pending Confirmation', EffectivePeriod:'Mar-2017'}];
//            var gfArrayDec = [{Month:'December', Year:'2016', InitialGuaranteeFund:'50,000,000.00', AdditionalFund:'30,000,000.00', AvailableGuaranteeFund:'20,000,000.00', Status:'Confirmed', EffectivePeriod:'Feb-2015'}];
//            var gfArray2016 = [{Month:'December', Year:'2016', InitialGuaranteeFund:'50,000,000.00', AdditionalFund:'30,000,000.00', AvailableGuaranteeFund:'20,000,000.00', Status:'Confirmed', EffectivePeriod:'Feb-2015'}];
            var gfArray2017 = [{Month:'February', Year:'2017', InitialGuaranteeFund:'50,000,000.00', AdditionalFund:'33,000,000.00', AvailableGuaranteeFund:'17,000,000.00', Status:'Pending Confirmation', EffectivePeriod:'Mar-2017'},
                        {Month:'January', Year:'2017', InitialGuaranteeFund:'50,000,000.00', AdditionalFund:'29,000,000.00', AvailableGuaranteeFund:'21,000,000.00', Status:'Confirmed', EffectivePeriod:'Jan-2017'}];
            self.gfObservableArray = ko.observableArray(gfArray);
            self.datasourceGF= new oj.ArrayTableDataSource(ko.observableArray(gfArray), {idAttribute: 'Month'});
            
            //intialize the observable values in the forms
            self.inputInitialGuaranteeFund = ko.observable();
            self.inputGuaranteeFundTres = ko.observable();
            self.inputCurrAvlGuaranteeFund = ko.observable();
            self.inputAdditionalFund = ko.observable('50,000,000.00');
            self.inputPeriodMonth = ko.observable();
            self.inputPeriodYear = ko.observable();
            self.inputEffectivePeriod = ko.observable(); //need to be reformated before update value
            
            self.onClickSearch = function(){
//                if(self.selectedMonth()==0 && self.selectedYear()==0){
//                    self.datasourceGF(new oj.ArrayTableDataSource(gfArray, {idAttribute: 'Month'}));
//                }else if((self.selectedMonth()==2 && self.selectedYear()==0) || ((self.selectedMonth()==2 && self.selectedYear()==2017))){
//                    self.datasourceGF(new oj.ArrayTableDataSource(gfArrayFeb, {idAttribute: 'Month'}));
//                }else if((self.selectedMonth()==1 && self.selectedYear()==0) || (self.selectedMonth()==1 && self.selectedYear()==2017)){
//                    self.datasourceGF(new oj.ArrayTableDataSource(gfArrayJan, {idAttribute: 'Month'}));
//                }else if((self.selectedMonth()==12 && self.selectedYear()==0) || (self.selectedMonth()==12 && self.selectedYear()==2016)){
//                    self.datasourceGF(new oj.ArrayTableDataSource(gfArrayDec, {idAttribute: 'Month'}));
//                }else if(self.selectedYear()==2016 && self.selectedMonth()==0){
//                    self.datasourceGF(new oj.ArrayTableDataSource(gfArray2016, {idAttribute: 'Month'}));
//                }else if(self.selectedYear()==2017 && self.selectedMonth()==0){
//                    self.datasourceGF(new oj.ArrayTableDataSource(gfArray2017, {idAttribute: 'Month'}));
//                }else{
//                    self.datasourceGF(new oj.ArrayTableDataSource([], {idAttribute: 'Month'}));
//                }
            };
            
            self.onClickUpdate = function(item){
                $("#UpdateDialog").ojDialog("open");
                return true;
            };
            self.onClickSave = function(item){
                if (currentRow != null)
                {
                    alert(self.inputInitialGuaranteeFund());
                    self.gfObservableArray.splice(currentRow['rowIndex'], 1, {
                                 'InitialGuaranteeFund': self.inputInitialGuaranteeFund(),
//                                 '': self.inputGuaranteeFundTres(),
                                 'AdditionalFund': self.inputAdditionalFund()
//                                 'EffectivePeriod': self.inputPeriodMonth()
                              });
                }
                $("#UpdateDialog").ojDialog("close");
            };
            self.onClickCancel = function(){
                $("#UpdateDialog").ojDialog("close");
            };
            
            selectClick =  function(item) {
                currentRow = $('#table').ojTable('option', 'currentRow');
                self.inputInitialGuaranteeFund(item.InitialGuaranteeFund);
                self.inputGuaranteeFundTres(item.GuaranteeFundTres);
                self.inputCurrAvlGuaranteeFund(item.AvailableGuaranteeFund);
                if(item.Status == 'Pending Confirmation'){
                    $("#updateButton").ojButton({"disabled": true});
                }else{
                    $("#updateButton").ojButton({"disabled": false});
                }
            };
        }       
           
        return mainModel;     
      });