const employees = require("./data/employees").employees;
const {GraphQLServer} = require('graphql-yoga');

const resolvers = {
    Query: {
        info: () => `I'm a ZE demo GraphQL server`,
        employees: () => employees,
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
        updateEmployee: (parent, {id, firstname, lastname, hobbies}) => {
            const employeeToUpdate = employees.find(employee => "" + employee.id === id);
            if (!employeeToUpdate) {
                throw new Error(`Employee with id ${id} not found`);
            }
            employeeToUpdate.firstname = firstname || employeeToUpdate.firstname;
            employeeToUpdate.lastname = lastname || employeeToUpdate.lastname;
            employeeToUpdate.hobbies = hobbies || employeeToUpdate.hobbies;
            return employeeToUpdate;
        },
    },
    Employee: {
        fullname: (parent) => parent.firstname + ' ' + parent.lastname,
    }
};

const server = new GraphQLServer({
    typeDefs: './demo/schema.graphql',
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));