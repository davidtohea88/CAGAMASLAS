
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource'],
function(oj, ko, $)
{
  function viewModel()
  {
    var self = this;

    var deptArray = [
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'Uploaded'},
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'Draft'},
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'PC Created', PurchaseContractID: 'PC0001'},
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'Draft'},
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'Draft'},
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'Draft'},
    ];
    self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'OriginationId'}));
    self.header="Origination";
  }
  return viewModel;

});
