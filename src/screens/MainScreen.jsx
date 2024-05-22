import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import data from '../../data.json';
import KeyValue from '../components/KeyValue';
import Paragraph from '../components/Paragraph';
import KeyParagraph from '../components/KeyParagraph';
import Table from '../components/Table';
import Special from '../components/Special';

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

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={buttonStyle}>
        <Text style={{color: isSelected ? '#000F6B' : 'black', fontSize: 16}}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const MainScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  console.log('selectedType', selectedType);
  console.log('selectedCategory', selectedCategory);

  const keys = Object.keys(data);

  const handlePressCategory = item => {
    setSelectedCategory(item);
    setSelectedType(null);
  };

  const handlePressType = item => {
    setSelectedType(item);
  };

  const subChildren =
    selectedCategory && data[selectedCategory]
      ? Object.keys(data[selectedCategory])
      : [];

  const renderTabContent = () => {
    if (!selectedCategory || !selectedType) return null;

    const tabData = data[selectedCategory][selectedType];
    console.log('tabData', tabData);

    return tabData.map((item, index) => {
      //   console.log('item', item);
      switch (item.type) {
        case 'KEY_VALUE':
          return <KeyValue key={index} data={item.data} />;
        case 'PARAGRAPH':
          return (
            <Paragraph key={index} data={item.data} heading={item.heading} />
          );
        case 'KEY_PARAGRAPH':
          return (
            <KeyParagraph key={index} data={item.data} heading={item.heading} />
          );
        case 'TABLE':
          return <Table key={index} data={item.data} heading={item.heading} />;
        case 'SPECIAL':
          return (
            <Special key={index} data={item.data} heading={item.heading} />
          );
        default:
          return null;
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>Category:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {keys.map(item => (
            <TabBtn
              key={item}
              name={item}
              isSelected={selectedCategory === item}
              onPress={handlePressCategory}
            />
          ))}
        </ScrollView>
      </View>

      {selectedCategory && data[selectedCategory] && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.heading}>
            <Text style={styles.headingTitle}>Types:</Text>

            {subChildren.map(item => (
              <TabBtn
                key={item}
                name={item}
                isSelected={selectedType === item}
                onPress={handlePressType}
              />
            ))}
          </View>
        </ScrollView>
      )}

      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  heading: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  headingTitle: {
    color: 'black',
    fontSize: 18,
    marginTop: 10,
    marginRight: 10,
  },
  contentContainer: {
    marginTop: 20,
  },
});
