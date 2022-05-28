import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, SafeAreaView, RefreshControl, Image, StatusBar } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

export default function App() {
  const [day, setDay] = useState("Sunday")
  const [date, setDate] = useState("2022-05-22")
  const [hoursLs, setHoursLs] = useState([])
  // const [list, setList] = useState([])
  const list = require('./hourData.json')
  const [refreshing, setRefreshing] = useState(false)
  const [open, setOpen] = useState(false)

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
    // console.log(found.day)
    // console.log(found.hours)
    if (found != null) {
      setDay(found.day)
      setHoursLs(found.hours)
    } else {
      setDay("Error getting date!")
      setHoursLs([])
    }
  }, [date])

  const renderLs = ({ item }) => {
    let location = item['location']
    let currently_open = item['times']['currently_open']
    let hours = item['times']['hours']
    let status = item['times']['status']
    return (
      <Card
        location={location}
        currently_open={currently_open}
        hours={hours}
        status={status}
      />
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
      <StatusBar hidden={false} translucent={true} />
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey' }}>
        <Text style={{ fontSize: 40 }}>Library Hours</Text>
      </View>
      <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20 }}>{day}   </Text>
        <Picker
          selectedValue={date}
          style={{ borderBottomWidth: 2, borderColor: 'lightgrey', fontSize: 20, borderRadius: 10, width: '50%' }}
          onValueChange={(itemValue) => {
            setDate(itemValue)
          }}
        >
          <Picker.Item label={moment(list[0]['date']).format('ll')} value={list[0]['date']} />
          <Picker.Item label={moment(list[1]['date']).format('ll')} value={list[1]['date']} />
          <Picker.Item label={moment(list[2]['date']).format('ll')} value={list[2]['date']} />
          <Picker.Item label={moment(list[3]['date']).format('ll')} value={list[3]['date']} />
          <Picker.Item label={moment(list[4]['date']).format('ll')} value={list[4]['date']} />
          <Picker.Item label={moment(list[5]['date']).format('ll')} value={list[5]['date']} />
          <Picker.Item label={moment(list[6]['date']).format('ll')} value={list[6]['date']} />
        </Picker>
      </View>
      <HoursFlatLs />
    </SafeAreaView>
  );
}

const Card = ({ location, currently_open, hours, status }) => {
  // const imageUri = [
  //   {
  //     "Main Library": 'https://www.brandeis.edu/library/_images/library-flowers-735.jpg',
  //     "Research Help Desk": 'https://www.brandeis.edu/library/research/images/students-cluster.jpg',
  //     "Research Help Online Chat": 'https://pbs.twimg.com/media/FJVMsdBWYAEKhfZ.png',
  //     "Archives and Special Collections": 'https://www.brandeis.edu/library/_images/rs-735.png',
  //     "Sound and Image Media Studios": 'https://www.brandeis.edu/library/sims/_images/help.jpg',
  //     "MakerLab, Automation Lab & Digital Scholarship Lab": 'https://www.brandeis.edu/library/research-technology-innovation/_images/farber.jpg',
  //   },
  // ]

  const imageUri = [
    {
      "Main Library": require('./assets/library.jpg'),
      "Research Help Desk": require('./assets/help_desk.jpg'),
      "Research Help Online Chat": require('./assets/online_chat.png'),
      "Archives and Special Collections": require('./assets/archives.png'),
      "Sound and Image Media Studios": require('./assets/sims.jpg'),
      "MakerLab, Automation Lab & Digital Scholarship Lab": require('./assets/makerLab.jpg'),
    },
  ]

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
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {console.log(imageUri)}
        <Image source={imageUri[0][location]} style={{ flex: 1, marginRight: 2 }} />
        <View style={{ flex: 2, marginLeft: 2, alignItems: 'center' }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontFamily: 'Times', fontSize: 20, textAlign: 'center' }}>
              {location}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Times', fontWeight: 'bold', fontSize: 16 }}>Currently open: </Text>
            <Text style={{ fontFamily: 'Times', color: currently_open ? 'green' : 'red', fontSize: 16 }}>{currently_open ? 'Yes' : 'No'}</Text>
          </View>
          {hours != undefined
            ? <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'Times', fontWeight: 'bold', fontSize: 16 }}>Hours: </Text>
              <Text style={{ fontFamily: 'Times', fontSize: 16 }}>
                from {hours[0].from} to {hours[0].to}
              </Text>
            </View>
            : <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'Times', fontWeight: 'bold', fontSize: 16 }}>Hours: </Text>
              <Text style={{ fontFamily: 'Times', fontSize: 16 }}>
                unavailable
              </Text>
            </View>
          }
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Times', fontWeight: 'bold', fontSize: 16 }}>Status: </Text>
            <Text style={{ fontFamily: 'Times', color: status.toLowerCase() == 'open' ? 'green' : 'red', fontSize: 16 }}>{status}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Times',
    fontSize: 12,
    marginTop: 20,
    marginBottom: 5,
    flex: 1,
  },
});
