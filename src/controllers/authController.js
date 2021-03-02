const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const form = require("../helpers/form");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  signUp: (req, res) => {
    const { body } = req;

    const saltRounds = Math.floor(Math.random() * 10) + 1;
    bcrypt.hash(body.password, saltRounds, (err, hashPassword) => {
      const newBody = {
        ...body,
        password: hashPassword,
      };

      prisma.users
        .create({
          data: newBody,
        })
        .then((data) => {
          form.success(res, data, 200);
        })
        .catch((error) => {
          form.error(res, error, 500);
        });
    });
  },

  signIn: (req, res) => {
    const { body } = req;
    prisma.users
      .findFirst({
        where: {
          OR: [{ email: body.email }, { username: body.username }],
        },
      })
      .then((data) => {
        if (!data) {
          form.error(res, "Users are not available on our records", 404);
        } else {
          const isValid = bcrypt.compareSync(body.password, data.password);
          if (isValid) {
            const payload = {
              id: data.id,
              name: data.name,
              username: data.username,
              email: data.email,
            };

            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn : 86400
            });

            delete data.password;

            const newData = {
                ...data,
                token: token
            }

            form.success(res, newData, 200);

          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
