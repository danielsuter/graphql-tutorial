const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./generated/prisma-client');


const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => context.prisma.links(),
    },
    Mutation: {

        post: (root, {url, description}, context) => {
            return context.prisma.createLink({
                url: url,
                description: description,
            })
        },
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {prisma},
});

server.start(() => console.log(`Server is running on http://localhost:4000`));