define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojinputnumber', 'ojs/ojarraytabledatasource'], 
      function(oj, ko, $)
      {
        function mainModel(){
            var self = this;
            self.header = "Monthly Cost and Fund - Confirmation";
            self.subHeader = "Guarantee Fund";
            self.months = [{value : '0', label : 'Month'},
                        {value : 'January', label : 'January'},
                        {value : 'February', label : 'February'},
                        {value : 'March', label : 'March'},
                        {value : 'April', label : 'April'},
                        {value : 'May', label : 'May'},
                        {value : 'June', label : 'June'},
                        {value : 'July', label : 'July'},
                        {value : 'August', label : 'August'},
                        {value : 'September', label : 'September'},
                        {value : 'October', label : 'October'},
                        {value : 'November', label : 'November'},
                        {value : 'December', label : 'December'}];
            self.years = [{value : '0', label : 'Year'},
                        {value : '2015', label : '2015'},
                        {value : '2016', label : '2016'},
                        {value : '2017', label : '2017'}];
            self.selectedMonth = ko.observable('0');
            self.selectedYear = ko.observable('0');
            var array = [{RequestCreatedDate:'26 Dec 2016', InitialGuaranteeFund:'50,000,000.00', AdditionalGuaranteeFund:'0', GuaranteeFundTreshold:'98', EffectivePeriod:'Jan 2017', Status:'New'},
                        {RequestCreatedDate:'28 Jan 2017', InitialGuaranteeFund:'50,000,000.00', AdditionalGuaranteeFund:'30,000,000.00', GuaranteeFundTreshold:'98', EffectivePeriod:'Feb 2017', Status:'Update'},
                        {RequestCreatedDate:'30 Jan 2017', InitialGuaranteeFund:'50,000,000.00', AdditionalGuaranteeFund:'30,000,000.00', GuaranteeFundTreshold:'98', EffectivePeriod:'Feb 2017', Status:'Delete'}];
            self.ObservableArray = ko.observableArray(array);
            self.datasource= new oj.ArrayTableDataSource(self.ObservableArray, {idAttribute: 'RequestCreatedDate'});
            
            //intialize the observable values in the forms
            self.inputMonth = ko.observable();
            self.inputYear = ko.observable();
            self.inputNetIncome = ko.observable('50,000,000.00');
            
            self.inputComment = ko.observable();
            
            self.onClickSearch = function(){
            };
            
            self.onClickConfirm = function(item){
                $("#ConfirmationDialog").ojDialog("open");
                return true;
            };
            self.onClickReject = function(){$("#ConfirmationDialog").ojDialog("open");return true;};
            
            self.onClickSave = function(item){
                //add to the observableArray
                var ni = {'Month': self.inputMonth(),
                         'Year': self.inputYear(),
                         'NetIncome': self.inputNetIncome(),
                         'Status': 'Pending Confirmation'};
                self.ObservableArray.push(ni);
                $("#NewDialog").ojDialog("close");
            };
            self.onClickCancel = function(){
                $("#ConfirmationDialog").ojDialog("close");
            };       
            self.onClickClose = function(){};
        }       
//          $(document).ready(function () {
//            return mainModel;
//          });
        return mainModel;
             
      });