
define(['ojs/ojcore', 'knockout', 'jquery','data/data', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojselectcombobox'],
        function (oj, ko, $,data)
        {
            function viewModel()
            {
                var self = this;
                self.header = "Counterparty";
                self.counterparty = ko.observableArray([{cpCd: "Fetching data"}]);
                self.tempcp = ko.observableArray([{cpCd: "Fetching data"}]);
                self.cpType = ko.observable([]);
                data.fetchData('js/data/productgroup.json').then(function (people) {
                    self.cpType = people.prodGrpCd;                    
                }).fail(function (error) {
                    console.log('Error in getting People data: ' + error.message);
                });
                self.nameSearch = ko.observable('');
                self.descSearch = ko.observable('');
                self.cpDataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.counterparty, {idAttribute: 'cpCd'}));
                self.cpTypeDataSource = [ 
                         {value : 'Corporation', label : 'Corporation'},
                        {value : 'Development Financial Institution', label : 'Development Financial Institution'},
                        {value : 'Financial Institution', label : 'Financial Institution'},
                        {value : 'Government-Linked Company', label : 'Government-Linked Company'},
                        {value : 'Government Agency', label : 'Government Agency'},
                        {value : 'Federal Government ', label : 'Federal Government'},
                        {value: 'State Government', label: 'State Government'},
                        {value: 'Insurance/Takaful Company', label: 'Insurance/Takaful Company'},
                        {value: 'Leasing Company', label: 'Leasing Company'},
                        {value: 'Others - Government Guaranteed', label: 'Others - Government Guaranteed'},
                        {value: 'Others - Subordinated Debt', label: 'Others - Subordinated Debt'},
                        {value: 'Others - Supranational', label: 'Others - Supranational'},
                        ]; 
                
                clickResetBtn = function () {
                    self.nameSearch('');
                    self.descSearch('');
                };
                
                self.initRefresh = function () {
                    console.log("fetching data");
                    var jsonUrl = "js/data/counterparty.json";
                    $.ajax(jsonUrl,
                            {
                                method: "GET",
                                dataType: "json",
                                success: function (data)
                                {
                                    self.counterparty(data.cp);
                                    self.tempcp(data.cp);
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    console.log(textStatus, errorThrown);
                                }
                            }
                    );
                };
                
                self.clickSearchBtn = function () {
                    var cpFilter = new Array();
                    ko.utils.arrayFilter(self.tempcp(),
                            function (r) {
                                var nameSearch = self.nameSearch().toString().toLowerCase();
                                if (r.cpName.toString().toLowerCase().indexOf(nameSearch) !== -1 || r.cpType.toString().toLowerCase().indexOf(nameSearch) !== -1) {
                                    cpFilter.push(r);
                                    
                                }
                            });
                            console.log(cpFilter);
                   self.counterparty(cpFilter);
                };
                
                self.buttonClick = function(item) {
                    alert("test");
                    console.log(item.cpCd);
                    //alert("Code = " + item.cpCd);
                    oj.Router.rootInstance.store(item);
                    oj.Router.rootInstance.go("counterparty-detail");
                  };
                

                self.buttonClick1 = function (item) {
                    if (item.OriginationStatus == 'PI')
                    {
                        history.pushState(null, '', 'index.html?root=origination-pi&id=' + item.OriginationId);
                    } else {
                        history.pushState(null, '', 'index.html?root=origination-pc&id=' + item.PurchaseContractID);
                    }
                    oj.Router.sync();
                };
                self.disableControls = function (id) {
                    if (id != '')
                    {
                        return (true);
                    } else {
                        return (false);
                    }
                };
                
                self.initRefresh();
            }
            return viewModel;

        });
