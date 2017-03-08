define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojinputnumber', 'ojs/ojarraytabledatasource'], 
      function(oj, ko, $)
      {
        function mainModel(){
            var self = this;
            self.header = "Monthly Cost and Fund";
            self.subHeader = "Guarantee Fund";
            self.months = [{value : 'Jan', label : 'January'},
                        {value : 'Feb', label : 'February'},
                        {value : 'Mar', label : 'March'},
                        {value : 'Apr', label : 'April'},
                        {value : 'May', label : 'May'},
                        {value : 'Jun', label : 'June'},
                        {value : 'Jul', label : 'July'},
                        {value : 'Aug', label : 'August'},
                        {value : 'Sep', label : 'September'},
                        {value : 'Oct', label : 'October'},
                        {value : 'Nov', label : 'November'},
                        {value : 'Dec', label : 'December'}];
            self.years = [{value : '2015', label : '2015'},
                        {value : '2016', label : '2016'},
                        {value : '2017', label : '2017'}];
            self.selectedMonth = ko.observable();
            self.selectedYear = ko.observable();
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
            self.datasourceGF = ko.observable(new oj.ArrayTableDataSource([], {}));
            
            //intialize the observable values in the forms
            self.inputInitialGuaranteeFund = ko.observable();
            self.inputGuaranteeFundTres = ko.observable();
            self.inputCurrAvlGuaranteeFund = ko.observable();
            self.inputAdditionalFund = ko.observable('50,000,000.00');
            self.inputPeriodMonth = ko.observable();
            self.inputPeriodYear = ko.observable();
            self.inputEffectivePeriod = ko.observable(); //need to be reformated before update value
            self.inputGuaranteeFundTresPU = ko.observable();
            //tmp values
            self.tmpMonth;
            self.tmpYear;
            self.tmpAdditionalFund;
            self.tmpCurrAvlGuaranteeFund;
            self.tmpStatus;
            self.tmpEffectivePeriod;
            self.tmpGuaranteeFundTres;
            
            self.onClickSearch = function(){
                self.datasourceGF(new oj.ArrayTableDataSource(self.gfObservableArray, {idAttribute: 'Month'}));
            };
            
            self.onClickUpdate = function(item){
                console.log("tmpGuaranteeFundTres : "+self.tmpGuaranteeFundTres);
                self.inputGuaranteeFundTresPU(self.tmpGuaranteeFundTres);
                $("#UpdateDialog").ojDialog("open");
                return true;
            };
            self.onClickSave = function(){
                var currentRow = $('#table').ojTable('option', 'currentRow');
                if(self.inputPeriodMonth()!= null && self.inputPeriodYear()!= null){
                    var effectivePeriod = self.inputPeriodMonth()+"-"+self.inputPeriodYear();
                }
                var num1 = Number(self.inputInitialGuaranteeFund().replace(/[^0-9\.]+/g,""));
                var num2 = Number(self.inputAdditionalFund().replace(/[^0-9\.]+/g,""));
                num1 += num2;
                var newInitialGuaranteeFund = num1.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                if (currentRow != null)
                {
                    self.gfObservableArray.splice(currentRow['rowIndex'], 1, {
                                 'Month': self.tmpMonth,
                                 'Year': self.tmpYear,
                                 'InitialGuaranteeFund': newInitialGuaranteeFund,
                                 'AdditionalFund': self.tmpAdditionalFund,
                                 'AvailableGuaranteeFund': self.tmpCurrAvlGuaranteeFund,
                                 'Status': self.tmpStatus,
                                 'EffectivePeriod': effectivePeriod,
                                 'GuaranteeFundTres': self.inputGuaranteeFundTresPU()
                              });
                }
                $("#UpdateDialog").ojDialog("close");
            };
            self.onClickCancel = function(){
                $("#UpdateDialog").ojDialog("close");
            };
            self.onPrintClick = function(){
            };
            self.onExportClick = function(){
            };
            self.rowClick = function(item){
                self.tmpMonth = item.Month;
                self.tmpYear = item.Year;
                self.tmpAdditionalFund = item.AdditionalFund;
                self.tmpStatus = item.Status;
                self.tmpCurrAvlGuaranteeFund = item.AvailableGuaranteeFund;
                self.tmpEffectivePeriod = item.EffectivePeriod;
                self.tmpGuaranteeFundTres = item.GuaranteeFundTres;
                console.log("item : "+item.GuaranteeFundTres);
                console.log("tmp : "+self.tmpGuaranteeFundTres);
                self.inputInitialGuaranteeFund(item.InitialGuaranteeFund);
                self.inputGuaranteeFundTres(item.GuaranteeFundTres);
                self.inputCurrAvlGuaranteeFund(item.AvailableGuaranteeFund);
                if(item.Status == 'Pending Confirmation'){
                    $("#updateButton").ojButton({"disabled": false});
                }else{
                    $("#updateButton").ojButton({"disabled": true});
                }
            }
            
        }
        return mainModel;     
      });