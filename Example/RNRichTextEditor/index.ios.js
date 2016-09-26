/**
 * react-native-richtext-editor Example
 * https://github.com/HoneyBook/react-native-richtext-editor
 * HoneyBook Inc.
 * @flow
 */

import React, { Component } from 'react';
var HBRichTextEditor = require('react-native-richtext-editor');
var HBToolbar = require('react-native-richtext-editor/HBToolbar');
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class RNRichTextEditor extends Component {

    render() {
    var bodyForDisplay = "<p>Wow this is an <b>AMAZING</b> demo!</p>";
    return (
        <View style={styles.container}>
            <HBRichTextEditor
                style={{
                    alignItems:'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0)'
                  }}
                initialHTML={bodyForDisplay}/>
            <HBToolbar/>
            <KeyboardSpacer/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: "column"
  }
});

AppRegistry.registerComponent('RNRichTextEditor', () => RNRichTextEditor);
