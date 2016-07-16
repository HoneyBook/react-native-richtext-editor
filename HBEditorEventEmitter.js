'use strict';
var {EventEmitter} = require('fbemitter');

let instance = null;

class HBEditorEventEmitter extends EventEmitter {

    static get instance() {
        if (!instance) {
            instance = new HBEditorEventEmitter();
        }
        return instance;
    }

    static syncEmit(eventName:string, metadata:object){
        HBEditorEventEmitter.emitWrapper(eventName,metadata);
    }

    static emitWrapper(eventName:string, metadata:object){
        try {
            HBEditorEventEmitter.instance.emit(eventName, metadata);
        }catch(exception){
            console.log(exception);
        }
    }
}
module.exports = HBEditorEventEmitter;