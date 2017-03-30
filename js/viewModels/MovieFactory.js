define(['ojs/ojcore'], 

function (oj) {

    var MovieFactory = {
//        resourceUrl : "http://movieapp-sitepointdemos.rhcloud.com/api/movies", 
        resourceUrl : "js/data/productgroup.json", 

        // Create a single movie instance.
        createMovieModel : function (restURL,restId) {
            var Movie = oj.Model.extend( {
                urlRoot : restURL, idAttribute : restId
            });
            return new Movie();
        },

        // Create a movie collection.
        createMovieCollection : function (restURL,restId) {
            var Movies = oj.Collection.extend( {
                url : restURL, model : this.createMovieModel(restURL,restId)
            });
            return new Movies();
        }
    }

    return MovieFactory;
});