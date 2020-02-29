//@ts-check

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/albumDB", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);


const usuarioSchema = new mongoose.Schema({
    usuario :{
        type: String,
        require : true,
        unique: [true, "El usuario ya se ha utilizado"]
    },

    nombreUsuario :{
        type: String,
        require : true
    },

});

const Usuario = mongoose.model("usuario", usuarioSchema);


function insertarUsuario(usuarioInst, usuarioNombreInst){  
    
    let resultadoInst = "";

    const usuarioInsertar = new Usuario({
        usuario : usuarioInst,
        nombreUsuario : usuarioNombreInst
    });

    
        usuarioSchema.pre('save', async function(){
            await Promise.resolve();            
            throw new Error('Error');
        });
    
   
        


    /*const objResultados =  
    validarUsuarioExistente(usuarioInst);
    

    if (objResultados.insertarUsuario){
        usuarioInsertar.save(error =>{
            if (!error){
             resultadoInst = "ok - usuario registrado";
            }else{
             resultadoInst = "error - registro del usuario : " + error
            }
        }) 

    }else{

        resultadoInst = objResultados.descripcion;

    } */
    
   return resultadoInst
}


function validarUsuarioExistente(usuarioVal){

    let resultado = {
    resultadoValidacion : "",
    insertarUsuario : false
    }
    
    try{
       
        Usuario.findOne({usuario: usuarioVal}, function(error, resultados){  
            mongoose.connection.close();     
            if(!error){
                if(resultados){                
                    resultado.resultadoValidacion = "error - Ya existe un usuario";
                }else{
                    resultado.insertarUsuario = true;
                    resultado.resultadoValidacion = "ok";                   
                   }             
            }else{
                resultado.resultadoValidacion = "error - Validación de usuarios: " + error;
            }
           
           });

    } catch (ex) {
        resultado.resultadoValidacion = "error - "+ ex;
    }
    

       return resultado;

}

exports.insertarUsuario = insertarUsuario;