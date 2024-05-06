import { Avatar, PaperProvider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header } from "./src/components/Header";
import { Home } from "./src/screens/Home";
import { CreatePost } from "./src/screens/CreatePost";
import { NavigationContainer } from "@react-navigation/native";
import { PostContextProvider } from "./src/context/PostContext";
import { UserContextProvider } from "./src/context/UserContext";
import { LoginUser } from "./src/screens/LoginUser";
import { FullScreenImage } from "./src/components/FullScreenImage";
import { ROUTES } from "./src/screens/routes";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <UserContextProvider>
          <NavigationContainer>
            <PostContextProvider>
              <Stack.Navigator initialRouteName="tabs" screenOptions={{
                header: Header
              }}>
                <Stack.Screen component={FullScreenImage} name={ROUTES.USER_PROFILE} options={{
                  headerShown: false
                }}/>
                <Stack.Screen component={TabScreens} name="tabs" />
              </Stack.Navigator>
            </PostContextProvider>
          </NavigationContainer>
        </UserContextProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export function TabScreens() {
  return (
    <Tab.Navigator initialRouteName={ROUTES.HOME}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: () => <Avatar.Icon icon="home" size={24} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.POST_CREATE}
        component={CreatePost}
        options={{
          tabBarIcon: () => <Avatar.Icon icon="pencil" size={24} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.USER_LOGIN}
        component={LoginUser}
        options={{
          tabBarIcon: () => <Avatar.Icon icon="account" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}
