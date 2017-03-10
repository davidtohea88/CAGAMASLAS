define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService','ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset'],
function(oj, ko, $,configService)
{
     var self = this;
            self.config = configService;
  function viewModel()
  {
    header="Confirmation of Sale";
        redirectToPC= function(item) {
      oj.Router.rootInstance.go('origination-pc');
    }
    redirectToPC= function(item) {
            self.config.status = "temp-pwrts";
            self.config.letter = "1";
            self.config.form = "0";
            oj.Router.rootInstance.go('origination-pc');
    }
    

  }
  return viewModel;
});
