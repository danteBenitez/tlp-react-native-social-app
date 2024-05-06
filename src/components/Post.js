import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { ProfilePreviewHeader } from "./ProfilePreviewHeader";
import { ScaledSheet } from "react-native-size-matters";

export function Post({ post, onProfilePress }) {
  return (
    <View>
      <Card>
        <Card.Content style={styles.header}>
          <ProfilePreviewHeader user={post.user} onPress={() => onProfilePress(post.user)} />
          <Text variant="bodySmall">{post.createdAt.toDateString()}</Text>
        </Card.Content>
        <Card.Title title={post.title} titleStyle={styles.postTitle} />
        <Card.Content>
          <Text variant="bodyMedium">{post.body}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = ScaledSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '20@s',
        paddingVertical: '6@vs'
    },
    postTitle: {
      fontSize: '20@ms'
    }
})
