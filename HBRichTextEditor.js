/**
 * Created by guyeldar on 04/06/2016.
 */
import React, { Component } from 'react';
var ReactNative = require('react-native');

var WebViewBridge = require('react-native-webview-bridge');
var HBEditorConstants = require('./HBEditorConstants');
var HBEditorEventEmitter = require('./HBEditorEventEmitter');

var {
    StyleSheet,
    AlertIOS
    } = ReactNative;

class HBRichTextEditor extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        HBEditorEventEmitter.instance.addListener(HBEditorConstants.TOOLBAR_ITEM_WAS_PRESSED, function(itemType) {
            this._handleToolbarItemPress(itemType.type);
        }.bind(this));

        var bodyForDisplay = this.props.initialHTML.replace(/\n/g, "");
        bodyForDisplay = this._replaceInputTags(bodyForDisplay);
        bodyForDisplay = bodyForDisplay.replace(/"/g, "'");

        setTimeout(() => {
            this.setHTML(bodyForDisplay);
        }, 1000);

    }

    _replaceInputTags(html) {
        var anchorIndex = 0;
        while (html.indexOf("<input", anchorIndex) != -1) {
            var startPos = html.indexOf("<input", anchorIndex);
            var endPos = html.indexOf(">", startPos);

            var inputTag = html.slice(startPos, endPos + 1);
            html = html.replace(inputTag, "");

            anchorIndex = endPos;
        }
        return html;
    }

    componentWillUnmount() {
        HBEditorEventEmitter.instance.removeAllListeners(HBEditorConstants.TOOLBAR_ITEM_WAS_PRESSED);
    }

    onBridgeMessage (message) {
        console.log(message);
    }

    getHTML() {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.refs.webviewbridge.getElementHTML("zss_editor_content", (error, html) => {
                resolve(html);
            });
        });
    }

    setHTML(html) {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setHTML("${html}");`);
    }

    _insertLinkWithDialog() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.prepareInsert();`);

        AlertIOS.prompt(
            'Insert link',
            'Enter the URL for the link',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                {text: 'Insert', onPress: (url) => {
                    this.refs.webviewbridge.sendToBridge(`zss_editor.insertLink(\"` + url + `\", \"\");`);
                }, type: "default"},

            ],
            'plain-text',
            'http://'
        );
    }

    render() {
        return (
            <WebViewBridge
                {...this.props}
                ref="webviewbridge"
                onBridgeMessage={this.onBridgeMessage.bind(this)}
                onShouldStartLoadWithRequest={this.onShouldStartLoadRequest.bind(this)}
                hideKeyboardAccessoryView={true}
                source={require('./editor.html')}/>
        );
    }

    onShouldStartLoadRequest(event) {
        console.log("inside onShouldStartLoadRequest with url " + event.url);
        if (event.url.indexOf("callback://") != -1) {
            var urlParams = event.url.replace("callback://0/","");
            var items = urlParams.split(",");

            HBEditorEventEmitter.instance.emit(HBEditorConstants.HB_RICH_EDITOR_GOT_FOCUS);
            HBEditorEventEmitter.instance.emit(HBEditorConstants.TOOLBAR_ITEMS_STATE_HAS_BEEN_CHANGED, items);

            return false;
        }
        else if (event.url.indexOf("scroll://") != -1) {
            return false;
        }

        return (event.url.indexOf("editor.html") != -1);
    }

    _handleToolbarItemPress(itemType) {
        HBEditorEventEmitter.instance.emit(HBEditorConstants.HB_RICH_EDITOR_TOOLBAR_BUTTON_WAS_PRESSED,{pressedButton:itemType});

        switch (itemType) {
            case HBEditorConstants.TOOLBAR_ITEM_BOLD:
            {
                this.setBold();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_ITALIC:
            {
                this.setItalic();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_UNDERLINE:
            {
                this.setUnderline();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_REMOVE_FORMATTING:
            {
                this.removeFormat();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_LEFT:
            {
                this.alignLeft();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_CENTER:
            {
                this.alignCenter();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_RIGHT:
            {
                this.alignRight();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_ALIGN_FULL:
            {
                this.alignFull();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_BULLETS_LIST:
            {
                this.insertBulletsList();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_ORDERED_LIST:
            {
                this.insertOrderedList();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_INSERT_LINK:
            {
                this._insertLinkWithDialog();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_HEADING_1:
            {
                this.heading1();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_HEADING_2:
            {
                this.heading2();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_HEADING_3:
            {
                this.heading3();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_HEADING_4:
            {
                this.heading4();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_HEADING_5:
            {
                this.heading5();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_HEADING_6:
            {
                this.heading6();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_PARAGRAPH:
            {
                this.setParagraph();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_SUBSCRIPT:
            {
                this.setSubscript();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_SUPERSCRIPT:
            {
                this.setSuperscript();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_STRIKETHROUGH:
            {
                this.setStrikethrough();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_HR:
            {
                this.setHR();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_INDENT:
            {
                this.setIndent();
                break;
            }
            case HBEditorConstants.TOOLBAR_ITEM_OUTDENT:
            {
                this.setOutdent();
                break;
            }
        }
    }

    blurEditor() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.blurEditor();`);
    }

    setBold() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setBold();`);
    }

    setItalic() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setItalic();`);
    }

    setUnderline() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setUnderline();`);
    }

    heading1() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setHeading('h1');`);
    }

    heading2() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setHeading('h2');`);
    }

    heading3() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setHeading('h3');`);
    }

    heading4() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setHeading('h4');`);
    }

    heading5() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setHeading('h5');`);
    }

    heading6() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setHeading('h6');`);
    }

    setParagraph() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setParagraph();`);
    }

    removeFormat() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.removeFormating();`);
    }

    alignLeft() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setJustifyLeft();`);
    }

    alignCenter() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setJustifyCenter();`);
    }

    alignRight() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setJustifyRight();`);
    }

    alignFull() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setJustifyFull();`);
    }

    insertBulletsList() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setUnorderedList();`);
    }

    insertOrderedList() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setOrderedList();`);
    }

    setSubscript() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setSubscript();`);
    }
    setSuperscript() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setSuperscript();`);
    }
    setStrikethrough() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setStrikeThrough();`);
    }
    setHR() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setHorizontalRule();`);
    }
    setIndent() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setIndent();`);
    }
    setOutdent() {
        this.refs.webviewbridge.sendToBridge(`zss_editor.setOutdent();`);
    }
}

var styles = StyleSheet.create({
});

module.exports = HBRichTextEditor;