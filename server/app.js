import express from 'express';
import { 
    getCanciones, 
    getCancionesById,
    createCanciones,
    deleteCanciones,
    updateCanciones, 
} from "./database.js";
import cors from "cors";

// sirve para no hacer muchas REQUEST "hacerlo privada"
const corsOptions = {
    origin: "http://192.168.33.10:8080",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credential: true,  // cookies, authorization
};

// utilizar la app
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Mensaje extra
console.log ("Hola, Manuel Buen dia");

// PUERTO
app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080')
});

//REQUEST  CANCIONES ---------------------------------  
// TOMAR TODAS LA CACNIONES
app.get("/canciones/", async (req, res) => {
    const canciones = await getCanciones();
    res.status(200).send(canciones);
});

// TOMAR UNA CACION POR EL ID 
app.get("/canciones/:id" , async (req, res) => {
    const canciones = await getCancionesById(req.params.id);
    res.status(200).send(canciones);
});

// actualizar  
app.put('/canciones/:id', async (req, res) => {
    const { id, titulo, artista, album} = req.body;
    const cancion = await updateCanciones(id, titulo, artista, album);
    res.status(200).send(cancion);
});

// Eliminar 
app.delete("/canciones/:id", async (req, res) => {
    await deleteCanciones(req.params.id);
    res.send({ message: "Cancion elimindado" });
});

// creear  
app.post("/cancion", async (req, res) => {
    const { titulo, artista, album, user_id } = req.body;
    const canciones = await createCanciones(titulo, artista, album, user_id);
    res.status(201).send(canciones);
});
