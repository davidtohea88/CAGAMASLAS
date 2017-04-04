define(['ojs/ojcore', 'knockout', 'viewModels/MovieFactory', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton'],
function(oj, ko, MovieFactory) {

  var viewModel = {
    movieModel: ko.observable(),

    initialize: function(params) {
      this.movieModel(MovieFactory.createMovieModel("http://movieapp-sitepointdemos.rhcloud.com/api/movies","_id"));
    },

    // Save the movie and then redirect to main page.
    saveMovie: function() {
      this.movieModel().save().then(function() {
        oj.Router.rootInstance.go("landing");
      });
    }
  };

  return viewModel;
});
