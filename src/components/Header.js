import { StyleSheet, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { ProfilePhoto } from "./ProfilePhoto";

export function Header() {
  const theme = useTheme();

  return (
    <View>
      <Appbar.Header style={styles.appbar}>
        <ProfilePhoto size={30} style={styles.profile} />
        <Appbar.Content title={"Social media"} color={theme.colors.primary} />
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profile: {
    marginHorizontal: 10,
  }
});