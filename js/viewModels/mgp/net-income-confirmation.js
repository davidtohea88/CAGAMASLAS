define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojinputnumber', 'ojs/ojarraytabledatasource'], 
      function(oj, ko, $)
      {
        function mainModel(){
            var self = this;
            var action;
            self.header = "Monthly Cost and Fund - Confirmation";
            self.subHeader = "Net Income";
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
            var array = [{Month:'February', Year:'2017', NetIncome:'5,000.00', ActionType:'New', Justification:'', Status:'Pending Confirmation', Comment:''},
                        {Month:'January', Year:'2017', NetIncome:'15,000.00', ActionType:'Update', Justification:'Wrong Input', Status:'Pending Confirmation', Comment:''},
                        {Month:'December', Year:'2016', NetIncome:'10,000.00', ActionType:'Update', Justification:'Wrong Input', Status:'Pending Confirmation', Comment:''}];
            self.ObservableArray = ko.observableArray(array);
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {}));
            
            //intialize the observable values in the forms
            self.inputMonth = ko.observable();
            self.inputYear = ko.observable();
            self.inputNetIncome = ko.observable('50,000,000.00');
            self.inputComment = ko.observable();
            self.tmpMonth;
            self.tmpYear;
            self.tmpNetIncome;
            self.tmpActionType;
            self.tmpJustification;
            self.tmpStatus;
            self.tmpComment;
            
            self.onClickSearch = function(){
                self.datasource(new oj.ArrayTableDataSource(self.ObservableArray, {idAttribute: 'Month'}));
            };
            
            self.onClickConfirm = function(item){
                action = "Confirm";
                self.tmpMonth = item.Month;
                self.tmpYear = item.Year;
                self.tmpNetIncome = item.NetIncome;
                self.tmpActionType = item.ActionType;
                self.tmpJustification = item.Justification;
                self.tmpStatus = item.Status;
                self.tmpComment = item.Comment;
                $("#ConfirmationDialog").ojDialog("open");
                return true;
            };
            self.onClickReject = function(item){
                action = "Reject";
                self.tmpMonth = item.Month;
                self.tmpYear = item.Year;
                self.tmpNetIncome = item.NetIncome;
                self.tmpActionType = item.ActionType;
                self.tmpJustification = item.Justification;
                self.tmpStatus = item.Status;
                self.tmpComment = item.Comment;
                $("#ConfirmationDialog").ojDialog("open");
                return true;
            };
            
            self.onClickSave = function(item){
                var currentRow = $('#table').ojTable('option', 'currentRow');
                if (currentRow != null)
                {
                    self.ObservableArray.splice(currentRow['rowIndex'], 1, {
                                 'Month': self.tmpMonth,
                                 'Year': self.tmpYear,
                                 'NetIncome': self.tmpNetIncome,
                                 'ActionType': self.tmpActionType,
                                 'Justification': self.tmpJustification,
                                 'Status': action == "Confirm" ? 'Approved' : 'Rejected',
                                 'Comment': self.inputComment()
                              });
                }
                $("#ConfirmationDialog").ojDialog("close");
//                currentRow['rowIndex'].ojButton({"disabled": true});
                return true;
            };
            self.onClickCancel = function(){
                $("#ConfirmationDialog").ojDialog("close");
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