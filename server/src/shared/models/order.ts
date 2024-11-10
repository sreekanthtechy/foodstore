import {model,Schema} from 'mongoose';

export interface IOrder{
    products:ILineItems[],
    user_id:string;
    name:string;
    email:string;
    address:string;
    city:string
}
export interface ILineItems{

    price_data:IPriceData,
    quantity:number
}
export interface IPriceData{
    currency:string;
    product_data:IProductData,
    unit_amount:number
}
export interface IProductData{
    name:string
}
export const ProductDataScheama=new Schema({
    name:{
        type:String,
        required:true
    }
})

export const PriceSchema=new Schema({
    currency:{
        type:String,
        required:true
    },
    unit_amount:{
        type:Number,
        required:true
    },
    product_data:{
        type:ProductDataScheama,
        required:true
    }
})

export const ProductSchema=new Schema({
    quantity:{
        type:Number,
        required:true
    },
    price_data:{
        type:PriceSchema,
        required:true
    }
})
export const OrderSchema=new Schema<IOrder>({
    products:{
        type:[ProductSchema],
        required:true
    },
    user_id:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
},
{
    toObject:{
        virtuals:true
    },
    toJSON:{
        virtuals:true
    },
    timestamps:true
}

)

export const OrderModel=model("orders",OrderSchema)