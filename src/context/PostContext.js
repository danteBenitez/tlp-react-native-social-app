import { createContext, useContext, useState } from "react";
import { API_URL } from "./UserContext";
import axios from "axios";

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

const DEFAULT_POST = {
  id: 0,
  title: "Welcome to my social network app!",
  body: "asdasdasd",
  createdAt: new Date(),
  user: {
    username: "johndoe",
    profilePic: "https://i.pravatar.cc/100",
  },
};

export function PostContextProvider({ children }) {
  const [posts, setPosts] = useState([DEFAULT_POST]);

  const createPost = (post) => {
    setPosts([...posts, post]);
    const body = new FormData();
    body.append("title", post.title);
    body.append("body", post.body);
    body.append("createdAt", post.createdAt);
    body.append("username", post.user.username);
    const fileParts = post.user.profilePic.split(".");
    const fileType = fileParts[fileParts.length - 1];
    body.append("profilePic", {
      uri: post.user.profilePic,
      name: `profile.${fileType}`,
      type: `image/${fileType}`,
    });

    fetch(API_URL + "/post", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((err) => {
        console.error("Petición fallida: ", err);
      });
  };

  const deletePost = (id) => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  const updatePost = (id, updatedPost) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return updatedPost;
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        createPost,
        deletePost,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
