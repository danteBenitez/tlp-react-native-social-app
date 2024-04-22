import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";

export function FullScreenImage({ navigation, route }) {
  const uri = route.params.uri;
  console.log({ uri });
  const text = route.params.text;

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={text} />
      </Appbar.Header>
      <View style={styles.view}>
        <Image
          source={{ uri }}
          height={500}
          width={500}
          style={styles.img}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "auto",
    width: "100%",
    height: 800,
  },
  img: {
    width: "100%",
  }
});
