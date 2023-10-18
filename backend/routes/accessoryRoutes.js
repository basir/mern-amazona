import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Accessory from '../models/accessoryModel.js'
import { isAdmin, isAuth } from '../utils.js'


const accessoryRouter = express.Router()


accessoryRouter.get('/', async(req, res)=> {
    const accessories = await Accessory.find({})
    res.send(accessories)
})

accessoryRouter.get('/names', async(req, res)=> {
    const names = await Accessory.find({}, "name")
    res.send(names)
})

accessoryRouter.get(
    '/slug/:slug',
    expressAsyncHandler(async(req, res)=> {
        const accessory = await Accessory.findById(req.params.slug)
        if(accessory){
            res.send(accessory)
        }else{
            res.send({message: 'Accessory not found'})
        }
    })
)
accessoryRouter.post(
    '/create',
    expressAsyncHandler(async(req, res)=> {
        const {accessoryName, accessoryPrice, image, accessoryCategory, accessoryInstock} = req.body
        try{
            const newAccessory = new Accessory({
                name: accessoryName,
                price: accessoryPrice,
                slug: accessoryName.toLowerCase().replace(/ /g, '-'),
                inStock: accessoryInstock,
                photo: image,
                category: accessoryCategory
            })
            const accessory = await newAccessory.save()
            res.send(accessory)
        }catch(error){
            console.log(error)
        }
    })
)

accessoryRouter.delete(
    '/delete/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res)=> {
        const accessory = await Accessory.findById(req.params.id)
        if(accessory){
            await accessory.remove()
            res.send({message: 'accessory deleted'})
        }else{
            res.status(404).send({message: 'accessory not found'})
        }
    })
)

accessoryRouter.put(
    '/update/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res)=> {
        const {name, price, inStock, photo, category} = req.body;
        const accessory = await Accessory.findById(req.params.id)
        if(accessory){
            accessory.name = name;
            accessory.price = price;
            accessory.inStock = inStock;
            accessory.photo = '/images/card.png';
            accessory.category = category;

            await accessory.save()
            res.send({message: 'updated succesfully'})
        }else{
            res.status(404).send({message: 'Accessory not found'})
        }
    })
)


export default accessoryRouter