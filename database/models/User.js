module.exports=(sequelize,dataTypes)=>{
    const alias="Usuarios"
    let cols={
        id:{
            type:dataTypes.INTEGER, /* tipo de dato que es */
            primaryKey: true,   /* si es una clave primaria */
            autoIncrement:true/* si es auto Incrementar */
        },
        name:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        last_name:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        email:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        pass:{
            type:dataTypes.STRING(100),
            allowNull:false
        },
        country:{
            type:dataTypes.STRING(45),
           /*  allowNull:false */
        },
        location:{
            type:dataTypes.STRING(45)
        },
        phone:{
            type:dataTypes.STRING(45)
        },
        direction:{
            type:dataTypes.STRING(45)
        },
        category:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        avatar:{
            type:dataTypes.STRING(45)
        }


    }
    const config={
        tableName:'users',
        timestamps:false,
    }
    const User=sequelize.define(alias,cols,config);

    /* asociasiones */

    return User;
}