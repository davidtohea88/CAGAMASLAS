/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *  The function used to hide and show the html elements for print operation.
 *  clsNms = css style className of the html elements comma seperated , which needs to be printed
 */

define(['knockout','ojs/ojcore',  'jquery','ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable'],
function (ko){

       var self = this;        
       
          self.refreshJsonData = function (jsonUrl,fnSuccess) {
                    console.log("fetching data");
 
                    $.ajax(jsonUrl,
                            {
                                method: "GET",
                                dataType: "json",
//                                headers: {"Authorization": "Basic " + btoa("username:password")},
                                // Alternative Headers if using JWT Token
                                // headers : {"Authorization" : "Bearer "+ jwttoken; 
                                success: function (data)
                                {
                                    fnSuccess(data);
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    console.log(textStatus, errorThrown);
                                }
                            }
                    );
                };

       
       self.doFilterSearch = function (Keys,Vals,model) {              
                    var temp = ko.utils.arrayFilter(model,
                        function (rec) {
                            var retVal =true;
                          for (i = 0; i < Keys.length; i++) 
                              {  
                              
                                  if( (retVal === true) && (Vals[i].trim().length === 0 || 
                                         ( Vals[i].trim().length >0 && rec[Keys[i]].trim().toLowerCase().indexOf(Vals[i].toString().trim().toLowerCase()) > -1))) {
                                          retVal= true;
                                         }
                                         else{
                                             retVal= false;
                                         }
                              }
                    
                                return retVal;
                        });
                        return temp;
                };
            });
            
            function printContent(clsNms){

var cmps = clsNms.split(",");
$('div').addClass( "printHide" ); 
for(i = 0; i < cmps.length; i++){
 $('.'+cmps[i]).parents().addClass( "printVis" ); 
  $('.'+cmps[i]).parents().removeClass( "printHide" ); 
    $('.'+cmps[i]).find('*').removeClass( "printHide" ); 
    $('.'+cmps[i]).removeClass( "printHide" );
     $('.'+cmps[i]).addClass( "printVis" ); 
     alert(cmps[i]);
}
     window.print();  
 
            };