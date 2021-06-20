import {
  getAuth, getFirestore
} from "../lib/fabrica.js";
import {
  getString, muestraError
} from "../lib/util.js";
import {
  muestraPasatiempos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoSucursal =  getFirestore().collection("Sucursal");
const forma = document["forma"];

getAuth().onAuthStateChanged(protege, muestraError);

async function protege(usuario) {
  if (tieneRol(usuario, ["Administrador"])) {
    forma.addEventListener("submit", guarda);
  }
}

async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData = new FormData(forma);
    const info = getString(formData, "info").trim();
    const modelo = {
      info
    };
    await daoSucursal.add(modelo);
    muestraPasatiempos();
  } catch (e) {
    muestraError(e);
  }
}
