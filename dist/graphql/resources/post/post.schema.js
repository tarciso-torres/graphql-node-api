"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postTypes = `

    # Post definition type
    type Post {
        # Mandatory Field
        id: ID!

        # Mandatory Field
        title: String!

        # Mandatory Field
        content: String!
        photo: String!
        createAt: String!
        updateAt: String!
        author: User!
        comments: [ Comment! ]!
    }

    input PostInput {

        # Mandatory Field
        title: String!
        content: String!
        photo: String
        author: Int!
    }

`;
exports.postTypes = postTypes;
const postQueries = `
    # Paginate posts and return a list of the Posts
    posts(first: Int, offset: Int): [ Post! ]!

    # Find post by id;
    post(id: ID!): Post
`;
exports.postQueries = postQueries;
const postMutations = `

    # Save post in database
    createPost(input: PostInput!): Post

    # Update post in database
    updatePost(id: ID!, input: PostInput!): Post

    # Delete a post send id
    delete(id: ID!): Boolean
`;
exports.postMutations = postMutations;
