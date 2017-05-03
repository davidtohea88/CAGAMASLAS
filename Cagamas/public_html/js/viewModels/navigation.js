/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout'],
        function (oj, ko)
        {
            var viewModel = {
    redirect: function(url) {
    if(url!=null || url!='')
      oj.Router.rootInstance.go(url);
    }
  };

  return viewModel;

        });
