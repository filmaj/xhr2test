/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var log = console.log;
var API = 'http://localhost:5000';

function readBlob(blob, cb) {
    var reader = new FileReader();
    reader.onload = function() {
        cb(reader.result);
    }
    reader.readAsText(blob);
}
function saveBlob(key, blob) {
    return localforage.setItem(key, blob).then(function(thing) {
        log('saved ' + key + ' to storage');
    }).catch(function(err) {
       // This code runs if there were any errors
        log('error setting localforage item!' + err);
    });
}
function getAndReadBlob(key) {
    return localforage.getItem(key).then(function (blob) {
        readBlob(blob, function (result) {
            log('read blob response from storage! ' + result);
        });
    }).catch(function (err) {
        log('error getting localforage ' + key);
    });
}
function saveAndReadBlob(key, blob) {
    readBlob(blob, function (result) {
        log('read blob: ' + result);
        saveBlob(key, blob);
    });
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    tap: function(id, cb) {
        ['click', 'touchstart'].forEach(function(evt) {
            document.getElementById(id).addEventListener(evt, cb, false);
        });
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.tap('clear', function (evt) {
            localforage.clear();
            log('storage cleared');
        });
        this.tap('dl-robots', function(evt) {
            download_blob_via_xhr(API + '/robots.txt', function (blob) {
                saveAndReadBlob('robots', blob);
            });
        });
        this.tap('get-robots', function (evt) {
            getAndReadBlob('robots');
        });
        this.tap('upload-robots', function (evt) {
            localforage.getItem('robots').then(function (blob) {
                upload_blob_via_xhr(API + '/upload', blob, function (responseText) {
                    log('got response text post upload: ' + responseText);
                });
            });
        });
    }
};

app.initialize();
