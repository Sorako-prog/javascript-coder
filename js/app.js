let articulos = JSON.parse(localStorage.getItem('stock')) || [
    { id: 1, nombre: "Remera", stock: 0 },
    { id: 2, nombre: "Pantalon", stock: 0 },
    { id: 3, nombre: "Zapatos", stock: 0 },
    { id: 4, nombre: "Camisa", stock: 0 },
    { id: 5, nombre: "Chaqueta", stock: 0 },
    { id: 6, nombre: "Bufanda", stock: 0 },
    { id: 7, nombre: "Gorro", stock: 0 },
    { id: 8, nombre: "Guantes", stock: 0 },
    { id: 9, nombre: "Cinturon", stock: 0 },
    { id: 10, nombre: "Calcetines", stock: 0 }
];

function guardarStock() {
    localStorage.setItem('stock', JSON.stringify(articulos));
}

function renderStockTabla() {
    let table = `<table class="table table-bordered">
                    <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Stock</th>
                    </tr>
                    </thead>
                    <tbody>`;
    articulos.forEach(item => {
        table += `<tr>
                    <td>${item.id}</td>
                    <td>${item.nombre}</td>
                    <td>${item.stock}</td>
                </tr>`;
    });
    table += `</tbody>
                </table>`;
    document.getElementById('stockTabla').innerHTML = table;
}

function consultarStockUI() {
    document.getElementById('consultaStock').style.display = 'none';
    let form = `<div class="form-group">
                    <label for="selectArticulo">Seleccione el artículo:</label>
                    <select id="selectArticulo" class="form-control">`;
    articulos.forEach(item => {
        form += `<option value="${item.id}">${item.id} - ${item.nombre}</option>`;
    });
    form += `</select>
                </div>
                <button id="btnConsultarConfirm" class="btn btn-primary">Consultar</button>`;

    document.getElementById('mensaje').innerHTML = '';
    let formContainer = document.getElementById('consultaStock');
    formContainer.innerHTML = form;
    formContainer.style.display = 'block';

    document.getElementById('btnConsultarConfirm').addEventListener('click', function () {
        let id = parseInt(document.getElementById('selectArticulo').value);
        let articulo = articulos.find(item => item.id === id);
        let msgDiv = document.getElementById('mensaje');

        if (articulo) {
            msgDiv.innerHTML = `<div class="alert alert-info">
                            El artículo ${articulo.nombre} tiene un stock de ${articulo.stock} unidades.
                            </div>`;
        } else {
            msgDiv.innerHTML = `<div class="alert alert-warning">Artículo no encontrado.</div>`;
        }
        formContainer.style.display = 'none';
    });
}

function agregarStockUI() {
    document.getElementById('consultaStock').style.display = 'none';
    let form = `<div class="form-group">
                    <label for="selectArticuloAdd">Seleccione el artículo:</label>
                    <select id="selectArticuloAdd" class="form-control">`;
    articulos.forEach(item => {
        form += `<option value="${item.id}">${item.id} - ${item.nombre}</option>`;
    });
    form += `</select>
                </div>
                    <div class="form-group">
                    <label for="inputCantidad">Cantidad a agregar:</label>
                    <input type="number" id="inputCantidad" class="form-control" min="1">
                    </div>
                <button id="btnAgregarConfirmar" class="btn btn-success">Agregar</button>`;

    document.getElementById('mensaje').innerHTML = '';
    let formContainer = document.getElementById('consultaStock');
    formContainer.innerHTML = form;
    formContainer.style.display = 'block';

    document.getElementById('btnAgregarConfirmar').addEventListener('click', function () {
        let id = parseInt(document.getElementById('selectArticuloAdd').value);
        let cantidad = parseInt(document.getElementById('inputCantidad').value);
        let msgDiv = document.getElementById('mensaje');
        let articulo = articulos.find(item => item.id === id);

        if (articulo) {
            if (!isNaN(cantidad) && cantidad > 0) {
                articulo.stock += cantidad;
                guardarStock();
                renderStockTabla();
                msgDiv.innerHTML = `<div class="alert alert-success">
                                Stock actualizado. ${articulo.nombre} ahora tiene ${articulo.stock} unidades.
                                </div>`;
            } else {
                msgDiv.innerHTML = `<div class="alert alert-warning">Cantidad inválida.</div>`;
            }
        } else {
            msgDiv.innerHTML = `<div class="alert alert-warning">Artículo no encontrado.</div>`;
        }
        formContainer.style.display = 'none';
    });
}

document.getElementById('btnConsultar').addEventListener('click', consultarStockUI);
document.getElementById('btnAgregar').addEventListener('click', agregarStockUI);

renderStockTabla();
