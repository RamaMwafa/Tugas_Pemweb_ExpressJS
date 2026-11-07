let products = [
  { id: 1, name: "Buku", price: 15000 },
  { id: 2, name: "Pulpen", price: 5000 },
];

exports.getAllProducts = (req, res) => {
  res.status(200).json(products);
};

exports.getProductById = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "produk tidak ditemukan" });
  }
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;

  // Logika membuat ID baru (auto-increment sederhana)
  const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const newProduct = {
    id: newId,
    name: name,
    price: price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex) {
    const { name, price } = req.body;
    products[productIndex] = { id: productId, name, price };
    res.status(200).json(products[productIndex]);
  } else {
    res.status(404).json({ message: "produk tidak ditemukan" });
  }
};

exports.deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex) {
    products.splice(productIndex, 1);
    res.status(200).json({ message: "produk berhasil dihapus" });
  } else {
    res.status(204).json({ message: "produk tidak ditemukan" });
  }
};
