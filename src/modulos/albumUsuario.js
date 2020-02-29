const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/albumDB", {useNewUrlParser: true});


const albumUsuarioSchema = new mongoose.Schema({
  
    usuarioAlbum : usuarioSchema,
 
    album : albumSchema,
 
    contenido :{
        type: Array,
        require : true
    }
 });


const AlbumUsuario = mongoose.model("albumUsuario", usuarioSchema);


function relacionarAlbumUsuario(objUsuarioInst, objAlbumInst){  

   let resultadoInst = "";


   const albumUsuarioInsertar = new AlbumUsuario({
        usuarioAlbum : objUsuarioInst,
        album : objAlbumInst,
        contenido : []
   }); 
   
   const [resultado, descripcion] =  validarAlbumEnUsuario(usuarioAlbum.usuario, album.nombre);
    
   if (resultado){
    albumUsuarioInsertar.save(error =>{
           if (!error){
            resultadoInst = "ok - Album asociado al usuario";
           }else{
            resultadoInst = "error - registro de asociacion del album al usuario : " + error
           }
       }) 

   }else{

       resultadoInst = descripcion;

   } 
   
  return resultadoInst

}

function validarAlbumEnUsuario(usuarioVal, albumVal){
    
    let resultado = {
        resultadoValidacion : "",
        insertarUsuario : false
        };

    const filtros = {usuarioAlbum : usuarioVal, 
                     album: albumVal};

        AlbumUsuario.findOne(filtros, function(error, resultados){
            if(!error){
                if(resultados){                
                    resultado.resultadoValidacion = "error - El usuario ya se encuentra con el album";
                }else{
                    resultado.insertarUsuario = true;
                    resultado.resultadoValidacion = "ok";                   
                   }             
            }else{
                resultado.resultadoValidacion = "error - Validación de usuarios - album: " &  error;
            }
           
           });
    
           
           return resultado;

}

function buscarUsuarioyActualizar(usuarioAct, albumAct, contenidoAct){

 const datosFiltro = { usuarioAlbum : usuarioAct, album : albumAct};
 const update = { contenido : contenidoAct};

 let resultado = {
    resultadoAct : "",
    actualizacion : false
    };

 AlbumUsuario.findOneAndUpdate(datosFiltro, update, resultado, function(error, resultados){
     if(!error){
        resultado.insertarUsuario = true;
        resultado.resultadoValidacion = "ok";            
     }else{
        resultado.resultadoAct = "error - actualización de contenido: " & error;
     }
 })

}

export {relacionarAlbumUsuario, buscarUsuarioyActualizar};