const {GraphQLServer} = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

function findLink(args) {
    return links.find(link => link.id === args.id);
}

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => findLink(args),
    },
    Mutation: {
        updateLink: (parent, args) => {
            const link = findLink(args);
            if (link) {
                link.description = args.description || link.description;
                link.url = args.url || link.url;
                return link;
            }
            return null;
        },

        deleteLink: (parent, args) => {
            links = links.filter(link => link.id !== args.id)
        },

        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link;
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));