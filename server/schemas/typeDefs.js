const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
	bookCount: Int
    savedBooks: [Book]
}

# Set up an Auth type to handle returning data from a profile creating or user login
type Auth {
    token: ID!
    user: User
}

type Book {
	bookId: ID!
	authors: [String]
	description: String
	title: String
	image: String
	link: String
}

type Query {
	me(userId: String!): User
	users: [User]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

	saveBook(userId: ID!, bookId: ID!, authors: [String], description: String, title: String, image: String, link: String): User
	removeBook(userId: ID!, bookId: ID!): User
}
`;

module.exports = typeDefs;