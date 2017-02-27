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
                var self = this;
                self.openCPPopUp = function(){$("#scrollingDialog").ojDialog("open");return true;}
                self.closeCPPopUp = function(){$("#scrollingDialog").ojDialog("close");return true;}
                var deptArray = [
                {OriginationId: 'PI0001', CounterPartyName: 'Oracle Corp.', ProductType:'PWR', PurchaseAmount:'100,000,000', Currency:'MYR', OriginationStatus: 'PI'},
                {OriginationId: 'PI0002', CounterPartyName: 'Oracle Corp.', ProductType:'PWR', PurchaseAmount:'30,000,000', Currency:'MYR', OriginationStatus: 'PI'},
                {OriginationId: 'PI0003', CounterPartyName: 'Maybank', PurchaseAmount:'15,000,000', Currency:'MYR', OriginationStatus: 'PC', PurchaseContractID: '127/000/2810/159074/TX1/Q/C0-0/0'},
                {OriginationId: 'PI0004', CounterPartyName: 'Maybank', PurchaseAmount:'900,000', Currency:'MYR', OriginationStatus: 'PC', PurchaseContractID: '127/000/2810/159074/TX1/Q/C0-0/1'},
                {OriginationId: 'PI0005', CounterPartyName: 'Oracle Corp.', ProductType:'PWR', PurchaseAmount:'10,000,000', Currency:'MYR', OriginationStatus: 'PI'},
                {OriginationId: 'PI0006', CounterPartyName: 'Oracle Corp.', ProductType:'PWR', PurchaseAmount:'30,000,000',Currency:'MYR',  OriginationStatus: 'PI'}
                ];
                self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(deptArray, {idAttribute: 'OriginationId'}));

                
            }
            


            return mainViewModel;
            

        });
