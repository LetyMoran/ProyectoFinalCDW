var misProductos = [];

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    document.getElementById("cantidad-productos").classList.add("d-none");
    document.getElementById("acciones-carrito").classList.add("d-none");
    document.getElementById("contenido-carrito").innerHTML = '<div class="alert alert-warning mt-2" role="alert">Tu carrito está vacío</div>';
    misProductos = [];    
}

function eliminarProducto(id = "") {
    if(id != ""){
        const index_producto = misProductos.findIndex(producto => parseInt(producto.id) === parseInt(id));
        if(index_producto !== -1){ // El producto está en el array
            misProductos.splice(index_producto, 1);
            mostrarProductosCarrito(misProductos);
            localStorage.setItem("carrito", JSON.stringify(misProductos));
        }
    }
}

function sumarCantidad(id = "") {
    if(id != ""){
        const index_producto = misProductos.findIndex(producto => parseInt(producto.id) === parseInt(id));
        if(index_producto !== -1){ // El producto está en el array
            misProductos[index_producto].cantidad = misProductos[index_producto].cantidad + 1;
            localStorage.setItem("carrito", JSON.stringify(misProductos));
            document.getElementById("cantidad-count_"+id).value = misProductos[index_producto].cantidad;
        }

        var subtotal = 0;
        misProductos.forEach(producto => {
            subtotal += parseInt((producto.precio * producto.cantidad));
        });
        document.getElementById("subtotal-carrito").innerHTML = "$ "+subtotal+".00";
    }
}

function restarCantidad(id = "") {
    if(id != ""){
        const index_producto = misProductos.findIndex(producto => parseInt(producto.id) === parseInt(id));
        if(index_producto !== -1){ // El producto está en el array
            if(misProductos[index_producto].cantidad > 1){
                misProductos[index_producto].cantidad = misProductos[index_producto].cantidad - 1;
                localStorage.setItem("carrito", JSON.stringify(misProductos));
                document.getElementById("cantidad-count_"+id).value = misProductos[index_producto].cantidad;
            }
        }
        var subtotal = 0;
        misProductos.forEach(producto => {
            subtotal += parseInt((producto.precio * producto.cantidad));
        });
        document.getElementById("subtotal-carrito").innerHTML = "$ "+subtotal+".00";
    }
}

function mostrarProductosCarrito(productos = []) {
    if(productos .length > 0){
        document.getElementById("cantidad-productos").innerHTML = productos.length;
        document.getElementById("cantidad-productos").classList.remove("d-none");

        var html_productos = "";
        var subtotal = 0;
        productos.forEach(producto => {
            html_productos += '<div class="card mb-3 border-0 rounded-0 border-bottom">'
                + '<button type="button" class="btn-close text-danger btn-remove-product" aria-label="Close" onclick=eliminarProducto("'+producto.id+'")><span aria-hidden="true">×</span></button>'
                + '<div class="row g-0">'
                    + '<div class="col-md-4 content-img-carrito">'
                        + '<img src="'+producto.imagen+'" class="d-block w-50 img-fluid img-product-car" alt="producto_'+producto.id+'">'
                    + '</div>'
                    + '<div class="col-md-8 content-info-carrito">'
                        + '<div class="card-body">'
                            + '<h6 class="card-title">'+producto.nombre+'</h6>'
                            + '<p class="card-text"><small class="text-muted">$ '+producto.precio+'.00</small></p>'
                            + '<div class="input-group mb-3 group-cantidad">'
                                + '<button class="btn btn-outline-secondary border-tienda text-tienda reducir" onclick=restarCantidad("'+producto.id+'") type="button" id="button-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#08b464" viewBox="0 0 24 24"> <path d="M19 13H5v-2h14v2z"></path> </svg></button>'
                                + '<input type="text" class="form-control text-center input-cantidad" id="cantidad-count_'+producto.id+'" placeholder="" value="'+producto.cantidad+'" disabled>'
                                + '<button class="btn btn-outline-secondary border-tienda text-tienda agregar" onclick=sumarCantidad("'+producto.id+'") type="button"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#08b464" viewBox="0 0 24 24"> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"> </path> </svg></button>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</div>';
            subtotal += parseInt((producto.precio * producto.cantidad));
        });
        document.getElementById("contenido-carrito").innerHTML = html_productos;
        document.getElementById("subtotal-carrito").innerHTML = "$ "+subtotal+".00";
        document.getElementById("lista-productos-carrito").classList.remove("d-none");
        document.getElementById("acciones-carrito").classList.remove("d-none");
    }else{
        document.getElementById("cantidad-productos").classList.add("d-none");
        document.getElementById("contenido-carrito").innerHTML = '<div class="alert alert-warning mt-2" role="alert">Tu carrito está vacío</div>';
        document.getElementById("acciones-carrito").classList.add("d-none");
    }
}  

function detonarSweetAlert(id = "", nombre = "", descripcion = "", imagen = "", precio = 0) {
    Swal.fire({
        title: '¿Deseas agregar este producto al carrito de compras?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
        backdrop:false,
        heightAuto: false,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            /* .then((result) => {
                $('html, body').animate({
                    scrollTop: $("header").offset().top
                }, "fast");
            }); */
            
            if(misProductos.length === 0){
                misProductos.push({id:id, nombre:nombre, descripcion: descripcion, imagen: imagen, precio: precio, cantidad: 1});
            }else{
                const index_producto = misProductos.findIndex(producto => parseInt(producto.id) === parseInt(id));
                if(index_producto !== -1){ // El producto está en el array
                    misProductos[index_producto].cantidad = misProductos[index_producto].cantidad + 1;
                }else{ // El producto no está
                    misProductos.push({id:id, nombre:nombre, descripcion: descripcion, imagen: imagen,  precio: precio, cantidad: 1});
                }
            }
            console.log(misProductos);
            localStorage.setItem("carrito", JSON.stringify(misProductos));
            mostrarProductosCarrito(misProductos);
            Swal.fire('Producto agregado al carrito', '', 'success');
        } else if (result.isDenied) {
            /* Swal.fire('Changes are not saved', '', 'info') */
        }
    })
}

if(JSON.parse(localStorage.getItem("carrito")) !== null){
    misProductos = JSON.parse(localStorage.getItem("carrito")); //id, nombre. descripción, imagen
    mostrarProductosCarrito(misProductos);
}