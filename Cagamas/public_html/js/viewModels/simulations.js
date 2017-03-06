define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $)
      {
        var self = this;
        self.datasource=ko.observable(new oj.ArrayTableDataSource([], {}));
        
        //Hardcoded value
        self.simulationName = ko.observable();
        self.tenureYear = ko.observable('1');
        self.tenureMonth = ko.observable('0');
        self.interestRate = ko.observable('0');
        self.purchaseDate= ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.reviewDate= ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.purcContractValue = ko.observable();
        self.cagamasRate = ko.observable();
        self.reviewDateValue = ko.observable();
        
        self.paymentType = [{value : 'PI', label : 'Principal + Interest'},
                            {value : '0', label : '0'}]
        self.rateType = [{value : 'Fixed', label : 'Fixed'},
                        {value : '0', label : '0'}]
                        
        function mainModel(){
            var self = this;
            self.header = "Simulations";
            var attachmentArray = [];
            datasource = new oj.ArrayTableDataSource(attachmentArray, {idAttribute: 'InstallmentDate'});
            
            self.onClickSave = function(item){};
            self.onClickExport = function(item){};
            self.onClickBack = function(item){};
            self.openSNPopUp = function(){$("#SNDialog").ojDialog("open");return true;};
        }
        
        return mainModel;
      });