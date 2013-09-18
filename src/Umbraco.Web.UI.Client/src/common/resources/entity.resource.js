/**
    * @ngdoc service
    * @name umbraco.resources.entityResource
    * @description Loads in basic data for all entities
    * 
    * ##What is an entity?
    * An entity is a basic **read-only** representation of an Umbraco node. It contains only the most
    * basic properties used to display the item in trees, lists and navigation. 
    *
    * ##What is the difference between get entity and get content?
    * the entity only contains the basic node data, name, id and guid, whereas content
    * nodes fetched through the entity service also contains additional meta data such
    * as icon, document type, path and so on.
    *
    * ##Entity object types?
    * As an optional parameter, you can pass in the specific type name. So if you know you
    * are looking for a specific type, you should pass in the object name, to make lookup faster
    * and to return more data.
    * 
    * The core object types are:
    *
    * - Document
    * - Media
    * - Member
    * - Template
    * - DocumentType
    * - MediaType
    * - MemberType
    **/
function entityResource($q, $http, umbRequestHelper) {

    //the factory object returned
    return {
        
        /**
         * @ngdoc method
         * @name umbraco.resources.entityResource#getById
         * @methodOf umbraco.resources.entityResource
         *
         * @description
         * Gets an entity with a given id
         *
         * ##usage
         * <pre>
         * //get media by id
         * entityResource.getEntityById(0, "Media")
         *    .then(function(ent) {
         *        var myDoc = ent; 
         *        alert('its here!');
         *    });
         * </pre> 
         * 
         * @param {Int} id id of entity to return
         * @param {string} type optional Object type name        
         * @returns {Promise} resourcePromise object containing the entity.
         *
         */
        getById: function (id, type) {            
            return umbRequestHelper.resourcePromise(
               $http.get(
                   umbRequestHelper.getApiUrl(
                       "entityApiBaseUrl",
                       "GetById",
                       [{ id: id, type: type }])),
               'Failed to retreive entity data for id ' + id);
        },
        
        /**
         * @ngdoc method
         * @name umbraco.resources.entityResource#getByIds
         * @methodOf umbraco.resources.entityResource
         *
         * @description
         * Gets an array of entities, given a collection of ids
         *
         * ##usage
         * <pre>
         * //Get templates for ids
         * entityResource.getEntitiesByIds( [1234,2526,28262], "Template")
         *    .then(function(templateArray) {
         *        var myDoc = contentArray; 
         *        alert('they are here!');
         *    });
         * </pre> 
         * 
         * @param {Array} ids ids of entities to return as an array
         * @param {string} type optional type name        
         * @returns {Promise} resourcePromise object containing the entity array.
         *
         */
        getByIds: function (ids, type) {
            
            var query = "";
            _.each(ids, function(item) {
                query += "ids=" + item + "&";
            });
            query += "type=" + type;

            return umbRequestHelper.resourcePromise(
               $http.get(
                   umbRequestHelper.getApiUrl(
                       "entityApiBaseUrl",
                       "GetByIds",
                       query)),
               'Failed to retreive entity data for ids ' + ids);
        },

        /**
         * @ngdoc method
         * @name umbraco.resources.entityResource#getEntityById
         * @methodOf umbraco.resources.entityResource
         *
         * @description
         * Gets an entity with a given id
         *
         * ##usage
         * <pre>
         *
         * //Only return media
         * entityResource.getAll("Media")
         *    .then(function(ent) {
         *        var myDoc = ent; 
         *        alert('its here!');
         *    });
         * </pre> 
         * 
         * @param {string} type Object type name        
         * @returns {Promise} resourcePromise object containing the entity.
         *
         */
        getAll: function (type) {            
            return umbRequestHelper.resourcePromise(
               $http.get(
                   umbRequestHelper.getApiUrl(
                       "entityApiBaseUrl",
                       "GetAll",
                       [{type: type }])),
               'Failed to retreive entity data for type ' + type);
        },

        /**
         * @ngdoc method
         * @name umbraco.resources.entityResource#getAncestors
         * @methodOf umbraco.resources.entityResource
         *
         * @description
         * Gets ancestor entities for a given item
         *        
         * 
         * @param {string} type Object type name        
         * @returns {Promise} resourcePromise object containing the entity.
         *
         */
        getAncestors: function (id, type) {            
            return umbRequestHelper.resourcePromise(
               $http.get(
                   umbRequestHelper.getApiUrl(
                       "entityApiBaseUrl",
                       "GetAncestors",
                       [{id: id}, {type: type}])),
               'Failed to retreive ancestor data for id ' + id);
        },
        
        /**
         * @ngdoc method
         * @name umbraco.resources.entityResource#getAncestors
         * @methodOf umbraco.resources.entityResource
         *
         * @description
         * Gets children entities for a given item
         *        
         * 
         * @param {string} type Object type name        
         * @returns {Promise} resourcePromise object containing the entity.
         *
         */
        getChildren: function (id, type) {
            return umbRequestHelper.resourcePromise(
               $http.get(
                   umbRequestHelper.getApiUrl(
                       "entityApiBaseUrl",
                       "GetChildren",
                       [{ id: id }, { type: type }])),
               'Failed to retreive child data for id ' + id);
        },
     
        /**
         * @ngdoc method
         * @name umbraco.resources.entityResource#searchMedia
         * @methodOf umbraco.resources.entityResource
         *
         * @description
         * Gets an array of entities, given a lucene query
         *
         * ##usage
         * <pre>
         * entityResource.search("news")
         *    .then(function(mediaArray) {
         *        var myDoc = mediaArray; 
         *        alert('they are here!');
         *    });
         * </pre> 
         * 
         * @param {String} Query search query        
         * @returns {Promise} resourcePromise object containing the entity array.
         *
         */
        search: function (query, type) {
            
            return umbRequestHelper.resourcePromise(
               $http.get(
                   umbRequestHelper.getApiUrl(
                       "entityApiBaseUrl",
                       "SearchMedia",
                       [{ query: query }, {type: type}])),
               'Failed to retreive entity data for query ' + query);
        }
            
    };
}

angular.module('umbraco.resources').factory('entityResource', entityResource);
