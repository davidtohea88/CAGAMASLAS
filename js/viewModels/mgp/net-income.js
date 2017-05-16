define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojinputnumber', 'ojs/ojarraytabledatasource'], 
      function(oj, ko, $)
      {
        function mainModel(){
            var self = this;
            self.header = "Monthly Cost and Fund";
            self.subHeader = "Net Income";
            self.months = [{value : '', label : 'Month'},
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
            self.years = [{value : '', label : 'Year'},
                        {value : '2015', label : '2015'},
                        {value : '2016', label : '2016'},
                        {value : '2017', label : '2017'}];
            self.selectedMonth = ko.observable('0');
            self.selectedYear = ko.observable('0');
            var niArray = [{Month:'February', Year:'2017', NetIncome:'5,000.00', CumulativeNetIncome:'230,000.00', Status:'Pending Confirmation', Justification:''},
                        {Month:'January', Year:'2017', NetIncome:'15,000.00', CumulativeNetIncome:'225,000.00', Status:'Confirmed', Justification:''},
                        {Month:'December', Year:'2016', NetIncome:'10,000.00', CumulativeNetIncome:'210,000.00', Status:'Confirmed', Justification:''}];
            self.niObservableArray = ko.observableArray(niArray);
            self.datasourceNI = ko.observable(new oj.ArrayTableDataSource([], {}));
            
            //intialize the observable values in the forms
            self.inputInitialGuaranteeFund = ko.observable();
            self.inputGuaranteeFundTres = ko.observable();
            self.inputCurrAvlGuaranteeFund = ko.observable();
            self.inputAdditionalFund = ko.observable();
            self.inputMonth = ko.observable();
            self.inputYear = ko.observable();
            self.inputNetIncome = ko.observable('50,000,000.00');
            self.inputJustification = ko.observable();
            
            self.onClickSearch = function(item){
                self.datasourceNI(new oj.ArrayTableDataSource(self.niObservableArray, {idAttribute: 'Month'}));
//                var newArray = [];
//                for(i=0; i<self.niObservableArray().length; i++){
//                    if(self.niObservableArray()[i].Month == self.selectedMonth() || self.niObservableArray()[i].Year == self.selectedYear()){
//                        newArray.push(self.niObservableArray()[i]);
//                    }
//                }
//                alert(newArray);
//                self.niObservableArray = ko.observableArray(newArray);
//                self.datasourceNI= new oj.ArrayTableDataSource(newArray, {idAttribute: 'Month'});
//                $('#table').ojTable('refresh');
            };
            self.onClickNew = function(){
                self.inputMonth('');
                self.inputYear('');
                self.inputNetIncome('50,000,000.00');
                $("#NewDialog").ojDialog("open");return true;
            };
            self.onClickUpdate = function(item){
                self.inputMonth(item.Month);
                self.inputYear(item.Year);
                self.inputNetIncome(item.NetIncome);
                $("#UpdateDialog").ojDialog("open");
                return true;
            };
            self.onClickDelete = function(item){
                self.inputMonth(item.Month);
                self.inputYear(item.Year);
                self.inputNetIncome(item.NetIncome);
                $("#DeleteDialog").ojDialog("open");
                return true;
            };
            
            self.onClickSaveNew = function(item){
                //add to the observableArray
                var ni = {'Month': self.inputMonth(),
                         'Year': self.inputYear(),
                         'NetIncome': self.inputNetIncome(),
                         'Status': 'Pending Confirmation'};
                self.niObservableArray.push(ni);
                $("#NewDialog").ojDialog("close");
            };
            self.onClickSaveUpdate = function(item){                
                var currentRow = $('#table').ojTable('option', 'currentRow');
                if (currentRow != null)
                {
                    self.niObservableArray.splice(currentRow['rowIndex'], 1, {
                                 'Month': self.inputMonth(),
                                 'Year': self.inputYear(),
                                 'NetIncome': self.inputNetIncome(),
                                 'Justification': self.inputJustification(),
                                 'Status': 'Pending Confirmation'
                              });
                }
                $("#UpdateDialog").ojDialog("close");
            };
            self.onClickSaveDelete = function(){
                var currentRow = $('#table').ojTable('option', 'currentRow');
        
                if (currentRow != null)
                {
                    self.niObservableArray.splice(currentRow['rowIndex'], 1);
                }
                $("#DeleteDialog").ojDialog("close");
            };
            self.onClickCancel = function(){
                $("#NewDialog").ojDialog("close");
                $("#UpdateDialog").ojDialog("close");
                $("#DeleteDialog").ojDialog("close");
            };
            self.onClickClose = function(){};
            self.onPrintClick = function(){
            };
            self.onExportClick = function(){
            };
        }       
//          $(document).ready(function () {
//            return mainModel;
//          });
        return mainModel;
             
      });