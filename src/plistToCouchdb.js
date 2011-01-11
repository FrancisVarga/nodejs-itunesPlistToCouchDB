/**
 * Created by JetBrains PhpStorm.
 * User: LittleBuddha87
 * Date: 1/11/11
 * Time: 2:25 AM
 * To change this template use File | Settings | File Templates.
 */
var
        couchdb = require('cradle');
        sys = require('sys');
        plist = require('plist');
        client = new (couchdb.Connection)().database('dev_ituneslib_complete');
        plistURL = 'plistExample.xml';

function trace(message) {
    return sys.log(message);
}

function var_dump(obj) {
    trace(JSON.stringify(obj));
}

function init() {
    try {
        //plist.parseFile('plistExample.xml', parseFileHandler);
        plist.parseFile(plistURL, parseFileHandler);
    } catch(error) {
        trace(error);
    }

}

function parseFileHandler(error, obj) {

    if (error) {
        var_dump(error);
    }
    else {
        var tmpObj = obj[0];

        for (var item in tmpObj.Tracks) {
            saveItemToCouchDB(tmpObj.Tracks[item]);
        }
    }
}

function saveItemToCouchDB(itemObj) {
    if (itemObj['Track Type'] == 'File') {
        client.save(itemObj);
    }
}