define(['ojs/ojcore', 'knockout', 'viewModels/MovieFactory', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton'],
function(oj, ko, MovieFactory) {

  var viewModel = {
    movie: ko.observable(),

    initialize: function(params) {
      // Make "this" accessible within inner functions
      var self = this;

      // Fetch the MovieId parameter
      var movieId = oj.Router.rootInstance.retrieve();
      if(!movieId) {
        console.log("No movieId!!!");
      }

      // Get the movie      
      var movie = MovieFactory.createMovieModel();
      movie.id = movieId;
      movie.fetch({
        success: function(model) {
          self.movie(model.attributes);
        },
        error: function(model) {
          console.log("Fetch error: ", model);
        }
      });
   },

   editMovie: function(movieId) {
     oj.Router.rootInstance.store(movieId);
     oj.Router.rootInstance.go("editMovie");
   }
  };

  return viewModel;
});
