//@ts-check

const app = require("express")();
const usuario = require("./modulos/usuarios");



const usuarioInsertar = {
  usuario : "snino",
  nombreUsuario : "Santiago Niño"
};



var resultadoPrueba = usuario.insertarUsuario(usuarioInsertar.usuario, usuarioInsertar.nombreUsuario);
console.log("Resultado : " + resultadoPrueba);

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  