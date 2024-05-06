import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button, Text } from "react-native-paper";
import { usePosts } from "../context/PostContext";
import { useUser } from "../context/UserContext";
import { ROUTES } from "./routes";

export function CreatePost({ navigation }) {
  const { createPost, posts } = usePosts();
  const { user } = useUser();
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      body: "Contenido de post",
    },
    mode: "onChange",
  });

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}>Crea una publicación</Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: "text",
              name: "title",

              rules: {
                required: {
                  value: true,
                  message: "Un posteo debe tener un título",
                },
              },
              textInputProps: {
                label: "Título",
              },
            },
            {
              type: "text",
              name: "body",
              defaultValue: "Contenido de post",
              rules: {
                required: {
                  value: true,
                  message: "Un posteo debe tener un cuerpo",
                },
              },
              textInputProps: {
                style: styles.textInputStyle,
                multiline: true,
              },
            },
          ]}
        />
        <Button
          mode={"contained"}
          onPress={handleSubmit((data) => {
            createPost({
              id: posts.length,
              title: data.title,
              body: data.body,
              createdAt: new Date(),
              user,
            });
            navigation.navigate(ROUTES.HOME);
          })}
        >
            Postear
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    paddingHorizontal: 15,
    paddingVertical: 150,
  },
  headingStyle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  textInputStyle: {
    textAlignVertical: "top",
    height: 200,
  },
});
