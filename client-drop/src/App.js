import React, { useState, useRef } from 'react'
import {Container, Header, Button, Card} from 'semantic-ui-react'
import {useDropzone} from 'react-dropzone'
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import CardImage from './components/ImageCard'

function App() {
  const [ imageArray, setImageArray ] = useState()

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    noKeyboard: true,
    noClick: true,
    onDrop: acceptedFiles => {
        setImageArray(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }
            ))
        )
    }
  })

  const uploadImageRef = useRef()

  const handleSubmit = (e) => {
      const fileList = Array.from(e.target.files)
      setImageArray(fileList)
  }
  const handleSubmitDrop = () => {
      const fileList = Array.from(acceptedFiles)
      setImageArray(fileList)
  }

  return (
    <Container textAlign="center" className="app">
      <Header as="h1">
        Hi this is the app where you can upload your images
      </Header>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps() } onChange={handleSubmitDrop} />
        <Header as="h2" icon>
          Drop Here Your Images
          <Header.Subheader>
            or you can click on the buttons below
          </Header.Subheader>
        </Header>
      </div>
      <form style={{display: "none"}}>
        <input type="file" multiple onChange={handleSubmit} accept="image/*" ref={uploadImageRef}/>
      </form>
      <Container className="buttonsContainer">
        <Button primary animated="fade" onClick={() => {uploadImageRef.current.click()}}>
          <Button.Content visible>Click here to upload your images</Button.Content>
          <Button.Content hidden>select one or many</Button.Content>
        </Button>
        <Button 
          secondary 
          animated="fade" 
          disabled={!Array.isArray(imageArray)} 
          onClick={() => {setImageArray(null)}}
        >
          <Button.Content visible>click here to remove all Images</Button.Content>
          <Button.Content hidden>click here to remove</Button.Content>
        </Button>
      </Container>
      <Card.Group centered>
        { imageArray && imageArray.map(img => <CardImage file={img} key={img.name}/>)} 
      </Card.Group>
    </Container>
  );
}

export default App;
