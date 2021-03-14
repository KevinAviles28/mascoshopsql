const db =require('../database/models')
const {Op}=require('sequelize')

module.exports={
    todosProductos:(req,res)=>{/* trae todos los productos */
        db.Productos.findAll()
        .then(function(productos){
            res.render("muestraProductos",{productos:productos})
        })
    },
    vistaEditar:(req,res)=>{/* vista agregar */
        let pedidoCategoria=db.Categoria.findAll(); 
        let pedidoSubCategoria=db.SubCategoria.findAll()
        Promise.all([pedidoCategoria,pedidoSubCategoria])
        .then(function([categoria,subcategoria]){
            res.render('agregarProducto',{
                categoria,
                subcategoria
            })
        })    
    },
    agregar:(req,res)=>{/* post de agregar */
        const {nombre,precio,stock,descuento,descripcion,categoria,subcategoria}=req.body
        /* res.send(subcategoria) */
        db.Cate_subs.findOne({
            where:{
                category_id:categoria,
                sub_category_id:subcategoria  
            }
        })
        .then(function(cateSub){
            db.Productos.create({/* creo una creo un producto con sus datos */
            
                name:nombre,
                price:precio,
                stock:stock,
                discount:descuento,
                description:descripcion,
                cate_sub_id:cateSub.id 
            })
            .then((resultado)=>{/* con el resultado creo una imagen  */
                let id=resultado.id
                db.ImagenProducto.create({
                    product_name:(req.files[0])?req.files[0].filename:"productoDefoult.png",
                    product_id:id
                })
                .then(function(){
                    res.redirect('/');
                })
                
            })
            res.redirect("/");
        })
       
    },
    detalle:(req,res)=>{
        let pedidoCategoria=db.Categoria.findAll();
        let pedidoSubCategoria=db.SubCategoria.findAll();
        let losProductos=db.Productos.findByPk(req.params.id,{
            include:[{association:"cateSub"},{association:"imagenProducto"}]
        })
        Promise.all([pedidoCategoria,pedidoSubCategoria,losProductos])/* trae todos los pedidos */
        .then(([categoria,subcategoria,producto])=>{
            res.render('detalle',{
                categoria,
                subcategoria,
                producto
            })
        })
    }
        /* ,
    
    detalle:(req,res)=>{
        db.Productos.findByPk(req.params.id,{
            include:[{association:"imagenProducto"},{association:"categoria"},{association:"subcategoria"}]
    })
    .then(function(producto){
            db.Productos.findAll({
                include:[{association:"imagenProducto"}]
            },
                {where:{
                    category_id:+producto.category_id
                }
            })
            .then(function(productoRel){
                res.render('detalle',{producto,productoRel})    
            })
        }) 
    /* let productosRelacionados=db.Productos.findAll({
        where:{
            category_id: productoEncontrado.category_id
        }
    })
    Promise.all([productoEncontrado,productosRelacionados])
      .then(function([producto,productoRel]){
            res.render('detalle',{producto,productoRel})
        }) */
    /* },
    productNav:(req,res)=>{
        db.Productos.findAll({
            include:[{association:"categoria"},{association:"subcategoria"}]
                    },{
                        where:{
                            categoria:req.params.lacategoria
                        }
                    })
        .then(function(productos){
            res.render('productNav',{
                productos
            })
        })
    },
    productOferta:(req,res)=>{
        db.Productos.findAll({
            where:{
                discount:{
                    [Op.ne]:0
                }
            }
        })
        .then(function(productos){
            res.render('productoOferta',{
                productos
            })
        })
    },
    productoEditarVista:(req,res)=>{
        let pedidoProducto=db.Productos.findByPk(req.params.id)
        let pedidoCategoria=db.Categoria.findAll();
        let pedidoSubCategoria=db.SubCategoria.findAll()
        Promise.all([pedidoProducto,pedidoCategoria,pedidoSubCategoria])
        .then(function([producto,categoria,subcategoria]){
            res.render('editarProducto',{
                producto,
                categoria,
                subcategoria
            })
        }) 
    },
    productoEditar:(req,res)=>{
        const{nombre,precio,stock,descuento,descripcion,categoria,subcategoria}=req.body
        db.Productos.update({
            name:nombre,
            price:precio,
            stock:stock,
            discount:descuento,
            description:descripcion,
            category_id:categoria,
            sub_category_id:subcategoria
        },{
            where:{
                id:req.params.id
            }
        })
        .then(function(producto){
            res.redirect("/detalle/"+req.params.id)
        })

    } */
    /* let user = db.User.findByPk(req.params.id);
        let remove = db.User.destroy({
            where: {
                id: req.params.id
            }
        });

        Promise.all([user,remove])
        .then(([user,remove])=>{
            
            if(fs.existsSync(path.join('public','images','users',user.avatar))){
                fs.unlinkSync(path.join('public','images','users',user.avatar))
            }

            return res.redirect('/');
        })
        .catch(error => res.send(error))
 */
}