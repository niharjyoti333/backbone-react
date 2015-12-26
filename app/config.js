require.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        layoutmanager:'libs/backbone.layoutmanager',
        text:'libs/text'
    },
    shim: {
        backbone: {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        }
    },
    deps:["application"]
});
//require([
//
//    // Load our app module and pass it to our definition function
//    'application',
//], function(App){
//    // The "app" dependency is passed in as "App"
//    App.initialize();
//});
//require(['app'], function(App) {
//    App.init();
//});