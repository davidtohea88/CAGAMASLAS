
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource'],
function(oj, ko, $)
{
  function viewModel()
  {
    var self = this;

    var deptArray = [
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'PI'},
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'PI'},
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'PC', PurchaseContractID: 'PC0001'},
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'PC', PurchaseContractID: 'PC0001'},
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'PI'},
    {OriginationId: 10015, OriginationName: 'ADFPM 1001 neverending', OriginationStatus: 'PI'},
    ];
    self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'OriginationId'}));
    self.header="Origination";
    self.buttonClick= function(item) {
    if(item.OriginationStatus=='PI')
    {
        history.pushState(null, '', 'index.html?root=pwr&id=' + item.OriginationId);
    }
    else {
        history.pushState(null, '', 'index.html?root=pwor&id=' + item.PurchaseContractID);
    }
        oj.Router.sync();
    };
    self.disableControls = function(id){
        if(id!='')
        {
            return (true);
        }
        else {
            return (false);
        }
    };
    
  }
  return viewModel;

});
