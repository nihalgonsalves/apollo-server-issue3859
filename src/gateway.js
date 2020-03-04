const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'service-a', url: 'http://localhost:4001' },
    { name: 'service-b', url: 'http://localhost:4002' },
  ],
});

const server = new ApolloServer({
  gateway,
  tracing: true,
  subscriptions: false,
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀  GATEWAY ready at ${url}`);
});
