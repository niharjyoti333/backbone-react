'use strict';
define(["router", "backbone", "jquery"], function (router, Backbone, $) {
        var App = {
            // Initializes the APP module and listen for events
            initialize: function () {
                var self = this;
                self.mainRouter = router;
                //override backbone _updateHash method to avoid security risk with empty function
                Backbone.history._updateHash = function () {
                    return true;
                };

                    $('body').delegate('a[href^=#]', 'click', function (e) {
                        e.preventDefault();
                    });

                /*else{
                 var navigator =  Backbone.history.navigate;
                 Backbone.history.navigate= function(url,options){
                 arguments[0] = arguments[0];
                 navigator.apply(Backbone.history,arguments);
                 }

                 }*/

                //checking vendor site or user.
                if (typeof taxonomyXHR != "undefined") {
                    //creating deffered object for taxonamy service.
                    var taxonomyDeffred = $.Deferred();
                    //resolve deffered when service responded  before this line execution.
                    if (taxonomyXHR) {
                        if (taxonomyXHR.readyState == 4) {
                            taxonomyDeffred.resolve();
                        }
                    } else {
                        taxonomyDeffred.resolve();
                    }
                }


                var sync = Backbone.sync;
                Backbone.sync = function (method, model, options) {
                    /*if loader option is not given bydefault loader will be shown
                     else provide options.rdpLoader as jQuery ajax param in fetch or sync with following
                     values respectively
                     options.rdploader = {loader: false    // to disable loader
                     domElement:  //jQuery element inside which loader will be
                     // displayed default is $('body')
                     fontSizeForSpinner: //default is 40px
                     }
                     */
                    var beforeSend = options.beforeSend,
                        complete = options.complete,
                        domElement = "",
                        fontSizeForSpinner = "";

                    if (!options.rdploader || (options.rdploader && options.rdploader.loader)) {
                        if (options.rdploader) {
                            domElement = options.rdploader.domElement;
                            fontSizeForSpinner = options.rdploader.fontSizeForSpinner;
                        }
                        options.beforeSend = function (req, options) {
                            utils.showLoader(domElement, fontSizeForSpinner);
                            self.checkUrlDomain(options);
                            if (beforeSend) return beforeSend.apply(this, arguments);
                        };
                        options.complete = function () {
                            utils.removeLoader();
                            if (complete) return complete.apply(this, arguments);
                        }
                    } else {
                        options.beforeSend = function (req, options) {
                            self.checkUrlDomain(options);
                            if (beforeSend) return beforeSend.apply(this, arguments);
                        };
                    }

                    delete options.rdploader;
                    return sync(method, model, options);
                };
                return self;
            }

        };
        return App.initialize();
    }
);
