import express from 'express'
//import { isAdmin, isAuth } from '../utils'
import Category from '../models/categoryModel'
import asyncHandler from 'express-async-handler'


const categoryRouter = express.Router()


categoryRouter.post(
    '/new',
    asyncHandler(async(req, res)=> {
        const newCategory = new Category({
            name: req.body.name,
            products: req.body.products
        })
        await newCategory.save()
        res.status(200).send('new category added')
    })
)

categoryRouter.get(
    '/list',
    asyncHandler(async(req, res)=> {
        const categories = Category.find()
        res.send(categories)
    })
)
