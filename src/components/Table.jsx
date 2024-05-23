import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export const formatHeader = header => {
  const words = header.split('_');
  const formattedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return formattedWords.join(' ');
};

const TableComponent = ({data, heading}) => {
  // Check if data is valid and an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Text>No data available</Text>;
  }

  const headers = Object.keys(data[0]);

  return (
    <View>
      <Text
        style={{
          marginHorizontal: 10,
          marginVertical: 15,
          fontSize: 22,
          fontWeight: 500,
        }}>
        {heading}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            {headers.map((header, index) => (
              <View
                key={index}
                style={[
                  styles.headerCell,
                  {flex: header === 'Degree' ? 2 : 1},
                ]}>
                <Text style={styles.headerText}>{formatHeader(header)}</Text>
              </View>
            ))}
          </View>

          {/* Table Rows */}
          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {headers.map((header, colIndex) => (
                <View
                  key={colIndex}
                  style={[styles.cell, {flex: header === 'Degree' ? 2 : 1}]}>
                  <Text style={styles.cellText}>{row[header]}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#ffe7b0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    width: 100,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    width: 120,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 14,
  },
});

export default TableComponent;
