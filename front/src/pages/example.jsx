import React, {useState} from 'react'
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
const example = () => {
  const [filesList, setFilesList] = useState([]);

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} 
        </li>
      ));

      const handleFiles = (e) => {
        setFilesList(e.target.filesList);
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        setFilesList(files);
      }
      console.log(files);
  return (
    <Section className="container">
      <form action="" onSubmit={handleSubmit}>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} onChange={handleFiles} multiple />
          <ul>{files}</ul>
          {
            !files.length && (
              <h1>Drag 'n' drop some files here, or click to select files</h1>
            )
          }
        </div>
        <button type="submit">Submit</button>
      </form>
      </Section>
  )
}
const Section = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .dropzone{
        width: 500px;
        height: 200px;
        border: 1px dashed #000;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        ul{
            list-style: none;
            display: flex;
            padding: 0;
            flex-wrap: wrap;
            gap: 10px;
            overflow-y: auto;
            li{
              padding: 10px;
              border: 1px solid #000;
              border-radius: 10px;
              margin-bottom: 10px;
              background-color: #f0f0f0;
              color: #000;
              font-size: 8px;
              max-width: 200px;
              text-align: center;
            }
        }
    }
`
export default example
