import React from 'react';
import {
    StyleSheet,
  Text,
 
} from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//bring screens
import Home from './screens/Home'
import Add from './screens/Add'
import Edit from './screens/Edit'

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{
          headerStyle: {
            backgroundColor: "#0A79DF"
          },
          title: 'Trello App',
          headerTitleStyle: {
            textAlign: 'center',
            color: '#FFF'
          }
        }}>
        </Stack.Screen>

        <Stack.Screen name="Add" component={Add} options={{
          headerStyle: {
            backgroundColor: "#0A79DF"
          },
          title: 'Add Page',
          headerTitleStyle: {
            textAlign: 'center',
            color: '#030200'
          }
        }}>
        </Stack.Screen>

        <Stack.Screen name="Edit" component={Edit} options={{
          headerStyle: {
            backgroundColor: "#0A79DF"
          },
          title: 'Trello App',
          headerTitleStyle: {
            textAlign: 'center',
            color: '#030200'
          }
        }}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
