const users = [
  {
    id: "1",
    name: "Charlie",
    email: "Chark@example.com",
    age: 38
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@example.com"
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com"
  }
];

const posts = [
  {
    id: "77",
    title: "What a title!",
    body: "lorem if youve got em",
    published: true,
    author: "1"
  },
  {
    id: "55",
    title: "The Daily Beatings",
    body: "Will continue until morale improves",
    published: true,
    author: "1"
  },
  {
    id: "70",
    title: "Ixnay ",
    body: "ipsem in the membrane",
    published: false,
    author: "2"
  },
  {
    id: "46",
    title: "WIP",
    body: "Ixnay in the membrane",
    published: false,
    author: "3"
  }
];

const comments = [
  {
    id: "11",
    text: "My first comment!",
    author: "1",
    post: "77"
  },
  {
    id: "14",
    text: "This post sucks!",
    author: "2",
    post: "46"
  },
  {
    id: "15",
    text: "gonna have to disagree with you ....",
    author: "3",
    post: "55"
  },
  {
    id: "17",
    text: "cha right!",
    author: "1",
    post: "70"
  },
  {
    id: "18",
    text: "My third comment!",
    author: "1",
    post: "77"
  }
];

const db = {
  users,
  posts,
  comments
};

export { db as default };
