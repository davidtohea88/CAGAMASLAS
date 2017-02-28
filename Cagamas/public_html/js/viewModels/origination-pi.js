/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery',
           'ojs/ojknockout', 'ojs/ojinputtext','ojs/ojselectcombobox','ojs/ojdatetimepicker', 'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource'],
        function (oj, ko, $)
        {
            /* 
             * Your application specific code will go here
             */

            function mainViewModel() {
                var self = this;
                self.header = "Preliminary Indication";
                self.openCPPopUp = function(){$("#scrollingDialog").ojDialog("open");return true;};
                self.closeCPPopUp = function(){$("#scrollingDialog").ojDialog("close");return true;};
    var deptArray = [
    {CPCode: 'CIMBSD', CPName: 'CIMB Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 3,6,9,12'},
    {CPCode: 'CIMBINV', CPName: 'CIMB Investment Bank BHD', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
    {CPCode: 'CIMBINVSPI', CPName: 'CIMB Investment Bank BHD-SPI', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
    {CPCode: 'CIMBISD', CPName: 'CIMB Islamic Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 2,5,8,11'},
    {CPCode: 'CIMBSD', CPName: 'CIMB Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 3,6,9,12'},
    {CPCode: 'CIMBINV', CPName: 'CIMB Investment Bank BHD', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
    {CPCode: 'CIMBINVSPI', CPName: 'CIMB Investment Bank BHD-SPI', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 1,4,7,10'},
    {CPCode: 'CIMBISD', CPName: 'CIMB Islamic Bank Sub Debt', CPGroup:'CIMB', CPType:'FI', FRGroup:'Qtr Ending Month 2,5,8,11'}
    ];
    self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'CPCode'}));

                
            }
            


            return mainViewModel;
            

        });
