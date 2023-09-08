
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chatscreen from '../screens/Chatscreens';
import Home from '../home/home';
import Settings from '../screens/setting';





const Tab = createBottomTabNavigator();
const homeName = "Camera";
const chatsName = "Chats";
const settingsName = "user";
// const Stack = createNativeStackNavigator();

export const Navtab = () => {

  async function refreshSnap () {
   console.log("refreshSnap");
  }
  return (

   <Tab.Navigator
      initialRouteName={homeName}
      
      screenOptions={({ route }) => ({
        
       tabBarInactiveTintColor: '#F27405',
       tabBarActiveTintColor: 'white',
       tabBarLabelStyle: {fontSize:15},
       tabBarStyle:{backgroundColor:'black'},
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'logo-instagram' : 'logo-instagram';

          } else if (rn === chatsName) {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses';

          } else if (rn === settingsName) {
            iconName = focused ? 'person-circle' : 'person-circle';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={35} color={color} />;
        },
      })}
    >

      <Tab.Screen name={chatsName} component={Chatscreen} 
    //   options={{
    //   tabBarButton: props => (
    //   <TouchableOpacity {...props}  />
    // ),}}
     />
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={settingsName} component={Settings} />

      

    </Tab.Navigator> 
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    buttonContainer: {
      backgroundColor: '#fff',
      alignSelf: 'flex-end'
    },
    preview: {
      alignSelf: 'stretch',
      flex: 1
    }
  });
