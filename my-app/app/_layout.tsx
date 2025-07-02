import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="Sign_up_flow" />
    </Stack>
  );
};

export default RootLayout;
