import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text,ScrollView } from "react-native";
import { ThemeContext } from "./Context";
import AsyncStorage from '@react-native-async-storage/async-storage';

type QuoteItem = {
    text: string;
    author: string;
  };
export default function Bookmark() {
  const [quote, setQuote] = useState<QuoteItem[]|null>(null); // State to hold the saved quote
  const context= useContext(ThemeContext)
  if(!context){
    throw new Error("invalid")
  }
  const{theme}=context
  const {colors,mode}=theme

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser !== null) {
        const currentUser = JSON.parse(savedUser);
        setQuote(currentUser); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <>
    <View style={[{ height: 140 },{ backgroundColor: colors[mode].contenct.background }]}>
    <View style={styles.head}>
      <Text style={[styles.quote1,{ color: colors[mode].contenct.color }]}>Loved Quotes</Text>
    </View>
  </View>
    <ScrollView style={[ { backgroundColor: colors[mode].background }]}>
      <View style={[styles.card, { backgroundColor: colors[mode].background }]}>
        {quote && quote.map((quoteItem, index) => (
          <View key={index}>
            <Text style={[styles.quote, { color: colors[mode].text }]}>
              "{quoteItem.text}"
            </Text>
            <Text  style={[styles.author, { color: colors[mode].text }]}>-{quoteItem.author}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    textAlign: 'right',
  },
  quote1:
  {
    fontSize: 30,
    fontWeight: "600",
    color: "#708090",
    margin: 20,
    paddingTop: 40,
  },
  head: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20
  },
});
