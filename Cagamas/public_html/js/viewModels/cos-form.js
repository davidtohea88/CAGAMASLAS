define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {
    header="Confirmation of Sale";
        redirectToPC= function(item) {
      oj.Router.rootInstance.go('origination-pc');
    }
    var pwrTypeArray = [{pwrType:'DFIA (exclude housing loan)', concentrationLimit:'RM 4 billion', exposures:'RM 671 mil'},
                        {pwrType:'Non-FI (corporations & credit/leasing)', concentrationLimit:'RM 1 billion', exposures:'RM 467 mil'}];
    pwrDatasource = new oj.ArrayTableDataSource(pwrTypeArray, {idAttribute: 'pwrType'});
    
    var underlyingTypeArray = [{underlyingType:'Non Housing Loan', concentrationLimit:'Not more than 50% of Total Exposures', exposures:'11.22%'}];
    underlyingDatasource = new oj.ArrayTableDataSource(underlyingTypeArray, {idAttribute: 'underlyingType'});

  }
  return viewModel;
});
