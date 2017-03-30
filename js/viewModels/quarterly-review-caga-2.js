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
                self.config = configService;

            function mainViewModel() {
                self.header = "Quarterly Review Caga 2";
                self.startDate = ko.observable();
                self.endDate = ko.observable();
                self.onSearch = function(item){};
                self.onReset = function(item){};
                self.onBack = function(item){};
                self.filterOption = ko.observable();
                var openTrx = [
                {RentasCPName: '23-03-2017', RentasTrxDate:'150/301/1111/110142/TX1/0/C0-0/0', RentasTrxAmount:'40004000827600000', Currency:'00004', RentasTrxDesc:'16,384.41',NonLasTrx:'23/03/2017',NonLasReason:'0', Status:'COMPLETE', selected:'', checkdisabled:false},
{RentasCPName: '23-03-2017', RentasTrxDate:'150/301/1111/110142/TX1/0/C0-0/0', RentasTrxAmount:'40008001616600000', Currency:'00008', RentasTrxDesc:'8,294.53',NonLasTrx:'10/03/2017',NonLasReason:'0', Status:'COMPLETE', selected:'', checkdisabled:false},
{RentasCPName: '23-03-2017', RentasTrxDate:'150/301/1111/110142/TX1/0/C0-0/0', RentasTrxAmount:'40016000092900000', Currency:'00016', RentasTrxDesc:'3,000.00',NonLasTrx:'18/03/2017',NonLasReason:'0', Status:'COMPLETE', selected:'', checkdisabled:false},
{RentasCPName: '23-03-2017', RentasTrxDate:'150/301/1111/110143/TX1/0/C0-0/0', RentasTrxAmount:'40002000396000000', Currency:'00002', RentasTrxDesc:'32,910.63',NonLasTrx:'27/02/2017',NonLasReason:'0', Status:'COMPLETE', selected:'', checkdisabled:false}
                ];
                self.openTrxObservableArray = ko.observableArray(openTrx);
                
                self.datasourceOpenTrx = ko.observable(new oj.ArrayTableDataSource(self.openTrxObservableArray, {idAttribute: 'RentasCPName'}));
                self.onClickBack = function(){
                    self.config.status = "caga2";
                    oj.Router.rootInstance.go('quarterly-reviews-dashboard');
                };

            }
            
            return mainViewModel;        
                      

        });