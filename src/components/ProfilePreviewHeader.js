import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";

export function ProfilePreviewHeader({ user }) {
  const hasProfilePic = !!user.profilePic;
  return (
    <View style={styles.container}>
      {hasProfilePic && <Avatar.Image source={{ uri: user.profilePic }} />}
      {!hasProfilePic && <Avatar.Icon icon={"account"}></Avatar.Icon>}
      <Text variant="bodySmall">{user.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
});
