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
Router.get('/:id', async (request, response) => {
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
Router.put('/:id', async (request, response) => {
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
Router.delete('/:id', async (request, response) => {
    let {id} = request.params;

    await motivationModel.findByIdAndDelete(id);
    /*await motivationModel.findOneAndDelete({
        _id: id
    });*/

    return response.status(200).json({msg: "enregistrement bien supprimé"});
});

// get an entry by its date
Router.get('/date/:date', async (request, response) => {

    try{
        let motivate = await motivationModel.findOne({date: request.params.date});

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



/*faire une route pour avoir un certain jour //
une route pour avoir tout les jours au dessus d'une temperature //
une route pour en dessous d'une temperature (est que je pourrais commbiner les route de temperature?) //
une route pour avoir une seule année 
(une route pour avoir un certain moi (toute année confondue))pas beaucou de sens
une route pour avoir un certain moi d'une certaine année
une route pour les jours de pluie
route pour le max et le min overall 
une route pour le dernier enregistrement

mettre la date en format Date pour que ça soit plus facile a manip
faire tout les blindages
peut etre implementer plusieurs station meteo
peut etre faire une collection par station
systeme d'utilisateur ou plutot de station meteo
*/


export default Router;