const Products = require('../models/products')

const getAllProductsStatic = async (req, res) => {
    const products = await Products.find({})
    res.status(200).json({ products })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilter } = req.query
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

    if (numericFilter) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<=': '$lte',
            '<': '$lt'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filter = numericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const option = ['price', 'rating']
        filter = filter.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryOject[field] = { [operator]: Number(value) }
            }
        })
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


    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result

    res.status(200).json({ products })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}