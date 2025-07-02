import { View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FE3838",
        padding: 20,
      }}
    >
      <Link
        href="/Sign_up_flow"
        style={{
          fontFamily: "Geologica",
          fontWeight: "600",
          fontSize: 48,
          lineHeight: 58, // 120% of 48
          letterSpacing: -0.04 * 48, // -4%
          color: "white",
          textAlign: "center",
        }}
      >
        Sign up flow
      </Link>
    </View>
  );
}
