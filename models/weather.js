import mongoose from "mongoose";

export default mongoose.model('weather', {
    date: Date,
    maxT: Number,
    minT: Number,
    RH1: Number,
    RH2: Number,
    wind:Number,
    rain:Number,
    radiation: Number
});

/*peut etre rajouter une partie meta pour mettre la date d'ajout de l'enregistrement et le user qui l'a entre*/
