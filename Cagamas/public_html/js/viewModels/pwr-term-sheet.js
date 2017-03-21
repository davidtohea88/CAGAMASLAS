define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $, configService )
      {
        var self = this;
        self.config = configService;
        
        self.pwrDatasource=ko.observable(new oj.ArrayTableDataSource([], {})); 
        self.underlyingDatasource=ko.observable(new oj.ArrayTableDataSource([], {})); 
        
        //Hardcoded value
        self.pwrLimit = ko.observable('1,500.00 (as at 31 January 2017)');
        self.currUtilization = ko.observable('853.00 (as at 31 January 2017)');
        self.avlLimit = ko.observable('647.00 (as at 31 January 2017)');
        self.currentDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        function mainModel(){
            self.header = "PWR Term Sheet";
            self.cofDate = "31/12/2016"
            self.finalCofDate = "1/2/2017"
            var pwrTypeArray = [{pwrType:'DFIA (exclude housing loan)', concentrationLimit:'RM 4 billion', exposures:'RM 671 mil'},
                                {pwrType:'Non-FI (corporations & credit/leasing & exclude housing loan)', concentrationLimit:'RM 1 billion', exposures:'RM 467 mil'}];
            pwrDatasource = new oj.ArrayTableDataSource(pwrTypeArray, {idAttribute: 'pwrType'});
            
            var underlyingTypeArray = [{underlyingType:'Non Housing Loan', concentrationLimit:'Not more than 50% of Total Exposures', exposures:'11.22%'}];
            underlyingDatasource = new oj.ArrayTableDataSource(underlyingTypeArray, {idAttribute: 'underlyingType'});
            var cf = oj.Validation.converterFactory("datetime");
            var ecmaBirthDateOptions = {day: '2-digit', month: 'long', year: 'numeric'};
            self.longDateConverter = cf.createConverter(ecmaBirthDateOptions);
            
            self.onClickPrint = function(item){
                window.print();   
            };
            self.onClickSubmit = function(item){
                    self.config.status = "temp-pwrts";
                    oj.Router.rootInstance.go('origination-pc');
            };
            self.onClickBack = function(item){
                    self.config.status = "temp-is";
                    oj.Router.rootInstance.go('origination-pc');
            };
            
        }
        
        return mainModel;
      });