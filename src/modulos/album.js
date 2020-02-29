const mongoose = require("mongoose");


mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/albumDB", {useNewUrlParser: true});

const albumSchema = new mongoose.Schema({

             
    nombre : {
        type: String,
        require : true,
        unique: [true, "El nombre del album ya se ha utilizado"]
    },
    cant_laminas:{
        type: Number,
        require : true,

    }
});

const Album = mongoose.model("album", albumSchema);

function insertarAlbum(nombreAlbumInst, laminasInst){

    
    let resultadoInst = "";

    const albumInsertar = new Album({
        nombre : nombreAlbumInst,
        cant_laminas : laminasInst
    });

    const [resultado, descripcion] =  validarAlbumExistente(albumInsertar.nombre, albumInsertar.cant_laminas);
    
    if (resultado){
        albumInsertar.save(error =>{
            if (!error){
             resultadoInst = "ok - album registrado";
            }else{
             resultadoInst = "error - Error durante el registro del album : " + error
            }
        }) 

    }else{

        resultadoInst = descripcion;

    } 
    
   return resultadoInst
}


function validarAlbumExistente(albumNombreVal, laminasVal){

    let resultado = {
    resultadoValidacion : "",
    insertarAlbum : false
    }
    
    Album.findOne({nombre : albumNombreVal, cant_laminas : laminasVal}, function(error, resultados){
        if(!error){
            if(resultados){
                resultado.resultadoValidacion = "error - ya existe un album con el nombre suministrado";
            }else{
                resultado.insertarAlbum = true;
                resultado.resultadoValidacion = "ok";              
            }
        }else{
            resultado.resultadoValidacion = "error - Error en la validación del album: " + error;
        }
       
       });
       return resultado;


}

export {insertarAlbum};