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
 
 
require([ 'ojs/ojcore', 'knockout', 'jquery', 'hammerjs', 'ojs/ojjquery-hammer', 'ojs/ojknockout',
    'ojs/ojmodule', 'ojs/ojoffcanvas', 'ojs/ojbutton'],

  function(oj, ko, $, Hammer)
  {
              
    function offcanvasModel()
    {
      var self = this;

      this.drawer =
      {
        "displayMode": "push",
        "selector": "#drawer",
        "content": "#main"
      };

      this.toggleDrawer = function()
      {
        return oj.OffcanvasUtils.toggle(this.drawer);
      };

      this.openDrawer = function()
      {
        return oj.OffcanvasUtils.open(this.drawer);
      };

      this.isRTL = function()
      {
        var dir = document.documentElement.getAttribute("dir");
        if (dir)
          dir = dir.toLowerCase();
        return (dir === "rtl");
      };

      //use hammer for swipe
      var mOptions = {
        "recognizers": [
          [Hammer.Swipe, { "direction": Hammer["DIRECTION_HORIZONTAL"] }]
      ]};
 
      $("#main")
        .ojHammer(mOptions)
        .on("swipeleft", function(event) {
          event.preventDefault();
          if (self.isRTL())
            self.openDrawer();
        })
        .on("swiperight", function(event) {
          event.preventDefault();
          if (! self.isRTL())
            self.openDrawer();
        });

    }
    
  
    $(document).ready(
      function()
      {
        ko.applyBindings(new offcanvasModel(), document.getElementById('parentDiv'))
      }
    );
    
     
  });


