define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable', 'ojs/ojinputnumber', 'ojs/ojarraytabledatasource'], 
      function(oj, ko, $)
      {
        function mainModel(){
            var self = this;
            self.header = "Login Page";
            self.subHeader = "Sign In:";
            
            //intialize the observable values in the forms
            self.inputUsername = ko.observable();
            self.inputPassword = ko.observable();
            self.onClickSignIn = function(){
                history.pushState(null, '', 'index.html');
                oj.Router.sync();
            };
        }
        return mainModel;
      });