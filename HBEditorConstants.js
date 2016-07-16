/**
 * Created by guyeldar on 02/06/2016.
 */
var HBEditorConstants = {

    HB_TOOLBAR_ITEM_STATE_NORMAL: 1,
    HB_TOOLBAR_ITEM_STATE_SELECTED: 2,

    // Button types
    TOOLBAR_ITEM_BOLD: "bold",
    TOOLBAR_ITEM_ITALIC: "italic",
    TOOLBAR_ITEM_UNDERLINE: "underline",
    TOOLBAR_ITEM_REMOVE_FORMATTING: "removeFormat",
    TOOLBAR_ITEM_INSERT_LINK: "link",
    TOOLBAR_ITEM_REMOVE_LINK: "unlink",
    TOOLBAR_ITEM_ALIGN_RIGHT: "justifyRight",
    TOOLBAR_ITEM_ALIGN_CENTER: "justifyCenter",
    TOOLBAR_ITEM_ALIGN_LEFT: "justifyLeft",
    TOOLBAR_ITEM_ALIGN_FULL: "justifyFull",
    TOOLBAR_ITEM_BULLETS_LIST: "insertUnorderedList",
    TOOLBAR_ITEM_HEADING_1: "h1",
    TOOLBAR_ITEM_HEADING_2: "h2",
    TOOLBAR_ITEM_HEADING_3: "h3",
    TOOLBAR_ITEM_HEADING_4: "h4",
    TOOLBAR_ITEM_HEADING_5: "h5",
    TOOLBAR_ITEM_HEADING_6: "h6",
    TOOLBAR_ITEM_PARAGRAPH: "paragraph",
    TOOLBAR_ITEM_SUBSCRIPT: "subscript",
    TOOLBAR_ITEM_SUPERSCRIPT: "superscript",
    TOOLBAR_ITEM_STRIKETHROUGH: "strikethrough",
    TOOLBAR_ITEM_ORDERED_LIST: "orderedList",
    TOOLBAR_ITEM_HR: "hr",
    TOOLBAR_ITEM_INDENT: "indent",
    TOOLBAR_ITEM_OUTDENT: "outdent",


    // Event Emitter event name
    TOOLBAR_ITEM_WAS_PRESSED: "toolbarItemWasPressed",
    TOOLBAR_ITEMS_STATE_HAS_BEEN_CHANGED: "toolbarItemsStateHasBeenChanged",
    HB_RICH_EDITOR_GOT_FOCUS: "hbRichEditorGotFocus",
    HB_RICH_EDITOR_TOOLBAR_BUTTON_WAS_PRESSED: "HbRichEditorToolbarButtonWasPressed"
};

module.exports = HBEditorConstants;