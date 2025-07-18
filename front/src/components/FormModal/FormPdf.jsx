import React, { useState } from 'react'
import styled from 'styled-components'

import {useDropzone} from 'react-dropzone';
import useFetchFile from '../../hooks/useFetchFile'
const FormPdf = () => {
 
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [isFocus, setIsFocus] = useState(false);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
          {file.path} 
      </li>
  ));


  const { fetchFile, loading, error, success } = useFetchFile()

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    acceptedFiles.forEach(file => {
      formData.append('pdfs', file)
    });
    fetchFile(formData)
  }

  const onDragEnter = () => {
    setIsFocus(true);
  }

  const onDragLeave = () => {
    setIsFocus(false);
  }




  return (
    <FormContent onSubmit={handleSubmit}>
      <Left {...getRootProps({className: `dropzone ${isFocus ? 'focus' : ''}`, onDragEnter: onDragEnter, onDragLeave: onDragLeave,})}>
        <ContentForm>
          {
            !files.length && !isFocus && (
              <>
               <h3>Добавить файлы</h3>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-pdf" viewBox="0 0 16 16">
                  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
                  <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"/>
                </svg>
              </div>
              </>
            )}
            <input {...getInputProps()}  multiple accept='application/pdf' />
            <ul>{files}</ul>
        </ContentForm>
      </Left>
      <Right>
        {success && (
          <div className='success'>
            <div className='content-item'>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
              </svg>
            </div>
          </div>
          <h3>Файлы успешно добавлены!</h3>
          <p>Вы отправили на проверку {files.length} файлов </p>
          </div>
        )}
        {!success && (
          <>
            <h3>Файлы {files.length}</h3>
            <p>Вы можете добавить до 200 файлов за раз.</p>
            <button disabled={!files.length} type='submit' className={`${!files.length ? 'disabled' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
            Отправить на проверку
          </button>
          </>
        )}
      </Right>
      {loading && (
        <div className='loading'>
          <h3>Загрузка...</h3>
        </div>
      )}
    </FormContent>
  )
}



const Left = styled.div`
  width: 49%;
  height: 450px;
  padding: 20px;
  border-radius: 10px;
  border: 7px solid #2C314D;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`
const FormContent = styled.form`
  display: flex;
  justify-content: space-between;
  height: 100%;
  position: relative;
  .loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000050;
    backdrop-filter: blur(10px);
    z-index: 100;
  }
  .focus{
    border: 7px dashed #2563EB !important;
  }

  .disabled{
    background-color: #9CA3AF;
    cursor: not-allowed;
  }
  ul{
    list-style: none;
    display: flex;
    padding: 0;
    flex-wrap: wrap;
    gap: 2px;
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
  .success{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
`
const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .icon{
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #252A41;
  }
`
const Right = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .content-item{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 10px;
    padding: 10px;
    background-color: #242A42;
    gap: 10px;
  }

  h3{
    font-size: 19px;
    font-weight: 200;
    color: #22C55E;
    margin: 2px 0;
  }
  p{
    font-size: 12px;
    font-weight: 200;
    color: #fff;
    margin: 2px 0;
  }

  button{
    width: 200px;
    margin: 10px 0;
    height: 40px;
    border-radius: 10px;
    background-color: #2563EB;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

`


export default FormPdf