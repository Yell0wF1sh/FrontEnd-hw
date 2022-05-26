import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, SafeAreaView, RefreshControl, Image } from 'react-native';
import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function App() {
  const [day, setDay] = useState("Sunday")
  const [date, setDate] = useState("2022-05-22")
  const [hoursLs, setHoursLs] = useState([])
  // const [list, setList] = useState([])
  const list = require('./hourData.json')
  const [refreshing, setRefreshing] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  // useEffect(() => {
  //   // const fetch = async () => {
  //   //   let newList = { data: [] }
  //   //   newList = await axios.get('http://brandaserver.herokuapp.com/getinfo/libraryHours/week')
  //   //   console.log(newList)
  //   //   setList(newList.data)
  //   // }
  //   // fetch()
  //   fetch('http://brandaserver.herokuapp.com/getinfo/libraryHours/week')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setList(data)
  //     })
  //     .catch((error) => console.error(error))
  // }, [refreshing])

  useEffect(() => {
    const found = list.find(element => element['date'] == date)
    console.log(found.day)
    console.log(found.hours)
    if (found != null) {
      setDay(found.day)
      setHoursLs(found.hours)
    } else {
      setDay("Error getting date!")
      setHoursLs([])
    }
  }, [date])

  const renderLs = ({ item }) => {
    console.log(item['location'])
    let location = item['location']
    console.log(item['times']['currently_open'])
    let currently_open = item['times']['currently_open']
    console.log(item['times']['hours'])
    let hours = item['times']['hours']
    console.log(item['times']['status'])
    let status = item['times']['status']
    return (
      <Card>
        <View style={{ fontWeight: 'bold' }}><Text>{location}</Text></View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Currently open:</Text>
          <Text> </Text>
          <Text style={{ color: currently_open ? 'green' : 'red' }}>{currently_open ? 'Yes' : 'No'}</Text>
        </View>
        {hours != undefined
          ? <Text>
            Hours: from {hours[0].from} to {hours[0].to}
          </Text>
          : <Text>
            Hours: unavailable
          </Text>
        }
        <View style={{ flexDirection: 'row' }}>
          <Text>Status:</Text>
          <Text> </Text>
          <Text style={{ color: status.toLowerCase() == 'open' ? 'green' : 'red' }}>{status}</Text>
        </View>
      </Card>
    )
  }

  const HoursFlatLs = () => {
    return (
      <FlatList
        data={hoursLs}
        renderItem={renderLs}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //   />
      // }
      // style={{ width: '75%' }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* {refreshing ? <HoursFlatLs /> : <View></View>} */}
      <Button title="Show Date Picker" onPress={showDatePicker} style={{ flex: 1 }} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        style={{ flex: 1 }}
      />
      <HoursFlatLs style={{ flex: 1 }} />
    </SafeAreaView>
  );
}

const Card = ({ children }) => {
  return (
    <View style={{
      width: '95%',
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
  )
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Times',
    height: '100%',
    fontSize: 18,
    flex: 1,
  },
  header: {

  },
  image: {

  },
  textBox: {

  }
});
