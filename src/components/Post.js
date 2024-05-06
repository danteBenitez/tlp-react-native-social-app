import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { ProfilePreviewHeader } from "./ProfilePreviewHeader";

export function Post({ post, onProfilePress }) {
  return (
    <View>
      <Card>
        <Card.Content style={styles.header}>
          <ProfilePreviewHeader user={post.user} onPress={() => onProfilePress(post.user)} />
          <Text variant="bodySmall">{post.createdAt.toDateString()}</Text>
        </Card.Content>
        <Card.Title title={post.title} />
        <Card.Content>
          <Text variant="bodyMedium">{post.body}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
