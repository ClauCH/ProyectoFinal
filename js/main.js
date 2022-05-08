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
tareas.push(new Tarea(0, "Estudiar matematicas", "Estudiar modulo 1 y 2 de ecuaciones", new Date(2022, 08, 20), "Pendiente", "Estudio", true));
tareas.push(new Tarea(1, "Pintar las rejas", "Ver que no llueva", new Date(2022, 04, 10), "Finalizada", "Tareas del hogar", false));
tareas.push(new Tarea(2, "Estudiar biologia", "Descripcion objeto3", new Date(2022, 07, 12), "Pendiente", "Estudio", true));
let contadorID = 3;


/*Funciones Tareas*/

function guardarTareasLS() {

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
    let CantTar = document.getElementById("CantTareas");
    CantTar.innerText = `Cantidad de tareas: ${tareas.length}`;
    //document.append(CantTar);
}

function ImportanciaDeTarea(importancia) {
    if (importancia) {
        Importancia = "Si"
        return importancia;
    } else {
        Importancia = "No"
        return importancia;
    }
}

Tarea.prototype.ponerEnTabla = function() {
    const fecha = this.fechaLimite;
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let Importancia = this.importante;
    let a;
    if (Importancia) {
        a = "Si"
    } else {
        a = "No"
    }
    const table = document.querySelector("table");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const txtNombre = document.createTextNode(this.nombre);
    const txtEstado = document.createTextNode(this.estado);
    const txtFecha = document.createTextNode(fecha.toLocaleDateString(undefined, options));
    const txtImportante = document.createTextNode(a);
    const tdEstado = document.createElement("td");
    const tdFecha = document.createElement("td");
    const tdImportante = document.createElement("td");
    const tdAcciones = document.createElement("td");
    const btnfinalizar = document.createElement("button");
    const txtfinalizar = document.createTextNode("Finalizar Tarea");
    const btneliminar = document.createElement("button");
    const txteliminar = document.createTextNode("Eliminar");
    const btneditar = document.createElement("button");
    const txteditar = document.createTextNode("Editar");
    const btnVer = document.createElement("button");
    const txtVer = document.createTextNode("Ver");
    td.appendChild(txtNombre);
    tdEstado.appendChild(txtEstado);
    tdImportante.appendChild(txtImportante);
    tdFecha.appendChild(txtFecha)
    tdAcciones.appendChild(btneliminar);
    tdAcciones.appendChild(btneditar);
    tdAcciones.appendChild(btnVer);
    tr.appendChild(td);
    tr.appendChild(tdEstado);
    tr.appendChild(tdFecha);
    tr.appendChild(tdImportante);
    tr.appendChild(tdAcciones);
    btnfinalizar.appendChild(txtfinalizar);
    btneliminar.appendChild(txteliminar);
    btneditar.appendChild(txteditar);
    btnVer.appendChild(txtVer);
    table.appendChild(tr);
    btneliminar.setAttribute("value", this.id);
    btneliminar.setAttribute('onclick', 'eliminarTarea(' + this.id + ')');
    //btneliminar.setAttribute("onclick", eliminarTarea(this.id));

}

function Peticion() {
    for (let tarea of tareas) {
        tarea.ponerEnTabla();
    }

    const lista = document.querySelector('Listado')

    fetch('/data.json')
        .then((res) => res.json())
        .then((data) => {

            data.forEach((tarea) => {
                tarea.ponerEnTabla();
            })
        })


}




/*Funciones para usuarios*/

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
            MensajeSAConTitulo('Usuario o contraseña incorrecta', 'Oops...', 'error');
        }
    }
}


function logout() {

    localStorage.clear()

};

function loginValidarCampos() {
    let inputUsuario = document.getElementById("login-name").value;
    let inputContrasena = document.getElementById("login-pass").value;
    if (inputUsuario == "") {
        MensajeSA('Debes Ingresar usuario', 'warning');
        inputUsuario.focus();
        return false;
    }
    if (inputContrasena == "") {
        MensajeSA('Debes ingresar Contraseña', 'warning');
        inputContrasena.focus();
        return false;
    };
    return true
}

function mostrarNombreUsuario() {
    if (localStorage.getItem("usuario")) {
        let nombreUsuario = document.getElementById("nombreU");
        let nombreLC = localStorage.getItem("usuario");
        nombreUsuario.innerText = `${nombreLC}`;
        // document.append(nombreUsuario);
    }
}

function ControlUsuariosNoLogueados() {
    let UsuarioLog = localStorage.getItem("usuario");
    console.log(UsuarioLog);
    if (UsuarioLog == null) {
        MensajeConTiempo("Solo pueden ingresar usuarios logueados", "error");
        location.href = "/index.html";
    };
}




/*Mensajes Sweet*/
function MensajeSA(TextoMens, Icono) {
    Swal.fire({
        icon: Icono,
        text: TextoMens,
        background: '#333',
        color: '#FFFFFF',
        confirmButtonColor: '#F10264',

    })
}

function MensajeSAConTitulo(TextoMens, TituloMens, Icono) {
    Swal.fire({
        icon: Icono,
        title: TituloMens,
        text: TextoMens,
        /*footer: '<a href="">Olvidaste tu contaseña?</a>',*/
        background: '#333',
        color: '#FFFFFF',
        confirmButtonColor: '#F10264'
    })
}

function MensajeConTiempo(titulo, tiempo) {
    let timerInterval
    Swal.fire({
        title: titulo,
        timer: tiempo,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}
//MensajeConBotones('Esta seguro?', "se va elimiar la tarea", 'warning', 'true', 'Borrar', 'Cancela', 'true');

/*function MensajeConBotones(titulo, text, icon, shCancel, textConfirm, textCancel, RevB) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: titulo,
        text: text,
        icon: icon,
        showCancelButton: shCancel,
        confirmButtonText: textConfirm,
        cancelButtonText: textCancel,
        reverseButtons: RevB
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })

}*/

/*Acciones tareas*/
async function AgregarTarea() {

    const { value: formValues } = await Swal.fire({
        title: 'Agregar Tarea',
        html: '<input id="swal-input1" class="swal2-input" placeholder="Nombre de la tarea" >' +
            '<input id="swal-input2" class="swal2-input" placeholder="Descripción de la tarea" ><br>' +
            '<label for="FechaLimite">Fecha:</label><input type="date" id="FechaLimite" name="bdaymonth">' +
            '<p>Estado:</p>' +
            '<form name=fEstado> <input type="radio" id="Estado" value="Pendiente"><label >Pendiente</label><br></br><input type="radio" id="Estado" value="Pendiente" ><label >Finalizada</label><br></form>' +
            '<label for="tCategoria">Categorias:</label><form name="fomul"> <select name="Categorias" id="tCategorias"><option value="Estudio">Estudio</option><option value="Deportes">Deportes</option><option value="Trabajo">Trabajo</option><option value="Hogar">Hogar</option></select></form>' +
            '<input id="CheckImportante" type="checkbox" name="cb-importante"value="true"> la tarea es importante',

        preConfirm: () => {
            let i;
            let SelectEstado;
            for (i = 0; i < document.fEstado.Estado.length; i++) {
                if (document.fEstado.Estado[i].checked) {
                    SelectEstado = document.fEstado.Estado[i].value;
                    break;
                }
            }
            var indice = document.fomul.tCategorias.selectedIndex;
            let valorCategoria = document.fomul.tCategorias.options[indice].value;
            console.log(valorCategoria);
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('FechaLimite').value,
                SelectEstado,
                valorCategoria,
                document.getElementById('CheckImportante').value,

            ]
        },

    })
    if (formValues) {
        Swal.fire(JSON.stringify(formValues))

        .then((data) => console.log(data))


    }
}

function eliminarTarea(idTarea) {

    const resultado = tareas.find((i) => i.id == idTarea);
    console.log(resultado);
    const list = document.getElementById("Listado");

    if (list.hasChildNodes()) {
        list.removeChild(list.children[resultado.id]);
    }
    console.log(resultado);
}

document.getElementById("IniciarSesion").addEventListener("click", PeticionLogin());


function PeticionLogin() {
    fetch('/login.html', {
            method: 'POST',
            body: JSON.stringify({
                title: 'login',
                body: 'Login usuario',
                usuario: usuario1.usuario,
                COntraseñ: usuario1.contraseña
            }),
            headers: {
                'Content-type': 'application/json;',
            },
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
}
