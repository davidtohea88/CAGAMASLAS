/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'viewModels/GetRest', 'jquery', 'ojs/ojrouter', 
    'ojs/ojradioset','ojs/ojdialog', 'ojs/ojknockout', 'promise', 
    'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
    'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol','ojs/ojdatetimepicker',
    'ojs/ojpagingtabledatasource', 'moment'],
        function (oj, ko, GetRest, $)
        {

        
        var prodgroupMainViewModel = 
        {
            header : "Product Group",
            codeSearch : ko.observable(''),
            nameSearch : ko.observable(''),
            descSearch : ko.observable(''),
            
            codeItem :  ko.observable(''),
            selectedRow :  ko.observable(), 
            objCollection : GetRest.createCollection("http://movieapp-sitepointdemos.rhcloud.com/api/movies","_id"),
            productGroupCollection : ko.observableArray(),
            productGroupCollection2 : ko.observableArray(),
            allPeople : ko.observableArray([]),
            tempPeople : ko.observableArray([]),            
            productGroupModel : ko.observable(),            
            dataSource : ko.observableArray(),
            currentFilter : ko.observable(),
            
            initialize : function()
            {
                
                this.productGroupCollection(this.objCollection);
                console.log(this.productGroupCollection().length);
               this.dataSource(new oj.CollectionTableDataSource(this.productGroupCollection()));

            },
            onRefresh : function(){    
                this.objCollection = GetRest.createCollection("http://movieapp-sitepointdemos.rhcloud.com/api/movies","_id"),
                this.productGroupCollection(this.objCollection);
                this.dataSource(new oj.CollectionTableDataSource(this.productGroupCollection()));
            },
            clickSearchBtn : function () {
                console.log(this.objCollection);
                console.log(this.productGroupCollection());
                console.log(this.dataSource());
//                this.objCollection = GetRest.createCollection("http://movieapp-sitepointdemos.rhcloud.com/api/movies","_id"),
//                this.productGroupCollection(this.objCollection);                
//                this.productGroupCollection2(this.objCollection);   
//                console.log(this.productGroupCollection2    );
//                this.productGroupCollection2 = ko.computed(function(){
//                    return ko.utils.arrayFilter(this.productGroupCollection, function(item){
//                        return true;
//                    });
//                }, this);

            },
            clickResetBtn : function () {
                this.codeSearch('');
                this.nameSearch('');
                this.descSearch('');
            },
            onCreateBtn : function(){
                this.productGroupModel(GetRest.createModel("http://movieapp-sitepointdemos.rhcloud.com/api/movies","_id"));
                $('#btn_create').show();
                $('#btn_edit').hide();
                $("#DataDialog").ojDialog("open");
                return true;
            },
            
            onEditBtn : function(){
                var self = this;
                if(this.selectedRow()!=null){
                this.productGroupModel(GetRest.createModel("http://movieapp-sitepointdemos.rhcloud.com/api/movies","_id"));
                    $('#btn_create').hide();
                    $('#btn_edit').show();        
                    this.productGroupModel().id = this.codeItem();
                    this.productGroupModel().fetch({
                      success: function(model) {
                        self.productGroupModel(model);
                      },
                      error: function(model) {
                        console.log("Fetch error: ", model);
                      }
                    });

                    $("#DataDialog").ojDialog("open");
                    return true;
                }
                else
                {
                    alert('Select a row to edit');
                    return false;
                }
            },
            onCreate : function () {
                this.productGroupModel().save().then(function(){
                    $("#DataDialog").ojDialog("close");                
                    var btn_refresh = document.getElementById("btn_refresh");
                    btn_refresh.click();
                });
            },
            onEdit : function()
            {
                this.productGroupModel().save().then(function() {
                    $("#DataDialog").ojDialog("close");                    
                    var btn_refresh = document.getElementById("btn_refresh");
                    btn_refresh.click();
                });
            },
            onCancel : function()
            {
                
            },
            onStatusBtn : function () {
                this.objCollection = GetRest.createCollection("http://movieapp-sitepointdemos.rhcloud.com/api/movies","_id"),                
                this.productGroupCollection(this.objCollection);
                this.dataSource(new oj.CollectionTableDataSource(this.productGroupCollection()));
            },
            exportxls : function () {

            },
            onRowClick : function(data,event)
            {
                this.productGroupModel(GetRest.createModel("http://movieapp-sitepointdemos.rhcloud.com/api/movies","prodGrpCd"));
                this.selectedRow(data);
                this.codeItem(data._id);
            },
//            datasource : ko.computed(function(){
//                console.log(currentFilter);
//                if (self.currentFilter()!==null) {
//                    return this.datasource();
//                } else {
//                    return ko.utils.arrayFilter(self.products(), function (prod) {
//                        return prod.genre == self.currentFilter();
//                    });
//                }
//            }),
        }
        
        return prodgroupMainViewModel;
        }
); 