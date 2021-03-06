define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojselectcombobox'], function (oj, ko, $) {
    var self = this;
    self.prDate = ko.observable();
    self.startDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
    self.endDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
    self.pagingDatasourcePR=ko.observable(new oj.ArrayTableDataSource([], {}));
    self.productGroup = [{value : 'PWRC', label : 'PWR Conventional'},
                        {value : 'PWRI', label : 'PWR Islamic'}];
    self.assetType = [{value : 'Housing Loan', label : 'Housing Loan'},
{value : 'HPCL', label : 'Hire Purchase – Consumer Loan'},
{value : 'HPIL', label : 'Hire Purchase – Industrial Loan'},
{value : 'HPLD', label : 'Leasing Debt'},
{value : 'PL', label : 'Personal Loan'},
{value : 'Housing', label : 'Commercial & Industrial Property Loan'},
{value : 'Housing', label : 'Credit Card Receivable'},
{value : 'Housing', label : 'SME Loan'},
{value : 'SMEL', label : 'Infrastructure Loan'},
{value : 'Housing', label : 'Corporate Term Loan'},
{value : 'CTL', label : 'Housing'}];
    self.tenure = [{value : '1', label : '1'},
                    {value : '2', label : '2'},
                    {value : '3', label : '3'},
                    {value : '4', label : '4'},
                    {value : '5', label : '5'},
                    {value : '6', label : '6'},
                    {value : '7', label : '7'},
                    {value : '8', label : '8'},
                    {value : '9', label : '9'},
                    {value : '10', label : '10'}];
     var PR = [{EffectiveStartDate:'...', EndDate:'...', ProductGroup:'...', AssetType:'...', Tenure:'...', PublishedRate:'...'}];
     self.prObservableArray = ko.observableArray(PR);
    self.pagingDatasourcePR = ko.observable(new oj.ArrayTableDataSource([], {}));
    
    function viewModel() {
        openCPPopUp = function () {
            $("#CPDialog").ojDialog("open");
            return true;
        };

        header = "Published Rate";
        self.onClickSearch = function(item){
        self.pagingDatasourcePR(new oj.ArrayTableDataSource(self.prObservableArray, {idAttribute: 'EffectiveStartDate'}));
        };
        self.onClickReset = function(item){};
        self.onClickUpload = function(item){};
        self.onClickSave = function(item){};
        self.onClickCancel = function(item){};
        
        redirectToPC = function (item) {
            oj.Router.rootInstance.go('origination-pc');
        }
        redirectToSimulations = function (item) {
            oj.Router.rootInstance.go('simulations');
        }
        self.counterPartyType = [{value : 'CPType1', label : 'Counter Party Type 1'},{value : 'CPType2', label : 'Counter Party Type 2'}];
        self.selectedCP = ko.observable();
        
        cpLookUpClick = function (item) {
            self.selectedCP(item.CPName);
            $("#CPDialog").ojDialog("close");
        };
    }
    return viewModel;
});