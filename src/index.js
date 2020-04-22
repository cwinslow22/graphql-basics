import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return "abc123";
    },
    name() {
      return "Chas Wins";
    },
    age() {
      return 39;
    },
    employed() {
      return false;
    },
    gpa() {
      return null;
    },
    title() {
      return "The Leftovers themed coffee mug";
    },
    price() {
      return 11.88;
    },
    releaseYear() {
      return 2015;
    },
    rating() {
      return 4.89;
    },
    inStock() {
      return true;
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
