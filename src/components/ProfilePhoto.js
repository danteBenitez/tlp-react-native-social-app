import { Image, Pressable, View } from "react-native";
import { useUser } from "../context/UserContext";
import { Avatar } from "react-native-paper";

export function ProfilePhoto({ size, style, onPress }) {
  const { user } = useUser();
  return (
    <Pressable onPress={onPress}>
      {user.profilePic ? (
        <Image
          source={{ uri: user.profilePic }}
          size={size}
          width={size}
          height={size}
          style={style}
        />
      ) : (
        <Avatar.Icon icon="account" size={size} style={style} />
      )}
    </Pressable>
  );
}
