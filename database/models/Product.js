module.exports=(sequelize,dataTypes)=>{
    const alias="Productos"
    const cols={
        id:{
            type:dataTypes.INTEGER, /* tipo de dato que es */
            primaryKey: true,   /* si es una clave primaria */
            autoIncrement:true/* si es auto Incrementar */
        },
        name:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        price:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        stock:{
            type:dataTypes.STRING(45),
            
        },
        discount:{
            type:dataTypes.STRING(45),
           
        },
        description:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        cate_sub_id:{
            type:dataTypes.INTEGER
        }
    }
    const config={
        tableName:'products',
        timestamps:false,
    }
    const Productos=sequelize.define(alias,cols,config);
    Productos.associate=function(models){
         Productos.hasMany(models.ImagenProducto,{
            as:"imagenProducto",
            foreignKey:"product_id"
        });
        Productos.belongsTo(models.Cate_subs,{
            as:"cateSub",
            foreignKey:"cate_sub_id"
        })
    }
    /* asociasiones */

    return Productos;
}