const generateRandomString = require("./generateRandomString")

const imageNameFormater = (ownerId, name) => {
    const extensions = /\.\w+$/
    const fileExt = extensions.exec(name)[0] 
    const randomString = generateRandomString(8)
    const fileName = `${ownerId}.${randomString}${fileExt}`

    console.log(fileName)
    
    return fileName
}

module.exports = imageNameFormater