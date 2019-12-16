import { GraphQLResolveInfo } from "graphql";
import { Transaction } from 'sequelize';

import { DBConnection } from '../../../interfaces/DBConnectionInterface';

export const commentResolvers = {

    Comment: {

        user: (comment, args, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.User
                .findById(comment.get('user'));
        },

        post: (comment, args, {db}: {db:DBConnection}, info: GraphQLResolveInfo) => {
            return db.Post
                .findById(comment.get('post'));
        }
    },

    Query: {

        commentByPost: (parent, {postId, first = 10, offset = 0}, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.Comment
                .findAll({
                    where: {post: postId},
                    limit: first,
                    offset: offset
                });
        }
    }
}