import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ParagraphComponent = ({heading}) => {
  return (
    <View>
      <View>
        <Text>{heading}</Text>
        {data.map((paragraph, index) => (
          <Text key={index} style={{marginVertical: 2, fontSize}}>
            {paragraph}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default ParagraphComponent;

const styles = StyleSheet.create({});
