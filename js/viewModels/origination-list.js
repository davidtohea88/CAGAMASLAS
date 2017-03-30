
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojinputtext', 'ojs/ojbutton',
'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource',
'ojs/ojselectcombobox'],
function(oj, ko, $)
{
  function viewModel()
  {
    var self = this;

    var deptArray = [
    {OriginationId: 'T-127/000/2810/159074/TL1/Q/C0-0/0', CounterPartyName: 'CIMB Bank', ProductType:'PWR', PurchaseAmount:'33,000,000', Currency:'MYR', OriginationStatus: 'PC', PurchaseContractID: 'T-127/000/2810/159074/TL1/Q/C0-0/0'},
    {OriginationId: 'PI0002', CounterPartyName: 'AmBank Berhad', ProductType:'PWR', PurchaseAmount:'30,000,000', Currency:'MYR', OriginationStatus: 'PI', PurchaseContractID: 'PI02'},
    {OriginationId: 'PI0003', CounterPartyName: 'Maybank', ProductType:'PWR', PurchaseAmount:'15,000,000', Currency:'MYR', OriginationStatus: 'PI', PurchaseContractID: 'PC01'}
    ];
    self.observableArray = ko.observableArray(deptArray);
    self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.observableArray, {idAttribute: 'OriginationId'}));
    self.header="Origination";
    self.buttonClick= function(item) {
    if(item.OriginationStatus=='PI')
    {
        history.pushState(null, '', 'index.html?root=origination-pi-2&id=' + item.OriginationId);
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
    self.onClickNew = function(){
        oj.Router.rootInstance.go('origination-pi');
    };    
  }
  return viewModel;

});
