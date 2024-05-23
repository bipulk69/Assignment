import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Paragraph = ({data}) => {
  if (!data || !data.data || !Array.isArray(data.data)) {
    return null;
  }

  const {heading, data: paragraphs} = data;

  return (
    <View style={styles.container}>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      {paragraphs.map((item, index) => (
        <View key={index} style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>* {item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
  },
  paragraphContainer: {
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#474747',
  },
});

export default Paragraph;
