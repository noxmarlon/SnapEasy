import React from 'react'
import { useEffect, useState } from 'react';

import { Dimensions, Text, StyleSheet, View, SafeAreaView, FlatList, ScrollView, ActivityIndicator,TouchableOpacity,Image,Button,Modal,RefreshControl} from 'react-native';
import {AntDesign,Ionicons} from '@expo/vector-icons'
import { getSnaps,readSnap,seenSnap } from '../../service/snaps'
import { vw, vh } from 'react-native-expo-viewport-units';
import useCountdown from './countime';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const Snap = ({name,timeAgo,}) => {

 const [snaps, setSnaps] = useState([]);
  const [snap, setSnap] = useState('');
  const [loader, setLoader] = useState(false);
  const [Seconds, setSeconds] = useState(0);

  const [refreshing, setRefreshing] = React.useState(false);

   
  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getSnaps(setSnaps);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getSnaps(setSnaps);
  }, [snap]);

  

  const openSnap = ({ snap_id, duration }) => {
    setLoader(true);
    setSeconds(duration);
    readSnap(snap_id, setSnap)
      .then(() => {
        setLoader(false);
      })
      .finally(() => {
        setTimeout(() => {
          seenSnap(snap_id, setSnap);
          setLoader(false);
        }, duration * 1000);
      });
  };
  if(Seconds>0){
    setTimeout(() => {
      setSeconds(Seconds-1);
    }, 1000);
  }



  function Item ({ snap_id, duration, from }) {
    from = typeof from === 'string' ? from.split('@')[0] : '';
    return (
<SafeAreaView>
        <TouchableOpacity style={styles.Container} onPress={() => openSnap({ snap_id, duration })}>
                <View style={styles.contentContainer}>
                <View style={styles.User}>
                  <View style={styles.IconsChat}>
                        <AntDesign name='user' size={20} color='#263238'/>
                    </View>

                    <View>
                        <Text style={styles.title}>{from}</Text>
                        <View style={styles.newContainer}>
                            <View style={styles.newSnap} />
                            
                              <Text style={styles.newSnapTxt}>New Snap . {duration} Seconds </Text> 
                        </View>
                    </View>
                      
                  </View>
                <View style={styles.replayIcon}>
                  
                    <Ionicons name='eye' size={30} color='red' onPress={() => openSnap({ snap_id, duration })}/>
                </View>
              

          </View>
        </TouchableOpacity>
    </SafeAreaView>
     
    );
  }

  return (
    <SafeAreaView>
      
      <Text style={styles.item2}>SNAPS</Text>
      <ScrollView style={styles.allSnap} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        
        <FlatList
          data={snaps}
          keyExtractor={item => item.snap_id.toString()} 
          renderItem={({ item }) =>
          <Item snap_id={item.snap_id} duration={item.duration} from={item.from} />}
          refreshing={refreshing}
            onRefresh={onRefresh} 
         
         
        /> 
        {loader === true && <ActivityIndicator size="large" color="#0000ff" />}
        {snap !== '' &&
        <Modal>
            <Image
            source={{ uri: snap }}
            style={{ height: "100%", width: "100%",position:'absolute' }}
          />
          <View  style={styles.IconSecond}>
          
          <Text  style={styles.secondText} >{Seconds}</Text>
          </View>
         
        
          </Modal>
          
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   padding: 20,
  },
  item: {
    backgroundColor: '#CADBDC',
    color: '#342B38',
    fontSize: 25,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  item2: {
    width: 200,
    height: 60,
    borderRadius: 45/2,
    borderColor: "#263238",
    borderWidth: 2,
    color: '#342B38',
    fontSize: 19,
    padding: 20,
    // marginVertical: 15,
    // marginBottom: 30,
    // marginHorizontal: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 100,
    
  },
  item3: {
    color: '#342B38',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    backgroundColor: '#64ff4c',
    padding: 15,
    left: 280,
    top: 10,
    position: 'absolute',
    opacity: .5,
    alignItems: 'center'
  },
  duration: {
    color: '#222',
    fontSize: 19,
    padding: 20,
    left: 275,
    top: -3,
    position: 'absolute'
  },
  allSnap: {
    marginTop: vh(5)
  },
  openSnap: {
    backgroundColor: '#ffd100',
    width: vw(75),
    marginTop: vh(3)
  },
  Container:{
    padding:10,
    
    
  },
  contentContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
    User: {
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  IconsChat: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    padding: 10,
    borderColor: "#263238",
    borderWidth: 2,
    alignItems: 'center',
    marginRight: 10,
  },
  newContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newSnap: {
    width:16, 
    height:16,
    borderRadius:5,
    backgroundColor:"red",
    marginRight:10,
    marginVertical:5,
  },
  newSnapTxt: {
    color: '#607D8B',
  },
  replayIcon: {
    padding: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#ccc',
  },
    IconSecond: {
      marginTop:50,
      position: 'absolute',
      width: 45,
      height: 45,
      borderRadius: 45/2,
      padding: 10,
      borderColor: "#263238",
      borderWidth: 2,
      alignItems: 'center',
      marginRight: 10,
      backgroundColor: 'black',
      marginLeft: 10,
      
    },
  closeBtn: {
    position: 'absolute',
    padding: 10,
    top: 40,
    color: 'red',
    fontSize: 20,
  },
  secondText: {
    position: 'absolute',
    color: 'red',
    fontSize: 30,
    marginTop: 5,
    marginLeft: 5,
    
    
    
  }
});


