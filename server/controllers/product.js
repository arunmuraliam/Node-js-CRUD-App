import Product from "../models/Product.js";

export const productReg = async (req, res, next) => {
    try {
        const productDetails = req.body;
        if (!productDetails.productName || !productDetails.productCategory || !productDetails.productPrice || !productDetails.userid) {
            return res.status(404).json({ "status": false, "message": "Please enter all fields" });
        } else {
            const newProduct = Product({
                productName: productDetails.productName,
                productCategory: productDetails.productCategory,
                productPrice: productDetails.productPrice,
                userid:productDetails.userid,
            })

            await newProduct.save();
            res.status(200).json({message:"Product added", ...newProduct._doc});
        }
    } catch (error) {
        next(error);
    }
}

export const findProduct = async (req, res, next) => {
    try {
        const userid = req.params.id;

        const filter = { userid: userid };
        let products = await Product.aggregate([
          { $match: filter }
        ]);
        //console.log(products);
        if (products.length === 0) {
            return res.status(404).json({ status: false, message: "No products" });
        } else {
            return res.status(200).json({ products });
        }
        
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const productid = req.params.id;

        await Product.deleteOne({ _id: productid })
        .then(
            function () {
                return res.status(200).json({  message: "Product deleted successfully" });
            }
        )
        .catch(function(err) {
            return res.status(404).json({ status: false, message: "Product not found", error: err });
        } )
        
    } catch (error) {
        next(error);
    }
}