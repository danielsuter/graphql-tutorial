const employees = require("./data/employees").employees;
const {GraphQLServer} = require('graphql-yoga');

const resolvers = {
    Query: {
        info: () => `I'm a ZE demo GraphQL server`,
        employees: () => {
            return employees;
        },
    },
    Mutation: {
        addEmployee: (parent, {firstname, lastname, hobbies}, context, info) => {
            const newEmployee = {
                id: employees.length,
                firstname,
                lastname,
                hobbies: hobbies === undefined ? [] : hobbies
            };
            employees.push(newEmployee);
            return newEmployee;
        },
    }
};

const server = new GraphQLServer({
    typeDefs: './demo/schema.graphql',
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));