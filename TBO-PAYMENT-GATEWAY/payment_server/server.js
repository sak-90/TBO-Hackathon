require('dotenv').config()
const express=require('express')
const app=express()
const cors=require("cors")
app.use(cors({
    origin:"http://localhost:5500",
}))
app.use(express.json())

const stripe=require('stripe')(process.env.
    STRIPE_PRIVATE_KEY)
    const storeItems=new Map([[1,{priceInCents:10000,name:"Doctor's Appointment Fees"}],
                              [2,{priceInCents:2000,name:"Hospital fees"}],
                            ])
    app.post('/create-checkout-session',async (req,res)=>{
       try{
        const session=await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            line_items:req.body.items.map(item=>{
                const storeItem=storeItems.get(item.id)
                return {
                    price_data:{
                        currency:'usd',
                        product_data:{
                            name:storeItem.name
                        },
                        unit_amount:storeItem.priceInCents
                    },
                    quantity:item.quantity
                }

            }),
            success_url:`${process.env.CLIENT_URL}/success.html`,
            cancel_url:`${process.env.CLIENT_URL}/failure.html`,
        })
        res.json({url:session.url})
       }
        catch(e){
            res.status(500).json({error:e.message})
        }
    })
    app.listen(3000)