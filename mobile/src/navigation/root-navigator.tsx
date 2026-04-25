import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "@/context/auth-context";
import type { RootStackParamList } from "@/types/navigation";
import { SplashScreen } from "@/screens/splash-screen";
import { LoginScreen } from "@/screens/login-screen";
import { RegisterScreen } from "@/screens/register-screen";
import { HomeScreen } from "@/screens/home-screen";
import { FiltersScreen } from "@/screens/filters-screen";
import { PageDetailScreen } from "@/screens/page-detail-screen";
import { BookingScreen } from "@/screens/booking-screen";
import { MyBookingsScreen } from "@/screens/my-bookings-screen";
import { CreatorDashboardScreen } from "@/screens/creator-dashboard-screen";
import { AddPageScreen } from "@/screens/add-page-screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Filters" component={FiltersScreen} />
          <Stack.Screen name="PageDetail" component={PageDetailScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
          <Stack.Screen name="CreatorDashboard" component={CreatorDashboardScreen} />
          <Stack.Screen name="AddPage" component={AddPageScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

