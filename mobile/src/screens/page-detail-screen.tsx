import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { api } from "@/services/api";
import { Button } from "@/components/button";
import type { RootStackParamList } from "@/types/navigation";

export function PageDetailScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, "PageDetail">) {
  const [page, setPage] = useState<any | null>(null);

  useEffect(() => {
    async function load() {
      const response = await api.get(`/pages/${route.params.pageId}`);
      setPage(response.data.page);
    }

    void load();
  }, [route.params.pageId]);

  if (!page) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{page.pageName}</Text>
      <Text style={styles.meta}>
        {page.platform} . {page.city}
      </Text>
      <Text style={styles.description}>{page.description}</Text>
      <Button title="Book this page" onPress={() => navigation.navigate("Booking", { pageId: page.id })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
    padding: 24,
    gap: 14
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0f172a"
  },
  meta: {
    color: "#0f766e",
    fontWeight: "600"
  },
  description: {
    color: "#475569",
    lineHeight: 24
  }
});

