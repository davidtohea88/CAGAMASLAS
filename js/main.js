/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Example of Require.js boostrap javascript
 */


requirejs.config({
// Path mappings for the logical module names
    paths: 
    //injector:mainReleasePaths
     {
        'knockout': 'libs/knockout/knockout-3.4.0',
        'jquery': 'libs/jquery/jquery-3.1.0.min',
        'jlinq': 'libs/jlinq/jlinq',
        'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0.min',
        'promise': 'libs/es6-promise/es6-promise.min',
        'ojs': 'libs/oj/v2.3.0/min',
        'ojL10n': 'libs/oj/v2.3.0/ojL10n',
        'ojtranslations': 'libs/oj/v2.3.0/resources',
        'signals': 'libs/js-signals/signals.min',
        'text': 'libs/require/text',
        'hammerjs': 'libs/hammer/hammer-2.0.8.min',
        'moment': 'libs/moment/moment.min',
        'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min'
    }
    //endinjector
    ,
    // Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        },
        'maps': {
            deps: ['jquery', 'i18n'],
            exports: ['MVMapView']
        }
    },
    // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
    // resources with a custom translation file.
    // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
    // a path that is relative to the location of this main.js file.
    config: {
        ojL10n: {
            merge: {
                //'ojtranslations/nls/ojtranslations': 'resources/nls/menu'
            }
        }
    }
});
/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore',
    'knockout',
    'jquery',
    'utils',
    'ojs/ojrouter',
    'ojs/ojknockout',
    'ojs/ojmodule',
    'ojs/ojbutton',
    'ojs/ojtoolbar',
    'ojs/ojmenu',
    'ojs/ojinputtext',
    'ojs/ojnavigationlist',
    'ojs/ojjsontreedatasource'
],
        function (oj, ko, $, utils) {
            var router = oj.Router.rootInstance;
            
            function getMasterDataPath(path) {
                return 'masterData/' + path.substr(path.lastIndexOf('/') + 1);
              }
            function getPWRPath(path) {
                return 'pwr/' + path.substr(path.lastIndexOf('/') + 1);
              }
            function getMGPPath(path) {
                return 'mgp/' + path.substr(path.lastIndexOf('/') + 1);
              }
            router.configure({
                'productgroup': {value:getMasterDataPath('productgroup'), label: 'Product Group'},
                'productgrouprest': {value:getMasterDataPath('productgrouprest'), label: 'Product Group Rest'},
                'producttype': {value:getMasterDataPath('producttype'), label: 'Product Type'},
                'product': {value:getMasterDataPath('product'), label: 'Product'},
                'landing': {label: 'landing', isDefault:true},
                'viewMovie': {label: "View Movie", value: "viewMovie"},
                  'editMovie': {label: "Edit Movie", value: "editMovie"},
                  'addMovie':  {label: "Add Movie",  value: "addMovie"},
                'masterdatas': {label: 'Master Data List', isDefault:true},
                'pwr': {label: 'Purchase With Recourse'},
                'upload-loan-detail': {label: 'Upload Loan Detail'},
                'pwor': {label: 'Purchase Without Recourse'},
                'origination-list': {label: 'Origination List'},
                'origination-pi': {label: 'Origination Preliminary Indication',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'origination-pi-2': {label: 'Origination Preliminary Indication',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'origination-pc': {label: 'Origination Purchase Contract',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp': {label: 'MGP'},
                
                  'mgp-msad-upload': {label: 'mgp-msad-upload',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                
                 'mgp-aging-report': {label: 'mgp-aging-report',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                
                'rate-is-setup': {label: 'Rate and IS Setup'},
                'cos-letter': {label: 'COS Letter'},
                'cos-form': {label: 'COS Form'},
                'pwr-term-sheet': {label: 'PWR Term Sheet'},
                'installment-schedule': {label: 'Installment Schedule'},
                'validate-loan-detail': {label: 'Validate Loan Detail'},
                'contract-remittance-approval': {label: 'Contract Remittance Approval'},
                'is-and-simulations': {label: 'IS and Simulations'},
                'simulations': {label: 'Simulations'},
                'weekly-cof': {label: 'Weekly COF'},
                'purchase-contract-specific-cof': {label: 'Purchase Contract Specific COF'},
                'publish-rate': {label: 'Published Rate'},
                'final-cof': {label: 'Final COF'},
                'pc-specific-conversion-final-cof': {label: 'PC Specific Conversion Final COF'},
                
                'people': {label: 'people'},
                'person': {label: 'person'},
                'mgpsummary': {label: 'Origination'},
                'mgpcreate': {label: 'MGP Contract Create & Edit'},
                'masdpart2upload': {label: 'MASD PART 2 Upload'},
                'masdpart2upload-sum': {label: 'MASD PART 2 Summary'},
                'mgp-def-notice-sum' : {label: 'mgp-def-notice-sum'},
                'masdpart3upload': {label: 'MASD PART 3 Upload'},
                'loanrecoverystatus': {label: 'Loan Recovery Status'},
                'generatetransdoc' : {label: 'generatetransdoc'},
                'mgpsummaryreport' : {label: 'mgpsummaryReport'},
                'amortization-schedule' : {label: 'amortization-schedule'},
                'amortization-summary' : {label: 'amortization-summary'},
                'creategen' : {label: 'creategen'},
                'guarantee-fund' : {label: 'guarantee-fund'},
                'guarantee-fund-confirmation' : {label: 'guarantee-fund-confirmation'},
                'hodgenrecommendation' : {label: 'hodgenrecommendation'},
                'mgp-arr-err': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-arr-upload': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-arr-validated': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-asset-delinquency': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-disp-approved': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-fully-disp': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-guarantee-app': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-guarantee-recom': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-msad1-err': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-msad1-upd-sum': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-msad1-upd': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-msad1-validated': {label: 'MGP MASD Part1',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-msad-upd-status' : {label: 'mgp-msad-upd-status'},
                'mgp-msad-upload': {label: 'mgp-msad-upload',
                    exit: function () {
                        var childRouter = router.currentState().value;
                        childRouter.dispose();
                    },
                    enter: function () {
                        var childRouter = router.createChildRouter('id');
                        childRouter.defaultStateId = '100';
                        router.currentState().value = childRouter;
                    }
                },
                'mgp-payment-processing' : {label: 'mgp-payment-processing'},
                'net-income-confirmation' : {label: 'net-income-confirmation'},
                'segenverification' : {label: 'segenverification'},
                'status-monitoring-masd-aar-status' : {label: 'status-monitoring-masd-aar-status'},
                'svpceoapproval' : {label: 'svpceoapproval'},
                'login': {label: 'login'},
                'cost': {label: 'cost'},
                'cost-confirmation': {label: 'cost-confirmation'},
                'net-income': {label: 'net-income'},
                
                'paymentfreq': {value:getMasterDataPath('paymentFreq'),label: 'Payment Frequency'},
                'assettype': {value:getMasterDataPath('assetType'),label: 'Asset Type'},
                'assetgroup': {value:getMasterDataPath('assetGroup'),label: 'Asset Group'},
                'ratetype': {value:getMasterDataPath('rateType'),label: 'Rate Type'},
                'purchasemode': {value:getMasterDataPath('purchasemode'),label: 'Purchase Mode'},
                'purchaseconstype': {value:getMasterDataPath('prchsConsTyp'),label: 'Purchase Consideration Type'},
                'purchaseconssubtype': {value:getMasterDataPath('prchsConsSubTyp'),label: 'Purchase Consideration Sub Type'},
                'pricefactor': {value:getMasterDataPath('pricefactor'),label: 'Price Factor'},
                'counterparty': {value:getMasterDataPath('counterparty'),label: 'counterparty'},
                'counterparty-detail': {value:getMasterDataPath('counterparty-detail'), label: 'counterparty detail'},
                'consumertype': {value:getMasterDataPath('consumerType'), label: 'Consumer Type'},
                'country': {value:getMasterDataPath('country'), label: 'Country'},
                'state': {value:getMasterDataPath('state'), label: 'State'},
                'mgp-guarantee-review': {label: 'mgp-guarantee-review'},
                'reconciliation-user-interface': {label: 'Reconciliation User Interface'},
                'non-las-to-open-movement': {label: 'Non LAS to Open Movement'},
                'quarterly-review-caga-2': {label: 'Quarterly Review Caga 2'},
                'quarterly-review-caga-1': {label: 'Quarterly Review Caga 1'},
                'cumulative-partial-prepayment-listing': {label: 'Cumulative Partial Prepayment Listing'},
                'repurchase-replacement': {label: 'Repurchase and Replacement'},
                'reconciliation-dashboard': {label: 'Reconciliation Dashboard'},
                'notifications-ui': {label: 'Notifications UI'},
                'quarterly-reviews-dashboard': {label: 'Quarterly Reviews Dashboard'},
                'rr-upload-ui': {label: 'Repurchase Replacement Upload UI'},
                'reset-caga-rate': {label: 'Reset Caga Rate'},
                'repurchase-review-date': {label: 'Repurchase Review Date'},
                'repurchase-review-date-detail': {label: 'Repurchase Review Date Detail'},
                'quarterly-reviews-upload': {label: 'Quarterly Reviews Upload'},
                'reset': {label: 'Reset'},
                'rollover': {label: 'Rollover'},
                'review-date-bu': {label: 'Review Date BU'}
            });
            
                       
            function MainViewModel() {
                var self = this;
                self.router = router;
                utils.readSettings();
                self.myPeople = ko.observableArray();
                self.myPerson = ko.observableArray();
                self.ready = ko.observable(false);

                self.optionChangeHandler = function (event, data) {
                    // Only go for user action events
                    if (('navlistdemo' === event.target.id || 'ojAppNav' === event.target.id || 'ojAppNav2' === event.target.id) && event.originalEvent) {
                        self.router.go(data.value);
                    }
                };
                self.getHomeURL = function () {
                    var baseURL = window.location.href;
                    var end = baseURL.indexOf('?');
                    var url;
                    if (end !== -1) {
                        url = baseURL.substring(0, end);
                    } else {
                        url = baseURL;
                    }

                    return url;
                };
                self.screenRange = oj.ResponsiveKnockoutUtils.createScreenRangeObservable();
                var lgQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);
                var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
                var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_UP);
                var smOnlyQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                self.large = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);
                self.medium = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
                self.small = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
                self.smallOnly = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smOnlyQuery);


                self.selectedItem = ko.observable("None");

                $.getJSON( "js/data/menu.json",
                function(data)
                {
                    self.dataSource =  new oj.JsonTreeDataSource(data);
                });
                
                self.dynamicConfig = ko.pureComputed(function () {
/*                    if (self.smallOnly()) {
                        return {name: 'phone/' + router.moduleConfig.name(), lifecycleListner: router.moduleConfig.lifecycleListner, params: router.moduleConfig.params};
                    }*/
                    return router.moduleConfig;
                });
                
            }

            oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
            oj.Router.sync().then(
                    function () {
                        ko.applyBindings(new MainViewModel(), document.getElementById('globalBody'));
                        $('#globalBody').show();
                    },
                    function (error) {
                        oj.Logger.error('Error in root start: ' + error.message);
                    });
        }
);
