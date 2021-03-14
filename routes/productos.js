var express = require('express');
var router = express.Router();
const{ todosProductos, vistaEditar, agregar, detalle }=require('../controllers/productosController');
/*  detalle, productNav, productOferta, productoEditarVista, productoEditar, */
const upload=require('../middlewares/productmulter')

router.get('/losProductos',todosProductos)
router.get('/editarProducto',vistaEditar)
router.post('/editarProducto',upload.any(),agregar)
/* router.get('/lasCategorias',muestraCategorias)
router.get('/lasSubCategorias',muestraSubCategorias) */
router.get('/detalle/:id',detalle)/*
router.get('/productNav/:lacategoria/:lasubcategoria',productNav)
router.get('/productosOfertas',productOferta)
router.get('/productoEditar/:id',productoEditarVista)
router.put('/productoEditar/:id',productoEditar) */

module.exports = router;
