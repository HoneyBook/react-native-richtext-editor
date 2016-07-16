/**
 * Created by guyeldar on 02/06/2016.
 */
import React, { Component } from 'react';
var ReactNative = require('react-native');
var HBEditorEventEmitter = require('./HBEditorEventEmitter');
var HBEditorConstants = require('./HBEditorConstants');

var {
    TouchableOpacity,
    StyleSheet,
    Text,
    } = ReactNative;

// this.props.type (HBEditorConstants.TOOLBAR_ITEM_TYPES)
// this.props.itemViewFragment
class HBToolbarItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log("Pressed " + this.props.type);
                    HBEditorEventEmitter.instance.emit(HBEditorConstants.TOOLBAR_ITEM_WAS_PRESSED,{type:this.props.type});
                }}>
                {this.props.itemViewFragment}
            </TouchableOpacity>
        );
    }

}

var styles = StyleSheet.create({
    button: {
        marginLeft: 5,
        marginRight: 5
    }
});

module.exports = HBToolbarItem;
