define(['ojs/ojcore', 'knockout', 'viewModels/MovieFactory', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojbutton'],
function(oj, ko, MovieFactory) {

  var viewModel = {
    movieModel: ko.observable(),

    initialize: function(params) {
      // Make "this" accessible within inner functions
      var self = this;

      // Get the MovieId parameter
      var movieId = oj.Router.rootInstance.retrieve();
      if(!movieId) {
        console.log("No movieId!!!");
     }

     // Fetch the movie
     this.movieModel(MovieFactory.createMovieModel());
     this.movieModel().id = movieId;
     this.movieModel().fetch({
       success: function(model) {
         self.movieModel(model);
       },
       error: function(model) {
         console.log("Fetch error: ", model);
       }
     });
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
