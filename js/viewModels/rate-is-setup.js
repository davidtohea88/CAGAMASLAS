/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

var paymentTypeOptionChangedHandler = function (event, data) {
                    if(data.option=='value'){
                        if (data.value == "H") {
                            $('#installment-schedule').css('display','block');
                        }
                        else {
                            $('#installment-schedule').css('display','none');
                            
                        }
                    }
                };

define(['ojs/ojcore', 'knockout', 'jquery', 'services/configService',
           'ojs/ojknockout', 'ojs/ojinputtext','ojs/ojselectcombobox','ojs/ojdatetimepicker',
           'ojs/ojbutton', 'ojs/ojradioset', 'ojs/ojtable', 'ojs/ojpagingcontrol',
           'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojcheckboxset','ojs/ojtabs'],
        function (oj, ko, $,configService)
        {
            /* 
             * Your application specific code will go here
             */
                var self = this;
                self.config = configService;
                
            function mainViewModel() {
                self.header = "Rate and Installment Schedule Setup";
                self.disabledForm = ko.observable(false);
                self.selectedRow = '';
                self.cofValue = ko.observable(3.75);
                self.pwrMarginValue = ko.observable(0.1);
                self.buMarginValue = ko.observable(0);
                self.totalValue = ko.observable();
                self.cagaRateValue = ko.observable(0);
                self.selectedRateType = ko.observable('Fixed');
                self.selectedInitiateRateType = ko.observable('Please select');
                self.selectedPaymentType = ko.observable('Principal + Interest');
                self.selectedBenchmark = ko.observable('Please Select');
                self.selectedBenchmarkSource = ko.observable('Reuters');
                self.fixedRate = ko.observable("CP");
                self.calculateTotal = function (){
                    
                    self.cagaRateValue(parseFloat(self.buMarginValue()) + self.pwrMarginValue() + self.cofValue());
                }
                
                self.paymentType = [{value : 'PI', label : 'Principal + Interest'}, {value : 'I', label : 'Interest'}, {value:'H', label:'Hybrid'}];
                self.rateType = [{value : 'fixed', label : 'Fixed'}, {value : 'floating', label : 'Floating'}, {value : 'convertible', label : 'Convertible'}];
                self.delT = [{value : 'fixed', label : 'Fixed'}, {value : 'floating', label : 'Floating'}];
                self.Benchmark = [{value: 'A', label: 'KLIBOR 3 months'},{value: 'B', label: 'KLIBOR 6 months'}];
                self.BenchmarkSource = [{value: 'Reuters', label: 'Reuters'},{value: 'Bloomberg', label: 'Bloomberg'},{value: 'Cagamas', label: 'Cagamas'}];
                self.tenureYear= ko.observable('3');
                self.tenureMonth= ko.observable('0');
                var CPArray = [
                {ID:  '1'},
                {ID:  '2'}
                ];                
                self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray, {idAttribute: 'ID'}));
                
                var attachmentArray = [{ID:'1'},{ID:'2'},{ID:'3'}];
                self.observableArray = ko.observableArray(attachmentArray);
                datasource = ko.observable(new oj.ArrayTableDataSource(self.observableArray, {idAttribute: 'ID'}));
                self.onSelect = function(item){};
                self.onSave = function(item){
                    if(self.config.status.toUpperCase()=='TEMP-NEW')
                    {
                        self.config.status = "temp-rate";
                    }
                    oj.Router.rootInstance.go('origination-pc');
                };
                self.onCalculate = function(item){};
                
                if(self.config.status.toUpperCase()=='TEMP-NEW' || 
                    self.config.status.toUpperCase()=='TEMP-RATE' ||
                    self.config.status.toUpperCase()=='TEMP-VALIDATED')
                {
                    self.disabledForm(false);
                }
                else {
                    self.disabledForm(true);

                }
                self.rateTypeOptionChangedHandler = function(event,data)
                {
                    if(data.option=='value')
                    {
                        if (data.value == "convertible") {
                            $('.convertible').css('display','flex');
                            $('.benchmark').hide();
                        }
                        else if (data.value == "floating") {
                            $('.benchmark').css('display','flex');
                            $('.convertible').hide();
                        }
                        else {
                            $('.benchmark').hide();
                            $('.convertible').hide();
                        }
                    }

                };



            }
            $(document).ready(function(){
            
            });
            return mainViewModel;        
                      

        });