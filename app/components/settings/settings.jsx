import React from 'react'
import { StyleSheet,SafeAreaView, View, Text,TouchableOpacity} from 'react-native'
import {AntDesign,Ionicons} from '@expo/vector-icons'
import UserContext from "../../authsession/authsession";



export const SettingsUser = ({name,timeAgo,}) => {

  const {logout} = React.useContext(UserContext);
 const {email} = React.useContext(UserContext);

  return (
    <SafeAreaView>
        <TouchableOpacity style={styles.Container}>
                <View style={styles.contentContainer}>
                  <Text>Logout</Text>
                    <Ionicons name='exit' size={30} color='red' onPress={logout}/>
               </View>

                  <View style={styles.information}>
                    <Text style={styles.title}>Your Account</Text>
                    <View style={styles.containerInfomation}>
                      <Text style={styles.email}>Email : </Text>
                    <Text style={styles.infoemail}>{email}</Text>
                    </View>
                  </View>

        </TouchableOpacity>
    </SafeAreaView>

  )
}

const styles=StyleSheet.create({
  Container:{
    padding:10,
    
    
  },
  contentContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
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
  information: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  email: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInfomation: {
    flexDirection: 'row',
  },
  infoemail: {
    fontSize: 20,
  }
  





})

