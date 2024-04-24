import { View } from "react-native";
import { Feed } from "../components/Feed";
import { API_URL, useUser } from "../context/UserContext";
import { useEffect } from "react";

export function Home({ navigation }) {
  const { user } = useUser();

  return (
    <View>
      <Feed navigation={navigation} />
    </View>
  );
}
