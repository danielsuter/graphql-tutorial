const {GraphQLServer} = require('graphql-yoga');

const resolvers = {};

const server = new GraphQLServer({
    typeDefs: './demo/schema.graphql',
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));