import { View, StyleSheet, ScrollView } from "react-native";
import { usePosts } from "../context/PostContext";
import { Post } from "./Post";

export function Feed({ navigation }) {
  const { posts } = usePosts();
  const handleProfilePress = (user) => {
    navigation.navigate("user/profile", {
      uri: user.profilePic,
      text: "Perfil de " + user.username,
    });
  };
  console.log(navigation);

  return (
    <ScrollView tyle={styles.feed} scrollEnabled={true}>
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
