/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *  The function used to hide and show the html elements for print operation.
 *  clsNms = css style className of the html elements comma seperated , which needs to be printed
 */


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
//       document.body.innerHTML = originalContents;
            };