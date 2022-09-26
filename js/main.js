var misProductos = new Object(); //id, nombre. descripción, imagen

function detonarSweetAlert(id = "", nombre = "", descripcion = "", imagen = "") {
    misProductos.id = id;
    misProductos.nombre = nombre;
    misProductos.descripcion = descripcion;
    misProductos.imagen = imagen;

    Swal.fire({
        title: '¿Deseas agregar este producto al carrito de compras?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            localStorage.setItem(id, JSON.stringify(misProductos));
            Swal.fire('Producto agregado al carrito', '', 'success');
        } else if (result.isDenied) {
          /* Swal.fire('Changes are not saved', '', 'info') */
        }
      })
}