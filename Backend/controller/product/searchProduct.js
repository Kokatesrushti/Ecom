const ProductModel = require("../../models/ProductModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    const regex = new RegExp(query, "i","g");

    const products = await ProductModel.find({
      "$or": [
        {
          brandName: regex
        },
        {
          category: regex
        },
        {
          productName: regex
        },
        {
            description: regex
        }
      ]
    });

    res.json({
      message: "Search products fetched successfully",
      data: products,
      error: false,
      success: true
    });
  } catch (error) {
    res.status(400).json({
      message: error?.message || error,
      error: true,
      success: false
    });
  }
}

module.exports = searchProduct;

// A regular expression is a pattern of characters.

// The pattern is used for searching and replacing characters in strings.

// The RegExp Object is a regular expression with added Properties and Methods.