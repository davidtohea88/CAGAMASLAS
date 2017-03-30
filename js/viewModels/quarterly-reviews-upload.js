define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
        'ojs/ojbutton', 'ojs/ojtable'], 
      function(oj, ko, $)
      {
        var self = this;
        function mainModel(){
            self.header = "Caga 1 and Caga 2";
            
            self.openFileDialog = function (){
              document.getElementById("browseFile1").click();
            }
            self.openFileDialog2 = function (){
              document.getElementById("browseFile2").click();
            }
            
            self.onClickUpload = function(){
                //set status as UPLOAD
                oj.Router.rootInstance.go('quarterly-reviews-dashboard');
            };
            self.onClickBack = function(){oj.Router.rootInstance.go('quarterly-reviews-dashboard');};
        }
            
        return mainModel;
      });