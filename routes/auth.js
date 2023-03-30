import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const Router = express.Router();

Router.post('/login', (req, res) => {
    const {email, password} = req.body;

    if (email == "admin" && password == process.env.ADMIN_PASSWORD) {
        req.session.isAdmin = true;
        return res.status(200).json(req.session.isAdmin);
    }

    return res.status(500).json({msg: "Il y a eu une erreur lors de l'authentification !"});
});

Router.get('/me', (req, res) => {
    if (req.session.user) {
        return res.status(200).json(req.session.user);
    }

    return res.status(500).json({msg: "Vous n'est pas connecté !"});
})

Router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy();
    }

    return res.status(200).json({msg: "Vous est déconnecté !"});
})


/*ici il faudrait faire une autre collection pour avoir la liste des utilisateur
après on test au login si il existe, et on leur donne leur "clé" d'accès à leur collection de donnée*/

export default Router;