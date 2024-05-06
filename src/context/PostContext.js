import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "./UserContext";
import { getExamplePosts, getPosts } from "../services/posts";

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

// Mostramos posteos de ejemplo usando una API de citas aleatorias
// y de fotos de perfiles aleatorias
const useExamplePosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      loadPosts();
    }, []);

    const loadPosts = async () => {
      const examplePosts = await getExamplePosts();
      setPosts(examplePosts);
    }

    return { posts, update: loadPosts };
}

export function PostContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const { posts: examplePosts } = useExamplePosts();
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    setLoading(true);
    const posts = await getPosts();
    if (!posts) return;
    const mapped = posts.map((post) => ({
        ...post,
        user: {
          ...post.user,
          profilePic: post.user.profilelPic ? API_URL + post.user.profilePic : '',
        },
        createdAt: new Date(post.createdAt),
    }))
    setPosts([...mapped]);
  }

  const createPost = (post) => {
    const body = new FormData();
    body.append("title", post.title);
    body.append("content", post.body);
    body.append("username", post.user.username);
    if (post.user.profilePic) {
      const fileParts = post.user.profilePic.split(".");
      const fileType = fileParts[fileParts.length - 1];
      body.append("profile-pic", {
        uri: post.user.profilePic,
        name: `profile.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    const result = createPost(body);
    return result;
  };

  useEffect(() => {
    setPosts([...examplePosts, ...posts]);
    setLoading(false);
  }, [examplePosts]);

  useEffect(() => {
    loadPosts();
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
        loading,
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
