import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'


//Crear la all

const app = express()

//Habilitar lencutra de formulario
app.use(express.urlencoded({extended:true}))


//Habilitar Cookie Parser
app.use(cookieParser())

//Habilitar CSRF
app.use(csrf({cookie:true}))

//conexion a la vase de datos
try {
    await db.authenticate();
    db.sync()
    console.log('Conexion correcta a la base de datos')
} catch (error) {
    console.log(error)

}


//Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta Publica
app.use(express.static('public'))


app.use('/auth', usuarioRoutes)





const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});