import mongoose from "mongoose";


const listingSchema = new mongoose.Schema({
   name: 
   {
    type: String,
    require: true
   },
   description:
   {
    type:String,
    require:true
   },
   address:
   {
    type:String,
    require: true
   },
   regularRate:
   {
    type: Number,
    require: true,
   },
   discountPrice:
   {
    type: Number,
    require: true,
   },
   bedrooms:
   {
    type:Number,
    require: true
   },
   furnished:
   {
    type:Number,
    reqired: true,
   },
   parking:
   {
    type:Boolean,
    required:true,
   },
   type:
   {
    type: String,
    required: true,
   },
   offer:
   {
    type:Boolean,
    required: true,
   },
   imageUrls:
   {
    type: Array,
    required: true,
   },
    userRef:
    {
        type: String,
        required: true,
    },




},{timestamps: true})



const Listing = mongoose.model('Listing', listingSchema)

export default Listing