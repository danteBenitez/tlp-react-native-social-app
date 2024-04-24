import { createContext, useEffect, useContext, useState } from "react";

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const API_URL = 'http://192.168.0.106:8083';

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
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((err) => {
        console.log(Object.keys(err));
        console.log(err);
        console.error("Petición fallida: ", err);
      });
  };

  useEffect(() => {
    fetch(API_URL + "/post")
      .then(res => { return res.json() })
      .then((data) => {
        const newData = data.map(post => ({
          ...post,
          createdAt: new Date(post.createdAt)
        }))
        setPosts(newData);
      })
      .catch(console.error);
  }, []);

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
