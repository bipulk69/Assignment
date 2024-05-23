import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SpecialComponent = ({data}) => {
  if (!data || !Array.isArray(data.gemstones)) {
    return <Text>No valid data available</Text>;
  }

  const specialItem = data.gemstones.find(item => item.type === 'SPECIAL');

  return (
    <View style={styles.container}>
      {specialItem ? (
        <View style={styles.itemContainer}>
          <Text style={styles.heading}>{specialItem.heading}</Text>
          {Object.keys(specialItem.data).map((key, index) => (
            <View key={index} style={styles.detailContainer}>
              <Text style={styles.key}>{key}:</Text>
              {typeof specialItem.data[key] === 'object' ? (
                Object.keys(specialItem.data[key]).map((subKey, subIndex) => (
                  <View key={subIndex} style={styles.subDetailContainer}>
                    <Text style={styles.subKey}>{subKey}:</Text>
                    <Text style={styles.value}>
                      {specialItem.data[key][subKey]}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.value}>{specialItem.data[key]}</Text>
              )}
            </View>
          ))}
        </View>
      ) : (
        <Text>No special items available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailContainer: {
    marginBottom: 5,
  },
  key: {
    fontWeight: 'bold',
  },
  subDetailContainer: {
    marginLeft: 10,
  },
  subKey: {
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 5,
  },
});

export default SpecialComponent;
