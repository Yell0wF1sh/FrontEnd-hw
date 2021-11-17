import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function App() {
  const [bb, setBb] = useState("")
  const [show, setShow] = useState(false)
  const [bbs, setBbs] = useState(["bb1", "bb2", "bb3"])
  const [isRefresh, setIsRefresh] = useState(false)

  // const get

  let flatlist = (<View></View>)

  let bboardNameList = (<View></View>)

  if (bbs.length != 0) {
    bbs.forEach(element =>
    bboardNameList =
    <TouchableOpacity
      onPress={(currentBb) => (
        setBb(currentBb)
      )}
    >
      {element}
    </TouchableOpacity>
    )
  } 

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ color: 'red', fontSize: 25, textAlign: 'center', fontWeight: '600' }}>BBViwer</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button 
            title='REFRESH BBOARDS'
            onPress={() => (
              setIsRefresh(true)
            )}
          />
          {bboardNameList}
        </View>
        <View>
          <Text>Selected bboard:</Text>
        </View>
        <View style={styles.list}>
          {flatlist}
        </View>
        <View>
          <Text>DEBUGGING</Text>
          <Text>bb: {bb}</Text>
          <Text>show: {show.toString()}</Text>
          <Text>bbs.length: {bbs.length}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'black',
    paddingVertical: 20,
  },
  list: {
    alignItems: 'flex-start',
    height: 430,
    padding: 5,
  },
});
