define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {
    var self = this;
    self.header = "MGP Payment Processing";
    this.dateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2017, 0, 28)));
    self.currentStatus = ko.observable();
    var gr = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1234', PaymentDate:'28/01/2017', Status:'Paid'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1234', PaymentDate:'', Status:'Pending'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1234', PaymentDate:'', Status:'Pending'}
    ];
    var gf = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1235', PaymentDate:'28/01/2017', Status:'Paid'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1235', PaymentDate:'', Status:'Pending'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1235', PaymentDate:'', Status:'Pending'}
    ];
    var sf = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1236', PaymentDate:'28/01/2017', Status:'Paid'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1236', PaymentDate:'', Status:'Pending'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1236', PaymentDate:'', Status:'Pending'}
    ];
    var lpf = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1237', PaymentDate:'28/01/2017', Status:'Paid'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1237', PaymentDate:'', Status:'Pending'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1237', PaymentDate:'', Status:'Pending'}
    ];
    self.pagingDatasource = ko.observable();    
 
    onSearchClick = function(item)
    {
        if(self.currentStatus()=="gr") {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(gr, {idAttribute: 'ContractNumber'})));    
        }
        else if(self.currentStatus()=="gf") {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(gf, {idAttribute: 'ContractNumber'})));    
        }
        else if(self.currentStatus()=="sf") {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(sf, {idAttribute: 'ContractNumber'})));    
        }
        else if(self.currentStatus()=="lpf") {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(lpf, {idAttribute: 'ContractNumber'})));    
        }

    };
    
    onExportClick = function(item)
    {
    };
    
    onPrintClick = function(item)
    {
    };
    
    }
  return viewModel;
});
