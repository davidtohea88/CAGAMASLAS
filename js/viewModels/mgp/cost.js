define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojinputnumber', 'ojs/ojarraytabledatasource'], 
      function(oj, ko, $)
      {
        function mainModel(){
            var self = this;
            var action;
            self.header = "Monthly Cost and Fund";
            self.subHeader = "Cost";
            self.months = [{value : 'January', label : 'January'},
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
            self.years = [{value : '2015', label : '2015'},
                        {value : '2016', label : '2016'},
                        {value : '2017', label : '2017'}];
            self.selectedMonth = ko.observable();
            self.selectedYear = ko.observable();
            var array = [{Month:'February', Year:'2017', oaeSRP:'1,000.00', oaeSPB:'500.00', coaeSRP:'27,000.00', coaeSPB:'28,500.00', Status:'Pending Confirmation', Justification:''},
                        {Month:'January', Year:'2017', oaeSRP:'5,000.00', oaeSPB:'10,000.00', coaeSRP:'26,000.00', coaeSPB:'29,000.00', Status:'Confirmed', Justification:''},
                        {Month:'December', Year:'2016', oaeSRP:'2,000.00', oaeSPB:'1,500.00', coaeSRP:'21,000.00', coaeSPB:'19,000.00', Status:'Confirmed', Justification:''}];
            self.observableArray = ko.observableArray(array);
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {}));
            
            //intialize the observable values in the forms
            self.inputInitialGuaranteeFund = ko.observable();
            self.inputGuaranteeFundTres = ko.observable();
            self.inputCurrAvlGuaranteeFund = ko.observable();
            self.inputAdditionalFund = ko.observable();
            self.inputMonth = ko.observable();
            self.inputYear = ko.observable();
            self.inputoaeSRP = ko.observable();
            self.inputoaeSPB = ko.observable();
            self.inputJustification = ko.observable();
            
            self.onClickSearch = function(item){
                self.datasource(new oj.ArrayTableDataSource(self.observableArray, {idAttribute: 'Month'}));
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
                action = "new";
                self.inputMonth();
                self.inputYear();
                self.inputoaeSRP('15,000.00');
                self.inputoaeSPB('15,000.00');
                $("#NewDialog").ojDialog("open");return true;
            };
            self.onClickUpdate = function(item){
                action = "update";
                self.inputMonth(item.Month);
                self.inputYear(item.Year);
                self.inputoaeSRP(item.oaeSRP);
                self.inputoaeSPB(item.oaeSPB);
                self.inputJustification();
                $("#UpdateDialog").ojDialog("open");
                return true;
            };
            self.onClickDelete = function(item){
                action = "delete";
                self.inputMonth(item.Month);
                self.inputYear(item.Year);
                self.inputoaeSRP(item.oaeSRP);
                self.inputoaeSPB(item.oaeSPB);
                self.inputJustification();
                $("#DeleteDialog").ojDialog("open");
                return true;
            };
            
            self.onClickSave = function(item){
                if(action == "new"){
                    console.log("New : "+self.inputoaeSPB());
                    //add to the observableArray
                    var ni = {'Month': self.inputMonth(),
                             'Year': self.inputYear(),
                             'oaeSRP': self.inputoaeSRP(),
                             'oaeSPB': self.inputoaeSPB(),
                             'coaeSRP': '42,000.00',
                             'coaeSPB': '43,500.00',
                             'Status': 'Pending Confirmation'};
                    self.observableArray.unshift(ni);
                    $("#NewDialog").ojDialog("close");
                }else if(action == "update"){
                    var currentRow = $('#table').ojTable('option', 'currentRow');
                    if (currentRow != null){
                        self.observableArray.splice(currentRow['rowIndex'], 1, {
                                     'Month': self.inputMonth(),
                                     'Year': self.inputYear(),
                                     'oaeSRP': self.inputoaeSRP(),
                                     'oaeSPB': self.inputoaeSPB(),
                                     'coaeSRP': '',
                                     'coaeSPB': '',
                                     'Justification': self.inputJustification(),
                                     'Status': 'Pending Confirmation'
                                  });
                    }
                    $("#UpdateDialog").ojDialog("close");
                }else if(action == "delete"){
                    var currentRow = $('#table').ojTable('option', 'currentRow');
                    if (currentRow != null){
                        self.observableArray.splice(currentRow['rowIndex'], 1);
                    }
                    $("#DeleteDialog").ojDialog("close");
                }
            };
            self.onClickSaveUpdate = function(item){                
                
            };
            self.onClickSaveDelete = function(){
                
            };
            self.onClickCancel = function(){
                if(action == "new"){
                    $("#NewDialog").ojDialog("close");
                }else if(action == "update"){
                    $("#UpdateDialog").ojDialog("close");
                }else if(action == "delete"){
                    $("#DeleteDialog").ojDialog("close");
                }
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