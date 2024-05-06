import { Pressable, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { ScaledSheet, scale } from "react-native-size-matters";

export function ProfilePreviewHeader({ user, onPress }) {
  const hasProfilePic = !!user.profilePic;
  console.log(user.profilePic);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {hasProfilePic && <Avatar.Image source={{ uri: user.profilePic ?? '' }} size={scale(55)} />}
      {!hasProfilePic && <Avatar.Icon size={scale(55)} icon={"account"}></Avatar.Icon>}
      <Text variant="bodySmall">{user.username}</Text>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: '8@s',
    },
});
