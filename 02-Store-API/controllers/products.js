const Products = require('../models/products')

const getAllProductsStatic = async (req, res) => {
    const products = await Products.find({})
    res.status(200).json({ products, lenght: products.length })
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
            '<': '$lt',
            '<=': '$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filter = numericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filter = filter.split(',').forEach((item) => { 
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryOject[field] = { [operator]: Number(value) }
            }
        })
    }

    let result = await Products.find(queryOject).sort()

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skipItems = (page - 1) * limit

    if (sort || fields) {
        if (sort && fields) {
            const sortList = sort.split(',').join(' ')
            const fieldsList = fields.split(',').join(' ')
    
            result = await Products.find(queryOject).sort(sortList).select(fieldsList).skip(skipItems).limit(limit)
        } else if (sort && !fields) {
            const sortList = sort.split(',').join(' ')
            result = await Products.find(queryOject).sort(sortList).skip(skipItems).limit(limit)
        } else if (!sort && fields) {
            const fieldsList = fields.split(',').join(' ')
            result = await Products.find(queryOject).select(fieldsList).skip(skipItems).limit(limit)
        }
    } else {
        result = await Products.find(queryOject).sort('createdAt').skip(skipItems).limit(limit)
    }

    const products = await result

    res.status(200).json({ products, length: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}