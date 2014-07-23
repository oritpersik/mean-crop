'use strict';

// The Package is past automatically as first parameter
module.exports = function(MeanCrop, app, auth, database) {
    var gm = require('gm').subClass({
            imageMagick: true
        }),
        dirDest = '/packages/images/thumbs/',
        osSep = '/',
        fs = require('fs'),
        mkdirOrig = fs.mkdir,
        config = require('meanio').loadConfig();

    function crop(coords, imgSrc, imgDest, callback) {
        var c = JSON.parse(coords);
        var imgName = imgSrc.split('/')[imgSrc.split('/').length - 1];
        gm(imgSrc)
            .crop(c.w, c.h, c.x, c.y)
            .write(config.root + imgDest + imgName, function(err) {
                if (!err) {
                    callback({
                        success: true,
                        img: {
                            src: imgDest + imgName
                        }
                    });
                } else {
                    callback({
                        success: false,
                        err: err
                    });
                }
            });
    }

    function mkdir_p(path, callback, position) {
        var parts = require('path').normalize(path).split(osSep);
        position = position || 0;

        if (position >= parts.length) {
            return callback();
        }

        var directory = parts.slice(0, position + 1).join(osSep) || osSep;
        fs.stat(directory, function(err) {
            if (err === null) {
                mkdir_p(path, callback, position + 1);
            } else {
                mkdirOrig(directory, function(err) {
                    if (err && err.code !== 'EEXIST') {
                        return callback(err);
                    } else {
                        mkdir_p(path, callback, position + 1);
                    }
                });
            }
        });
    }

    // app.get('/meanCrop/crop', function(req, res) {

    //     var path = config.root + dirDest + req.query.w + 'x' + req.query.h + '/';
    //     var imgDest = dirDest + req.query.w + 'x' + req.query.h + '/';
    //     if (!fs.existsSync(path)) {
    //         mkdir_p(path, function(err) {
    //             crop(req.query.coords, config.root + req.query.src, imgDest, function(data) {
    //                 res.jsonp(data);
    //             });
    //         });
    //     } else {
    //         crop(req.query.coords, config.root + req.query.src, imgDest, function(data) {
    //             res.jsonp(data);
    //         });
    //     }
    // });

    app.get('/meanCrop/crop', function(req, res) {
        var c = JSON.parse(req.query.coords);
        gm(config.root + req.query.src)
            .crop(c.w, c.h, c.x, c.y)
            .write(config.root + req.query.dest, function(err) {
                if (!err) {
                    res.jsonp({
                        success: true,
                        img: {
                            src: req.query.dest
                        }
                    });
                } else {
                    res.jsonp({
                        success: false,
                        err: err
                    });
                }
            });
    });

    app.get('/mean-upload/fb', function(req, res) {
        gm(req.query.src)
            .stream('png', function(err, stdout, stderr) {
                var writeStream = fs.createWriteStream(config.root + '/packages/photos/' + req.couple._id + '/main/fbPhoto.png');
                stdout.pipe(writeStream);
                writeStream.on('finish', function() {
                    res.jsonp({
                        success: true,
                        imgName: 'fbPhoto.png'
                    });
                });
            });
    });

    app.get('/mean-upload/fb', function(req, res) {
        gm(req.query.src)
            .stream('png', function(err, stdout, stderr) {
                var writeStream = fs.createWriteStream(config.root + '/packages/photos/' + req.couple._id + '/main/fbPhoto.png');
                stdout.pipe(writeStream);
                writeStream.on('finish', function() {
                    res.jsonp({
                        success: true,
                        imgName: 'fbPhoto.png'
                    });
                });
            });
    });

    app.get('/meanCrop/example/render', function(req, res, next) {
        MeanCrop.render('index', {
            package: 'mean-crop'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};