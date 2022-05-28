import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import Card from '../component/card';

function home_screen({ navigation }) {
    return (
        <Home />
    )
}

const Home = () => {
    const [day, setDay] = useState("Sunday")
    const [date, setDate] = useState("2022-05-22")
    const [hoursLs, setHoursLs] = useState([])
    // const [list, setList] = useState([])
    const list = require('../hourData.json')
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

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Times',
        fontSize: 12,
        //marginTop: 20,
        marginBottom: 5,
        flex: 1,
    },
});

export default home_screen