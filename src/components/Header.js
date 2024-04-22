import { StyleSheet, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { ProfilePhoto } from "./ProfilePhoto";

export function Header({ navigation }) {
  const theme = useTheme();
  const handlePostCreation = () => {
    navigation.navigate("post/create");
  };

  const handleAccountCreation = () => {
    navigation.navigate("user/login");
  }

  return (
    <View>
      <Appbar.Header style={styles.appbar}>
        <ProfilePhoto size={30} style={styles.profile} />
        <Appbar.Content title="Social Medi" color={theme.colors.primary} />
        <Appbar.Action icon="account-edit" onPress={handleAccountCreation} />
        <Appbar.Action icon="pencil" onPress={handlePostCreation} />
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