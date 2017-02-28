
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource'],
function(oj, ko, $)
{
  function viewModel()
  {
    var self = this;

    var deptArray = [
    {OriginationId: 'PI0001', CounterPartyName: 'Oracle Corp.', ProductType:'PWR', PurchaseAmount:'100,000,000', Currency:'MYR', OriginationStatus: 'PI'},
    {OriginationId: 'PI0002', CounterPartyName: 'Oracle Corp.', ProductType:'PWR', PurchaseAmount:'30,000,000', Currency:'MYR', OriginationStatus: 'PI'},
    {OriginationId: 'PI0003', CounterPartyName: 'Maybank', ProductType:'PWR', PurchaseAmount:'15,000,000', Currency:'MYR', OriginationStatus: 'PC', PurchaseContractID: '127/000/2810/159074/TX1/Q/C0-0/0'},
    {OriginationId: 'PI0004', CounterPartyName: 'Maybank', ProductType:'PWR', PurchaseAmount:'900,000', Currency:'MYR', OriginationStatus: 'PC', PurchaseContractID: '127/000/2810/159074/TX1/Q/C0-0/1'},
    {OriginationId: 'PI0005', CounterPartyName: 'Oracle Corp.', ProductType:'PWR', PurchaseAmount:'10,000,000', Currency:'MYR', OriginationStatus: 'PI'},
    {OriginationId: 'PI0006', CounterPartyName: 'Oracle Corp.', ProductType:'PWR', PurchaseAmount:'30,000,000',Currency:'MYR',  OriginationStatus: 'PI'},
    ];
    self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'OriginationId'}));
    self.header="Origination";
    self.buttonClick= function(item) {
    if(item.OriginationStatus=='PI')
    {
        history.pushState(null, '', 'index.html?root=origination-pi&id=' + item.OriginationId);
    }
    else {
        history.pushState(null, '', 'index.html?root=origination-pc&id=' + item.PurchaseContractID);
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
