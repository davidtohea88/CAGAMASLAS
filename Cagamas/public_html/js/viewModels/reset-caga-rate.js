/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

var paymentTypeOptionChangedHandler = function (event, data) {
                    if(data.option=='value'){
                        if (data.value != "PI") {
                            $('#installment-schedule').css('display','block');
                        }
                        else {
                            $('#installment-schedule').css('display','none');
                            
                        }
                    }
                };

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
                self.header = "Reset Caga Rate";
                self.cofValue = ko.observable(0);
                self.pwrMarginValue = ko.observable(0);
                self.buMarginValue = ko.observable(0);
                self.totalValue = ko.observable(0);

                self.selectedRateType = ko.observable('Fixed');
                self.selectedPaymentType = ko.observable('Principal + Interest');
                self.selectedBenchmark = ko.observable('Benchmark A');
                self.selectedBenchmarkSource = ko.observable('Source A');
                self.fixedRate = ko.observable();
                self.fixedRate.subscribe(function(newValue){
                    if(self.fixedRate){
                        if(self.fixedRate() == 'P'){
                            $("#benchmark-wrapper").hide();
                            $("#benchmarkSource-wrapper").hide();
                        }else{
                            $("#benchmark-wrapper").show();
                            $("#benchmarkSource-wrapper").show();
                        }
                    }
                });
                self.calculateTotal = function (){
                    if(self.buMarginValue()!=0 && self.pwrMarginValue()!=0 && self.cofValue()!=0)
                    self.totalValue(parseInt(self.buMarginValue()) + parseInt(self.pwrMarginValue()) + parseInt(self.cofValue()));
                }
                
                self.paymentType = [{value : 'PI', label : 'Principal + Interest'}, {value : 'I', label : 'Interest'}, {value:'H', label:'Hybrid'}];
                self.rateType = [{value : 'fixed', label : 'Fixed'}, {value : 'floating', label : 'Floating'}, {value : 'convertible', label : 'Convertible'}];
                self.Benchmark = [{value: 'A', label: 'Benchmark A'},{value: 'B', label: 'Benchmark B'}];
                self.BenchmarkSource = [{value: 'A', label: 'Source A'},{value: 'B', label: 'Source B'}];
                backToPC = function(item) {
                    self.config.status = "temp-new";
                    oj.Router.rootInstance.go('origination-pc');
                }     
                var CPArray = [
                {ID:  '1'},
                {ID:  '2'}
                ];                
                self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray, {idAttribute: 'ID'}));
                self.paymentType = [{value : 'PI', label : 'Principal + Interest'}, {value : 'H', label : 'Hybrid'}];
                self.rateType = [{value : 'Fixed', label : 'Fixed'},{value : '0', label : '0'}]
                self.onBack = function(item){};
            }
            
            return mainViewModel;        
                      

        });