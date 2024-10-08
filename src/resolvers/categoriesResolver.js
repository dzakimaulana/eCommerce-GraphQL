const { Categories } = require('../config/db');

const categoryResolver = {
  Query: {
    allCategories: async () => {
      try {
        return await Categories.findAll();
      } catch (error) {
        throw new Error("Error when get all categories");
      }
    }
  },
  Mutation: {
    addCategory: async (_, { name }) => {
      try {
        await Categories.create({ name });
        return {
          success: true,
          message: "Success add category"
        };
      } catch (error) {
        throw new Error("Error get name category");
      }
      
    },
    updateCategory: async (_, { id, name }) => {
      try {
        const category = await Categories.findByPk(id);
        
        if (!category) {
          return {
            success: false,
            message: "Cateogry not found"
          };
        }

        if (name !== undefined) category.name = name;
        await category.save();

        return {
          success: true,
          message: "Success update category"
        };
      } catch (error) {
        throw new Error("Error update category");
      }
      
    },
    deleteCategory: async (_, { id }) => {
      try {
        const category = await Categories.findByPk(id);

        if (!category) {
          return {
            success: false,
            message: "Cateogry not found"
          };
        }

        await category.destroy();

        return {
          success: true,
          message: "Success delete category"
        };
      } catch (error) {
        throw new Error("Error delete category");
      }
    }
  },
  Product: {
    category: async (parent) => {
      const category = await Categories.findByPk(parent.categoryId);
      if (!category) {
        return null;
      }
      return category.name;
    }
  }
}

module.exports = categoryResolver;



