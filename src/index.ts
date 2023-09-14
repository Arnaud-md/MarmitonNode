import express from "express";
import 'dotenv/config';
import {Recipe} from './seqconfig'

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3030

app.get('/random-between/:min/:max', (req, res) => {
    const min = parseInt(req.params.min)
    const max = parseInt(req.params.max)
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    console.log('number' + random);
    res.send(random.toString())
})

app.post('/saveRecipe/:nom/:image/:duree/:note', (req, res) => {
    const nom = req.params.nom;
    const image = req.params.image;
    const duree = parseInt(req.params.duree);
    const note = parseInt(req.params.note);
    Recipe.create({
        nom: nom,
        image : image,
        duree : duree,
        note : note
    });
    res.send(nom+image+duree+note)
})

app.get('/findAll', async(req, res) => {
    const allRecipes = await Recipe.findAll();
    res.status(200).send(JSON.stringify(allRecipes));
})

app.listen(port, () => {
    console.log('serveur running on port : ' + port);
})