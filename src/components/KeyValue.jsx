import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {formatHeader} from './Table';

const KeyValue = ({data, heading}) => {
  const [keys, setKeys] = useState([]);
  console.log(heading);

  useEffect(() => {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      setKeys(Object.keys(data));
    }
  }, [data]);

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginHorizontal: 10,
          marginVertical: 15,
          fontSize: 22,
          fontWeight: 500,
        }}>
        {heading}
      </Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Key</Text>
        <Text style={styles.headerText}>Value</Text>
      </View>
      {keys.map((dataKey, index) => (
        <View key={`${dataKey}-${index}`} style={styles.row}>
          <Text style={styles.key}>{formatHeader(dataKey)}</Text>
          <Text style={styles.value}>{data[dataKey]}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerRow: {
    borderColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  key: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});

export default KeyValue;
