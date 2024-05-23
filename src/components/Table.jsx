import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const TableComponent = ({data}) => {
  // Check if data is valid and an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Text>No data available</Text>;
  }

  // Extract keys for headers from the first object
  const headers = Object.keys(data[0]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.row}>
          {headers.map((header, index) => (
            <View key={index} style={styles.headerCell}>
              <Text style={styles.headerText}>
                {header.split('_').join(' ')}
              </Text>
            </View>
          ))}
        </View>

        {/* Table Rows */}
        {data.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {headers.map((header, colIndex) => (
              <View key={colIndex} style={styles.cell}>
                <Text style={styles.cellText}>{row[header]}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    flex: 1,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    textAlign: 'center',
  },
});

export default TableComponent;
