import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        me: User!
        post: Post!
        add(a: Float!, b: Float!): Float!
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
    add(parent, args, ctx, info) {
      if (args) {
        return args.a + args.b;
      }
    },
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello, ${args.name}!`;
      } else {
        return "Hello!";
      }
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
