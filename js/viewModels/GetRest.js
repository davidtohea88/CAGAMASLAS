/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['ojs/ojcore'], 

function (oj) {

    var GetRest = {
//        resourceUrl : "http://movieapp-sitepointdemos.rhcloud.com/api/movies", 
        resourceUrl : "js/data/productgroup.json", 

        // Create a single movie instance.
        createModel : function (restURL,restId) {
            var Object = oj.Model.extend( {
                urlRoot : restURL, idAttribute : restId
            });
            return new Object();
        },

        // Create a movie collection.
        createCollection : function (restURL,restId) {
            var Objects = oj.Collection.extend( {
                url : restURL, model : this.createModel(restURL,restId)
            });
            return new Objects();
        }
    }

    return GetRest;
});