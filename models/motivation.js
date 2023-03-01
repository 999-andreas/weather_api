import mongoose from "mongoose";

export default mongoose.model('weather', {
    date: String,
    maxT: Float32Array,
    minT: Float32Array,
    RH1: Float32Array,
    RH2: Float32Array,
    wind:Float32Array,
    rain:Float32Array,
    radiation: Float32Array

});

