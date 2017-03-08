
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojtable', 'promise', 'ojs/ojarraytabledatasource','ojs/ojdatetimepicker','ojs/ojradioset'],
        function (oj, ko, $)
        {

            var self = this;            
            function viewModel()
            {
                self.generatecds=  function() {
                     alert('CDS Doc Generated');
                };                           
                self.generategurantee=  function() {
                     alert('Gurantee Notice Generated');
                };  
            }
           
              var vm = new viewModel;
               $(document).ready
                (
                  function()
                  {
                   // ko.applyBindings(vm, document.getElementById('table'));
                  }
                );
          
        }
); 