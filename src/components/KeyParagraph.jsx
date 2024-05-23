import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const KeyParagraph = ({data}) => {
  const {heading, data: content} = data;

  const formatText = header => {
    const words = header.split('_');
    const formattedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return formattedWords.join(' ');
  };

  const renderContent = content => {
    if (typeof content === 'string') {
      return <Text style={styles.paragraph}>{content}</Text>;
    } else if (Array.isArray(content)) {
      return content.map((item, index) => (
        <Text key={index} style={styles.paragraph}>
          {item}
        </Text>
      ));
    } else if (typeof content === 'object') {
      return Object.keys(content).map((key, index) => (
        <View key={index} style={styles.paragraphContainer}>
          <Text style={styles.subheading}>{formatText(key)}</Text>
          {renderNestedContent(content[key])}
        </View>
      ));
    }
  };

  const renderNestedContent = content => {
    if (!content) {
      return (
        <Text style={styles.paragraph}>No data present with this key</Text>
      );
    } else if (typeof content === 'string') {
      return <Text style={styles.paragraph}>{content}</Text>;
    } else if (Array.isArray(content)) {
      return content.map((item, index) => (
        <Text key={index} style={styles.paragraph}>
          {item}
        </Text>
      ));
    } else if (typeof content === 'boolean') {
      return <Text style={styles.paragraph}>{content.toString()}</Text>;
    } else if (typeof content === 'object') {
      return Object.keys(content).map((key, index) => (
        <View key={index} style={styles.paragraphContainer}>
          <Text style={styles.subheading}>{formatText(key)}</Text>
          <Text style={styles.paragraph}>{content[key]}</Text>
        </View>
      ));
    }
  };

  return <View style={styles.container}>{renderContent(content)}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  paragraphContainer: {
    marginTop: 5,
  },
  paragraph: {
    fontSize: 16,
    marginTop: 5,
    color: '#474747',
  },
});

export default KeyParagraph;
