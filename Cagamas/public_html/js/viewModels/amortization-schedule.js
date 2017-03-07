define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {
    var self = this;
    self.header = "Amortization Schedule";
    self.currentStatus = ko.observable();
    var list = [
    {ScheduleDate: '28/02/2017', ContractNumber: '130/MGPFI/012017/001', Product:'MGPFI', Amount:'123'},
    {ScheduleDate: '28/02/2017', ContractNumber: '130/MGPFI/022017/001', Product:'MGPFI',Amount:'123'},
    {ScheduleDate: '28/02/2017', ContractNumber: '130/MGPFI/012017/004', Product:'MGPFI',Amount:'123'}
    ];                             
    self.pagingDatasource = ko.observable();
 
    onSearchClick = function(item)
    {
    self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(list, {idAttribute: 'ContractNumber'})));
       

    }
    }
  return viewModel;
});
