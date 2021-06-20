import {
  getAuth, getFirestore
} from "../lib/fabrica.js";
import {
  getString, muestraError
} from "../lib/util.js";
import {
  muestraSucursales
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoSucursal = getFirestore().collection("Sucursal");
const params = new URL(location.href).searchParams;
const id = params.get("id");
const forma = document["forma"];

getAuth().onAuthStateChanged(protege, muestraError);

async function protege(usuario) {
  if (tieneRol(usuario, ["Administrador"])) {
    busca();
  }
}

async function busca() {
  try {
    const doc = await daoSucursal.doc(id).get();
    if (doc.exists) {
      const data = doc.data();
      forma.nombre.value = data.nombre || "";
      forma.addEventListener("submit", guarda);
      forma.eliminar.addEventListener("click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraSucursales();
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
    await daoSucursal.doc(id).set(modelo);
    muestraSucursales();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " + "eliminación")) {
      await daoSucursal.doc(id).delete();
      muestraSucursales();
    }
  } catch (e) {
    muestraError(e);
  }
}
