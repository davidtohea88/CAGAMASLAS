
define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojdialog', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset','ojs/ojradioset'],
function(oj, ko, $, configService)
{
     var self = this;
     self.config = configService;

  function viewModel()
  {
    self.dataType = ko.observable();
    self.currentStatus = ko.observable();
    self.pagingDatasource = ko.observable();

   var valid = [
    {LoanRefNum: '7014262708600000', BranchCode: '701', BookBalance:'153,000', ForecastedBookBalance:'', MortgageRate:'5.0500', MortgageInstallment: '863', Month:'0.00', InitialPurchaseValue:'', DeferredPurchaseValue:'',CagamasInstallment:'', ReviewDateValue:'',Status:''},
    {LoanRefNum: '7014262708600001', BranchCode: '701', BookBalance:'83,000', ForecastedBookBalance:'', MortgageRate:'4.7500', MortgageInstallment: '1.099', Month:'0.00'},
    {LoanRefNum: '7014262708600002', BranchCode: '701', BookBalance:'12,000', ForecastedBookBalance:'', MortgageRate:'5.1200', MortgageInstallment: '369', Month:'0.00'},
    {LoanRefNum: '7014262708600003', BranchCode: '701', BookBalance:'553,253', ForecastedBookBalance:'', MortgageRate:'5.3500', MortgageInstallment: '1,222', Month:'0.00'},
    {LoanRefNum: '7014262708600004', BranchCode: '701', BookBalance:'123,321', ForecastedBookBalance:'', MortgageRate:'5.5000', MortgageInstallment: '921', Month:'0.00'},
    {LoanRefNum: '7014262708600005', BranchCode: '701', BookBalance:'93,000', ForecastedBookBalance:'', MortgageRate:'5.2000', MortgageInstallment: '2,001', Month:'0.00'}
    ];
   var validnc = [
    {LoanRefNum: '7014262708600000', BranchCode: '702', BookBalance:'123,000', ForecastedBookBalance:'', MortgageRate:'5.0500', MortgageInstallment: '863', Month:'0.00', InitialPurchaseValue:'', DeferredPurchaseValue:'',CagamasInstallment:'', ReviewDateValue:'',Status:''},
    {LoanRefNum: '7014262708600001', BranchCode: '702', BookBalance:'31,000', ForecastedBookBalance:'', MortgageRate:'4.7500', MortgageInstallment: '1.099', Month:'0.00'},
    {LoanRefNum: '7014262708600002', BranchCode: '702', BookBalance:'312,000', ForecastedBookBalance:'', MortgageRate:'5.1200', MortgageInstallment: '369', Month:'0.00'},
    {LoanRefNum: '7014262708600003', BranchCode: '702', BookBalance:'213,253', ForecastedBookBalance:'', MortgageRate:'5.3500', MortgageInstallment: '1,222', Month:'0.00'},
    {LoanRefNum: '7014262708600004', BranchCode: '702', BookBalance:'231,321', ForecastedBookBalance:'', MortgageRate:'5.5000', MortgageInstallment: '921', Month:'0.00'},
    {LoanRefNum: '7014262708600005', BranchCode: '702', BookBalance:'321,000', ForecastedBookBalance:'', MortgageRate:'5.2000', MortgageInstallment: '2,001', Month:'0.00'}
    ];
   var invalid = [
    {LoanRefNum: '7014262708600312', BranchCode: '703', BookBalance:'53,000', ForecastedBookBalance:'', MortgageRate:'5.0500', MortgageInstallment: '863', Month:'0.00', InitialPurchaseValue:'', DeferredPurchaseValue:'',CagamasInstallment:'', ReviewDateValue:'',Status:''},
    {LoanRefNum: '7014262708600312', BranchCode: '703', BookBalance:'534,000', ForecastedBookBalance:'', MortgageRate:'4.7500', MortgageInstallment: '1.099', Month:'0.00'},
    {LoanRefNum: '7014262708600312', BranchCode: '703', BookBalance:'432,000', ForecastedBookBalance:'', MortgageRate:'5.1200', MortgageInstallment: '369', Month:'0.00'},
    {LoanRefNum: '7014262708600123', BranchCode: '703', BookBalance:'422,253', ForecastedBookBalance:'', MortgageRate:'5.3500', MortgageInstallment: '1,222', Month:'0.00'},
    {LoanRefNum: '7014262708600231', BranchCode: '703', BookBalance:'2,321', ForecastedBookBalance:'', MortgageRate:'5.5000', MortgageInstallment: '921', Month:'0.00'},
    {LoanRefNum: '7014262708600321', BranchCode: '703', BookBalance:'32,000', ForecastedBookBalance:'', MortgageRate:'5.2000', MortgageInstallment: '2,001', Month:'0.00'}
    ];
   var allv = [
    {LoanRefNum: '7014262708604232', BranchCode: '704', BookBalance:'53,000', ForecastedBookBalance:'', MortgageRate:'5.0500', MortgageInstallment: '863', Month:'0.00', InitialPurchaseValue:'', DeferredPurchaseValue:'',CagamasInstallment:'', ReviewDateValue:'',Status:''},
    {LoanRefNum: '7014262708602222', BranchCode: '704', BookBalance:'534,000', ForecastedBookBalance:'', MortgageRate:'4.7500', MortgageInstallment: '1.099', Month:'0.00'},
    {LoanRefNum: '7014262708603322', BranchCode: '704', BookBalance:'432,000', ForecastedBookBalance:'', MortgageRate:'5.1200', MortgageInstallment: '369', Month:'0.00'},
    {LoanRefNum: '7014262708600123', BranchCode: '704', BookBalance:'422,253', ForecastedBookBalance:'', MortgageRate:'5.3500', MortgageInstallment: '1,222', Month:'0.00'},
    {LoanRefNum: '7014262708606451', BranchCode: '704', BookBalance:'2,321', ForecastedBookBalance:'', MortgageRate:'5.5000', MortgageInstallment: '921', Month:'0.00'},
    {LoanRefNum: '7014262708602571', BranchCode: '704', BookBalance:'32,000', ForecastedBookBalance:'', MortgageRate:'5.2000', MortgageInstallment: '2,001', Month:'0.00'}
    ];
   var valid2 = [
    {LoanRefNum: '7014262708600003', BranchCode: '701', BookBalance:'553,253', ForecastedBookBalance:'', MortgageRate:'5.3500', MortgageInstallment: '1,222', Month:'0.00'},
    {LoanRefNum: '7014262708600004', BranchCode: '701', BookBalance:'123,321', ForecastedBookBalance:'', MortgageRate:'5.5000', MortgageInstallment: '921', Month:'0.00'},
    {LoanRefNum: '7014262708600005', BranchCode: '701', BookBalance:'93,000', ForecastedBookBalance:'', MortgageRate:'5.2000', MortgageInstallment: '2,001', Month:'0.00'}
    ];
   var validnc2 = [
    {LoanRefNum: '7014262708600003', BranchCode: '702', BookBalance:'213,253', ForecastedBookBalance:'', MortgageRate:'5.3500', MortgageInstallment: '1,222', Month:'0.00'},
    {LoanRefNum: '7014262708600004', BranchCode: '702', BookBalance:'231,321', ForecastedBookBalance:'', MortgageRate:'5.5000', MortgageInstallment: '921', Month:'0.00'},
    {LoanRefNum: '7014262708600005', BranchCode: '702', BookBalance:'321,000', ForecastedBookBalance:'', MortgageRate:'5.2000', MortgageInstallment: '2,001', Month:'0.00'}
    ];
   var invalid2 = [
    {LoanRefNum: '7014262708600123', BranchCode: '703', BookBalance:'422,253', ForecastedBookBalance:'', MortgageRate:'5.3500', MortgageInstallment: '1,222', Month:'0.00'},
    {LoanRefNum: '7014262708600231', BranchCode: '703', BookBalance:'2,321', ForecastedBookBalance:'', MortgageRate:'5.5000', MortgageInstallment: '921', Month:'0.00'},
    {LoanRefNum: '7014262708600321', BranchCode: '703', BookBalance:'32,000', ForecastedBookBalance:'', MortgageRate:'5.2000', MortgageInstallment: '2,001', Month:'0.00'}
    ];
   var allv2 = [
    {LoanRefNum: '7014262708600123', BranchCode: '704', BookBalance:'422,253', ForecastedBookBalance:'', MortgageRate:'5.3500', MortgageInstallment: '1,222', Month:'0.00'},
    {LoanRefNum: '7014262708606451', BranchCode: '704', BookBalance:'2,321', ForecastedBookBalance:'', MortgageRate:'5.5000', MortgageInstallment: '921', Month:'0.00'},
    {LoanRefNum: '7014262708602571', BranchCode: '704', BookBalance:'32,000', ForecastedBookBalance:'', MortgageRate:'5.2000', MortgageInstallment: '2,001', Month:'0.00'}
    ];
    
    self.header="Validate Loan Detail";
    self.redirectToPC= function(item) {
        self.config.status = "temp-validated";
        self.config.loanStatus = "validated";
        oj.Router.rootInstance.go('origination-pc');
    };
    self.openFileDialog = function (){
              document.getElementById("browseFile").click();
            };
    self.closeUploadPopUp = function(){$("#UploadDialog").ojDialog("close");return true;};
    self.openUploadPopUp = function(){$("#UploadDialog").ojDialog("open");return true;};
    self.loadTable=function()
    {
       
        if(self.currentStatus()=='V')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(valid, {idAttribute: 'LoanRefNum'})));
        }
        else if(self.currentStatus()=='VnC')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(validnc, {idAttribute: 'LoanRefNum'})));
        }
        else if(self.currentStatus()=='IV')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(invalid, {idAttribute: 'LoanRefNum'})));
        }
        else if(self.currentStatus()=='ALL')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(allv, {idAttribute: 'LoanRefNum'})));
        }
    };
    self.moveRow=function(){
        if(self.currentStatus()=='V')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(valid2, {idAttribute: 'LoanRefNum'})));
        }
        else if(self.currentStatus()=='VnC')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(validnc2, {idAttribute: 'LoanRefNum'})));
        }
        else if(self.currentStatus()=='IV')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(invalid2, {idAttribute: 'LoanRefNum'})));
        }
        else if(self.currentStatus()=='ALL')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(allv2, {idAttribute: 'LoanRefNum'})));
        }
    }
    
  }
  return viewModel;
});
