const Products = require('../models/products')

const getAllProductsStatic = async (req, res) => {
    const products = await Products.find({})
    res.status(200).json({ products })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query
    const queryOject = {}

    if (featured) {
        queryOject.featured = featured === 'true' ? true : false
    }

    if (company) {
        queryOject.company = company
    }

    if (name) {
        queryOject.name = { $regex: name, $options: 'i' }
    }

    let result = await Products.find(queryOject).sort()
    
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const products = await result

    res.status(200).json({ products })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}