import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import Axios from 'axios';

export default function App() {
  const [bb, setBb] = useState("")
  const [bbs, setBbs] = useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  const [posts, setPosts] = useState([])

  const route = "https://glacial-hamlet-05511.herokuapp.com"

  useEffect(() => {
    const getBbs = async () => {
      let result = { data: [] }
      result =
        await Axios.get(
          route + "/bboardNames"
        )
      setBbs(result.data)
    }
    getBbs()
  }, [isRefresh])

  useEffect(() => {
    const getPosts = async () => {
      let result = { data: [] }
      result =
        await Axios.post(
          route + "/posts", { bboard: bb }
        )
      setPosts(result.data)
    }
    getPosts()
  }, [bb])

  const renderBbName = ({ item }) => {
    return (
      <View style={{ padding: 3 }}>
        <TouchableOpacity
          onPress={() => (
            setBb(item)
          )}
          style={{ padding: 3, backgroundColor: 'black' }}
        >
          <Text style={{ color: 'red', fontSize: 16 }}>{item}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderPosts = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <View style={{ backgroundColor: 'lightgrey', padding: 20 }}>
          <Text style={{ fontSize: 24 }}>{item.title}</Text>
          <Text style={{ fontSize: 14 }}>{item.text}</Text>
        </View>
      </View>
    )
  }

  let flatlist = (<View></View>)

  let bboardSelected = (<View></View>)

  let bboardNameList = (<View></View>)

  if (bbs.length != 0) {
    bboardNameList =
      <View>
        <FlatList
          data={bbs}
          renderItem={renderBbName}
          horizontal={true}
          style={{ width: 220 }}
        />
      </View>
  }

  if (bb != "") {
    bboardSelected =
      <View style={{ padding: 3, backgroundColor: 'black', justifyContent: 'center' }}>
        <Text style={{ color: 'red', fontSize: 25 }}>{bb}</Text>
      </View>
    flatlist =
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(item) => (item._id, item.time)}
      />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: 'red', fontSize: 25, textAlign: 'center', fontWeight: '600' }}>BBViewer</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button
          title='REFRESH BBOARDS'
          color='blue'
          onPress={() => (
            setIsRefresh(true)
          )}
        />
        {bboardNameList}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 28 }}>Selected bboard:</Text>
        {bboardSelected}
      </View>
      <View style={styles.list}>
        {flatlist}
      </View>
      <View>
        <Text>DEBUGGING</Text>
        <Text>bb: {bb}</Text>
        <Text>bbs.length: {bbs.length}</Text>
        <Text>post: {JSON.stringify(posts)}</Text>
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
    height: 400,
    padding: 5,
  },
});
