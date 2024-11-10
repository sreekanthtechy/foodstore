import {model,Schema} from 'mongoose';

export interface IFood{
    id: string;
      name: string;
      price: number;
      favorite: boolean;
      imageUrl: string;
      tags: string[]
}

export const FoodSchema=new Schema<IFood>({
id:{
    type:String,
    required:true
},
name:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
favorite:{
    type:Boolean,
    required:false
},
imageUrl:{
    type:String,
    required:true
},
tags:{
    type:[String],
    required:false
}
},
{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
}
)

export const FoodModel=model<IFood>('foods',FoodSchema)