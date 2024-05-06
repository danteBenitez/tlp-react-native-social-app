import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import { usePosts } from "../context/PostContext";
import { Post } from "./Post";
import { ROUTES } from "../screens/routes";
import { ActivityIndicator } from "react-native-paper";

export function Feed({ navigation }) {
  const { loading, posts } = usePosts();
  console.log(posts);
  const handleProfilePress = (user) => {
    navigation.navigate(ROUTES.USER_PROFILE, {
      uri: user.profilePic,
      text: "Perfil de " + user.username,
    });
  };

  return (
    <>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={20} />
        </View>
      )}
      {!loading && (
        <FlatList
          data={posts}
          renderItem={({ item: p }) => (
            <Post key={p.id} post={p} onProfilePress={handleProfilePress} />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  feed: {
    gap: 10,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
});
