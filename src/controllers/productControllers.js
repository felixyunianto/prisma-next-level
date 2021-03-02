const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const form = require("../helpers/form");

module.exports = {
  getProducts: (req, res) => {
    prisma.products
      .findMany({})
      .then((data) => {
        form.success(res, data, 200);
      })
      .catch((error) => {
        form.error(res, error, 500);
      });
  },

  getProductById : (req, res) => {
    const {id} = req.params
    prisma.products.findUnique({
      where : {
        id: parseInt(id)
      }
    })
    .then((data) => {
      if(!data) {
        form.error(res, "Data not found", 404);
      }else{
        form.success(res, data, 200);
      }
    })
    .catch((error) => {
      form.error(res, error, 500)
    })
  },

  postProduct: (req, res) => {
    const { body } = req;
    
    // console.log(req);

    const newBody = {
      ...body,
      price : parseInt(body.price),
      image : req.file.path
    }

    prisma.products
      .create({
        data: newBody,
      })
      .then((data) => {
        form.success(res, data, 200);
      })
      .catch((error) => {
        form.error(res, error, 500);
      });
  },

  putProducts: (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const newBody = {
      ...body,
      price : parseInt(body.price)
    }

    prisma.products
      .update({
        data: newBody,
        where: {
          id: parseInt(id),
        },
      })
      .then((data) => {
        form.success(res, data, 200);
      })
      .catch((error) => {
        form.error(res, data, 500);
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
        form.success(res, data, 200);
      })
      .catch((error) => {
        form.error(res, error, 500);
      });
  },
};
