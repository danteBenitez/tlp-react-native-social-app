import { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { FormBuilder } from "react-native-paper-form-builder";
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import { Avatar, Button } from "react-native-paper";
import { useUser } from "../context/UserContext";

const IMAGE_SIZE = 200;

export function LoginUser() {
  const [file, setFile] = useState(null);
  const { updateUser } = useUser();
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      username: "Anon",
      profilePic: null,
    },
    mode: "onChange",
  });

  const handleProfilePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled) {
      return;
    }
    setFile(result.assets[0]);
  };

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.accountContainer}>
        {file ? (
          <Avatar.Image source={file?.uri} size={IMAGE_SIZE} />
        ) : (
          <Avatar.Icon icon="account" size={IMAGE_SIZE}/>
        )}
        <Button
          style={styles.pickButtonStyle}
          mode="outlined"
          onPress={handleProfilePick}
        >
          Elegir una foto de perfil
        </Button>
      </ScrollView>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}>
          Cambia la información de tu usuario.
        </Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: "text",
              name: "username",

              rules: {
                required: {
                  value: true,
                  message: "Un usuario debe tener un nombre",
                },
              },
              textInputProps: {
                label: "Nombre de usuario",
              },
            },
          ]}
        />
        <Button
          mode={"contained"}
          onPress={handleSubmit((data) => {
            updateUser({
              username: data.username,
              profilePic: file?.uri,
            });
          })}
        >
            Enviar
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
  },
  accountContainer: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    minHeight: 30,
  },
  scrollViewStyle: {
    padding: 15,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  headingStyle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 40,
  },
  pickButtonStyle: {
    width: "100%",
    marginVertical: 15,
  },
});
