import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";

// Demo User Data
let users = [
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

let posts = [
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

let comments = [
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

// Type definitions (schema)
const typeDefs = `
    type Query {
        comments: [Comment!]!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type Mutation {
      createUser(data: CreateUserInput!): User!
      deleteUser(id: ID!): User!
      createPost(data: CreatePostInput!): Post!
      createComment(data: CreateCommentInput!): Comment!
    }

    input CreateUserInput{
      name: String!
      email: String!
      age: Int
    }

    input CreatePostInput{
      title: String!
      body: String!
      published: Boolean!
      author: ID!
    }

    input CreateCommentInput{
      text: String!
      author: ID!
      post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    comments(parent, args, ctx, info) {
      return comments;
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },

    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },

    me() {
      return {
        id: "123098",
        name: "Mike",
        email: "mike@example.com"
        // age: 22
      };
    },

    post() {
      return {
        id: "234987",
        title: "My First Post",
        body: "ipsem till you lorem",
        published: false
      };
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => {
        return user.email === args.data.email;
      });

      if (emailTaken) {
        throw new Error("Email already in use.");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      users.push(user);

      return user;
    },

    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => user.id === args.id);

      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const deletedUsers = users.splice(userIndex, 1);

      posts = posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter(comment => comment.post !== post.id);
        }

        return !match;
      });

      comments = comments.filter(comment => comment.author !== args.id);

      return deletedUsers[0];
    },

    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error("User not found");
      }

      const post = {
        id: uuidv4(),
        ...args.data
      };

      posts.push(post);

      return post;
    },

    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);
      const postExists = posts.some(post => post.id === args.data.post);

      if (!userExists) {
        throw new Error("User not found");
      }

      if (!postExists) {
        throw new Error("Post not found");
      }

      const postPublished = posts.find(post => {
        return post.id === args.data.post && post.published === true;
      });

      if (!postPublished) {
        throw new Error("This post has not been published yet");
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      comments.push(comment);

      return comment;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});
