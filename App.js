import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import axios from 'axios';

export default function App() {
  const [day, setDay] = useState("Sunday")
  const [date, setDate] = useState("2022-05-22")
  const [hoursLs, setHoursLs] = useState([])
  const [list, setList] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      let newList = { data: [] }
      newList = await axios.get('http://brandaserver.herokuapp.com/getinfo/libraryHours/week')
      setList(newList.data)
    }
    fetch()
  }, [refreshing])

  useEffect(() => {
    console.log(list)
    const found = list.find(element => element['date'] == date)
    setDay(found['day'])
    setHoursLs(found['hours'])
  }, [date])

  function flatlist() {
    <FlatList
      data={hoursLs}
      renderItem={({ item }) => {
        let location = item['location']
        let currently_open = item['times']['currently_open']
        let hours = item['times']['hours']
        let status = item['times']['status']
        return (
          <Card>
            <View>{location}</View>
            <View>{currently_open}</View>
            {hours != undefined ? <View>{hours}</View> : <View></View>}
            <View>{status}</View>
          </Card>
        )
      }}
    // refreshControl={
    //   <RefreshControl
    //     refreshing={refreshing}
    //     onRefresh={onRefresh}
    //   />
    // }
    />
  }

  return (
    <SafeAreaView>
      {refreshing ? flatlist() : <View></View>}
    </SafeAreaView>
  );
}

const Card = ({ children }) => {
  <View style={{
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 5,
    margin: 10,
    shadowColor: 'grey',
    shadowRadius: 10,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  }}>
    {children}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
