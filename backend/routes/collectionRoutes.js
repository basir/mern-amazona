import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import  Collection  from '../models/collectionModel.js'
import { isAdmin, isAuth } from '../utils.js'


const collectionRouter = express.Router()


collectionRouter.get('/', async(req, res)=> {
    const collections = await Collection.find()
    res.send(collections)
})


collectionRouter.post(
    '/create',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res)=>{
        const {collectionName, categories, photo } = req.body

    })
)
export default collectionRouter