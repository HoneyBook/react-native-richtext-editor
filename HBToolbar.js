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

var {
    ListView,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Text
    } = ReactNative;

// this.props.toolbarItems
class HBToolbar extends Component {

    constructor(props) {
        super(props);
        this.buttonStyle =[this.props.baseButtonStyle?
            this.props.baseButtonStyle:
            this._getDefaultButtonStyle(),this.props.defaultButtonStyle]

        this.selectedButtonStyle =[this.props.baseButtonStyle?
            this.props.baseButtonStyle:
            this._getDefaultSelectedButtonStyle(),this.props.selectedButtonStyle]


        this.types = this.props.toolbarItems && this.props.toolbarItems.length > 0 ? this.props.toolbarItems :
            this._getDefaultToolbarPreset({});
        var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this._pressData = {};
        this.state = {
            dataSource: ds.cloneWithRows(this._genCols(this._pressData))
        };
    }

    componentDidMount() {
        HBEditorEventEmitter.instance.addListener(HBEditorConstants.TOOLBAR_ITEMS_STATE_HAS_BEEN_CHANGED, function (selectedItems) {
            console.log("TOOLBAR ITEMS STATE HAS BEEN CHANGED");
            this._updateToolbarItemsSelectionState(selectedItems);
        }.bind(this));
    }

    componentWillUnmount() {
        HBEditorEventEmitter.instance.removeAllListeners(HBEditorConstants.TOOLBAR_ITEMS_STATE_HAS_BEEN_CHANGED);
    }

    _getDefaultButtonStyle() {
        return {
            fontFamily: 'iconbasic',
            alignSelf: 'center',
            padding: 5,
            fontSize: 28
        };
    }

    _getDefaultSelectedButtonStyle() {
        return {
            fontFamily: 'iconbasic',
            alignSelf: 'center',
            fontSize: 28
        };
    }

    _getDefaultToolbarPreset() {
        return [
            HBEditorConstants.TOOLBAR_ITEM_BOLD,
            HBEditorConstants.TOOLBAR_ITEM_ITALIC,
            HBEditorConstants.TOOLBAR_ITEM_UNDERLINE,
            HBEditorConstants.TOOLBAR_ITEM_REMOVE_FORMATTING,
            HBEditorConstants.TOOLBAR_ITEM_BULLETS_LIST,
            HBEditorConstants.TOOLBAR_ITEM_INSERT_LINK
        ];
    }

    _genCols(pressedData) {
        var arr = [];
        this.types.forEach(function (type) {
            var selected = false;
            if (pressedData[type]) {
                selected = true;
            }
            arr.push({type: type, selected: selected});
        });
        return arr;
    }

    _updateToolbarItemsSelectionState(selectedItems) {
        var newPressedData = {};
        selectedItems.forEach((item) => {
            newPressedData[item] = true;
        });
        this._pressData = newPressedData;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
                this._genCols(this._pressData)
            )
        });
    }

    _pressCol(data) {
        HBEditorEventEmitter.instance.emit(HBEditorConstants.TOOLBAR_ITEM_WAS_PRESSED, {type: data.type});
    }

    _createIconForType(type,isSelected) {
        var style = [this.buttonStyle,isSelected?this.selectedButtonStyle:undefined];
        switch (type) {
            case HBEditorConstants.TOOLBAR_ITEM_BOLD:
            {
                return (<Text allowFontScaling={false} style={style}>&#xe900;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ITALIC:
            {
                return (<Text allowFontScaling={false} style={style}>&#xe903;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_UNDERLINE:
            {
                return (<Text allowFontScaling={false} style={style}>&#xe906;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_CENTER :
            {
                return (<Image source={require("./Images/HBcenterjustify.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_LEFT:
            {
                return (<Text allowFontScaling={false} style={style}>&#xe905;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_RIGHT:
            {
                return (<Image source={require("./Images/HBrightjustify.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_INSERT_LINK:
            {
                return (<Text allowFontScaling={false} style={style}>&#xe904;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_LINK:
            {
                return (<Text allowFontScaling={false} style={style}>&#xe904;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_FORMATTING:
            {
                return (<Text allowFontScaling={false} style={style}>&#xe907;</Text>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_BULLETS_LIST:
            {
                return (<Text allowFontScaling={false} style={style}>&#xe901;</Text>);
            }
        }

        return undefined;
    }

    _createImageForType(type) {
        var selectedStyle = {backgroundColor: "rgb(125,125,125)"};
        switch (type) {
            case HBEditorConstants.TOOLBAR_ITEM_BOLD:
            {
                return (<Image source={require("./Images/bold_asset_padded.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ITALIC:
            {
                return (<Image source={require("./Images/italic_asset_padded.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_UNDERLINE:
            {
                return (<Image source={require("./Images/underline_asset.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_CENTER :
            {
                return (<Image source={require("./Images/HBcenterjustify.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_LEFT:
            {
                return (<Image source={require("./Images/HBleftjustify.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_RIGHT:
            {
                return (<Image source={require("./Images/HBrightjustify.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_INSERT_LINK:
            {
                return (<Image source={require("./Images/link_asset.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_LINK:
            {
                return (<Image source={require("./Images/HBunlink.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_FORMATTING:
            {
                return (<Image source={require("./Images/remove_styling.png")}/>);
            }
            case HBEditorConstants.TOOLBAR_ITEM_BULLETS_LIST:
            {
                return (<Image source={require("./Images/bullets_asset.png")}/>);
            }
        }

        return undefined;
    }

    _renderCol(colData) {
        return <TouchableOpacity

            style={[{marginLeft: 2, marginTop:1.5, padding:2},
                    colData.selected?
                        this.props.selectedItemBackgroundStyle:
                        this.props.defaultItemBackgroundStyle
                    ]}
            onPress={function(){
                this._pressCol(colData);
            }.bind(this)}>
            {this._createIconForType(colData.type,colData.selected)}
        </TouchableOpacity>
    }

    _renderFooter() {
        if (this.props.footerView) {
            return this.props.footerView;
        }

        return undefined;
    }

    render() {
        let bgColorStyle = this.props.toolbarBackgroundColor ? {backgroundColor:this.props.toolbarBackgroundColor} :
                            {backgroundColor:'rgba(125,125,125,0.1)'};
        return (
            <View style={[styles.toolbarHolder,bgColorStyle]}>
                {this.props.fixedLeft}
                <ListView
                    horizontal={true}
                    bounces={false}
                    contentContainerStyle={{}}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderCol.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                />
                {this.props.fixedRight}

            </View>

        );
    }

}

var styles = StyleSheet.create({
    toolbarHolder: {
        flexDirection: "row"
    },
    buttons: {
        flex: 1,
        flexDirection: "row",
        paddingBottom: 4
    },
    selectedIcon: {
        fontFamily: 'iconbasic',
        alignSelf: 'center',
        fontSize: 28
    },
    icon: {
        fontFamily: 'iconbasic',
        alignSelf: 'center',
        padding: 5,
        fontSize: 28
    }
});

module.exports = HBToolbar;
