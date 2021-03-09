module.exports = {
  success: (res, msg, status, data) => {
    res.status(status).send({
      msg,
      status,
      data,
    });
  },

  error: (res, msg, status, error) => {
    res.status(status).send({
      msg,
      status,
      error
    });
    res.end();
  },
};
