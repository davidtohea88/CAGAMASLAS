/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'services/rendererService', 'services/RestService','services/exportService','services/MessageService', 'ojs/ojrouter',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton', 
        'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojselectcombobox'],
        function (oj, ko, $, rendererService, RestService, exportService,MessageService)
        {
            function organizationTypeMainViewModel() {
                var self = this;

                self.message = ko.observable();
                self.colorType = ko.observable();
                self.pageOffcanvas = {selector: '#pageDrawer', content: '#pageContent',
                        modality: 'modeless', autoDismiss: 'none', displayMode: 'overlay'};
                    
                self.showMessage = function(type,message,afterShow){
                    var canvas = self.pageOffcanvas;
                    self.message(message);
                    if (type==="SUCCESS"){
                        self.colorType(MessageService.bgColorSuccess);
                    }else if (type==="ERROR"){
                        self.colorType(MessageService.bgColorError);
                    }else{
                        self.colorType(MessageService.bgColorDefault);
                    }
                    oj.OffcanvasUtils.open(canvas);
                    setTimeout(function(){
                        oj.OffcanvasUtils.close(canvas);
                        if (afterShow){
                            afterShow();
                        }
                    },MessageService.displayTimeout);
                };
                

                self.header = "GL Account Master";

                var restService = RestService.SunGLAccountService();
                self.collectionSunGL = ko.observable(restService.createCollection());
                self.SunGLAccount = ko.observableArray();
                self.SunGLAccountDataSource = new oj.ArrayTableDataSource(self.SunGLAccount, {idAttribute: self.collectionSunGL().model.idAttribute});

                var restServiceLAS = RestService.accountService();
                self.collectionLAS = ko.observable(restServiceLAS.createCollection());
                self.LasSpecificAccount = ko.observableArray();
                self.LasSpecificAccountDataSource =  new oj.ArrayTableDataSource(self.LasSpecificAccount, {idAttribute: self.collectionLAS().model.idAttribute});

                
                // ===============  EVENT HANDLER  ==============
                
                self.refreshData = function(){
                    // fetch from rest service
                    self.SunGLAccount([]);
                    self.collectionSunGL().refresh().then(function(){
                        ko.utils.arrayForEach(self.collectionSunGL().toJSON(),function(item){
                            if(item.active==='Y'){
                                self.SunGLAccount.push(item);
                            }
                        });
                    });  
                    self.LasSpecificAccount([]);
                    self.collectionLAS().refresh().then(function(){
                        ko.utils.arrayForEach(self.collectionLAS().toJSON(),function(item){
                            if(item.active==='Y'){
                                self.LasSpecificAccount.push(item);
                            }
                        });
                    });  

                };
                
                self.save = function (model,successMsg) {
                    var user = "LAS";
                    var currentDate = new Date();
                    var defaultAttributes = model.isNew()?{createdBy: user,
                            createdDate: currentDate
                        }:{createdBy: model.attributes.createdBy,
                            createdDate: model.attributes.createdDate,
                            updatedBy: model.isNew()?'':user,
                            updatedDate: model.isNew()?'':currentDate
                        };
                    model.save(defaultAttributes,{
                        success: function(model,resp){
                            self.refreshData();
                            var message = successMsg? successMsg: (model.isNew()?'A new '+self.header+' is successfully created':self.header+' is successfully updated');
                            self.showMessage("SUCCESS",message,function(){
                                $("#CreateEditDialog").ojDialog("close");
                            });
                        },
                        error: function(){
                            self.showMessage("ERROR",MessageService.httpStatusToMessage(resp.status));  
                        }
                    });
                    
                };
                
                self.onAdd = function(){
                    var currentRowSun = $('#sun').ojTable('option', 'currentRow');
                    var res = {
                        AccountId: self.SunGLAccount()[currentRowSun['rowIndex']].AccountId,
                        AccountNo: self.SunGLAccount()[currentRowSun['rowIndex']].AccountNo,
                        AccountName: self.SunGLAccount()[currentRowSun['rowIndex']].AccountName,
                        active:'Y'
                    };
                    var model = restServiceLAS.createModel(res);
                    self.save(model);  
                };
                                
                self.onDelete = function(){
                    var currentRowLas = $('#las').ojTable('option', 'currentRow');
                    self.LasSpecificAccount()[currentRowLas['rowIndex']].active='N';
                    var model = restServiceLAS.createModel(self.LasSpecificAccount()[currentRowLas['rowIndex']]);
                    self.save(model);  
                };

                self.refreshData();
            }
            return organizationTypeMainViewModel();
        }
); 