define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $)
      {
        var self = this;
        self.datasource=ko.observable(new oj.ArrayTableDataSource([], {}));
        
        //Hardcoded value
        self.simulationName = ko.observable([{value : '1', label : 'Simulation 1'}, {value : '2', label : 'Simulation 2'}, {value:'3', label:'Simulation 3'}]);
        self.tenureYear = ko.observable(3);
        self.tenureMonth = ko.observable('0');
        self.interestRate = ko.observable('0');
        self.purchaseDate= ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.reviewDate= ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.purcContractValue = ko.observable();
        self.cagamasRate = ko.observable(4.17);
        
        self.reviewDateValue = ko.observable();
        
        self.paymentType = [{value : 'PI', label : 'Principal + Interest'}, {value : 'I', label : 'Interest'}, {value:'H', label:'Hybrid'}];
        self.rateType = [{value : 'fixed', label : 'Fixed'}, {value : 'floating', label : 'Floating'},{value : 'convertible', label : 'convertible'}, {value : 'hybrid', label : 'Hybird'}];
                        
        function mainModel(){
            var self = this;
            self.header = "Simulations";
            var attachmentArray = [
            ];
            datasource = new oj.ArrayTableDataSource(attachmentArray, {idAttribute: 'InstallmentDate'});
            self.newCof = ko.observable(0);
            
            
            var simulateArr = [
            {Date:'27/06/2017',OpeningBalance:'32,999,713.11',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'89,638.06',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/09/2018',OpeningBalance:'32,910,075.05',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'90,572.54',InterestPayable:'343,087.53',ClosingBalance:'32,910,075.05 '},
{Date:'27/12/2018',OpeningBalance:'32,819,502.51',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'91,516.76',InterestPayable:'342,143.31',ClosingBalance:'32,910,075.05 '},
{Date:'27/03/2018',OpeningBalance:'32,727,985.75',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'93,434.83',InterestPayable:'341,189.25',ClosingBalance:'32,910,075.05 '},
{Date:'27/06/2018',OpeningBalance:'32,635,514.93',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'94,408.88',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/09/2018',OpeningBalance:'32,542,080.10',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'95,393.10',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/12/2018',OpeningBalance:'32,447,671.22',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'95,393.10',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/03/2019',OpeningBalance:'32,352,278.12',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'96,387.57',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/06/2019',OpeningBalance:'32,255,890.55',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'97,392.41',InterestPayable:'344,022.01',ClosingBalance:'32,255,890.55 '},
{Date:'27/09/2019',OpeningBalance:'32,060,090.41',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'98,407.73',InterestPayable:'344,022.01',ClosingBalance:'32,060,090.41 '},
{Date:'27/12/2019',OpeningBalance:'31,960,656.78 ',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'99,433.63',InterestPayable:'344,022.01',ClosingBalance:'31,960,656.78 '},
{Date:'27/03/2020',OpeningBalance:'31,960,656.78 ',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'100,470.22',InterestPayable:'344,022.01',ClosingBalance:'31,860,186.56 '}
            ];
            
            var simulateArr2 = [
            {Date:'27/06/2017',OpeningBalance:'32,999,713.11',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'89,638.06',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/09/2018',OpeningBalance:'32,910,075.05',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'90,572.54',InterestPayable:'343,087.53',ClosingBalance:'32,910,075.05 '},
{Date:'27/12/2018',OpeningBalance:'32,819,502.51',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'91,516.76',InterestPayable:'342,143.31',ClosingBalance:'32,910,075.05 '},
{Date:'27/03/2018',OpeningBalance:'32,727,985.75',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'93,434.83',InterestPayable:'341,189.25',ClosingBalance:'32,910,075.05 '},
{Date:'27/06/2018',OpeningBalance:'32,635,514.93',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'94,408.88',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/09/2018',OpeningBalance:'32,542,080.10',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'95,393.10',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/12/2018',OpeningBalance:'32,447,671.22',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'95,393.10',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/03/2019',OpeningBalance:'32,352,278.12',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'96,387.57',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/06/2019',OpeningBalance:'32,255,890.55',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'97,392.41',InterestPayable:'344,022.01',ClosingBalance:'32,255,890.55 '},
{Date:'27/09/2019',OpeningBalance:'32,060,090.41',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'98,407.73',InterestPayable:'344,022.01',ClosingBalance:'32,060,090.41 '},
{Date:'27/12/2019',OpeningBalance:'31,960,656.78 ',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'99,433.63',InterestPayable:'344,022.01',ClosingBalance:'31,960,656.78 '},
{Date:'27/03/2020',OpeningBalance:'31,960,656.78 ',CagamasRate:'4.42',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'100,470.22',InterestPayable:'344,022.01',ClosingBalance:'30,860,186.56 '}
            ];
            
            var simulateArr3 = [{Date:'27/06/2017',OpeningBalance:'32,999,713.11',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'89,638.06',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/09/2018',OpeningBalance:'32,910,075.05',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'90,572.54',InterestPayable:'343,087.53',ClosingBalance:'32,910,075.05 '},
{Date:'27/12/2018',OpeningBalance:'32,819,502.51',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'91,516.76',InterestPayable:'342,143.31',ClosingBalance:'32,910,075.05 '},
{Date:'27/03/2018',OpeningBalance:'32,727,985.75',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'93,434.83',InterestPayable:'341,189.25',ClosingBalance:'32,910,075.05 '},
{Date:'27/06/2018',OpeningBalance:'32,635,514.93',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'94,408.88',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/09/2018',OpeningBalance:'32,542,080.10',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'95,393.10',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/12/2018',OpeningBalance:'32,447,671.22',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'95,393.10',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/03/2019',OpeningBalance:'32,352,278.12',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'96,387.57',InterestPayable:'344,022.01',ClosingBalance:'32,910,075.05 '},
{Date:'27/06/2019',OpeningBalance:'32,255,890.55',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'97,392.41',InterestPayable:'344,022.01',ClosingBalance:'32,255,890.55 '},
{Date:'27/09/2019',OpeningBalance:'32,060,090.41',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'98,407.73',InterestPayable:'344,022.01',ClosingBalance:'32,060,090.41 '},
{Date:'27/12/2019',OpeningBalance:'31,960,656.78 ',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'99,433.63',InterestPayable:'344,022.01',ClosingBalance:'31,960,656.78 '},
{Date:'27/03/2020',OpeningBalance:'31,960,656.78 ',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'100,470.22',InterestPayable:'344,022.01',ClosingBalance:'31,860,186.56'},
{Date:'27/06/2020',OpeningBalance:'31,860,186.56',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'101,517.63',InterestPayable:'332,142.44',ClosingBalance:'31,758,668.93'},
{Date:'27/09/2020',OpeningBalance:'31,758,668.93',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'102,575.95',InterestPayable:'332,142.44',ClosingBalance:'31,656,092.98'},
{Date:'27/12/2020',OpeningBalance:'31,758,668.93',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'103,645.30',InterestPayable:'332,142.44',ClosingBalance:'31,447,721.88'},
{Date:'27/03/2021',OpeningBalance:'31,552,447.68',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'104,725.80',InterestPayable:'332,142.44',ClosingBalance:'31,447,721.88'},
{Date:'27/06/2021',OpeningBalance:'31,447,721.88',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'105,817.57',InterestPayable:'332,142.44',ClosingBalance:'31,447,721.88'},
{Date:'27/09/2021',OpeningBalance:'31,341,904.31',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'106,920.72',InterestPayable:'332,142.44',ClosingBalance:'31,234,983.59'},
{Date:'27/12/2021',OpeningBalance:'31,234,983.59',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'108,035.37',InterestPayable:'326,739.35',ClosingBalance:'31,126,948.22'},
{Date:'27/03/2022',OpeningBalance:'31,126,948.22',CagamasRate:'4.17',MortgageInstallment:'463,221.00',DeferredPurchaseValue:'29,560.93',CagamasInstallment:'433,660.07',Principal:'109,161.63',InterestPayable:'324,498.44',ClosingBalance:'31,017,786.59'}];
            
            self.simObservableArray = ko.observableArray(simulateArr);
            self.simObservableArray2 = ko.observableArray(simulateArr2);
            self.simObservableArray3 = ko.observableArray(simulateArr3);
            
            self.pagingDatasource = ko.observable(new oj.ArrayTableDataSource([], {}));
            

            self.onSimulate = function(item){
                if(tenureYear() === 3){
                    if(cagamasRate() === 4.17){
                        self.pagingDatasource(new oj.ArrayTableDataSource(self.simObservableArray, {idAttribute: 'Date'}));
                        reviewDateValue('31,860,186.56');
                    }
                    if(self.newCof() > 0){
                        cagamasRate(parseFloat(self.newCof()) + 0.42);
                        self.pagingDatasource(new oj.ArrayTableDataSource(self.simObservableArray2, {idAttribute: 'Date'})); 
                        reviewDateValue('30,860,186.56')
                    }
                }else{
                    self.pagingDatasource(new oj.ArrayTableDataSource(self.simObservableArray3, {idAttribute: 'Date'})); 
                    reviewDateValue('31,017,786.59');
                }
                
            };
            self.onClickSave = function(item){};
            self.onClickExport = function(item){};
            self.onClickBack = function(item) {
                oj.Router.rootInstance.go('is-and-simulations');
              };
            self.openSNPopUp = function(){$("#SNDialog").ojDialog("open");return true;};
        }
        
        return mainModel;
      });