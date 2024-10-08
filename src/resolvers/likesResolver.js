const { Likes } = require('../config/db');

const likeResolver = {
  Query: {
    likeAProduct: async (_, { productId }) => {
      try {
        return await Likes.findAll({
          where: {
            productId: productId
          }
        });
      } catch (error) {
        throw new Error('Unable to fetch likes for the product');
      }
    }
  },
  Mutation: {
    likeUnlike: async (_, { userId, productId }) => {
      try {
        const like = await Likes.findOne({
          where: {
            userId: userId,
            productId: productId
          }
        });
  
        if (like) {
          await like.destroy();
          return {
            success: true,
            message: 'Unliked successfully'
          };
        } 
  
        await Likes.create({
          userId: userId,
          productId: productId
        });
        return {
          success: true,
          message: 'Liked successfully'
        };
      } catch (error) {
        throw new Error('Error processing like/unlike action');
      }
    }
  },
  Product: {
    likes: async (parent) => {
      try {
        return await Likes.count({
          where: {
            productId: parent.id
          }
        });
      } catch (error) {
        throw new Error('Unable to fetch total likes');
      }
    }
  }
}

module.exports = likeResolver;



