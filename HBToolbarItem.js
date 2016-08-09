/**
 * Created by guyeldar on 02/06/2016.
 */
import React, { Component } from 'react';
var ReactNative = require('react-native');

var {
    TouchableOpacity,
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
        return (
            <TouchableOpacity
                {...this.props}
                style={this.props.isSelected?this.props.selectedButtonStyle:this.props.buttonStyle}>
                {this.props.itemViewFragment}
            </TouchableOpacity>
        );
    }

}

module.exports = HBToolbarItem;
