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
        'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
        'class': 'libs/las/v1.0.0/Class',
        'blobjs': 'libs/sheetjs/Blob.min',
        'file-saverjs': 'libs/sheetjs/FileSaver.min',
        'jzip': 'libs/sheetjs/jszip',
        'xlsx-js': 'libs/sheetjs/xlsx',
        'lodash': 'libs/lodash/lodash.min',
        'cagutils': 'services/cagutils'
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
                'mgpsummary':  {value:getMGPPath('mgpsummary')},
                'mgpcreate': {value:getMGPPath('mgpcreate')},
                'masdpart2upload': {value:getMGPPath('masdpart2upload')},
                'masdpart2upload-sum':  {value:getMGPPath('masdpart2upload-sum')},
                'mgp-def-notice-sum' : {value:getMGPPath('mgp-def-notice-sum')},
                'masdpart3upload': {value:getMGPPath('masdpart3upload')},
                'loanrecoverystatus': {value:getMGPPath('loanrecoverystatus')},
                'generatetransdoc'  :{value:getMGPPath('generatetransdoc')},
                'mgpsummaryreport' :{value:getMGPPath('mgpsummaryreport')},
                'amortization-schedule' :  {value:getMGPPath('amortization-schedule')},
                'amortization-summary' :  {value:getMGPPath('amortization-summary')},
                'creategen' :{value:getMGPPath('creategen')},
                'guarantee-fund' : {value:getMGPPath('guarantee-fund')},
                'guarantee-fund-confirmation' :  {value:getMGPPath('guarantee-fund-confirmation')},
                'hodgenrecommendation' :{value:getMGPPath('hodgenrecommendation')},
                'mgp-arr-err': {value:getMGPPath('mgp-arr-err')},
                'mgp-arr-upload': {value:getMGPPath('mgp-arr-upload')},
                'mgp-arr-validated': {value:getMGPPath('mgp-arr-validated')},
                'mgp-asset-delinquency': {value:getMGPPath('mgp-asset-delinquency')},
                'mgp-disp-approved': {value:getMGPPath('mgp-disp-approved')},
                'mgp-fully-disp': {value:getMGPPath('mgp-fully-disp')},
                'mgp-guarantee-app': {value:getMGPPath('mgp-guarantee-app')},
                'mgp-guarantee-recom': {value:getMGPPath('mgp-guarantee-recom')},
                'mgp-msad1-err':  {value:getMGPPath('mgp-msad1-err')},
                'mgp-msad1-upd-sum':  {value:getMGPPath('mgp-msad1-upd-sum')},
                'mgp-msad1-upd':  {value:getMGPPath('mgp-msad1-upd')},
                'mgp-msad1-validated':   {value:getMGPPath('mgp-msad1-validated')},
                'mgp-msad-upd-status': {value:getMGPPath('mgp-msad-upd-status')},
                 'mgp-guarantee-review': {value: getMGPPath('mgp-guarantee-review')},
//                'mgp-msad-upload':{value:getMGPPath('mgp-msad-upload')},
                'mgp-payment-processing' : {value:getMGPPath('mgp-payment-processing')},
                'cost': {value:getMGPPath('cost')},
                'cost-confirmation': {value:getMGPPath('cost-confirmation')},
                'net-income':  {value:getMGPPath('net-income')},
                'net-income-confirmation' : {value:getMGPPath('net-income-confirmation')},
                'mgp-aar-code': {value:getMGPPath('mgp-aar-code'), label: 'mgp-aar-code'},
                'mgp-file-type': {value:getMGPPath('mgp-file-type'), label: 'mgp-file-type'},
                'mgp-caid-code': {value:getMGPPath('mgp-caid-code')},
                'mgp-foreclosure-recovery': {value:getMGPPath('mgp-foreclosure-recovery'), label: 'mgp-file-type'},
                'mgp-template-upd': {value:getMGPPath('mgp-template-upd'), label: 'mgp-file-type'},
                'mgp-terminate-code': {value:getMGPPath('mgp-terminate-code'), label: 'mgp-file-type'},
                'mgp-verify-sheet': {value:getMGPPath('mgp-verify-sheet'), label: 'mgp-file-type'},
                'mgp-elig-summary': {value:  getMGPPath('mgp-elig-summary') , label: 'mgp-elig-summary'},
                'mgp-elig-approval': {value:  getMGPPath('mgp-elig-approval') , label: 'mgp-elig-approval'},
                'segenverification' :  {value:getMGPPath('segenverification')},
                'status-monitoring-masd-aar-status' : {value:getMGPPath('status-monitoring-masd-aar-status')},
                'svpceoapproval' :  {value:getMGPPath('svpceoapproval')},
                
                'login': {label: 'login'},

                
                'branch': {value:getMasterDataPath('branch'), label: 'Branch'},
                'contact': {value:getMasterDataPath('contact'), label: 'Contact'},
                'paymentfreq': {value:getMasterDataPath('paymentFreq'),label: 'Payment Frequency'},
                'assettype': {value:getMasterDataPath('assetType'),label: 'Asset Type'},
                'assetgroup': {value:getMasterDataPath('assetGroup'),label: 'Asset Group'},
                'ratetype': {value:getMasterDataPath('rateType'),label: 'Rate Type'},
                'purchasemode': {value:getMasterDataPath('purchasemode'),label: 'Purchase Mode'},
                'purchaseconstype': {value:getMasterDataPath('prchsConsTyp'),label: 'Purchase Consideration Type'},
                'purchaseconssubtype': {value:getMasterDataPath('prchsConsSubTyp'),label: 'Purchase Consideration Sub Type'},
                'pricefactor': {value:getMasterDataPath('pricefactor'),label: 'Price Factor'},
                'counterparty': {value:getMasterDataPath('counterparty'),label: 'counterparty'},
                'counterpartydetail': {value:getMasterDataPath('counterpartyDetail'), label: 'counterparty Detail'},
                'counterparty-detail': {value:getMasterDataPath('counterparty-detail'), label: 'counterparty detail'},
                'counterpartytype': {value:getMasterDataPath('counterpartyType'),label: 'Counterparty Type'},
                'counterpartysect': {value:getMasterDataPath('counterpartySector'),label: 'Counterparty Sector'},
                'counterpartygrptype': {value:getMasterDataPath('counterpartyGroupType'),label: 'Counterparty Group Type'},
                'counterpartygrp': {value:getMasterDataPath('counterpartyGroup'),label: 'Counterparty Group'},
                'consumertype': {value:getMasterDataPath('consumerType'), label: 'Consumer Type'},
                'country': {value:getMasterDataPath('country'), label: 'Country'},
                'state': {value:getMasterDataPath('state'), label: 'State'},
                'district': {value:getMasterDataPath('district'), label: 'District'},
                'organization': {value:getMasterDataPath('organization'), label: 'Organization'},
                'organizationtype': {value:getMasterDataPath('organizationType'), label: 'Organization Type'},
                'organizationhierarchy': {value:getMasterDataPath('organizationHierarchy'), label: 'Organization Hierarchy'},
                'gstfeetype': {value:getMasterDataPath('gstFeeType'), label: 'GST Fee Type'},
                'gsttype': {value:getMasterDataPath('gstType'), label: 'GST Type'},
                'gstchrgtype': {value:getMasterDataPath('gstChargeType'), label: 'GST Charge Type'},
                'gstcode': {value:getMasterDataPath('gstCode'), label: 'GST Code'},
                'gstorganization': {value:getMasterDataPath('gstOrganization'), label: 'GST Organization'},
                'gstglcode': {value:getMasterDataPath('gstGlCode'), label: 'GST GL Code'},
                'agreementtype': {value:getMasterDataPath('agreementType'), label: 'Agreement Type'},

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
                'review-date-bu': {label: 'Review Date BU'},
                'nbdayconvention': {value:getMasterDataPath('NBDayConvention'), label: 'Non Business Day Convention'},
                'exchangeratetype': {value:getMasterDataPath('exchangeRateType'), label: 'Exchange Rate Type'},
                'exchangerate': {value:getMasterDataPath('exchangeRate'), label: 'Exchange Rate'},
                'currency': {value:getMasterDataPath('currency'), label: 'Currency'},
                'fundingsource': {value:getMasterDataPath('fundingSource'), label: 'Funding Source'},
                'exchangeratedataentry': {value:getMasterDataPath('exchangeRateDataEntry'), label: 'Exchange Rate Data Entry'},

                
                'revaluation': {value:getMasterDataPath('revaluation'), label: 'Revaluation'},
                'daycountconvention': {value:getMasterDataPath('DayCountConvention'), label: 'Day Count Convention'},
                
                'orgbankacc': {value:getMasterDataPath('orgBankAcc'), label: 'Organization Bank Account'},
                'amortization': {value:getMasterDataPath('amortization'), label: 'Amortization of Guarantee Fee'},
                'vendor': {value:getMasterDataPath('vendor'), label: 'Vendor'},
                'vendordetail': {value:getMasterDataPath('vendorDetail'), label: 'Vendor Detail'},
                'postcode': {value:getMasterDataPath('postCode'), label: 'Post Code'},
                'gstaccount': {value:getMasterDataPath('gstAccount'), label: 'GST Account'},
                'gir': {value:getMasterDataPath('gir'), label: 'GIR'},
                'creditlimit': {value:getMasterDataPath('creditLimit'), label: 'Credit Limit'},
                'documents': {value:getMasterDataPath('documents'), label: 'Documents'},
                'fireviewgroup': {value:getMasterDataPath('fiReviewGroup'), label: 'FI Review Group'},
                'masteragreement': {value:getMasterDataPath('masterAgreement'), label: 'Master Agreement'},
                'guarantor': {value:getMasterDataPath('guarantor'), label: 'Guarantor'},
                'counterpartyrating': {value:getMasterDataPath('counterpartyRating'), label: 'Counterparty Rating'},
                'cagamasrating': {value:getMasterDataPath('cagamasRating'), label: 'Cagamas Rating'},
                'bnmrating': {value:getMasterDataPath('bnmRating'), label: 'BNM Rating'},
                'mgpmaintenance': {value:getMasterDataPath('mgpMaintenance'), label: 'MGP Maintenance - Verification Sheet'},
                'foreclosurerecoverycode': {value:getMasterDataPath('foreclosureRecoveryCode'), label: 'Foreclosure Recovery Code'},
                'terminationcode': {value:getMasterDataPath('terminationCode'), label: 'Termination Code'},
                'caidcode': {value:getMasterDataPath('caidCode'), label: 'CAID Code'},
                'mgpeligibilitycheck': {value:getMasterDataPath('mgpEligibilityCheck'), label: 'MGP Eligibility Check'},
                'counterpartyasset': {value:getMasterDataPath('counterpartyAsset'), label: 'Counterparty Asset'},
                'counterpartyproduct': {value:getMasterDataPath('counterpartyProduct'), label: 'Counterparty Product'},
                'historicalfi': {value:getMasterDataPath('historicalFi'), label: 'Historical FI'},
                'ratiofi': {value:getMasterDataPath('ratioFi'), label: 'Ratio FI'},
                'producteventcode': {value:getMasterDataPath('productEventCode'), label: 'Product Event Code'},
                'ratingagency': {value:getMasterDataPath('ratingAgency'), label: 'Rating Agency'},
                'counterpartyguarantor': {value:getMasterDataPath('counterpartyGuarantor'), label: 'Counterparty Guarantor'},
                'counterpartyagreement': {value:getMasterDataPath('counterpartyAgreement'), label: 'Counterparty Agreement'},
                'counterpartyvendor': {value:getMasterDataPath('counterpartyVendor'), label: 'Counterparty Vendor'},
                'glpostingrule': {value:getMasterDataPath('GLPostingRule'), label: 'GL Posting Rule'},
                'glaccountmaster': {value:getMasterDataPath('GLAccountMaster'), label: 'GL Account Master'},
                'companydbcodemapping': {value:getMasterDataPath('CompanyDatabaseCodeMapping'), label: 'Company Database Code Mapping'},
                'glaccountassignment': {value:getMasterDataPath('GLAccountAssignment'), label: 'GL Account Assignment'},
                'glaccounttemplate': {value:getMasterDataPath('GLAccountTemplate'), label: 'GL Account Template'},
                'glsearchpostedbatches': {value:getMasterDataPath('GLSearchPostedBatches'), label: 'GL Search Posted Batches'},
                'GLSearchPostedBatchesDetail': {value:getMasterDataPath('GLSearchPostedBatchesDetail'), label: 'Search Posted Batches Detail'}                
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
