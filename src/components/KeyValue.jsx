import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const KeyValue = ({data}) => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    setKeys(Object.keys(data));
  }, [data]);
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }

  // const keys = Object.keys(data);
  // console.log('Keyvalue:', data);
  // console.log(keys);

  return (
    <View style={styles.container}>
      {keys.map((dataKey, index) => {
        console.log('Key:', dataKey);
        return (
          <View key={`${dataKey}-${index}`} style={styles.row}>
            <Text>{dataKey.split('_').join(' ')}</Text>
            <Text style={styles.value}>{data[dataKey]}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  key: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'black',
    marginTop: 100,
  },
  value: {
    flex: 1,
    marginLeft: 10,
  },
});

export default KeyValue;
