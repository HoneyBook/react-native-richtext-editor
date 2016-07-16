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
            itemsObjs.push(<HBToolbarItem key={toolbarItem} type={toolbarItem} itemViewFragment={this._createIconForType(toolbarItem).bind(this)} isSelected={false} />);
        }

        return itemsObjs;
    }

    _createIconForType(type) {
        var selectedStyle = {borderRadius: 5, padding:5, color: "#DCDCDC", backgroundColor: "#797979"};
        switch (type) {
            case HBEditorConstants.TOOLBAR_ITEM_BOLD: {
                return (<Text style={styles.icon}>&#xe900;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ITALIC: {
                return (<Text style={styles.icon}>&#xe903;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_UNDERLINE: {
                return (<Text style={styles.icon}>&#xe906;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_CENTER :{
                return (<Image source={require("./Images/HBcenterjustify.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_LEFT:
            {
                return (<Text style={styles.icon}>&#xe905;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_RIGHT: {
                return (<Image source={require("./Images/HBrightjustify.png")} />);
            }
            case HBEditorConstants.TOOLBAR_ITEM_INSERT_LINK: {
                return (<Text style={styles.icon}>&#xe904;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_LINK: {
                return (<Text style={styles.icon}>&#xe904;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_FORMATTING: {
                return (<Text style={styles.icon}>&#xe907;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_BULLETS_LIST: {
                return (<Text style={styles.icon}>&#xe901;</Text>);
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
            if (this.state.selectedToolbarItems.indexOf(toolbarItem) != -1) {
                isItemSelected = true;
            }
            itemsObjs.push(<HBToolbarItem key={toolbarItem} type={toolbarItem} iconImgFragment={this._createIconForType(toolbarItem).bind(this)} isSelected={isItemSelected} />);
        }
        // Include a spacer in the right for adding a "dismiss first responder" button (KB down)
        itemsObjs.push(<View key="rightSpacer" style={{width:50, backgroundColor:"rgba(0,0,0,0)"}} />);
        return <View style={styles.buttons}>{itemsObjs}</View>;
    }

    _renderToolbarItems() {
        var itemsObjs = [];
        this.enabledToolbarItems.forEach((item) => {
            item.isSelected = this.state.selectedToolbarItems.indexOf(item.type) != -1;
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
