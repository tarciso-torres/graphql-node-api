import { GraphQLResolveInfo } from "graphql";
import { Transaction } from 'sequelize';

import { DBConnection } from '../../../interfaces/DBConnectionInterface';
import { from } from "apollo-link";
import { postMutations } from "./post.schema";
import { PostInstance } from "../../../models/PostModel";

export const postResolvers = {

    Post: {
        author: (post, args, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.User
                .findById(post.get('author'));
        },

        posts: (post, { first = 10, offset = 0}, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.Comment
                .findAll({
                    where: {post: post.get('id')},
                    limit: first,
                    offset: offset
                })
        }
    },

    Query: {
        posts: (parent, { first = 10, offset = 0}, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    limit: first,
                    offset: offset
                });
        },

        post: (parent, {id}, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.Post
                .findById(id)
                .then((post: PostInstance) => {
                    if(!post) throw new Error(`Post with id ${id} not found!`);
                    return post;
                });
        }
    },

    Mutation: {

        createPost:(parent, {input}, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .create(input, {transaction: t});
            });
        },

        updatePost: (parent, { id, input }, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: PostInstance) => {
                        if(!post) throw new Error(`Post with id ${id} not found!`);
                        return postMutations.update(input, {transaction: t});
                    });
            });
        },

        deletePost: (parent, { id }, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post 
                    .findById(id)
                    .then((post: PostInstance) => {
                        if(!post) throw new Error(`Post with id ${id} not found!`);
                        return post.destroy({transaction: t})
                            .then(post => !!post);
                    });
            });
        }
    }
}