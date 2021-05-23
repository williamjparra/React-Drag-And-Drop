const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const imageNameFormater = require('./utils/imageNameFormater')

const app = express(express)
const port = 5055

app.use(cors())
app.use(fileUpload({
    uriDecodeFileNames: true
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('assets'))


app.get('/', function(req, res) {
    res.send("esta es la ruta raiz")
})

app.post('/upload', function async (req, res) {
    const { filename } = req.query
    const relativePath = checkAndMakeDir(filename)

    try{
        if(!req.files) {
            res.send({message: 'no se envio ninguna imagenes'})
        }

        var image = req.files.file
        const imageName = imageNameFormater(filename, image.name)
        const savePath = `.${relativePath}/${imageName}`
        image.mv(savePath)

        res.send({
            status: 200,
            message: 'file uploaded',
            data: {
                name: imageName,
                mimetype: image.mimetype,
                size: image.size
            },
            srcPath: savePath
        })

    } catch (err) {
        console.log(err)
    }

})

app.listen(port, () => {
    console.log(`aplicacion corriendo en el puerto ${port}`)
})

const checkAndMakeDir = (directory) => {
    const checkDir = fs.existsSync(`assets/${directory}`)

    if(checkDir === false) {
        fs.mkdir(
            `${__dirname}/assets/${directory}`,
            { recursive: true },
            err => console.log(err)
        )
        return `/assets/${directory}`
    }

    return `/assets/${directory}`
}