import { View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

export function Header({ navigation }) {
  const theme = useTheme();
  const handlePostCreation = () => {
    console.log("pressed");
    navigation.navigate("post/create");
  };

  const handleAccountCreation = () => {
    navigation.navigate("user/login");
  }

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Social Media" color={theme.colors.primary} />
        <Appbar.Action icon="account-edit" onPress={handleAccountCreation} />
        <Appbar.Action icon="pencil" onPress={handlePostCreation} />
      </Appbar.Header>
    </View>
  );
}
