import { View, StyleSheet } from "react-native"
import { usePosts } from "../context/PostContext";
import { Post } from "./Post";

export function Feed() {
    const { posts } = usePosts();

    return <View style={styles.feed}>
        {posts.map(p => <Post key={p.id} post={p} />)}
    </View>
}

const styles = StyleSheet.create({
    feed: {
        gap: 10
    }
});