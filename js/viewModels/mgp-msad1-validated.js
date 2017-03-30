/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

    define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojinputnumber',
        'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojnavigationlist',
        'ojs/ojselectcombobox', 'ojs/ojtrain', 'ojs/ojdialog',
        'ojs/ojdatetimepicker', 'ojs/ojswitch', 'ojs/ojslider','ojs/ojcollapsible'],
          function(oj, ko, $)
          {
            /* 
             * Your application specific code will go here
             */
            
            
            
           
       
            

            function mgpViewModel() {
                var self = this;
                self.header = "MGP MASD Part1 Update Status ";
                
             
       
                
                
                self.sendNotification =  function() { alert('Notification Sent')};
                self.partyVal =  ko.observable();
                self.partyGrpVal = function(){
               
                    if ( this.partyVal === 'IN')
                        return 'India Group';
                    else if (this.partyVal  === 'SIN')
                           return 'Singapore Group';
                    else if (this.partyVal  === 'MY')
                        return 'Malaysia Group';
                    else
                        return "";
                };
                self.doSubmit = function(){
                         self.omsad01Array([  
  
  {srlNo: "01",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: "",terminatedReason:"Loan/Facility Fully Settled",comment:"test"},
{srlNo: "02",reportDate: "2017-03-02",reportMonth: "apr",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "03",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "04",reportDate: "2017-03-02",reportMonth: "may",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "05",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "06",reportDate: "2017-03-02",reportMonth: "june",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "07",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "08",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "09",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""}
      
                         ])};
                
                 self.doSearch =  function()  {
 
              
                         self.omsad01Array([  
  
  {srlNo: "01",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "02",reportDate: "2017-03-02",reportMonth: "apr",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "03",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "04",reportDate: "2017-03-02",reportMonth: "may",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "05",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "06",reportDate: "2017-03-02",reportMonth: "june",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "07",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "08",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
{srlNo: "09",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""}
      
                ]); 

    };
                
                
                this.currentStepValue = ko.observable('stp1');
                this.curStp1 = ko.observable('true');
                this.curStp2 = ko.observable(false);
                this.curStp3 = ko.observable(false);
		this.stepArray = 
		  ko.observableArray(
			  [{label:'Upload', id:'stp1'},
				 {label:'Upload Status',  id:'stp2'}, 
                              {label:'Upload Summary',  id:'stp3'}]);
                         
                             
    self.omsad01Array = ko.observableArray ([]); 
    self.msad01DS = ko.observable();
    
       self.msad01DS  = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(this.omsad01Array, {idAttribute: 'srlNo'}));  

                        
                             
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
            
             $(".diaOpener").click(function() { 
       $("#modalDialog1").ojDialog("open"); });

    $("#okButton").click(function() {
       $("#modalDialog1").ojDialog("close"); });
   
       $("#canelButton").click(function() {
       $("#modalDialog1").ojDialog("close"); });
    $("#flUpload").click(function(){ 
        
            this.omsad01Array = ([  
  
  {srlNo: "01",reportDate: "2017-03-02",reportMonth: "mar",reportYear: "2017",loanAppRefNum: " A16010800145",loanRefNo: "H1601210123",contractNo: "108/MGPSRP/0317/150",loanApprovDate: "2017-01-03",apprvAmt: 91,fullyDibs: "s",fullyDibsDate: "2017-03-03",blr: 94,intRate: 95,intRateEffDate: "2017-02-03",schMtlyIns: 96,lastOutstdCapAmt: 170000.00,totAmtDueOblr: 0,totAmtPaidOblr: 10000.00,curOutstdCapAmt: 1600000.00,monArrears: "0",totAmtArrears: 0,protectionTerminated: "N",terminatedReason: "",terminatedRmks: "",validateFlg: "Y",validateReason: "",createDate: "2017-03-03",createBy: "LAS",lastUpdateDate: "",lastUpdateBy: ""},
 
                ]); 
                
//                ko.cleanNode(document.getElementById('msad01Rg'));
                
       this.msad01DS  = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(this.omsad01Array, {idAttribute: 'srlNo'}));  
 
 
$( ".msad01Tbl" ).ojTable( "refresh" );

//              
//            ko.cleanNode(document.getElementById('mgpmsad01Full'));
		
    });
   
   
   
            
//            ko.cleanNode(document.getElementById('mgpmsad01Full'));
//		ko.applyBindings(mgpViewModel, document.getElementById('mgpmsad01Full'));
	});
  return mgpViewModel;      
});
