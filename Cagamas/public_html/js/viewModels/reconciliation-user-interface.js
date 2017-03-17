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
                
            function mainViewModel() {
                self.header = "Reconciliation User Interface";
                self.startDate = ko.observable();
                self.endDate = ko.observable();
                self.onSearch = function(item){};
                self.onReset = function(item){};
                self.onBack = function(item){};
                self.filterOption = ko.observable();
                var scheduleDetail = [
                {ContractNumber: '130/MGPFI/012017/001', InstallmentDueDate:'01/28/2017', CPName:'CIMB Bank', InstallmentAmount:'100,000', Currency:'MYR', Remarks:'', Status:'Paid', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:false},
                {ContractNumber: '130/MGPFI/012017/001', InstallmentDueDate:'01/28/2017', CPName:'CIMB Bank Berhad', InstallmentAmount:'200,000', Currency:'MYR', Remarks:'',  Status:'Matched', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:true},
                {ContractNumber: '130/MGPFI/012017/001', InstallmentDueDate:'01/28/2017', CPName:'CIMB Bank', InstallmentAmount:'300,000', Currency:'MYR', Remarks:'', Status:'Pending', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:false}
                ];
                var scheduleDetail2 = [
                {ContractNumber: '130/MGPFI/012017/001', InstallmentDueDate:'01/28/2017', CPName:'CIMB Bank', InstallmentAmount:'100,000', Currency:'MYR', Remarks:'', Status:'Matched', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:true},
                {ContractNumber: '130/MGPFI/012017/001', InstallmentDueDate:'01/28/2017', CPName:'CIMB Bank Berhad', InstallmentAmount:'200,000', Currency:'MYR', Remarks:'',  Status:'Matched', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:true},
                {ContractNumber: '130/MGPFI/012017/001', InstallmentDueDate:'01/28/2017', CPName:'CIMB Bank', InstallmentAmount:'300,000', Currency:'MYR', Remarks:'', Status:'Matched', selected:'', PartialAmountMatched:'', PartialAmountOpen:'', checkdisabled:true}
                ];
                var openTrx = [
                {RentasCPName: 'CIMB Bank', RentasTrxDate:'01/28/2017', RentasTrxAmount:'100,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Paid', selected:'', checkdisabled:false},
                {RentasCPName: 'CIMB Bank Berhad', RentasTrxDate:'01/28/2017', RentasTrxAmount:'100,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Matched', selected:'', checkdisabled:true},
                {RentasCPName: 'CIMB', RentasTrxDate:'01/28/2017', RentasTrxAmount:'100,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Paid', selected:'', checkdisabled:false},
                ];
                var openTrx2 = [
                {RentasCPName: 'CIMB Bank Berhad', RentasTrxDate:'01/28/2017', RentasTrxAmount:'100,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Matched', selected:'', checkdisabled:true},
                {RentasCPName: 'CIMB', RentasTrxDate:'01/28/2017', RentasTrxAmount:'100,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Paid', selected:'', checkdisabled:false},
                ];
                  var openTrx3 = [
                {RentasCPName: 'CIMB Bank Berhad', RentasTrxDate:'01/28/2017', RentasTrxAmount:'100,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Matched', selected:'', checkdisabled:true},
                {RentasCPName: 'CIMB', RentasTrxDate:'01/28/2017', RentasTrxAmount:'100,000', Currency:'MYR', RentasTrxDesc:'',NonLasTrx:'',NonLasReason:'', Status:'Matched', selected:'', checkdisabled:true},
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
                
                };
            }
            
            return mainViewModel;        
                      

        });