Just playing around with XHR APIs. Looking to see how to transition off cordova's file transfer plugin.

Lots of stuff stolen from: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data

Have tested this with browser and android platforms.

    cordova create xhrtest
    cd xhrtest
    cordova platform add android browser

The server component is used from http://github.com/apache/cordova-labs, under the file-server branch.
