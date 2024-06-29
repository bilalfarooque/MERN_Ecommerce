import express from "express";
import Stripe from  "stripe";
import dotenv from 'dotenv';
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_KEY);

const StripeRouter = express.Router()

StripeRouter.post("/payment", (req,res)=>{
    stripe.charges.create({
        source : req.body.tokenId,
        amount : req.body.amount,
        currency : "usd",
    },
(stripeErr, stripeRes)=>{
    if(stripeErr){
        res.status(500).json(stripeErr);
    }else{
        res.status(200).json(stripeRes);
    }
})
})



export default StripeRouter