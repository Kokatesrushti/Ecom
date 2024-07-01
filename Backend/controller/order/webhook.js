const stripe = require('../../config/stripe');
const orderModel = require('../../models/orderProductModel');
const cartModel = require('../../models/cartProduct');

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

async function getLineItems(lineItems){
    let ProductItems =[]

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId
            const productData={
                productId : productId,
                price : item.price.unit_amount / 100,
                quantity : item.quantity,
                name : product.name,
                image : product.images 
            }
            ProductItems.push(productData)
        }
    }
    return ProductItems
}

const webhook =async(req,res)=>{

    const sig = req.headers['stripe-signature'];
    let event;

    const payload = JSON.stringify(req.body)
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payload,
        secret: endpointSecret
      });

    try {
      event = stripe.webhooks.constructEvent(payload, header, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;

          const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
          
          const productDetails = await getLineItems(lineItems)
          const orderDetails ={
            productDetails:productDetails,
            email:session.customer_email,
            userId:session.metadata.userId,
            productImage:session.metadata.productImage,
            paymentDetails:{
                   paymentId:session.payment_intent,
                   payment_method_type :session.payment_method_types,
                   payment_status : session.payment_status,
                },
            shipping_options : session.shipping_options.map(s=>{ 
                return{...s,shipping_amount : s.shipping_amount / 100}
            }),
            totalAmount : session.amount_total / 100,
          }

        const order = new orderModel(orderDetails)
        const saveOrder = await order.save()
        if(saveOrder?._id){

          const deleteproduct = await cartModel.deleteMany({userId : session.metadata.userId ,productId : productDetails[0].productId})

        }
        
        break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

    res.status(200).send();
}

module.exports = webhook