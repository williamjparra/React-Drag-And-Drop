import React, { useState, useEffect } from 'react'
import {Button, Container, Image, Card, Progress, Message} from 'semantic-ui-react'
import axios from 'axios'
import Loading from './LoadingComponent'
import './card.css'

export default function ImageCard(props) {
    const [imageState, setImageState] = useState()
    const [imgSrc, setImgSrc] = useState()
    const [progress, setProgress] = useState()
    const [uploaded, setUploaded] = useState(false)
    const [errorMessage, setErrorMessage] = useState("no se pudo cargar la imgen")

    const filename = props.file.name

    useEffect(() => {
        const imageSrc = () => {
            const reader = new FileReader();
            reader.onloadstart = (e) => {
                setImageState("loading")
            }
            reader.onload = (e) => {
                setImageState("data")
                setImgSrc(e.target.result)    
            }
            reader.readAsDataURL(props.file)
            setImageState("data")
        }
        imageSrc()

    }, [props.file])

    const UploadImage = async () => {
        const file = new FormData()
        file.append('file', props.file)

        setProgress('0')

        await axios.post('http://localhost:5055/upload?filename=WilliamDev',
            file,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: data => {
                    setProgress(Math.round((100 * data.loaded) / data.total))
                }
            }
        ).then(response => {
            console.log(response.data)
            setUploaded(true)
        }).catch(() => {
            setErrorMessage("error no se pudo subir la imagen intente mas tarde")
            setImageState("error")
        })
    }

    const removeImageHandler = () => {
        setImgSrc(null)
        setImageState("removed")
    }
    
    if(imageState === "loading") {
        return <Loading className="imageCard"/>
    }


    if(imageState === "error") {
        return <Card>
            <Message negative>
                <Message.Header>
                    {errorMessage}
                </Message.Header>
            </Message>
        </Card>
    }

    if(imageState === "removed") {
        return ""
    }

    if(filename === null) {
        return <Card>
            <Message negative 
                header="Error, no image to preview"
                list={[
                "Check the file that you want to upload",
                "This input is only for images",
                "Please remove this image and try again"
                ]}
            />
            <Button animated="fade" secondary onClick={removeImageHandler}>
                <Button.Content visible>Clik here to remove Image</Button.Content>
                <Button.Content hidden>you will remove this image</Button.Content>
            </Button>
        </Card>
    }

    return (
        <Card className="imageCard"> 
            <h3>
                {props.file.name}
            </h3>
            {imgSrc && <Image wrapped src={imgSrc} alt={filename} className="card-Img"/>}
            <Container textAlign="center" className="imageButtons">
                <Button animated="fade" primary disabled={uploaded} onClick={UploadImage}>
                    <Button.Content visible>Upload image</Button.Content>
                    <Button.Content hidden>Upload this image</Button.Content>
                </Button>
                <Button animated="fade" secondary onClick={removeImageHandler}>
                    <Button.Content visible>remove Image</Button.Content>
                    <Button.Content hidden>remove this image</Button.Content>
                </Button>
            </Container>
            <Container className="progessBarContainer">
                {progress && <Progress percent={progress} autoSuccess/>}
            </Container>
        </Card>
    )
}
