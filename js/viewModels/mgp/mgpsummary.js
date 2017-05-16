
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojtable', 'promise', 'ojs/ojarraytabledatasource'],
        function (oj, ko, $)
        {

            var self = this;
            self.datasource = ko.observable(new oj.ArrayTableDataSource([], {}));
            self.EIs = [{value: 'CPT0045', label: 'CIMB Bank Berhad'},
                {value: 'CPT0004', label: 'Affin Bank Berhad'},
                {value: 'CPT0009', label: 'Alliance Bank Malaysia Berhad'},
                {value: 'CPT0013', label: 'Al-Rajhi Banking and Inv. Corp Malaysia Berhad'},
                {value: 'CPT0014', label: 'AmBank Malaysia Berhad'},
                {value: 'CPT0018', label: 'AMMB Holdings Berhad'},
                {value: 'CPT0021', label: 'Asian Development Bank'},
                {value: 'CPT0024', label: 'Bangkok Bank Malaysia Berhad'},
                {value: 'CPT0025', label: 'Bank Islam Malaysia Berhad'},
                {value: 'CPT0026', label: 'Bank Kerjasama Rakyat Malaysia Berhad'}
            ];
            self.contracts = [{value: '130/MGPFI/012017/001', label: '130/MGPFI/012017/001'},
                {value: '130/MGPFI/012017/002', label: '130/MGPFI/012017/002'},
                {value: '130/MGPFI/012018/001', label: '130/MGPFI/012018/001'}
            ]
           
            self.products = [{value : 'MGP/SPB', label : 'MGP-SPB'},
                              {value : 'MGP/SPR', label : 'MGP-SPR'}
            ] 
            function viewModel()
            {
                var self = this;
                 self.datasource = ko.observable(new oj.ArrayTableDataSource([], {}));

            }
            self.search = function (data, event) {
                var EIArray = [{EId: 'CIMB BANK BERHAD', MGPContractNum: '108/MGPSRP/0112/001', Status: 'Document Signed', startDate: '01-Jan-2012', terminationDate: '31-Dec-2022'},
                    {EId: 'CIMB BANK BERHAD', MGPContractNum: '108/MGPSRP/0212/010', Status: 'Document Signed', startDate: '01-Feb-2012', terminationDate: '31-Jan-2023'},
                    {EId: 'CIMB BANK BERHAD', MGPContractNum: '108/MGPSRP/0113/100', Status: 'Document Signed', startDate: '01-Jan-2013', terminationDate: '31-Dec-2023'},
                    {EId: 'CIMB BANK BERHAD', MGPContractNum: '108/MGPSRP/0114/110', Status: 'Document Signed', startDate: '01-Jan-2014', terminationDate: '31-Dec-2024'},
                    {EId: 'CIMB BANK BERHAD', MGPContractNum: '108/MGPSRP/0115/120', Status: 'Document Signed', startDate: '01-Jan-2015', terminationDate: '31-Dec-2025'},
                    {EId: 'CIMB BANK BERHAD', MGPContractNum: '108/MGPSRP/0116/130', Status: 'Document Signed', startDate: '01-Jan-2016', terminationDate: '31-Dec-2026'},
                    {EId: 'CIMB BANK BERHAD', MGPContractNum: '108/MGPSRP/0117/143', Status: 'Priced', startDate: '01-Jan-2017', terminationDate: '31-Dec-2027'},
                    {EId: 'CIMB BANK BERHAD', MGPContractNum: '108/MGPSRP/0217/187', Status: 'Validated', startDate: '01-Feb-2017', terminationDate: '31-Dec-2028'},
                    {EId: 'CIMB BANK BERHAD', MGPContractNum: '108/MGPSRP/0317/120', Status: 'Draft', startDate: '01-Mar-2017', terminationDate: '31-Dec-2028'}];
                self.datasource(new oj.ArrayTableDataSource(EIArray, {idAttribute: 'EId'}));
                return true;
            }
            self.create = function (data, event) {
                window.location = "?root=mgpcreate";
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