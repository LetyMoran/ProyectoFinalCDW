function detonarSweetAlert() {
    Swal.fire({
        title: '¿Deseas agregar este producto al carrito de compras?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Producto agregado al carrito', '', 'success');
        } else if (result.isDenied) {
          /* Swal.fire('Changes are not saved', '', 'info') */
        }
      })
}