import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

const DEFAULT_POST = {
    id: 0,
    title: "Welcome to my social network app!",
    body: "asdasdasd",
    createdAt: new Date(),
    user: {
        username: "johndoe",
        profilePic: "https://i.pravatar.cc/100"
    }
};

export function PostContextProvider({ children }) {
    const [posts, setPosts] = useState([DEFAULT_POST]);

    const createPost = (post) => {
        setPosts([...posts, post]);
    }

    const deletePost = (id) => {
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
    }

    const updatePost = (id, updatedPost) => {
        const updatedPosts = posts.map((post) => {
            if(post.id === id) {
                return updatedPost;
            }
            return post;
        });
        setPosts(updatedPosts);
    }

    return <PostContext.Provider value={{
        posts,
        createPost,
        deletePost,
        updatePost
    }}>
        {children}
    </PostContext.Provider>
}