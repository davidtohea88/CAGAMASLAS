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
                self.cofValue = ko.observable(0);
                self.pwrMarginValue = ko.observable(0);
                self.buMarginValue = ko.observable(0);
                self.totalValue = ko.observable(0);
                self.selectedRateType = ko.observable('Convertible');
                self.selectedInitiateRateType = ko.observable('Fixed/Floating');
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
                self.tenureYear= ko.observable('1');
                self.tenureMonth= ko.observable('1');
                var CPArray = [
                {ID:  '1'},
                {ID:  '2'}
                ];                
                self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray, {idAttribute: 'ID'}));
                self.paymentType = [{value : 'PI', label : 'Principal + Interest'}, {value : 'H', label : 'Hybrid'}];
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



            }
            $(document).ready(function(){
            
            });
            return mainViewModel;        
                      

        });