import React from 'react';
import { Text, View, Image } from 'react-native';

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
            "Main Library": require('../assets/library.jpg'),
            "Research Help Desk": require('../assets/help_desk.jpg'),
            "Research Help Online Chat": require('../assets/online_chat.png'),
            "Archives and Special Collections": require('../assets/archives.png'),
            "Sound and Image Media Studios": require('../assets/sims.jpg'),
            "MakerLab, Automation Lab & Digital Scholarship Lab": require('../assets/makerLab.jpg'),
        },
    ]

    return (
        <View style={{
            width: '95%',
            height: 'auto',
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
                <Image source={imageUri[0][location]} style={{ marginRight: 2, flex: 1, height: '100%' }} resizeMode={'contain'} />
                <View style={{ marginLeft: 2, alignItems: 'center', flex: 2 }}>
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

export default Card