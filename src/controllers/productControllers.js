const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const form = require("../helpers/form");

module.exports = {
  getProducts: (req, res) => {
    prisma.products
      .findMany({})
      .then((data) => {
        form.success(res, "Success Get All Products", 200, data);
      })
      .catch((error) => {
        form.error(res, "Error Network", 500, error);
      });
  },

  getProductById: (req, res) => {
    const { id } = req.params;
    prisma.products
      .findUnique({
        where: {
          id: parseInt(id),
        },
      })
      .then((data) => {
        if (!data) {
          form.error(res, "Get Book is Error", 404, "Data not found");
        } else {
          form.success(res, "Success Get Book", 200, data);
        }
      })
      .catch((error) => {
        form.error(res, "Error Network", 500, error);
      });
  },

  postProduct: (req, res) => {
    const { body } = req;
    console.log("FILE ", req.file);

    const newBody = {
      ...body,
      price: parseInt(body.price),
      image: req.file.path,
    };

    prisma.products
      .create({
        data: newBody,
      })
      .then((data) => {
        form.success(res, "Create New Product is Successful", 200, data);
      })
      .catch((error) => {
        form.error(res, "Error Network", 500, error);
      });
  },

  putProducts: (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const newBody = {
      ...body,
      price: parseInt(body.price),
    };

    prisma.products
      .update({
        data: newBody,
        where: {
          id: parseInt(id),
        },
      })
      .then((data) => {
        form.success(res, "Update Book is Successful", 200, data);
      })
      .catch((error) => {
        form.error(res, "Error Network", 500, error);
      });
  },

  deleteProduct: (req, res) => {
    const { id } = req.params;
    prisma.products
      .delete({
        where: {
          id: parseInt(id),
        },
      })
      .then((data) => {
        form.success(res, "Delete Book is Successful", 200, data);
      })
      .catch((error) => {
        form.error(res, "Error Network", 500, error);
      });
  },
};
