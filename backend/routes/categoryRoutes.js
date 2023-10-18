import express  from "express";
import expressAsyncHandler from 'express-async-handler';
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import { isAdmin, isAuth } from "../utils.js";


const categoryRouter = express.Router()


categoryRouter.get('/', async(req, res)=> {
    const categories = await Category.find()
    res.send(categories)
})

categoryRouter.get(
  '/:id',
  expressAsyncHandler(async(req, res)=> {
    const category = await Category.findById(req.params.id)
    if(category){
      res.send(category)
    }else{
      res.send({message: "category not found"})
    }
  })
)

categoryRouter.post(
    '/create',
    //isAuth,
    //isAdmin,
    expressAsyncHandler(async(req, res)=> {
      const {name, products, image} = req.body

      ///empty array
      const productsArray = []

      //for loop
      for(const productId of products){
        const product = await Product.findById(productId)

        if(product){
            productsArray.push({
                slug: product.slug,
                sku: product.sku,
                name: product.name,
                price: product.price,
                image: product.image,
                inStock: product.inStock,
                product: product._id
            })
        }


      }
      const newCategory = new Category({
        name: name,
        image: image,
        products: productsArray ///send categories to initialised array
      })

      const category = await newCategory.save()
      if(category){
        res.status(201).send({message: 'Category created successfully'})
      }else{
        res.status(500).send({message: 'unable to create category' })
      }
    })
)



export default categoryRouter;