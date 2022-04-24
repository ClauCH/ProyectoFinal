class usuario {
    constructor(usuario, contraseña) {
        this.usuario = usuario;
        this.contraseña = contraseña;
    }

}

class Tarea {
    constructor(id, nombre, descripcion, fechaLimite, estado, tipo, importante) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaLimite = fechaLimite;
        this.estado = estado;
        this.tipo = tipo;
        this.importante = importante;
    }



}
/*Creacion de arrays*/

let usuario1 = new usuario("Clau12", "1234");
const tareas = [];
tareas.push(new Tarea(0, "Estudiar matematicas", "Estudiar modulo 1 y 2 de ecuaciones", new Date("20/04/2022"), "Pendiente", "Estudio", true));
tareas.push(new Tarea(1, "Pintar las rejas", "Ver que no llueva", new Date("01/04/2022"), "Finalizada", "Tareas del hogar", false));
tareas.push(new Tarea(2, "Estudiar biologia", "Descripcion objeto3", new Date("12/04/2022"), "Pendiente", "Estudio", true));
let contadorID = 3;

function ObtenerNuevaTarea() {
    let ObtNombre = document.getElementById("NombreTarea");
    let ObtDescripcion = document.getElementById("DescrpcionTarea");
    let ObtFechaLimite = document.getElementById("FechaTarea");
    let ObtEstado = document.getElementById("EstadoTarea");
    let ObtTipo = document.getElementById("TipoTarea");
    let ObtImportante = document.getElementById("ImportanteTarea");
    return ObtNombre, ObtDescripcion, ObtFechaLimite, ObtEstado, ObtTipo, ObtImportante;
}

function crearUnaTarea() {
    tareas.push(new Tarea(contadorID, ObtenerNuevaTarea()));
}

function FinalizarTodas(ValorABuscar, ValorAnterior, ValorNuevo) {

    tareas.forEach(function(i) {
        i[ValorABuscar] = i[ValorABuscar] == ValorAnterior ? ValorNuevo : i[ValorABuscar];
    })

}

function FinalizarUnaTarea(idTarea) {

    const resultado = tareas.find((i) => i.id == idTarea);
    resultado.estado = "Finalizada";

}

function listarTodaslastareas() {
    console.log(`${usuario1.usuario} se muestran todas tus tareas:`);
    for (let tarea of tareas) {

        console.log(`Tarea: ${tarea.nombre} Estado:${tarea.estado}`);
    }
    console.log(`Cantidad de tareas: ${tareas.length}`);

}

function listarTareasFinalizadas() {
    console.log(`${usuario1.usuario} se muestran tus tareas Finalizadas:`);
    for (let tarea of tareas) {
        if (tarea.estado == "Finalizada") {
            console.log(`Tarea: ${tarea.nombre} Estado:${tarea.estado}`);
        }
    }
    console.log(`Cantidad de tareas: ${tareas.length}`);
}

function listarTareasPendientes() {
    console.log(`${usuario1.usuario} se muestran tus tareas pendientes:`);
    for (let tarea of tareas) {
        if (tarea.estado == "Pendiente") {
            console.log(`Tarea: ${tarea.nombre} Estado:${tarea.estado}`);
        }
    }

    console.log(`Cantidad de tareas: ${tareas.length}`);
}

function cantidadDeTareas() {
    console.log(`Cantidad de tareas: ${tareas.length}`);
}


/*Funciones para usuarios*/
function loginValidarCampos() {
    let inputUsuario = document.getElementById("login-name").value;
    let inputContrasena = document.getElementById("login-pass").value;
    if (inputUsuario == "") {
        alert("Debes ingresar usuario");
        inputUsuario.focus();
        return false;
    }
    if (inputContrasena == "") {
        alert("Debes ingresar Contraseña");
        inputContrasena.focus();
        return false;
    };
    return true
}

function login() {
    let validacion = loginValidarCampos();
    if (validacion) {
        let inputUsuario = document.getElementById("login-name").value;
        let inputContrasena = document.getElementById("login-pass").value;

        if (usuario1.usuario == inputUsuario && usuario1.contraseña == inputContrasena) {
            location.href = '/home.html';
            //localStorage.setItem('usuarioLogueado', JSON.stringify(usuario1));
            localStorage.setItem('usuario', inputUsuario)

        } else {
            alert("Usuario o contraseña incorrecta")
        }

    }
}

function logout() {
    localStorage.clear()
};

function mostrarNombreUsuario() {
    let nombreUsuario = document.getElementById("nombreU");
    let nombreLC = localStorage.getItem("usuario");
    console.log(nombreLC);
    nombreUsuario.innerHTML = `<li style="float:right"><a class="active" id="nombreU" onload="mostrarNombreUsuario()">${nombreLC}</a></li>`;

}
/*Funciones Tareas*/
Tarea.prototype.ponerEnTabla = function() {

    const table = document.querySelector("table");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const txtNombre = document.createTextNode(this.nombre);
    const txtEstado = document.createTextNode(this.estado);
    const txtFecha = document.createTextNode(this.fechaLimite);
    const txtImportante = document.createTextNode(this.importante);
    const tdEstado = document.createElement("td");
    const tdFecha = document.createElement("td");
    const tdImportante = document.createElement("td");
    td.appendChild(txtNombre);
    tdEstado.appendChild(txtEstado);
    tdImportante.appendChild(txtImportante);
    tdFecha.appendChild(txtFecha)
    tr.appendChild(td);
    tr.appendChild(tdEstado);
    tr.appendChild(tdFecha);
    tr.appendChild(tdImportante);
    table.appendChild(tr);
}

window.onload = function() {
    for (let tarea of tareas) {
        tarea.ponerEnTabla();
    }
}
