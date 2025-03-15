console.log("Hola profe, este es un sistema de stock muy precario pero funcional. Espero que le guste. :D");

let articulos = [
    { id: 1, nombre: "Remera", stock: 10 },
    { id: 2, nombre: "Pantalon", stock: 5 },
    { id: 3, nombre: "Zapatos", stock: 7 }
];

function mostrarMenu() {
    let menu = "Seleccione una opción:\n" +
        "1. Consultar stock\n" +
        "2. Agregar stock\n" +
        "3. Salir";
    return prompt(menu);
}

let listaArticulos = articulos.map(item => item.id + " - " + item.nombre).join("\n");

function consultarStock() {
    let id = parseInt(prompt("Ingrese el ID del articulo a consultar:\n" + listaArticulos));
    let articulo = articulos.find(item => item.id === id);

    if (articulo) {
        alert("El articulo " + articulo.nombre + " tiene un stock de: " + articulo.stock + " unidades.");
    } else {
        alert("Articulo no encontrado.");
    }
}

function agregarStock() {
    let id = parseInt(prompt("Ingrese el ID del articulo al que desea agregar stock:\n" + listaArticulos));
    let articulo = articulos.find(item => item.id === id);

    if (articulo) {
        let cantidad = parseInt(prompt("Ingrese la cantidad a agregar para " + articulo.nombre + ":"));

        if (!isNaN(cantidad) && cantidad > 0) {
            articulo.stock += cantidad;
            alert("Stock actualizado. " + articulo.nombre + " ahora hay " + articulo.stock + " unidades.");
        } else {
            alert("Cantidad invalida.");
        }
    } else {
        alert("Articulo no encontrado.");
    }
}

function iniciarSistemaStock() {
    let opcion;
    do {
        opcion = mostrarMenu();
        switch (opcion) {
            case "1":
                consultarStock();
                break;
            case "2":
                agregarStock();
                break;
            case "3":
                alert("Saliendo del sistema.");
                break;
            default:
                alert("Opción invalida. .");
                break;
        }
    } while (opcion !== "3" && confirm("¿Quiere realizar otra operacion?"));

    console.log("Estado final del stock:", articulos);
}

iniciarSistemaStock();