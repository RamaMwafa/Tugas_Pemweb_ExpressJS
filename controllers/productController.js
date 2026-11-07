const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (product) return res.status(200).json(product);
    res.status(404).json({ message: "Produk tidak ditemukan" });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = await prisma.product.create({
      data: { name, price },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "Gagal membuat produk, periksa input Anda" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    // Sesuai instruksi, mengambil ID dari body
    const { id, name, price } = req.body;

    if (!id) return res.status(400).json({ error: "ID wajib disertakan di body" });

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: "Produk tidak ditemukan atau gagal diupdate" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ error: "Produk tidak ditemukan" });
  }
};
