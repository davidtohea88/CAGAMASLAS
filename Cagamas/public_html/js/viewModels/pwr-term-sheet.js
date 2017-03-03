define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $)
      {
        var self = this;
        self.pwrDatasource=ko.observable(new oj.ArrayTableDataSource([], {})); 
        self.underlyingDatasource=ko.observable(new oj.ArrayTableDataSource([], {})); 
        
        //Hardcoded value
        self.pwrLimit = ko.observable('1,500.00 (as at 31 January 2017)');
        self.currUtilization = ko.observable('853.00 (as at 31 January 2017)');
        self.avlLimit = ko.observable('647.00 (as at 31 January 2017)');
        self.currentDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        function mainModel(){
            var self = this;
            self.header = "PWR Term Sheet";
            
            var pwrTypeArray = [{pwrType:'DFIA (exclude housing loan)', concentrationLimit:'RM 4 billion', exposures:'RM 671 mil'},
                                {pwrType:'Non-FI (corporations & credit/leasing)', concentrationLimit:'RM 1 billion', exposures:'RM 467 mil'}];
            pwrDatasource = new oj.ArrayTableDataSource(pwrTypeArray, {idAttribute: 'pwrType'});
            
            var underlyingTypeArray = [{underlyingType:'Non Housing Loan', concentrationLimit:'Not more than 50% of Total Exposures', exposures:'11.22%'}];
            underlyingDatasource = new oj.ArrayTableDataSource(underlyingTypeArray, {idAttribute: 'underlyingType'});
            var cf = oj.Validation.converterFactory("datetime");
            var ecmaBirthDateOptions = {day: '2-digit', month: 'long', year: 'numeric'};
            self.longDateConverter = cf.createConverter(ecmaBirthDateOptions);
            
            self.onClickPrint = function(item){};
            self.onClickSubmit = function(item){};
            self.onClickBack = function(item){};
            
        }
        
        return mainModel;
      });