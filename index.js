//Importamos modulo express
var express = require('express');
var app = express();


// Importamos modulo cors
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api", (req, res) =>{
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const fechaUTC = hoy.toUTCString();
    const fechaUNIX = Math.floor(hoy.getTime());

    res.json({"unix":fechaUNIX,"utc":fechaUTC});

});

//Para devolver la fecha
app.get("/api/:date",(req , res) => {

//Extraemos la fecha en formato YYYY-MM-DD y la convertimos al formato UNIX timestamp
    let fecha = new Date(req.params.date);
    let fechaConvertida = Math.floor(fecha.getTime());

//Comprobamos si la conversion fue exitosa
    if(fecha == "Invalid Date"){
      //Si la conversion fue fallida entonces mandamos un mensaje a consola y asumimos que la fecha esta en formato UNIX timestamp
      console.log("La fecha es invalida para el formato YYYY-MM-DD");

      //Convertimos la fecha de UNIX timestamp a YYYY-MM-DD
      fecha = parseInt(req.params.date);
      fechaConvertida = new Date(fecha);

      //Comprobamos si la conversion timesatm  a yyyy-mm-dd fue exitosa
      if(fechaConvertida === "Invalid Date" || !fecha){
        //Si no es asi enviamos un objeto JSON
        res.json({error : "Invalid Date"})
        console.log("La fecha es invalida para el formato UNIX");
      }else{
        //Enviamos la respuesta del dato convertido de UNIX -> UTC
        res.json({"unix": fecha,"utc":fechaConvertida.toUTCString()})
      }

    }else{
      //Enviamos la respuesta del dato convertido de UTC -> UNIX
      res.json({"unix":fechaConvertida,"utc":fecha.toUTCString()});
    }
});

// Configuramos el puerto

const puerto = process.env.PORT || 3000;
var listener = app.listen(puerto, function () {
  console.log('La app se esta ejecutando en el puerto: ' + listener.address().port);
});
