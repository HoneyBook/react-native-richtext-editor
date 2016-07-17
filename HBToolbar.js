/**
 * Created by guyeldar on 02/06/2016.
 */
/**
 * Created by guyeldar on 02/06/2016.
 */
import React, { Component } from 'react';
var ReactNative = require('react-native');
var HBToolbarItem = require('./HBToolbarItem');
var HBEditorConstants = require('./HBEditorConstants');
var HBEditorEventEmitter = require("./HBEditorEventEmitter");
var _ = require("lodash");
var enabledToolbarItems = [];

var {
    ScrollView,
    StyleSheet,
    Image,
    View,
    Text
    } = ReactNative;

// this.props.toolbarItems
class HBToolbar extends Component {

    constructor(props) {
        super(props);
        this.enabledToolbarItems =  this.props.toolbarItems && this.props.toolbarItems.length > 0 ? this.props.toolbarItems :
                                    this._buildDefaultToolbarPreset();
        this.buttonStyle = this.props.buttonStyle ? this.props.buttonStyle : this._getDefaultButtonStyle();
        this.selectedButtonStyle = this.props.selectedButtonStyle ? this.props.selectedButtonStyle : this._getDefaultSelectedButtonStyle();

        this.state = {
            selectedToolbarItems: []
        };
    }

    componentDidMount() {
        HBEditorEventEmitter.instance.addListener(HBEditorConstants.TOOLBAR_ITEMS_STATE_HAS_BEEN_CHANGED, function(selectedItems) {
            console.log("TOOLBAR ITEMS STATE HAS BEEN CHANGED");
            this.setState({
                selectedToolbarItems:selectedItems.selectedItems
            });
        }.bind(this));
    }

    componentWillUnmount() {
        HBEditorEventEmitter.instance.removeAllListeners(HBEditorConstants.TOOLBAR_ITEMS_STATE_HAS_BEEN_CHANGED);
    }

    _getDefaultButtonStyle() {
        return ({
            fontFamily: 'iconbasic',
            alignSelf: 'center',
            padding: 5,
            fontSize: 28,
            marginLeft: 5,
            marginRight: 5
        });
    }

    _getDefaultSelectedButtonStyle() {
        return ({
            fontFamily: 'iconbasic',
            alignSelf:'center',
            fontSize: 28
        });
    }

    _getDefaultToolbarPreset() {
        return [
            HBEditorConstants.TOOLBAR_ITEM_BOLD, HBEditorConstants.TOOLBAR_ITEM_ITALIC,
            HBEditorConstants.TOOLBAR_ITEM_UNDERLINE,
            HBEditorConstants.TOOLBAR_ITEM_REMOVE_FORMATTING, HBEditorConstants.TOOLBAR_ITEM_BULLETS_LIST,
            HBEditorConstants.TOOLBAR_ITEM_INSERT_LINK
        ];
    }

    _buildDefaultToolbarPreset() {
        var itemsObjs = [];

        var defaultItemsTypesArr = this._getDefaultToolbarPreset();
        for (var i=0; i < defaultItemsTypesArr.length; i++) {
            var toolbarItem = defaultItemsTypesArr[i];
            itemsObjs.push(<HBToolbarItem key={toolbarItem} type={toolbarItem} itemViewFragment={this._createIconForType(toolbarItem)}
                                          isSelected={false} buttonStyle={this._getDefaultButtonStyle()}
                                          selectedButtonStyle={this._getDefaultSelectedButtonStyle()} />);
        }

        return itemsObjs;
    }

    _createIconForType(type) {
        var selectedStyle = {borderRadius: 5, padding:5, color: "#DCDCDC", backgroundColor: "#797979"};
        switch (type) {
            case HBEditorConstants.TOOLBAR_ITEM_BOLD: {
                return (<Text style={this.buttonStyle}>&#xe900;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ITALIC: {
                return (<Text style={this.buttonStyle}>&#xe903;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_UNDERLINE: {
                return (<Text style={this.buttonStyle}>&#xe906;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_CENTER :{
                return (<Image source={require("./Images/HBcenterjustify.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_LEFT:
            {
                return (<Text style={this.buttonStyle}>&#xe905;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_RIGHT: {
                return (<Image source={require("./Images/HBrightjustify.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_INSERT_LINK: {
                return (<Text style={this.buttonStyle}>&#xe904;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_LINK: {
                return (<Text style={this.buttonStyle}>&#xe904;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_FORMATTING: {
                return (<Text style={this.buttonStyle}>&#xe907;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_BULLETS_LIST: {
                return (<Text style={this.buttonStyle}>&#xe901;</Text>);
            }
        }

        return undefined;
    }

    _createImageForType(type) {
        var selectedStyle = {backgroundColor: "rgb(125,125,125)"};
        switch (type) {
            case HBEditorConstants.TOOLBAR_ITEM_BOLD: {
                return (<Image source={require("./Images/bold_asset_padded.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ITALIC: {
                return (<Image source={require("./Images/italic_asset_padded.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_UNDERLINE: {
                return (<Image source={require("./Images/underline_asset.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_CENTER :{
                return (<Image source={require("./Images/HBcenterjustify.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_LEFT: {
                return (<Image source={require("./Images/HBleftjustify.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_RIGHT: {
                return (<Image source={require("./Images/HBrightjustify.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_INSERT_LINK: {
                return (<Image source={require("./Images/link_asset.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_LINK: {
                return (<Image source={require("./Images/HBunlink.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_FORMATTING: {
                return (<Image source={require("./Images/remove_styling.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_BULLETS_LIST: {
                return (<Image source={require("./Images/bullets_asset.png")}/>);
            }
        }

        return undefined;
    }

    _renderItems() {
        var itemsObjs = [];
        for (var i=0; i < this.enabledToolbarItems.length; i++) {
            var toolbarItem = this.enabledToolbarItems[i];
            var isItemSelected = false;
            if (_.includes(this.state.selectedToolbarItems, toolbarItem.key)) {
                isItemSelected = true;
            }
            if (isItemSelected) {
                itemsObjs.push(<HBToolbarItem key={toolbarItem} type={toolbarItem}
                                              itemViewFragment={this._createIconForType(toolbarItem)}
                                              style={this.selectedButtonStyle}
                                              isSelected={true}/>);
            } else {
                itemsObjs.push(<HBToolbarItem key={toolbarItem} type={toolbarItem}
                                              itemViewFragment={this._createIconForType(toolbarItem)}
                                              style={this.buttonStyle}
                                              isSelected={false}/>);
            }
        }
        // Include a spacer in the right for adding a "dismiss first responder" button (KB down)
        itemsObjs.push(<View key="rightSpacer" style={{width:50, backgroundColor:"rgba(0,0,0,0)"}} />);
        return <View style={styles.buttons}>{itemsObjs}</View>;
    }

    _renderToolbarItems() {
        var itemsObjs = [];
        this.enabledToolbarItems.forEach((item) => {
            item.isSelected = this.state.selectedToolbarItems.indexOf(item.key) != -1;
            itemsObjs.push(item);
        });

        // Include a spacer in the right for adding a "dismiss first responder" button (KB down)
        itemsObjs.push(<View key="rightSpacer" style={{width:50, backgroundColor:"rgba(0,0,0,0)"}} />);
        return <View style={styles.buttons}>{itemsObjs}</View>;
    }

    render() {
        return (
            <ScrollView horizontal={true} bounces={false} contentContainerStyle={{}} style={styles.toolbarHolder}>
                {this._renderToolbarItems()}
            </ScrollView>
        );
    }

}

var styles = StyleSheet.create({
    toolbarHolder: {
        flex:1,
        flexDirection: "row",
        backgroundColor: 'rgba(125,125,125,0.1)',
        paddingTop:4
    },
    buttons: {
        flex:1,
        flexDirection:"row",
        paddingBottom: 4
    },
    selectedIcon: {
        fontFamily: 'iconbasic',
        alignSelf:'center',
        fontSize: 28
    },
    icon: {
        fontFamily: 'iconbasic',
        alignSelf:'center',
        padding:5,
        fontSize: 28
    }
});

module.exports = HBToolbar;
