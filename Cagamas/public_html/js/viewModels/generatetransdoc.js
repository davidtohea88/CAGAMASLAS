
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojtable', 'promise', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojradioset'],
        function (oj, ko, $)
        {

            var self = this;
            function viewModel()
            {
                self.generatecds = function () {
                    alert('CDS Doc Generated');
                    window.location = "/LAS/doc/CDS Confirmation and Confirmation Schedule.docx"

                };
                self.generategurantee = function () {
                    alert('Gurantee Notice Generated');
                    window.location = "/LAS/doc/Guarantee Notice.docx";
                };
                self.back = function () {
                    window.location = "?root=mgpcreate";
                };
            }

            var vm = new viewModel;
            $(document).ready
                    (
                            function ()
                            {
                                // ko.applyBindings(vm, document.getElementById('table'));
                            }
                    );

        }
); 