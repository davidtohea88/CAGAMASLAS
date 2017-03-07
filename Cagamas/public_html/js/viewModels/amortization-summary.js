define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {
    var self = this;
    self.header = "Amortization Summary";
    self.currentStatus = ko.observable();
    var list = [
    {TransactionDate: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Event:'Accrual',Amount:'123', PostingFlag:'Y'},
    {TransactionDate: 'CIMB Bank Berhad', ContractNumber: '345/MGPFI/022017/001', Product:'MGPFI', Event:'Accrual',Amount:'123', PostingFlag:'N'},
    {TransactionDate: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/004', Product:'MGPFI', Event:'Accrual',Amount:'123', PostingFlag:'Y'},
    ];                             
    self.pagingDatasource = ko.observable(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(list, {idAttribute: 'ContractNumber'})));
 
    onSearchClick = function(item)
    {
       

    }
    }
  return viewModel;
});
