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
            router.configure({
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
                'configService': {label: 'config-service'},
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
                'publish-rate': {label: 'Publish Rate'},
                'final-cof': {label: 'Final COF'},
                'pc-specific-conversion-final-cof': {label: 'PC Specific Conversion Final COF'},
                'status-monitoring-masd-aar-status': {label: 'Status Monitoring MASD and AAR Status'},
                'amortization-schedule': {label: 'Amortization Schedule'},
                'amortization-summary': {label: 'Amortization Summary'},
                'mgp-payment-processing': {label: 'MGP Payment Processing'},
                'guarantee-fund': {label: 'Guarantee Fund'},
                'guarantee-fund-confirmation': {label: 'Guarantee Fund Confirmation'},
                'net-income': {label: 'Net Income'},
                'net-income-confirmation': {label: 'Net Income Confirmation'},
                'mgpsummary': {label: 'MGP'},
                'mgpcreate': {label: 'MGP Contract Create & Edit'},
                'masdpart2upload': {label: 'MASD PART 2 Upload'},
                'masdpart3upload': {label: 'MASD PART 3 Upload'},
                'loanrecoverystatus': {label: 'Loan Recovery Status'},
                'generatetransdoc' : {label: 'generatetransdoc'},
                'mgpsummaryreport' : {label: 'mgpsummaryReport'},
                'cost': {label: 'Cost'},
                'cost-confirmation': {label: 'Cost Confirmation'},
                'login': {label: 'login'},
                'people': {label: 'people'},
                'person': {label: 'person'}

            });
            
                       
            function MainViewModel() {
                var self = this;
                self.test = ko.observable("helloo");
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
