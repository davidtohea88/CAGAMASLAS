define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $)
{
     var self = this;
  function viewModel()
  {
    var self = this;
    self.header = "MASD and AAR Status";
    self.months = [{value : '0', label : 'Month'},
                        {value : '1', label : 'January'},
                        {value : '2', label : 'February'},
                        {value : '3', label : 'March'},
                        {value : '4', label : 'April'},
                        {value : '5', label : 'May'},
                        {value : '6', label : 'June'},
                        {value : '7', label : 'July'},
                        {value : '8', label : 'August'},
                        {value : '9', label : 'September'},
                        {value : '10', label : 'October'},
                        {value : '11', label : 'November'},
                        {value : '12', label : 'December'}];
    self.years = [{value : '0', label : 'Year'},
                        {value : '2016', label : '2016'},
                        {value : '2017', label : '2017'},
                        {value : '2018', label : '2018'}];
    var CPArray = [
    {EligibleInstitution: 'CIMB Bank Berhad', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'01', Year:'2017',FileType:'MASD1',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank Berhad', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'01', Year:'2017',FileType:'MASD1',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank Berhad', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'01', Year:'2017',FileType:'MASD1',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank Berhad', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'01', Year:'2017',FileType:'MASD1',Status:'Submitted'}
    ];                
    pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray, {idAttribute: 'ContractNumber'}));

    }
  return viewModel;
});
