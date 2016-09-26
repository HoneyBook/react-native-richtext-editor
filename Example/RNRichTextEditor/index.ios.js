/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var HBRichTextEditor = require('react-native-richtext-editor');
var HBToolbar = require('react-native-richtext-editor/HBToolbar');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class RNRichTextEditor extends Component {
    componentDidMount() {
        var bodyForDisplay = "<p>Wow this is <b>AMAZING!!</b></p>";

        setTimeout(() => {
            this.refs.myWebView.setHTML(bodyForDisplay);
        }, 1000);
    }

    render() {
    var bodyForDisplay = "<p>Wow this is <b>AMAZING!!</b></p>";
    return (
        <View style={styles.container}>
            <HBRichTextEditor
                ref="myWebView"
                style={{
                    alignItems:'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0)'
                  }}
                initialHTML={bodyForDisplay}/>
            <HBToolbar
                fixedRight={<View
                    style={{width:56,backgroundColor:'#000'}}
                />}
            />
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
