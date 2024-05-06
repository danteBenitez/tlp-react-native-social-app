import { View, StyleSheet, ScrollView } from "react-native";
import { usePosts } from "../context/PostContext";
import { Post } from "./Post";
import { ROUTES } from "../screens/routes";

export function Feed({ navigation }) {
  const { posts } = usePosts();
  const handleProfilePress = (user) => {
    navigation.navigate(ROUTES.USER_PROFILE, {
      uri: user.profilePic,
      text: "Perfil de " + user.username,
    });
  };
  console.log("Renderizando posts", posts);

  return (
    <ScrollView style={styles.feed} scrollEnabled={true}>
      {posts.map((p) => (
        <Post key={p.id} post={p} onProfilePress={handleProfilePress} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  feed: {
    gap: 10,
  },
});
