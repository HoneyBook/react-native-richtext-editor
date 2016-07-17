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

// this.props.key
// this.props.type (HBEditorConstants.TOOLBAR_ITEM_TYPES)
// this.props.itemViewFragment
// this.props.buttonStyle
// this props.selectedButtonStyle
// this.props.isSelected
class HBToolbarItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isSelected) {
            return (
                <TouchableOpacity
                    style={this.props.selectedButtonStyle}
                    onPress={() => {
                    console.log("Pressed " + this.props.type);
                    HBEditorEventEmitter.instance.emit(HBEditorConstants.TOOLBAR_ITEM_WAS_PRESSED,{type:this.props.type});
                }}>
                    {this.props.itemViewFragment}
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={this.props.buttonStyle}
                    onPress={() => {
                    console.log("Pressed " + this.props.type);
                    HBEditorEventEmitter.instance.emit(HBEditorConstants.TOOLBAR_ITEM_WAS_PRESSED,{type:this.props.type});
                }}>
                    {this.props.itemViewFragment}
                </TouchableOpacity>
            );

        }
    }

}

var styles = StyleSheet.create({
    button: {
        marginLeft: 5,
        marginRight: 5
    }
});

module.exports = HBToolbarItem;
