/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'services/rendererService', 'services/configService', 
    'services/exportService', 'services/models/customURL', 'jquery', 'ojs/ojrouter',
    'ojs/ojradioset', 'ojs/ojdialog', 'ojs/ojknockout', 'promise',
    'ojs/ojlistview', 'ojs/ojmodel','ojs/ojtable', 'ojs/ojbutton',
    'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojdatetimepicker',
    'ojs/ojpagingtabledatasource', 'ojs/ojknockout-validation', 'moment','ojs/ojselectcombobox'],
        function (oj, ko, rendererService, configService, exportService, customURL, $)
        {
            function productgroupMainViewModel() {
                var self = this;
                self.tracker = ko.observable();
                
                var restUrl = configService.serviceUrl + "Product/";
                //var restUrl = configService.serviceUrl + "MD_Product_Group/ProductGroupRestPS/";
                self.productGroupModel = ko.observable();
                self.header =  ko.observable("Mortgage Guarantee Program - Eligibility Approval");
                self.value = ko.observable('');
                
                
            }

            return productgroupMainViewModel();

            $(document).ready(
                function () {
                 //   ko.applybindings(new productgroupMainViewModel(), document.getElementById("validator"));
                }
            );

        }
); 