import { PaperProvider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header } from "./src/components/Header";
import { Home } from "./src/screens/Home";
import { CreatePost } from "./src/screens/CreatePost";
import { NavigationContainer } from "@react-navigation/native";
import { PostContextProvider } from "./src/context/PostContext";
import { UserContextProvider } from "./src/context/UserContext";
import { LoginUser } from "./src/screens/LoginUser";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <UserContextProvider>
        <NavigationContainer>
          <PostContextProvider>
            <Stack.Navigator
              initialRouteName="home"
              screenOptions={{
                header: Header,
              }}
            >
              <Stack.Screen name="home" component={Home} />
              <Stack.Screen name="post/create" component={CreatePost} />
              <Stack.Screen name="user/login" component={LoginUser} />
            </Stack.Navigator>
          </PostContextProvider>
        </NavigationContainer>
      </UserContextProvider>
    </PaperProvider>
  );
}
