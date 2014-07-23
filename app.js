'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MeanCrop = new Module('mean-crop');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
MeanCrop.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    MeanCrop.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    MeanCrop.menus.add({
        title: 'meanCrop example page',
        link: 'meanCrop example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    MeanCrop.aggregateAsset('js', '/node_modules/mean-crop/public/assets/lib/Jcrop/js/jquery.Jcrop.min.js', {
        absolute: true
    });
    MeanCrop.aggregateAsset('js', '/node_modules/mean-crop/public/assets/lib/Jcrop/js/jquery.color.js', {
        absolute: true
    });
    MeanCrop.aggregateAsset('css', '/node_modules/mean-crop/public/assets/lib/Jcrop/css/jquery.Jcrop.css', {
        absolute: true
    });

    MeanCrop.aggregateAsset('css', '/node_modules/mean-crop/public/assets/css/meanCrop.css', {
        absolute: true
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    MeanCrop.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    MeanCrop.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    MeanCrop.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return MeanCrop;
});