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
                self.header = "Quarterly Review Caga 1";
                self.startDate = ko.observable();
                self.endDate = ko.observable();
                self.onSearch = function(item){};
                self.onReset = function(item){};
                self.onBack = function(item){};
                self.filterOption = ko.observable();
                var openTrx = [
                
                ];
                self.openTrxObservableArray = ko.observableArray(openTrx);
                
                self.datasourceOpenTrx = ko.observable(new oj.ArrayTableDataSource(self.openTrxObservableArray, {idAttribute: 'RentasCPName'}));
                
                self.onClickBack = function(){
                    self.config.status = "caga1";
                    oj.Router.rootInstance.go('quarterly-reviews-dashboard');
                };
            }
            
            return mainViewModel;        
                      

        });