import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { api } from "@/services/api";
import { Button } from "@/components/button";
import type { RootStackParamList } from "@/types/navigation";

export function CreatorDashboardScreen({
  navigation
}: NativeStackScreenProps<RootStackParamList, "CreatorDashboard">) {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const response = await api.get("/pages?owner=me");
      setPages(response.data.items || []);
    }

    void load();
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Creator dashboard</Text>
      <Button title="Add Page" onPress={() => navigation.navigate("AddPage")} />
      {pages.map((page) => (
        <View key={page.id} style={styles.card}>
          <Text style={styles.cardTitle}>{page.pageName}</Text>
          <Text style={styles.cardText}>
            {page.platform} . {page.status}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fffaf0"
  },
  content: {
    padding: 24,
    gap: 14
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    gap: 6
  },
  cardTitle: {
    fontWeight: "800",
    fontSize: 18,
    color: "#0f172a"
  },
  cardText: {
    color: "#475569"
  }
});

