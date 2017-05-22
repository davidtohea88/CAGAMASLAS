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

            function mgpViewModel() {
                var self = this;
                self.header = "This is MGP Upload Summary Page";
                
                this.currentStepValue = ko.observable('stp1');
                this.curStp1 = ko.observable('true');
                this.curStp2 = ko.observable(false);
                this.curStp3 = ko.observable(false);
		this.stepArray = 
		  ko.observableArray(
			  [{label:'Upload', id:'stp1'},
				 {label:'Upload Status',  id:'stp2'}, 
                              {label:'Upload Summary',  id:'stp3'}]);
                         
                             
     var msad01Array = [  
  
      {srlNo: 1,loanRefNo: 'loanRefNo', contractNo: 'contractNo',loanApprovDate: 'Active',apprvAmt: 1, fullyDibs: 2, fullyDibsDate: 'AA', intRate: '8.2%',month :'Aug',year:'2016',terminatedReason:'Defaulted',terminatedRmks:'Missed ECS'}
            
          ]; 
    
    
       self.msad01DS  = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(msad01Array, {idAttribute: 'srlNo'}));  
       self.msad01SumDS  = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(msad01Array, {idAttribute: 'srlNo'})); 
        self.msad01StatusDS  = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(msad01Array, {idAttribute: 'srlNo'})); 
       self.months = ko.observableArray(["April"]);
                        
                             
        this.getNodeVisible = function(Node){
//            alert(($("#mgpTrain").ojTrain("getStep", mgpViewModel.currentStepValue() )).id);
            if (Node == 1  & ($("#mgpTrain").ojTrain("getStep", mgpViewModel.currentStepValue() )).id == 'stp1') 
                return true;
            else if (Node == 2  & ($("#mgpTrain").ojTrain("getStep", mgpViewModel.currentStepValue() )).id == 'stp2') 
                return true;
            else if ((Node == 3  & ($("#mgpTrain").ojTrain("getStep", mgpViewModel.currentStepValue() )).id == 'stp3') )
                return true;
            return false;
        }    ;           

	this.currentStepValueText = function() {
     		return ($("#mgpTrain").ojTrain("getStep", mgpViewModel.currentStepValue() )).label;
	};
    };
            

var mgpViewModel = new mgpViewModel();

	$(function() {
//            ko.cleanNode(document.getElementById('mgpmsad01Full'));
//		ko.applyBindings(mgpViewModel, document.getElementById('mgpmsad01Full'));
	});
  return mgpViewModel;      
});
