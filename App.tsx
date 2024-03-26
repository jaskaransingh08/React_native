// import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Menu from './Components/Menu';
// import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './Components/Home';
// import Context from './Components/Context';
// import Search from './Components/Search';
// import Bookmark from './Components/Bookmark';
// import Content from './Components/Content';

// export default function App() {
//   const Stack = createNativeStackNavigator();

//   const MyStackNavigator = () => {



//     return (
//       <Stack.Navigator
//       initialRouteName='Home'>
//       <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//       <Stack.Screen name="search" component={Search} options={{ headerShown: false }} />
//       <Stack.Screen name="bookmark" component={Bookmark} options={{ headerShown: false }} />
//       <Stack.Screen name="content" component={Content} options={{ headerShown: false }} />
//        <Stac

//     </Stack.Navigator>
//     )
//   }

//   return (
//     <Context>

//       <NavigationContainer>
//         <View style={styles.container}>
//           <MyStackNavigator />
//           <View style={styles.menu}>
//             <Menu />
//           </View>
//         </View>
//       </NavigationContainer>

//     </Context>


//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   menu: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//     padding: 10
//   },
// });
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './Components/Screens/Menu';
import  {store}  from './Components/Screens/Store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Menu></Menu>
      </NavigationContainer>

    </Provider>
  );
}

