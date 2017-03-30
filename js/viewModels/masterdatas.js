
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource'],
function(oj, ko, $)
{
  function viewModel()
  {
    var self = this;

    var deptArray = [
    {MasterId: 10015, MasterName: 'ADFPM 1001 neverending'},
    {MasterId: 10015, MasterName: 'ADFPM 1001 neverending'},
    {MasterId: 10015, MasterName: 'ADFPM 1001 neverending'},
    {MasterId: 10015, MasterName: 'ADFPM 1001 neverending'},
    {MasterId: 10015, MasterName: 'ADFPM 1001 neverending'},
    {MasterId: 10015, MasterName: 'ADFPM 1001 neverending'},
    ];
    self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'MasterId'}));
    self.header="Master Data List";
  }
  return viewModel;

});
