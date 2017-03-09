/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

define(['ojs/ojcore', 'knockout',  'data/data','jquery',
           'ojs/ojknockout', 'ojs/ojinputtext','ojs/ojselectcombobox','ojs/ojdatetimepicker', 'ojs/ojbutton', 'ojs/ojradioset'],
        function (oj, ko,jsonData, $)
        {
            /* 
             * Your application specific code will go here
             */

            function mainViewModel() {
                var self = this;
                self.header = "Rate and Installment Schedule Setup";

                self.selectedRateType = ko.observable('Fixed');
                self.selectedPaymentType = ko.observable('Principal + Interest');
                self.selectedBenchmark = ko.observable('Benchmark A');
                self.selectedBenchmarkSource = ko.observable('Source A');

                self.paymentType = [{value : 'PI', label : 'Principal + Interest'}, {value : 'I', label : 'Interest'}, {value:'H', label:'Hybrid'}];
                self.rateType = [{value : 'fixed', label : 'Fixed'}, {value : 'floating', label : 'Floating'}];
                self.Benchmark = [{value: 'A', label: 'Benchmark A'},{value: 'B', label: 'Benchmark B'}];
                self.BenchmarkSource = [{value: 'A', label: 'Source A'},{value: 'B', label: 'Source B'}];
                backToPC = function(item) {
                    history.pushState(null, '', 'index.html?root=origination-pc&status=temp-validated');
                    oj.Router.sync();
                }     

            }
            
            return mainViewModel;        
                      

        });
