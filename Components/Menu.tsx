import { useNavigation,ParamListBase,NavigationProp } from '@react-navigation/native';
import {  useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from './Context';

type ClickedState = 'chat' | 'search' | 'favorite' | 'content' | undefined;

export default function Menu() {
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const [clicked, setClicked] = useState<ClickedState>()
    const[mode1,setmode1]=useState<boolean>(false)
    const context= useContext(ThemeContext)
  if(!context){
    throw new Error("invalid")
  }
  const{theme}=context
  const {colors,mode,toggleTheme}=theme
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuContainer}
                onPress={() => {
                    navigation.navigate('Home')
                    setClicked("chat")

                }}
                >
                <Icon name="chat-bubble-outline" size={30} style={clicked ==="chat"? styles.styel1 : styles.style2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainer}
                onPress={() => {
                    navigation.navigate("search")
                    setClicked("search")
                }}
                >
                <Icon name="search" size={30} style={clicked ==="search"? styles.styel1 : styles.style2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainer}
                onPress={() => {
                    navigation.navigate("bookmark")
                    setClicked("favorite")
                }}
                >
                <Icon name="favorite-border" size={30} style={clicked ==="content"? styles.styel1 : styles.style2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainer}
                onPress={() => {
                    navigation.navigate("content")
                    setClicked("content")
                }}
                >
                <Icon name="person-outline" size={30} style={clicked ==="content"? styles.styel1 : styles.style2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainer}
                onPress={() => {
                    toggleTheme()
                    setmode1(!mode1)
                }}
                >
                <Icon name="toggle-on" size={30} style={mode1 === true? styles.styel1 : styles.style2} />
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        height:30
    }, 
    styel1: {
        color: "#007AFF"
    },
    style2:
    {
        color: "grey"
    }
})