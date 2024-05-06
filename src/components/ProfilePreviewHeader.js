import { Pressable, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";

export function ProfilePreviewHeader({ user, onPress }) {
  const hasProfilePic = !!user.profilePic;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {hasProfilePic && <Avatar.Image source={{ uri: user.profilePic ?? '' }} />}
      {!hasProfilePic && <Avatar.Icon icon={"account"}></Avatar.Icon>}
      <Text variant="bodySmall">{user.username}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
});
