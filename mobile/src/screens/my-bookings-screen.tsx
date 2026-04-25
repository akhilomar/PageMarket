import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { api } from "@/services/api";

export function MyBookingsScreen() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const response = await api.get("/bookings/my");
      setBookings(response.data.items || []);
    }

    void load();
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>My bookings</Text>
      {bookings.map((booking) => (
        <View key={booking.id} style={styles.card}>
          <Text style={styles.cardTitle}>{booking.campaignTitle}</Text>
          <Text style={styles.cardText}>
            {booking.page.pageName} . {booking.status}
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

