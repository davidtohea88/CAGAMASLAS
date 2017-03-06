/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

    define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojinputnumber',
        'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojnavigationlist',
        'ojs/ojselectcombobox', 'ojs/ojtrain',
        'ojs/ojdatetimepicker', 'ojs/ojswitch', 'ojs/ojslider','ojs/ojcollapsible'],
          function(oj, ko, $)
          {
            /* 
             * Your application specific code will go here
             */

            function mgpAgeModel() {
                var self = this;
                self.header = "MGP MASD Aging Summary";
                
                            
     var msadageArray = [  
  
      {eiName:'Ename' ,srlNo: 1,loanRefNo: 'loanRefNo', contractNo: 'contractNo',curOutstdCapAmt: 1231122,totAmtArrears: 12332, fullyDibs: 2, curOutstdCapAmt: 333, totAmtArrears: 323,netOutstdCapAmt :123132,protThresAmt:2222,maxGuantAmt:123121 }
            
          ]; 
    
    
       self.msadageDS  = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(msadageArray, {idAttribute: 'srlNo'}));  
  
    };
            

var mgpAgeModel = new mgpAgeModel();

	$(function() {
//            ko.cleanNode(document.getElementById('mgpmsad01Full'));
//		ko.applyBindings(mgpViewModel, document.getElementById('mgpmsad01Full'));
	});
  return mgpAgeModel;      
});
