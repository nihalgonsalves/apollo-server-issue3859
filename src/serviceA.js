const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    serviceAQueryReturningBType(ids: [ID!]!): [ServiceBType!]!
    serviceAQueryReturningNullableBType(ids: [ID!]!): [ServiceBType]!
  }

  extend type ServiceBType @key(fields: "id") {
    id: ID! @external
    someFieldFromB: String @external
    extendedByServiceA: String! @requires(fields: "someFieldFromB")
  }
`;

const resolvers = {
  Query: {
    serviceAQueryReturningBType: (root, { ids }) => ids.map(id => ({ id })),
    serviceAQueryReturningNullableBType: (root, { ids }) => ids.map(id => ({ id })),
  },
  ServiceBType: {
    __resolveReference: (root) => {
      console.log(`Resolving Reference: ${JSON.stringify(root, null, 2)}`);
      return root;
    },
    extendedByServiceA: (root) => {
      console.log(`Resolving extendedByServiceA: ${JSON.stringify(root, null, 2)}`);
      return 'Hello from A';
    },
  },
};

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({
  schema,
  tracing: true,
  cors: true,
  introspection: true,
  playground: true,
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀  SERVICE A ready at ${url}`);
});
