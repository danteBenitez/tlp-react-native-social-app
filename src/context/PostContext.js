import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "./UserContext";

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
  const [refetch, setRefetch] = useState(true);

  const createPost = (post) => {
    const body = new FormData();
    body.append("title", post.title);
    body.append("content", post.body);
    body.append("username", post.user.username);
    const fileParts = post.user.profilePic.split(".");
    const fileType = fileParts[fileParts.length - 1];
    body.append("profile-pic", {
      uri: post.user.profilePic,
      name: `profile.${fileType}`,
      type: `image/${fileType}`,
    });

    fetch(API_URL + "/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("data: ", data);
        setRefetch(true);
      })
      .catch((err) => {
        console.error("Petición fallida (POST): ", err);
      });
  };

  useEffect(() => {
    if (refetch)
      fetch(API_URL + "/post")
        .then((res) => res.json())
        .then((data) => {
          if (!data) return;
          setPosts(
            data.map((post) => ({
              ...post,
              user: {
                ...post.user,
                profilePic: API_URL + post.user.profilePic,
              },
              createdAt: new Date(post.createdAt),
            }))
          );
        })
        .catch((err) => {
          console.error("Petición fallida: (GET)", err);
        })
        .finally(() => {
          setRefetch(false);
        });
  }, [refetch]);

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
