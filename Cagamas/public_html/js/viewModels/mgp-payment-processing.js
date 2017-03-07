define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {
    var self = this;
    self.header = "MGP Payment Processing";
    this.dateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2017, 2, 22)));
    self.currentStatus = ko.observable();
    var mgp = [
    {ContractNumber: '130/MGPFI/012017/003', PaymentDueDate:'28/01/2017', PaymentFee:'1234', PaymentDate:'28/01/2017', Status:'Paid'},
    {ContractNumber: '130/MGPFI/012017/003', PaymentDueDate:'28/01/2017', PaymentFee:'123', PaymentDate:'', Status:'Payment'},
    {ContractNumber: '130/MGPFI/012017/003', PaymentDueDate:'28/01/2017', PaymentFee:'234', PaymentDate:'', Status:'Payment'}
    ];
    self.pagingDatasource = ko.observable(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(mgp, {idAttribute: 'ContractNumber'})));
 
    onSearchClick = function(item)
    {

    }
    }
  return viewModel;
});
