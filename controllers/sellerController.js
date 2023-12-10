const createCatalog = async (req, res) => {
  try {
    const u1 = req.user;
    res.send(u1);
  } catch (error) {}
};

module.exports = { createCatalog };
