const { find, findOne, create, deleteOne, updateOne } = require('../utils/connectors')



module.exports = {
    addProduct: async (req, res) => {
        try {
            const { name, price, category, stock } = req.body.data
            const [existingCategoryResponse, existingProductResponse] = await Promise.all(
                [findOne("Category", { categoryId: category }), findOne("Product", { name })]
            )
            if (existingProductResponse?.data) {
                return res.status(400).json({ message: "Product already exists" })
            }
            if (!existingCategoryResponse?.data) {
                return res.status(400).json({ message: " Category doesn't exist" })
            }
            const response = await create('Product', { name, price, stock, category })
            res.status(201).json({ response })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Error creating product' })
        }
    },
    findProduct: async (req, res) => {
        try {
            const response = await findOne("Product", { name: req.body.name })
            res.status(200).send(response.data)

        } catch (error) {
            console.error(error)
            res.status(error.response?.status || 500).send({ error: error.message })

        }
    },
    findAllProducts: async (req, res) => {
        try {
            const response = await find("Product")
            res.status(200).send(response.data)


        } catch (error) {
            console.error(error)
            res.status(error.response?.status || 500).send({ error: error.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const name = req.body.data
            if (!name) {
                return res.status(400).json({ message: "Product name is required" })
            }
            const response = await deleteOne("Product", name)
            if (response) {
                return res.status(200).json({ message: "Product deleted successfully", data: response })
            } else {
                return res.status(400).json({ message: "Product not found" })
            }
        } catch (error) {
            console.error("Error in deleting product:", error)
            return res.status(500).json({ error: "An error occurred while deleting product" })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const filterName = req.body.name
            if (!filterName) {
                return res.status(400).json({ message: "Product name is required" })
            }
            const { name, price, stock, category } = req.body
            const filter = { name: filterName };


            const existingProduct = await findOne("Product", filter);
            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            const response = await updateOne("Product", filter, { name, price, stock, category })
            if (!response) {
                return res.status(400).json({ message: "failed to update product" })
            }
            return res.status(200).json({ message: "Product updated successfully", data: response })


        } catch (error) {
            console.error("Error in updating product:", error.message || error)
            return res.status(500).json({ error: "An unexpected error occurred " })
        }
    }

}