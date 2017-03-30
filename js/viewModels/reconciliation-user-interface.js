/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService',
           'ojs/ojknockout', 'ojs/ojinputtext','ojs/ojselectcombobox','ojs/ojdatetimepicker', 'ojs/ojbutton', 'ojs/ojradioset', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojcheckboxset'],
        function (oj, ko, $,configService)
        {
            /* 
             * Your application specific code will go here
             */
                var self = this;
                self.r1 = ko.observable();
        self.r2 = ko.observable();
        self.r3 = ko.observable();
        self.r4 = ko.observable();
                
            function mainViewModel() {
                self.header = "Reconciliation User Interface";
                self.startDate = ko.observable();
                self.endDate = ko.observable();
                self.onSearch = function(item){};
                self.onReset = function(item){};
                self.onBack = function(item){};
                self.filterOption = ko.observable();
                var scheduleDetail = [
                {ContractNumber: '134/000/1349/210329/TL1/Q/C0-0/0', InstallmentDueDate:'24/03/2017', CPName:'Maybank Berhad', InstallmentAmount:'100,000', Currency:'MYR', Remarks:'', Status:'Partial', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:false},
                {ContractNumber: '134/000/1349/210329/TL1/Q/C0-0/0', InstallmentDueDate:'24/03/2017', CPName:'Maybank Berhad', InstallmentAmount:'200,000', Currency:'MYR', Remarks:'',  Status:'Partial', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:true},
                {ContractNumber: '103/000/2230/131434/TL1/Q/C0-0/0', InstallmentDueDate:'24/03/2017', CPName:'CIMB Bank', InstallmentAmount:'100,000', Currency:'MYR', Remarks:'', Status:'Auto', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:false}
                ];
                var scheduleDetail2 = [
                {ContractNumber: '134/000/1349/210329/TL1/Q/C0-0/0', InstallmentDueDate:'24/03/2017', CPName:'Maybank Berhad', InstallmentAmount:'100,000', Currency:'MYR', Remarks:'', Status:'Matched', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:true},
                {ContractNumber: '134/000/1349/210329/TL1/Q/C0-0/0', InstallmentDueDate:'24/03/2017', CPName:'Maybank Berhad', InstallmentAmount:'200,000', Currency:'MYR', Remarks:'',  Status:'Matched', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:true},
                {ContractNumber: '103/000/2230/131434/TL1/Q/C0-0/0', InstallmentDueDate:'24/03/2017', CPName:'CIMB Bank', InstallmentAmount:'100,000', Currency:'MYR', Remarks:'', Status:'Matched', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:true}
                ];
                var openTrx = [
                {RentasCPName: 'Maybank Berhad', RentasTrxDate:'23/03/2017', RentasTrxAmount:'300,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Open', selected:'', checkdisabled:false},
                {RentasCPName: 'CIMB Bank', RentasTrxDate:'21/03/2017', RentasTrxAmount:'100,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Auto', selected:'', checkdisabled:false},
                ];
                var openTrx2 = [
                {RentasCPName: 'Maybank Berhad', RentasTrxDate:'23/03/2017', RentasTrxAmount:'300,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Matched', selected:'', checkdisabled:true},
                {RentasCPName: 'CIMB Bank', RentasTrxDate:'21/03/2017', RentasTrxAmount:'100,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Matched', selected:'', checkdisabled:false},
                ];
                  var openTrx3 = [
                {RentasCPName: 'Maybank Berhad', RentasTrxDate:'23/03/2017', RentasTrxAmount:'300,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Matched', selected:'', checkdisabled:true},
                {RentasCPName: 'CIMB Bank', RentasTrxDate:'21/03/2017', RentasTrxAmount:'100,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Matched', selected:'', checkdisabled:true},
                ];
                self.scheduleDetailObservableArray = ko.observableArray(scheduleDetail);
                self.scheduleDetailObservableArray2 = ko.observableArray(scheduleDetail2);
                self.openTrxObservableArray = ko.observableArray(openTrx);
                self.openTrxObservableArray2 = ko.observableArray(openTrx2);
                self.openTrxObservableArray3 = ko.observableArray(openTrx3);
                
                self.datasource = ko.observable(new oj.ArrayTableDataSource(self.scheduleDetailObservableArray, {idAttribute: 'ContractNumber'}));
                self.datasourceOpenTrx = ko.observable(new oj.ArrayTableDataSource(self.openTrxObservableArray, {idAttribute: 'RentasCPName'}));
                onRemove = function(item){
                   self.datasourceOpenTrx(new oj.ArrayTableDataSource(self.openTrxObservableArray2, {idAttribute: 'RentasCPName'}));
                };
                onReconcile = function(item) {
                   self.datasource(new oj.ArrayTableDataSource(self.scheduleDetailObservableArray2, {idAttribute: 'ContractNumber'}));
                   self.datasourceOpenTrx(new oj.ArrayTableDataSource(self.openTrxObservableArray3, {idAttribute: 'RentasCPName'}));
                    r1("Maybank Berhad");
                    r2("24-03-2017");
                    r3("300,000.00");
                    r4("");
                };
            }
            
            return mainViewModel;        
                      

        });