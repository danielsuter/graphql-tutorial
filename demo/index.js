const {employees, projects} = require('./data/employees');
const {GraphQLServer} = require('graphql-yoga');

const resolvers = {
    Query: {
        info: () => `Welcome to the Web platform demo`,
        employees: (parent, {limit}) => employees.slice(0, limit),
        projects: () => projects,
    },
    Mutation: {
        addEmployee: (parent, {firstname, lastname, hobbies}) => {
            const newEmployee = {
                id: employees.length,
                firstname,
                lastname,
                hobbies: hobbies || [],
            };
            employees.push(newEmployee);
            return newEmployee;
        },
        updateEmployee: (parent, {id, firstname, lastname, hobbies}) => {
            const employeeToUpdate = employees.find(employee => "" + employee.id === id);
            if (!employeeToUpdate) {
                throw new Error(`Could not find employee with ID ${id}`);
            }
            employeeToUpdate.firstname = firstname || employeeToUpdate.firstname;
            employeeToUpdate.lastname = lastname || employeeToUpdate.lastname;
            employeeToUpdate.hobbies = hobbies || employeeToUpdate.hobbies;

            return employeeToUpdate;
        }
    },
    Employee: {
        hobbies: (parent) => parent.hobbies || [],
        projects: (parent) => projects.filter(project => parent.projectIds.some(projectId => projectId === project.id))
    }
};

const server = new GraphQLServer({
    typeDefs: './demo/schema.graphql',
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));