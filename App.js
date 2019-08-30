import React, { 
  useState
} from 'react';

import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { personListInitial } from "./personListInitial";

import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default function App() {
  const [personList, setPersonList] = useState(personListInitial);
  const [rbSheetRef, setRbSheetRef] = useState(null); 
  const [selectedListName, setSelectedListName] = useState(null);

  const openActionSheet = (index) => {
    rbSheetRef.open();
    setSelectedListName(index);
  };

  const setLikeInfo = like => {
    const personListClone = JSON.parse(JSON.stringify(personList));
    personListClone[selectedListName].like = like;
    setPersonList(personListClone);
    rbSheetRef.close();
  };

  const likeAction = () => {
    setLikeInfo(true);
  };

  const deslikeAction = () => {
    setLikeInfo(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={personList}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => 
          <ListItem 
            name={item.name} 
            like={item.like}
            index={index}
            onPress={openActionSheet}
          />
        }
      />
      <RBSheet
          ref={ref => setRbSheetRef(ref)}
          height={120}
          duration={250}
        >
          <ActionSheetOptions 
            likeAction={likeAction}
            deslikeAction={deslikeAction}
          />
        </RBSheet>
    </View>
  );
}

function ListItem(props){
  const { name, like, index, onPress = () => {} } = props;

  return (
    <TouchableOpacity 
      style={styles.listItemContainer}
      onPress={() => onPress(index)}
    >
      <Text>{name}</Text>
      {
        like !== undefined ?
          like ?
            <Icon name="thumb-up-outline" size={20} color="#1b9a77"/>
          :
            <Icon name="thumb-down-outline" size={20} color="#82114a"/>
        : <Text>X</Text>
      }
    </TouchableOpacity>
  );
}

function ActionSheetOptions(props) {
  const { likeAction, deslikeAction } = props;

  return (
    <View>
      <TouchableOpacity 
        style={styles.actionSheetOptionContainer}
        onPress={likeAction}
      >
        <Icon name="thumb-up-outline" size={20} color="#1b9a77"/>
        <Text>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.actionSheetOptionContainer}
        onPress={deslikeAction}
      >
        <Icon name="thumb-down-outline" size={20} color="#82114a"/>
        <Text>Deslike</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff'
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 1,
    borderColor: 'grey'
  },
  actionSheetOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  }
});
