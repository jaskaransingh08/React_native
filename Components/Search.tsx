import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "./Context";
type Author= {
    _id: string;
    name: string;
    description: string;
    bio: string;
  }

type Tag= {
    name: string;
  }  
export default function Search() {
  const contextValue=useContext(ThemeContext)
  if(!contextValue){
    throw new Error("it is undefined in search page")
  }
  const { theme } = contextValue;

  const{colors,mode}=theme

  const [expandedItem, setExpandedItem] = useState<string|null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('https://api.quotable.io/authors');
        const data = await response.json();
        setAuthors(data.results);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    const fetchTags = async () => {
      try {
        const response = await fetch('https://api.quotable.io/tags?sortBy=name&sortOrder=desc');
        const tag = await response.json();
        setTags(tag);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
    fetchAuthors();
  }, []);

  const toggleItem = (itemId:string) => {
    setExpandedItem(prevItem => (prevItem === itemId ? null : itemId));
  };

  const [selectedTab, setSelectedTab] = useState(0);

  function onClick(tabIndex:number) {
    setSelectedTab(tabIndex);
  }

  const filteredItems = authors.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.description.toLowerCase().includes(searchText.toLowerCase()));
  const filteredTags = tags.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={[{ marginBottom: 200 }, { backgroundColor: colors[mode].contenct.background }, { paddingTop: 20 }]}>
      <View >
        <View style={[styles.head, { backgroundColor: colors[mode].contenct.background }]}>
          <Text style={styles.search}>Search</Text>
          <Icon style={styles.icon45} name="info" size={30} color="grey" />
        </View>

      </View>
      <View style={[{ backgroundColor: colors[mode].contenct.background }]}>
        <View style={[{ backgroundColor: colors[mode].contenct.background }]}>
          <TextInput
            placeholder="Search"
            style={[styles.searchBar, { color: colors[mode].text }]}
            onChangeText={text => setSearchText(text)}
          />
        </View>
        <View style={[styles.View2, { backgroundColor: colors[mode].contenct.background }]}>
          <TouchableOpacity
            onPress={() => onClick(0)}
            style={selectedTab === 0 ? [styles.link1, { borderColor: colors[mode].contenct.borderColor }] : [styles.link2, { borderColor: colors[mode].contenct.borderColor }]}
          >
            <View >
              <Text style={[styles.Text1, { color: colors[mode].text }]}>Author</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onClick(1)}
            style={selectedTab === 1 ? [styles.link1, { borderColor: colors[mode].contenct.borderColor }] : [styles.link2, { borderColor: colors[mode].contenct.borderColor }]}
          >
            <View >
              <Text style={[styles.Text1, { color: colors[mode].text }]}>Tag</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {selectedTab == 0 ? (
        <View style={[styles.contain, { backgroundColor: colors[mode].background }]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredItems}
            renderItem={({ item }) => (
              <View >
                <View style={styles.containerm}>
                  <View style={styles.container}>
                    <Image
                      source={{ uri: "https://yourteachingmentor.com/wp-content/uploads/2020/12/istockphoto-1223671392-612x612-1.jpg" }}
                      style={styles.profileImage}
                    />
                    <View style={styles.details}>
                      <Text style={[styles.name, { color: colors[mode].text }]}>{item.name}</Text>
                      <Text style={[styles.status, { color: colors[mode].text }]}>{item.description}</Text>
                    </View>
                  </View>
                  <View style={styles.icon}>
                    <TouchableOpacity onPress={() => toggleItem(item._id)}>
                      <Icon
                        style={[styles.name, { color: colors[mode].text }]}
                        name={expandedItem === item._id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={30}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.description}>
                  {expandedItem === item._id && (
                    <View style={styles.details}>
                      <Text style={styles.description}>{item.bio}</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <ScrollView style={[styles.maincontainer2, { backgroundColor: colors[mode].background }]} contentContainerStyle={styles.scrollViewContent}>
          {filteredTags.map((data, index) => (
            <View key={index} style={styles.tagContainer}>
              <Text style={styles.tagText}>{data.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  details: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "gray",
  },
  icon: {
    marginLeft: 10,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  description: {
    paddingHorizontal: 1,
    fontSize: 16,
    color: "grey"
  },
  tagContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 10,
  },
  maincontainer2: {
    width: "100%",
    height: 525,
    paddingTop: 20
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 20
  },
  menu: {
    marginBottom: 20,
    paddingTop: 10,
  },
  head: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20
  },
  search: {
    fontSize: 30,
    fontWeight: "600",
    color: "#708090",
    marginBottom: 10
  },
  View2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    alignItems: "center",
    paddingRight: 10,
    marginRight: 10
  },
  Text1: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
  },
  link1: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "#007AFF",
  },
  link2: {
    flex: 1,
    alignItems: 'center',
    borderColor: "#007AFF",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 50,
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 25,
    width: '92%',
    backgroundColor: "#fff",
    fontSize: 19
  },
  contain: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  containerm: {
    flexDirection: "row",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon45: {
    marginLeft: 200,
    padding: 2
  },
});
