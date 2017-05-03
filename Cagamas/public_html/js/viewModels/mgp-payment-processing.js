define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
function(oj, ko, $)
{
     var self = this;


function currentSelection()
    {
        var selectionObj = $("#table").ojTable("option", "selection");
        var selectionTxt = "";

        var i = 0;
        for (i = 0; i < selectionObj.length; i++)
        {
            var range = selectionObj[i];
            var startIndex = range.startIndex;
            var endIndex = range.endIndex;
            var startKey = range.startKey;
            var endKey = range.endKey;

            if (startIndex != null && startIndex.row != null)
            {
                //row selection
                selectionTxt = selectionTxt + "Row Selection\n";
                selectionTxt = selectionTxt + "start row index: " + startIndex.row + ", end row index: " + endIndex.row + "\n";
            }
            if (startKey != null && startKey.row != null)
            {
                selectionTxt = selectionTxt + "start row key: " + startKey.row + ", end row key: " + endKey.row + "\n";
            }

            if (startIndex != null && startIndex.column != null)
            {
                //column selection
                selectionTxt = selectionTxt + "Column Selection\n";
                selectionTxt = selectionTxt + "start column index: " + startIndex.column + ", end column index: " + endIndex.column + "\n";
            }
            if (startKey != null && startKey.column != null)
            {
                selectionTxt = selectionTxt + "start column key: " + startKey.column + ", end column key: " + endKey.column + "\n";
            }
        }
        $('#selectionCurrent').val(selectionTxt);
    };
    
  function viewModel()
  {
    var self = this;
    self.header = "MGP Payment Processing";
    this.dateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2017, 0, 28)));
    self.currentStatus = ko.observable();
    var gr = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1', PaymentDate:oj.IntlConverterUtils.dateToLocalIso(new Date()), Status:'Paid', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'2', PaymentDate:'', Status:'Pending', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'3', PaymentDate:'', Status:'Pending', selected:''}
    ];
    var grs = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1', PaymentDate:oj.IntlConverterUtils.dateToLocalIso(new Date()), Status:'Paid', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'2', PaymentDate:'', Status:'Paid', selected:'selected'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'3', PaymentDate:'', Status:'Paid', selected:'selected'}
    ];
    var gf = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1235', PaymentDate:oj.IntlConverterUtils.dateToLocalIso(new Date()), Status:'Paid', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1235', PaymentDate:'', Status:'Pending', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1235', PaymentDate:'', Status:'Pending', selected:''}
    ];
    var gfs = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1235', PaymentDate:oj.IntlConverterUtils.dateToLocalIso(new Date()), Status:'Paid', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1235', PaymentDate:'', Status:'Paid', selected:'selected'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1235', PaymentDate:'', Status:'Paid', selected:'selected'}
    ];
    var sf = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1236', PaymentDate:oj.IntlConverterUtils.dateToLocalIso(new Date()), Status:'Paid', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1236', PaymentDate:'', Status:'Pending', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1236', PaymentDate:'', Status:'Pending', selected:''}
    ];
    var sfs = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1236', PaymentDate:oj.IntlConverterUtils.dateToLocalIso(new Date()), Status:'Paid', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1236', PaymentDate:'', Status:'Paid', selected:'selected'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1236', PaymentDate:'', Status:'Paid', selected:'selected'}
    ];
    var lpf = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1237', PaymentDate:oj.IntlConverterUtils.dateToLocalIso(new Date()), Status:'Paid', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1237', PaymentDate:'', Status:'Pending', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1237', PaymentDate:'', Status:'Pending', selected:''}
    ];
    var lpfs = [
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1237', PaymentDate:oj.IntlConverterUtils.dateToLocalIso(new Date()), Status:'Paid', selected:''},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1237', PaymentDate:'', Status:'Paid', selected:'selected'},
    {ContractNumber: '130/MGPFI/012017/001', PaymentDueDate:'01/28/2017', PaymentFee:'1237', PaymentDate:'', Status:'Paid', selected:'selected'}
    ];
    self.grObservableArray = ko.observableArray(gr);
    self.grsObservableArray = ko.observableArray(grs);
    self.gfObservableArray = ko.observableArray(gf);
    self.gfsObservableArray = ko.observableArray(gfs);
    self.sfObservableArray = ko.observableArray(sf);
    self.sfsObservableArray = ko.observableArray(sfs);
    self.lpfObservableArray = ko.observableArray(lpf);
    self.lpfsObservableArray = ko.observableArray(lpfs);
    self.datasource = ko.observable(new oj.ArrayTableDataSource([], {}));
    onCheck = function()
    {
    alert('a');
   };
   
    onConfirm2Click = function(item)
    {
        if(self.currentStatus()=="gr") {
            self.datasource(new oj.ArrayTableDataSource(self.grsObservableArray, {idAttribute: 'ContractNumber'}));
        }
        else if(self.currentStatus()=="gf") {
            self.datasource(new oj.ArrayTableDataSource(self.gfsObservableArray, {idAttribute: 'ContractNumber'}));
        }
        else if(self.currentStatus()=="sf") {
            self.datasource(new oj.ArrayTableDataSource(self.sfsObservableArray, {idAttribute: 'ContractNumber'}));
        }
        else if(self.currentStatus()=="lpf") {
            self.datasource(new oj.ArrayTableDataSource(self.lpfsObservableArray, {idAttribute: 'ContractNumber'}));
        }

    }
    onConfirmClick = function(item)
    {
        if(self.currentStatus()=="gr") {
            self.grObservableArray([]);
            self.grObservableArray(grs);
            self.grObservableArray().forEach(function(element,idx){
                var item = element;
                if(item['selected']=='selected' && item['Status']=='Pending')
                {
                    console.log(idx);
                        self.grObservableArray.splice(idx, 1, {
                                     'ContractNumber': item['ContractNumber'],
                                     'PaymentDueDate': item['PaymentDueDate'],
                                     'PaymentFee': item['PaymentFee'],
                                     'PaymentDate': item['PaymentDate'],
                                     'selected': item['selected'],
                                     'Status': 'Paid'
                                  });
                }
    
    
            });
            self.grObservableArray(gr);
        }
        else if(self.currentStatus()=="gf") {
            self.gfObservableArray().forEach(function(element,idx){
                var item = element;
                if(item['selected']=='selected' && item['Status']=='Pending')
                {
                    console.log(idx);
                        self.gfObservableArray.splice(idx, 1, {
                                     'ContractNumber': item['ContractNumber'],
                                     'PaymentDueDate': item['PaymentDueDate'],
                                     'PaymentFee': item['PaymentFee'],
                                     'PaymentDate': item['PaymentDate'],
                                     'selected': item['selected'],
                                     'Status': 'Paid'
                                  });
                }
    
    
            });
            self.gfObservableArray(gf);
        }
        else if(self.currentStatus()=="sf") {
            self.sfObservableArray().forEach(function(element,idx){
                var item = element;
                if(item['selected']=='selected' && item['Status']=='Pending')
                {
                    console.log(idx);
                        self.sfObservableArray.splice(idx, 1, {
                                     'ContractNumber': item['ContractNumber'],
                                     'PaymentDueDate': item['PaymentDueDate'],
                                     'PaymentFee': item['PaymentFee'],
                                     'PaymentDate': item['PaymentDate'],
                                     'selected': item['selected'],
                                     'Status': 'Paid'
                                  });
                }
    
    
            });
            self.sfObservableArray(sf);        }
        else if(self.currentStatus()=="lpf") {
            self.lpfObservableArray().forEach(function(element,idx){
                var item = element;
                if(item['selected']=='selected' && item['Status']=='Pending')
                {
                    console.log(idx);
                        self.lpfObservableArray.splice(idx, 1, {
                                     'ContractNumber': item['ContractNumber'],
                                     'PaymentDueDate': item['PaymentDueDate'],
                                     'PaymentFee': item['PaymentFee'],
                                     'PaymentDate': item['PaymentDate'],
                                     'selected': item['selected'],
                                     'Status': 'Paid'
                                  });
                }
    
    
            });
            self.lpfObservableArray(lpf);        }


    };
    
    onSearchClick = function(item)
    {
        if(self.currentStatus()=="gr") {
            self.datasource(new oj.ArrayTableDataSource(self.grObservableArray, {idAttribute: 'ContractNumber'}));
        }
        else if(self.currentStatus()=="gf") {
            self.datasource(new oj.ArrayTableDataSource(self.gfObservableArray, {idAttribute: 'ContractNumber'}));
        }
        else if(self.currentStatus()=="sf") {
            self.datasource(new oj.ArrayTableDataSource(self.sfObservableArray, {idAttribute: 'ContractNumber'}));
        }
        else if(self.currentStatus()=="lpf") {
            self.datasource(new oj.ArrayTableDataSource(self.lpfObservableArray, {idAttribute: 'ContractNumber'}));
        }

    };
    
    onExportClick = function(item)
    {
    };
    
    onPrintClick = function(item)
    {
    };
    
    }
  return viewModel;
});
