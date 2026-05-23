import React, { useState, useEffect } from "react";
import { Text, TextInput, FlatList, StyleSheet } from "react-native";

import { GlobalLayout } from "../components/Layout";
import Worksite from "../components/Worksite";
import { getWorksites } from "../services/api";

export default function WorksitesScreen({ token }) {
  const [worksites, setWorksites] = useState([]);
  const [allWorksites, setAllWorksites] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const loadWorksites = async () => {
    try {
      setMessage("Loading worksites...");

      const data = await getWorksites(token);
      const worksiteList = data.results || data.worksites || data.docs || data;

      setWorksites(worksiteList);
      setAllWorksites(worksiteList);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadWorksites();
  }, []);

  const handleSearch = (event) => {
    const text = event.nativeEvent.text;

    if (text === "") {
      setWorksites(allWorksites);
      return;
    }

    const results = allWorksites.filter((worksite) =>
      (worksite.name || "").toLowerCase().includes(text.toLowerCase())
    );

    setWorksites(results);
  };

  return (
    <GlobalLayout>
      <Text style={styles.heading}>Worksites</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search worksite..."
        returnKeyType="search"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={handleSearch}
      />

      {message !== "" && <Text style={styles.message}>{message}</Text>}

      <Text style={styles.count}>Worksites loaded: {worksites.length}</Text>

      <FlatList
        style={styles.list}
        data={worksites}
        renderItem={({ item }) => (
          <Worksite
            name={item.name}
            address={item.address}
            suburb={item.suburb}
            status={item.status}
          />
        )}
        keyExtractor={(item, index) => item._id || item.id || index.toString()}
      />
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  searchBar: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  message: {
    marginBottom: 10,
    color: "red",
  },
  count: {
    marginBottom: 10,
    color: "gray",
  },
});