import express from "express";
import motivationModel from "../models/weather.js";

const Router = express.Router();

/*const motivates = [
    "It's a good day to dev",
    "Belle journée à vous !",
    "Et encore un problème de résolu !"
];*/

const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
      return next();
    } else {
      res.status(403).send('Forbidden');
    }
  };

/*il faudra un autre middlewear pour tester la correspodance avec la clé, jsp comment je peux tester ça */


// a new weather entry
Router.post('/', async(request, response) => {
    const { temp,hum } = request.body;


    /*if (label == null || label == "") {
        return response.status(502).json({msg: "Donnée non conforme"});
    }*/ //faire les test 

    try {
        const motivation = new motivationModel({
            temp: temp,
            hum: hum
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
Router.put('/update/:id', isAdmin, async(request, response) => {
    let {id} = request.params;
    const { temp,hum } = request.body;

    
    try{
        const motivation = await motivationModel.findByIdAndUpdate(id, {
            temp: temp,
            hum: hum
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
Router.delete('/delete/:id', isAdmin, async(request, response) => {
    let {id} = request.params;

    await motivationModel.findByIdAndDelete(id);
    /*await motivationModel.findOneAndDelete({
        _id: id
    });*/

    return response.status(200).json({msg: "enregistrement bien supprimé"});
});

//find an entry by its date
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
        let motivate = await motivationModel.find({temp: {$gt:request.params.temp} });
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});

Router.get('/colder/:temp', async (request, response) => {

    try{
        let motivate = await motivationModel.find({temp: {$lt:request.params.temp} });
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});

/*
Router.get('/rain', async (request, response) => {

    try{
        let motivate = await motivationModel.find({rain: {$gt: 0.0 } });
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});*/

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
        let motivate = await motivationModel.find().sort({ temp: -1 }).limit(1);
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});

Router.get('/coldest', async (request, response) => {

    try{
        let motivate = await motivationModel.find().sort({ temp: 1 }).limit(1);
        return response.status(200).json(motivate);
    }catch(error)
    {
        return response.status(500).json({msg: error});
    }
});


export default Router;