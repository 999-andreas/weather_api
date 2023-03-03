import mongoose from "mongoose";

export default mongoose.model('weather', {
    date: String,
    maxT: Number,
    minT: Number,
    RH1: Number,
    RH2: Number,
    wind:Number,
    rain:Number,
    radiation: Number

});

