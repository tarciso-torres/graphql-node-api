import { GraphQLResolveInfo } from "graphql";
import { Transaction } from 'sequelize';

import { DBConnection } from '../../../interfaces/DBConnectionInterface';
import { CommentInstance } from "../../../models/CommentModel";
import { handleError } from "../../../utils/utils";

export const commentResolvers = {

    Comment: {

        user: (comment, args, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.User
                .findById(comment.get('user'))
                .catch(handleError);
        },

        post: (comment, args, {db}: {db:DBConnection}, info: GraphQLResolveInfo) => {
            return db.Post
                .findById(comment.get('post'))
                .catch(handleError);
        }
    },

    Query: {

        commentsByPost: (parent, {postId, first = 10, offset = 0}, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            postId = parseInt(postId);
            return db.Comment
                .findAll({
                    where: {post: postId},
                    limit: first,
                    offset: offset
                })
                .catch(handleError);
        }
    }, 

    Mutation: {
        createComment: (parent, input, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .create(input, {transaction: t});
            }).catch(handleError);
        },

        updateComment: (parent, {id, input}, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        if(!comment) throw new Error(`Comment with id ${id} not found!`);
                        return comment.update(input, {transaction: t});
                    });
            }).catch(handleError);
        },

        deleteComment: (parent, {id, input}, {db}: {db: DBConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        return comment.destroy({transaction: t})
                            .then(comment => !!comment);
                    });
            }).catch(handleError);
        }
    }
}