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
                self.header = "Repurchase Review Date Detail";
                self.selectedDocType = ko.observable();
                self.cofValue = ko.observable(0);
                self.pwrMarginValue = ko.observable(0);
                self.buMarginValue = ko.observable(0);
                self.totalValue = ko.observable(0);
                self.filename = ko.observable();
                self.desc = ko.observable();
                self.type = ko.observable();
                self.version = ko.observable();
                self.date = ko.observable();

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
                };
                var firstDataExist = true;
                self.openFileDialog = function (){
                  document.getElementById("browseFile").click();
                };
                var attachmentArray = [{FileName: '...', Description: '...', Type: '...', Version:'...', Date:'...'}];
                self.observableArray = ko.observableArray(attachmentArray);
                self.datasource=ko.observable(new oj.ArrayTableDataSource([], {}));          
                self.documentType = [{value : 'PDF', label : 'PDF'},
                                {value : 'Doc', label : 'DOC/DOCX'}];
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
                self.generateButton = ko.observable(true);
                datasource = ko.observable(new oj.ArrayTableDataSource(self.observableArray, {idAttribute: 'FileName'}));
                self.onClickUpload = function(data, event){
                if(firstDataExist){
                    self.observableArray.splice(0, 1);
                    firstDataExist = false;
                }
                var x = document.getElementById("browseFile").files;
                self.filename(x[0].name);
                self.desc('description');
                self.type(self.selectedDocType());
                self.version(1);
                self.dateConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
                                    createConverter(
                                    {
                                      pattern : "dd-MMM-yyyy / hh:mm"
                                    });
                self.date = ko.observable(dateConverter.format(oj.IntlConverterUtils.dateToLocalIso(x[0].lastModifiedDate)));
                var ni = {'FileName': self.filename(),
                         'Description': self.desc(),
                         'Type': self.type(),
                         'Version': self.version(),
                         'Date': self.date()};
                self.observableArray.push(ni);
                };
                self.pagingDatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(CPArray, {idAttribute: 'ID'}));
                self.paymentType = [{value : 'PI', label : 'Principal + Interest'}, {value : 'H', label : 'Hybrid'}];
                self.rateType = [{value : 'Fixed', label : 'Fixed'},{value : '0', label : '0'}]
                self.rollover = [{value : 'Yes', label : 'Yes'},{value : 'No', label : 'No'}];
                self.onBack = function(item){};
                self.deleteRow = function(data, event){
                    var currentRow = $('#table').ojTable('option', 'currentRow');
            
                    if (currentRow != null)
                    {
                        self.observableArray.splice(currentRow['rowIndex'], 1);
                    }
                };
                self.rolloverOptionChangedHandler = function (event, data) {
                    if(data.option=='value'){
                        if (data.value == "No") {
                            self.generateButton(false);
                        }
                        else {
                            self.generateButton(true);
                        }
                    }
                };
            }
            
            return mainViewModel;        
                      

        });