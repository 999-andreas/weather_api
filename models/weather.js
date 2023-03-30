import mongoose from "mongoose";

export default mongoose.model('weather', {
    date: Date,
    temp: Number,
    hum: Number
});

/*peut etre rajouter une partie meta pour mettre la date d'ajout de l'enregistrement et le user qui l'a entre*/
