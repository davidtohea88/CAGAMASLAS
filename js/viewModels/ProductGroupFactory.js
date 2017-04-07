define(['ojs/ojcore'], 

function (oj) {

    var ProductGroupFactory = {
//        resourceUrl : "http://movieapp-sitepointdemos.rhcloud.com/api/movies", 
        resourceUrl : "js/data/productgroup.json", 

        // Create a single movie instance.
        createProductGroupModel : function (restURL,restId) {
            var Movie = oj.Model.extend( {
                urlRoot : restURL, idAttribute : restId
            });
            return new Movie();
        },

        // Create a movie collection.
        createProductGroupCollection : function (restURL,restId) {
            var Movies = oj.Collection.extend( {
                url : restURL, model : this.createProductGroupModel(restURL,restId)
            });
            return new Movies();
        }
    }

    return ProductGroupFactory;
});