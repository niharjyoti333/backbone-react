define([
    'jquery',
    'underscore',
    'backbone',
    'views/projects/list.view'
], function($, _, Backbone, ProjectListView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '/projects': 'showProjects'
        }
    });


        var app_router = new AppRouter;
        app_router.on('showProjects', function(){
            alert("h");
        });
        Backbone.history.start();

});