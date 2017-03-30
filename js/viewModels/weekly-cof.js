define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $, configService)
{
        var self = this;
      function viewModel()
      {
    
       openCPPopUp = function(){$("#CPDialog").ojDialog("open");return true;};
       self.DateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
    
       var deptArray = [
        {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', PCInstallmentSchedule:'IS', Simulation:'View'},
        {Counterparty: 'CIMB', PurchaseContractNumber: '127/000/2701/179074/TL1', PCInstallmentSchedule:'IS', Simulation:'Create'},
        ];
        header="Weekly COF";
        pagingDatasourceIS = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'Counterparty'}));
        redirectToPC= function(item) {
          oj.Router.rootInstance.go('origination-pc');
        }
            redirectToSimulations= function(item) {
          oj.Router.rootInstance.go('simulations');
        }
        
        rateType = [{value : 'fixed', label : 'Fixed'}, {value : 'floating', label : 'Floating'}];
        tenure = [{value : '1', label : '1'},
                    {value : '2', label : '2'},
                    {value : '3', label : '3'},
                    {value : '4', label : '4'},
                    {value : '5', label : '5'},
                    {value : '6', label : '6'},
                    {value : '7', label : '7'},
                    {value : '8', label : '8'},
                    {value : '9', label : '9'},
                    {value : '10', label : '10'}
                    ];
                    self.bch = [{value : '', label : ''},{value : 'kli3', label : 'KLIBOR 3 MONTH'}, {value : 'kli6', label : 'KLIBOR 6 MONTH'}];
        self.bchsrc = [{value : '', label : ''},{value: 'Reuters', label: 'Reuters'},{value: 'Bloomberg', label: 'Bloomberg'},{value: 'Cagamas', label: 'Cagamas'}];
        self.selectedCP = ko.observable();
        var CPArray1 = [
        {Date:  '1/2/2017', benchmarkRate:'', spread:'', weeklyCOF:'4.17',tenure:3, isFixed:false, selectedRateType:'Fixed'},
        {Date:  '3/2/2017',benchmark_item:'kli3',benchmark_source_item:'Reuters' ,benchmarkRate:'4.02', spread:'0.2',benchmark_rate_item:'4,07',tenure:3, weeklyCOF:'4.27', isFixed:true, selectedRateType:'Floating'}
        ];               
        var CPArray2 = [
        {Date:  '1/2/2017', benchmarkRate:'', spread:'', weeklyCOF:'4.17', isFixed:false, selectedRateType:'Fixed'},
        {Date:  '3/2/2017',benchmark_item:'kli3',benchmark_source_item:'Reuters' ,benchmarkRate:'4.02', spread:'0.2',benchmark_rate_item:'4,07',tenure:3, weeklyCOF:'4.27', isFixed:true, selectedRateType:'Floating'}
        ];               
        self.pagingDatasource = ko.observable();
        onSearch =  function(item) {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray1, {idAttribute: 'Date'})));
    
        };    
        
        
        self.openFileDialog = function (){
              document.getElementById("browseFile").click();
            }
        typeOptionChangedHandler = function(event,data) {
//                    if(data.option=='value')
//                    {
//                        if (data.value == "fixed") {
//            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray1, {idAttribute: 'Date'})));
//                        }
//                        else {
//            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray2, {idAttribute: 'Date'})));
//                        }
//                    }
                };
      }
      return viewModel;
});
