import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {formatHeader} from './Table';

const SpecialComponent = ({data, heading}) => {
  if (!data || !Array.isArray(data.gemstones)) {
    return <Text>No valid data available</Text>;
  }

  const specialItem = data.gemstones.find(item => item.type === 'SPECIAL');

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginHorizontal: 10,
          marginBottom: 15,
          fontSize: 22,
          fontWeight: 500,
        }}>
        {heading}
      </Text>
      {specialItem ? (
        <View>
          {Object.entries(specialItem.data).map(([key, value], index) => (
            <View key={index} style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>{key}</Text>
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}>Key</Text>
                  <Text style={styles.tableHeaderCell}>Value</Text>
                </View>
                {Object.entries(value).map(([subKey, subValue], subIndex) => (
                  <View key={subIndex} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{formatHeader(subKey)}</Text>
                    <Text style={styles.tableCell}>{subValue}</Text>
                  </View>
                ))}
              </View>
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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
});

export default SpecialComponent;
