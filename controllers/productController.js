const Product = require('../models/product');


const parseSortParam = (sort) => {
  const [field, order] = sort.split(':');
  return { [field]: order === 'desc' ? -1 : 1 };
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10, sort } = req.query;

    let query = {};
    let sortBy = {};

    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filter
    if (category) {
      query.categories = category;
    }

    // Sorting
    if (sort) {
      sortBy = parseSortParam(sort);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortBy)
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      products,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductBySKU = async (req, res, next) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

