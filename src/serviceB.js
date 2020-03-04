const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  type ServiceBType @key(fields: "id") {
    id: ID!
    someFieldFromB: String
  }
`;

const resolvers = {
  ServiceBType: {
    __resolveReference: (root) => {
      console.log(`Resolving Reference: ${JSON.stringify(root, null, 2)}`);
      switch (root.id) {
        case 'should-exist':
          return root;
        case 'should-not-exist':
          return null;
        default:
          throw new Error('Not Found');
      }
    },
    someFieldFromB: (root) => {
      console.log(`Resolving someFieldFromB: ${JSON.stringify(root, null, 2)}`);
      return 'Hello from B';
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

server.listen(4002).then(({ url }) => {
  console.log(`🚀  SERVICE B ready at ${url}`);
});
