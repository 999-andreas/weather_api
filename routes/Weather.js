import express from "express";
import motivationModel from "../models/weather.js";

const Router = express.Router();

/*const motivates = [
    "It's a good day to dev",
    "Belle journée à vous !",
    "Et encore un problème de résolu !"
];*/


// a new weather entry
Router.post('/', async (request, response) => {
    const { date,maxT,minT,RH1,RH2,wind,rain,radiation } = request.body;


    /*if (label == null || label == "") {
        return response.status(502).json({msg: "Donnée non conforme"});
    }*/ //faire les test 

    try {
        const motivation = new motivationModel({
            date: date,
            maxT: maxT,
            minT: minT,
            RH1: RH1,
            RH2: RH2,
            wind: wind,
            rain: rain,
            radiation: radiation 
        });
        
        await motivation.save();

        return response.status(200).json(motivation);
    } catch(error) {
        return response.status(500).json({msg: error});
    }
});

//get all the weather entries
Router.get('/', async (request, response) => {
    try{
    let motivates = await motivationModel.find();

    return response.status(200).json(motivates);
    }catch(error){
        return response.status(500).json({msg: error});

    }
});

//get one entry by its id
Router.get('/find/:id', async (request, response) => {
    let {id} = request.params;

    /*if(typeof(id) != "number")
    {
        return response.status(502).json({msg: "Donnée non conforme"});
    }*/

    try{
        let motivate = await motivationModel.findById(id);

        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }

});

//update an entry by its id
Router.put('/update/:id', async (request, response) => {
    let {id} = request.params;
    const { date,maxT,minT,RH1,RH2,wind,rain,radiation } = request.body;

    
    try{
        const motivation = await motivationModel.findByIdAndUpdate(id, {
            date: date,
            maxT: maxT,
            minT: minT,
            RH1: RH1,
            RH2: RH2,
            wind: wind,
            rain: rain,
            radiation: radiation 
        }, {
        new: true
        });

        return response.status(200).json(motivation);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
    
});

//delete an entry by its id
Router.delete('/delete/:id', async (request, response) => {
    let {id} = request.params;

    await motivationModel.findByIdAndDelete(id);
    /*await motivationModel.findOneAndDelete({
        _id: id
    });*/

    return response.status(200).json({msg: "enregistrement bien supprimé"});
});

Router.get('/date/:date', async (request, response) => {
    var date = new Date(request.params.date);
    console.log(date);

    try{
        let motivate = await motivationModel.findOne({date: date});

        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }

});

Router.get('/hotter/:temp', async (request, response) => {

    try{
        let motivate = await motivationModel.find({maxT: {$gt:request.params.temp} });
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});

Router.get('/colder/:temp', async (request, response) => {

    try{
        let motivate = await motivationModel.find({minT: {$lt:request.params.temp} });
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});

Router.get('/rain', async (request, response) => {

    try{
        let motivate = await motivationModel.find({rain: {$gt: 0.0 } });
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});

Router.get('/year/:annee', async (request, response) => {

    const annee = request.params.annee;

    // création de la date de début et de fin pour l'année donnée
    /*
    const dateDebut = new Date(annee, 0, 1);
    const dateFin = new Date(annee, 11, 31);
    console.log(dateDebut);
    console.log(dateFin);*/


    try{
        let motivate = await motivationModel.find({date: { $gte: new Date(annee, 0, 1), $lte: new Date(annee, 11, 31) }});
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});

Router.get('/last-30', async (request, response) => {

    try{
        let motivate = await motivationModel.find().sort({ _id: -1 }).limit(30);
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});

Router.get('/hottest', async (request, response) => {

    try{
        let motivate = await motivationModel.find().sort({ maxT: -1 }).limit(1);
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});

Router.get('/coldest', async (request, response) => {

    try{
        let motivate = await motivationModel.find().sort({ minT: 1 }).limit(1);
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});


/*faire une route pour avoir un certain jour //
une route pour avoir tout les jours au dessus d'une temperature //
une route pour en dessous d'une temperature (est que je pourrais commbiner les route de temperature?) //
une route pour avoir une seule année //
(une route pour avoir un certain moi (toute année confondue))pas une prio
une route pour avoir un certain moi d'une certaine année pas une prio
une route pour les jours de pluie //
route pour le max et le min overall //
une route pour le dernier enregistrement // j'ai fait les 30 derniers

faire tout les blindages 
peut etre implementer plusieurs station meteo
peut etre faire une collection par station
systeme d'utilisateur ou plutot de station meteo :
-faire en sorte qu'on puisse pas tous crée des enregistrement et update
faire en sorte que quand on fait une recherche ça soit toujours dans l'ordre chrononogique // je crois que ca le fait tout seule 
faire en sorte que je soit pas obligé de mettre des sous route truc la : '/truc/recherche'
*/


export default Router;