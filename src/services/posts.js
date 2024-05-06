const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function getPosts() {
    return fetch(API_URL + "/post")
        .then(res => res.json());
}

export function createPost(post) {
    return fetch(API_URL + "/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: post,
    }).then(res => res.json())
}

export function getExamplePosts() {
    const users = getExampleUsers();
    const quotes = getExampleQuotes();

    return Promise.all([users, quotes]).then(([users, quotes]) => {
        return quotes.map((quote, index) => {
            return {
                id: quote.id,
                title: "A genious quote",
                body: quote.quote,
                createdAt: new Date(),
                user: users[index],
            }
        });
    });
}

async function getExampleUsers() {
    const USER_API_URL = 'https://fakerapi.it/api/v1/persons';
    const PERSON_IMAGE_API_URL = 'https://api.dicebear.com/8.x/pixel-art/svg';
    const { data: results } = await fetch(USER_API_URL).then(res => { 
        return res.json()
    });
    return results.map(user => {
        return {
            username: user.firstname + ' ' + user.lastname,
            profilePic: PERSON_IMAGE_API_URL
        }
    });    
}

async function getExampleQuotes(limit = 10) {
    const QUOTE_API_URL = `https://api.quotable.io/quotes/random?limit=${limit}`;
    const quotes = await fetch(QUOTE_API_URL).then(res => res.json());
    return quotes.map(q => ({
        id: q._id,
        quote: `${q.content}\n - ${q.author}`
    }));
}