import express, { Request } from "express";
import 'dotenv/config';
import {Recipe} from './seqconfig';
import bodyParser from "body-parser";
import { IntegerDataType } from "sequelize";
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3030

interface IMaRequetBody {
    nom: string,
    image: string,
    duree: IntegerDataType,
    note: IntegerDataType
  }
  
  app.post("/send-recipe", (req, res) => {
    const nom = req.body.nom;
    const image = req.body.image;
    const duree = req.body.duree;
    const note = req.body.note;
    const maRecette = { nom, image ,duree, note }
    console.log(maRecette);
    Recipe.create(maRecette);
    res.json(maRecette);
  })

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
    const myRecipe = {
        nom: nom,
        image : image,
        duree : duree,
        note : note
    };
    Recipe.create(myRecipe);
    res.send(myRecipe);
})

app.get('/findAll', async(req, res) => {
    const allRecipes = await Recipe.findAll();
    res.status(200).send(JSON.stringify(allRecipes));
})

app.listen(port, () => {
    console.log('serveur running on port : ' + port);
})