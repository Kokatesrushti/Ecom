
const priceDiscount=(sellingPrice,price)=>{
return Math.floor(((price-sellingPrice)/price)*100)
}



export default priceDiscount