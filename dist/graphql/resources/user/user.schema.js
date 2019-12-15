"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userTypes = `

    # User definition type
    type User {
        id: ID!
        name: String!
        email: String!
        photo: String
        createdAt: String!
        updatedAt: String!
    }

    input UserCreateInput {
        # Mandatory Field
        name: String!

        # Mandatory Field
        email: String!

        # Mandatory Field
        password: String!
    }

    input UserUpdateInput {

        # Mandatory Field
        name: String!

        # Mandatory Field
        email: String!
        photo: String
    }

    input UserUpdatePasswordInput {
        
        # Mandatory Field
        password: String!
    }
`;
exports.userTypes = userTypes;
const userQueries = `
    # Save new user in database
    users(first: Int, offset: Int): [ User! ]!

    # Find user by id
    user(id: ID!): User
`;
exports.userQueries = userQueries;
const userMutations = `
    # Create a new User and return a user created
    createUser(input: UserCreateInput!): User

    # Update a user and return a user updated
    updateUser(id: ID!, input: UserUpdateInput!): User

    # Update password's user and return a Boolean 'true' if updated success and 'false' if failure
    updateUserPassword(id: ID!, input: UserUpdatePasswordInput!): Boolean

    # Delete a user
    deleteUser(id: ID!): Boolean
`;
exports.userMutations = userMutations;
