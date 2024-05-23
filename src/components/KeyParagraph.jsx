import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const KeyParagraph = ({data}) => {
  console.log(data);
  const {heading, data: content} = data;

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
          <Text style={styles.subheading}>{key}</Text>
          {renderContent(content[key])}
        </View>
      ));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      {renderContent(content)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  paragraphContainer: {
    marginTop: 5,
  },
  paragraph: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default KeyParagraph;
