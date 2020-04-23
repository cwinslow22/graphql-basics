import { GraphQLServer } from "graphql-yoga";

// Demo User Data
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
    published: true
  },
  {
    id: "55",
    title: "The Daily Beatings",
    body: "Will continue until morale improves",
    published: true
  },
  {
    id: "70",
    title: "Ixnay ",
    body: "ipsem in the membrane",
    published: false
  },
  {
    id: "46",
    title: "WIP",
    body: "Ixnay in the membrane",
    published: false
  }
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
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
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});
