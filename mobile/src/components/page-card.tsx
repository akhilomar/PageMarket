import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function PageCard({
  page,
  onPress
}: {
  page: any;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{page.pageName}</Text>
      <Text style={styles.subtitle}>
        {page.platform} . {page.city}
      </Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>{page.followersCount} followers</Text>
        <Text style={styles.meta}>${page.pricing?.postPrice ?? "N/A"}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    gap: 6
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a"
  },
  subtitle: {
    color: "#475569"
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8
  },
  meta: {
    color: "#0f766e",
    fontWeight: "600"
  }
});

