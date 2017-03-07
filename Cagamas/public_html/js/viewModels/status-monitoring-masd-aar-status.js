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
    self.currentStatus = ko.observable();
    var AAR = [
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'01', Year:'2017',FileType:'AAR',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'02', Year:'2017',FileType:'AAR',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'03', Year:'2017',FileType:'AAR',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'04', Year:'2017',FileType:'AAR',Status:'Submitted'}
    ];                
    var MASD1 = [
    {EligibleInstitution: 'CIMB Bank Berhad', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'05', Year:'2017',FileType:'MASD1',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank Berhad', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'06', Year:'2017',FileType:'MASD1',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank Berhad', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'07', Year:'2017',FileType:'MASD1',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank Berhad', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'08', Year:'2017',FileType:'MASD1',Status:'Submitted'}
    ];                
    var MASD2 = [
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'01', Year:'2017',FileType:'MASD2',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'02', Year:'2017',FileType:'MASD2',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'03', Year:'2017',FileType:'MASD2',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'04', Year:'2017',FileType:'MASD2',Status:'Submitted'}
    ];                
    var MASD3 = [
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'09', Year:'2017',FileType:'MASD3',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'10', Year:'2017',FileType:'MASD3',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'11', Year:'2017',FileType:'MASD3',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'12', Year:'2017',FileType:'MASD3',Status:'Submitted'}
    ];                
    var ALL = [
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '123/MGPFI/012017/001', Product:'MGPFI', Month:'09', Year:'2017',FileType:'MASD1',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank Berhad', ContractNumber: '456/MGPFI/012017/001', Product:'MGPFI', Month:'10', Year:'2017',FileType:'MASD2',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank', ContractNumber: '345/MGPFI/012017/001', Product:'MGPFI', Month:'11', Year:'2017',FileType:'MASD3',Status:'Submitted'},
    {EligibleInstitution: 'CIMB Bank Berhad', ContractNumber: '456/MGPFI/012017/001', Product:'MGPFI', Month:'12', Year:'2017',FileType:'AAR',Status:'Submitted'}
    ];                
    self.pagingDatasource = ko.observable(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(MASD1, {idAttribute: 'ContractNumber'})));
 
    onSearchClick = function(item)
    {
        if(self.currentStatus()=='masd1')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(MASD1, {idAttribute: 'ContractNumber'})));
        }
        else if(self.currentStatus()=='masd2')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(MASD2, {idAttribute: 'ContractNumber'})));
        }
        else if(self.currentStatus()=='masd3')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(MASD3, {idAttribute: 'ContractNumber'})));
        }
        else if(self.currentStatus()=='aar')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(AAR, {idAttribute: 'ContractNumber'})));
        }
        else if(self.currentStatus()=='all')
        {
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(ALL, {idAttribute: 'ContractNumber'})));
        }

    }
    }
  return viewModel;
});
