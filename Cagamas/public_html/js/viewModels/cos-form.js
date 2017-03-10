define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset'],
function(oj, ko, $, configService)
{
     var self = this;
            self.config = configService;
     
  function viewModel()
  {
    header="Confirmation of Sale";
        self.pwrLimit = ko.observable('1,500.00 (as at 31 January 2017)');
        self.currUtilization = ko.observable('853.00 (as at 31 January 2017)');
        self.avlLimit = ko.observable('647.00 (as at 31 January 2017)');
    redirectToPC= function(item) {
                    self.config.status = "temp-pwrts";
                    self.config.form = "1";
                    self.config.letter = "0";
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
