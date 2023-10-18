import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin, mailgun, payOrderEmailTemplate } from '../utils.js';
import Stripe from 'stripe';
//import dotenv from 'dotenv'

//dotenv.config()

const orderRouter = express.Router();

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      timeslot: req.body.timeslot,
      deliveryDate: req.body.deliveryDate,
      orderNotes: req.body.orderNotes,
      deliveryMessage: req.body.deliveryMessage,
      codes: req.body.code,  
      surprise: req.body.surprise,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/config',
  isAuth,
  expressAsyncHandler(async(req, res)=> {
    const publishableKey = process.env.pk_test
    res.send(publishableKey)

  })
)

//const amountInCents = (amount) => Math.round(amount * 100);

orderRouter.post(
  '/intent',
  expressAsyncHandler(async(req, res)=> {
    const stripe = Stripe(process.env.sk_test)
    
    try{
      const {totalPrice, orderId} = req.body
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(Math.round(totalPrice * 100)),
        //amount: 1000,
        currency: "aed",
        //payment_method_types: ['card'],
        description: `Payment for ${orderId}`,
        automatic_payment_methods: {enabled: true},
        metadata: {
          order_id: orderId,
        },
      })
      res.send({clientSecret: paymentIntent.client_secret})
      const order = await Order.findById(orderId)
      if(order){
        //console.log(order)
        order.isPaid = true
        order.paidAt = Date.now()

        await order.save()
      }else{
        res.send("Something went wrong")
      }
      //console.log(clientSecret)
    }catch(error){
      //res.send({error: error.message})
      console.log(error)
    }
  })
)

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.send({ message: 'Order Deleted' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;
