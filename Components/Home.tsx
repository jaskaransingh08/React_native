import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from './Context';

export default function Page() {
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [quote, setQuote] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(true);
    const [isBook, setIsBook] = useState<boolean>(true);

    const contextValue = useContext(ThemeContext);

    if (!contextValue) {
        throw new Error('Theme context value is undefined');
    }

    const { theme } = contextValue;
    const { colors, mode } = theme;
    const fetchRandomQuote = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random?maxLength=150&minLength=100');
            const data = await response.json();
            setText(data.content);
            setAuthor(data.author);
        } catch (error) {
            console.error('Error fetching random quote:', error);
        }
    };

      const handleShare = async () => {
        try {
          await Share.share({
            message: `${text} - ${author}`
          });
        } catch (error) {
          alert((error as Error).message);
        }
      };

    useFocusEffect(
        React.useCallback(() => {
            fetchRandomQuote();
            setIsBookmarked(prevState => !prevState);
            setIsBook(true)
        }, [])
    );

      const storeUser = async () => {
        try {
          const savedUser = await AsyncStorage.getItem("user");
          if (savedUser !== null) {
            const currentUser = JSON.parse(savedUser);
            setQuote(currentUser);
            setIsBookmarked(prevState => !prevState);
            setIsBook(false)
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        const updateAsyncStorage = async () => {
          if (quote.length > 0) {
            const newValue = [...quote, { text, author }];
            await AsyncStorage.setItem("user", JSON.stringify(newValue));
            console.log("AsyncStorage updated with new value:", newValue);
          }
          if (quote.length = 0) {
            const newValue = [{ text, author }];
            await AsyncStorage.setItem("user", JSON.stringify(newValue));
            console.log("AsyncStorage updated with new value:", newValue);
          }

        };
        updateAsyncStorage();


      }, [quote]);



    return (
        <View style={[styles.container, { backgroundColor: colors[mode].background }]}>
            <View style={styles.viewicon}>
                <Icon
                    style={[styles.icon1, { color: colors[mode].text }]}
                    name="format-quote" size={60} color="white" />
                <Icon
                    style={[styles.icon2, { color: colors[mode].text }]}

                    name="share" size={30} color="white"
                  onPress={handleShare}
                />
                <Icon
                    style={[styles.icon3, { color: colors[mode].text }]}
                    name={!isBook ? 'bookmark' : 'bookmark-outline'}
                    size={24}
                    color={isBookmarked ? 'black' : 'white'}
                  onPress={() => {
                    if (isBook === true) {
                      storeUser();
                    }
                  }}
                />
            </View>
            <Text style={[styles.Text, { color: colors[mode].text }]}>{text}</Text>
            <Text style={styles.Text1}>{author}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        height: "96%",
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 80
    },
    Text: {
        color: "white",
        fontSize: 35
    },
    Text1: {
        color: "grey",
        fontSize: 22,
        marginTop: 30
    },
    icon1: {
        transform: [{ rotate: '180deg' }],
    },
    icon2: {
        marginLeft: 200,
        padding: 15
    },
    icon3: {
        paddingVertical: 15,
        fontSize: 30
    },
    viewicon: {
        flexDirection: "row",
        marginBottom: 40
    }
});
