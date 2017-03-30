/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'viewModels/GetRest', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton'],
function(oj, ko, GetRest) {

  var viewModel = {
    movieCollection: GetRest.createCollection("js/data/productgroup.json","prodGrpCd"),
//    movieCollection: GetRest.createCollection("http://movieapp-sitepointdemos.rhcloud.com/api/movies","_id"),
    dataSource: ko.observable(),

    // Called each time the view is shown to the user.
    initialize: function() {
      this.dataSource(new oj.CollectionTableDataSource(this.movieCollection));
      this.movieCollection.fetch();
    },

    viewMovie: function(movieId) {
      oj.Router.rootInstance.store(movieId);
      oj.Router.rootInstance.go("viewMovie");
    },

    deleteMovie: function(parent, movieId) {
      parent.movieCollection.get(movieId).destroy();
    },

    addMovie: function() {
      oj.Router.rootInstance.go("addMovie");
    }
  };

  return viewModel;
});