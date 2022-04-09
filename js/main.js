class usuario {
    constructor(usuario, contraseña) {
        this.usuario = usuario;
        this.contraseña = contraseña;
    }

}

class Tarea {
    constructor(nombre, descripcion, fechaLimite, estado, tipo, importante) {

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaLimite = fechaLimite;
        this.estado = estado;
        this.tipo = tipo;
        this.importante = importante;
    }


    terminarUnaTarea() {

        this.estado = "Finalizada";
        return console.log(`Tarea:${this.nombre} se encuentra ${this.estado}`);

    }

}

const tareas = [];
tareas.push(new Tarea("Estudiar matematicas", "Estudiar modulo 1 y 2 de ecuaciones", new Date("20/04/2022"), "Pendiente", "Estudio", true));
tareas.push(new Tarea("Pintar las rejas", "Ver que no llueva", new Date("01/04/2022"), "Finalizada", "Tareas del hogar", false));
tareas.push(new Tarea("Estudiar biologia", "Descripcion objeto3", new Date("12/04/2022"), "Pendiente", "Estudio", true));


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

function agregarTarea() {
    let nombre = prompt("Ingresa nombre de la tarea:");
    let descripcion = prompt("Ingresa Descripcion:");
    let fechaLimite = prompt("Ingresa fecha limite:");
    let estado = prompt("Ingresa estado inicial de la tarea");
    let tipo = prompt("Ingresa tipo:");
    let importante = prompt("Ingresar importancia de la tarea (Y/N):");

    if (importante == "Y") {
        importante = true;
    } else if (importante == "N") {
        importante = false;
    } else {
        alert("No es una opcion valida")

    }

    switch (importante) {
        case true:
            tareas.push(new Tarea(nombre, descripcion, fechaLimite, estado, tipo, importante));
            break;
        case false:
            tareas.push(new Tarea(nombre, descripcion, fechaLimite, estado, tipo, importante));
            break;
        default:
            alert("No se puede crear la tarea");

    }
}

let usuario1 = new usuario("Clau12", "1234");

let usuarioIngresado = prompt("Ingresa tu usuario:");
let contrasenaIngresada = prompt("Ingresa tu contraseña:");

if (usuario1.usuario == usuarioIngresado && contrasenaIngresada == usuario1.contraseña) {
    alert("Podes ingresar y por consola vas a poder ver el listado de tareas");
    console.log(`Bienvenida:${usuario1.usuario}`);
    listarTodaslastareas()
    console.log(" ");
    listarTareasFinalizadas();
    console.log(" ");
    listarTareasPendientes();
    console.log(" ");
    //finalizo la tarea 1
    cantidadDeTareas();

    var respuesta = confirm("Usted desea agregar una nueva tarea?")
    if (respuesta)
        agregarTarea();
    else
        alert("Usted no aceptó.");


    listarTodaslastareas()
} else {
    alert("No podes ingresar a ver tus tareas");
}