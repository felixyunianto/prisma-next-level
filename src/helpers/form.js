module.exports = {
  success: (res, data, status) => {
    res.status(status).send({
      msg: "Success",
      status: status,
      data: data,
    });
  },

  error: (res, error, status) => {
    res.status(status).send({
      msg: "Error",
      status: status,
      error: error,
    });
  },
};
