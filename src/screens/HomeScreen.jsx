import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import JsonData from '../../data.json';

function TabBtn({name, isSelected, onPress}) {
  const buttonStyle = {
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: isSelected ? '#000F6B' : '#dfdfdf',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 10,
    backgroundColor: isSelected ? '#EAFAFF' : 'white',
  };

  const handlePress = () => {
    onPress(name);
  };
  const filteredData = JsonData.report.numerologyReport.filter(
    item => item.type === 'PARAGRAPH',
  );
  return (
    <View style={buttonStyle}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={{color: isSelected ? '#000F6B' : 'black', fontSize: 16}}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const KeyValueComponent = ({data}) => (
  <View>
    {Object.entries(data).map(([key, value], index) => (
      <Text key={index} style={{marginVertical: 2}}>
        {key}: {value}
      </Text>
    ))}
  </View>
);

const ParagraphComponent = ({data}) => (
  <View>
    {data.data.map((paragraph, idx) => (
      <View>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>
          {data.heading}
        </Text>
        <Text key={idx} style={{marginVertical: 2}}>
          {data.paragraph}
        </Text>
      </View>
    ))}
  </View>
);

const KeyParagraphComponent = ({data}) => {
  const renderData = value => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <View style={{paddingLeft: 10}}>
          {Object.entries(value).map(([key, val], idx) => (
            <View key={idx} style={{marginVertical: 2}}>
              <Text style={{fontWeight: 'bold'}}>{key}:</Text>
              {renderData(val)}
            </View>
          ))}
        </View>
      );
    } else if (Array.isArray(value)) {
      return (
        <View style={{paddingLeft: 10}}>
          {value.map((item, idx) => (
            <Text key={idx} style={{marginVertical: 2}}>
              {item}
            </Text>
          ))}
        </View>
      );
    } else {
      return <Text>{value}</Text>;
    }
  };

  return (
    <View>
      {Object.entries(data).map(([key, value], index) => (
        <View key={index} style={{marginVertical: 2}}>
          <Text style={{fontWeight: 'bold'}}>{key}:</Text>
          {renderData(value)}
        </View>
      ))}
    </View>
  );
};

const SpecialComponent = ({data}) => (
  <View>
    {Object.entries(data).map(([key, value], index) => (
      <View key={index} style={{marginVertical: 2}}>
        <Text style={{fontWeight: 'bold'}}>{key}:</Text>
        <KeyValueComponent data={value} />
      </View>
    ))}
  </View>
);

const TableComponent = ({data}) => (
  <View>
    {data.map((row, index) => (
      <View key={index} style={{marginVertical: 2}}>
        {Object.entries(row).map(([key, value], idx) => (
          <Text key={idx}>
            {key}: {value}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

const transformHeader = header => {
  return header
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const renderCustomData = data => {
  if (Array.isArray(data)) {
    return (
      <View>
        {data.map((item, index) => (
          <View key={index} style={{marginBottom: 10}}>
            {item.heading && (
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                {item.heading}
              </Text>
            )}
            {renderCustomDataItem(item)}
          </View>
        ))}
      </View>
    );
  } else {
    return renderCustomDataItem(data);
  }
};

const renderCustomDataItem = item => {
  switch (item.type) {
    case 'KEY_VALUE':
      return <KeyValueComponent data={item.data} />;
    case 'PARAGRAPH':
      return <ParagraphComponent data={item} />;
    case 'KEY_PARAGRAPH':
      return <KeyParagraphComponent data={item.data} />;
    case 'TABLE':
      return <TableComponent data={data} />;
    case 'SPECIAL':
      return <SpecialComponent data={item.data} />;
    default:
      return <Text>{JSON.stringify(item, null, 2)}</Text>;
  }
};

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleCategoryPress = category => {
    setSelectedCategory(category);
    setSelectedType(null);
  };

  const handleTypePress = type => {
    setSelectedType(type === selectedType ? null : type);
  };

  return (
    <View style={styles.homeContainer}>
      <View style={styles.categories}>
        <Text style={styles.headerTitle}>Category:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.keys(JsonData).map((category, index) => (
            <TabBtn
              key={index}
              name={category}
              isSelected={selectedCategory === category}
              onPress={handleCategoryPress}
            />
          ))}
        </ScrollView>
      </View>

      {selectedCategory && JsonData[selectedCategory] ? (
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.headerTitle}>Types:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.keys(JsonData[selectedCategory]).map((type, index) => (
              <TabBtn
                key={index}
                name={transformHeader(type)}
                isSelected={selectedType === type}
                onPress={() => handleTypePress(type)}
              />
            ))}
          </ScrollView>
        </View>
      ) : null}

      {selectedType && JsonData[selectedCategory][selectedType] && (
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
            {transformHeader(selectedType)}
          </Text>
          {renderCustomDataItem(JsonData.report.numerologyReport)}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 50,
    paddingHorizontal: 10,
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    marginTop: 10,
    marginRight: 10,
  },
});
