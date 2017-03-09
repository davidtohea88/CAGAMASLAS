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
    redirectToPC= function(item) {
                history.pushState(null, '', 'index.html?root=origination-pc&status=temp-pwrts&letter=1');
                oj.Router.sync();
    }
    

  }
  return viewModel;
});
