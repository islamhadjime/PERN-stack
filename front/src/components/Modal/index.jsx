import React from 'react'
import styled from 'styled-components'


const index = ({children, open, onClose}) => {
  return (
    <Modal>
      <ModalContent>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalClose onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
        </ModalClose>
      </ModalContent>
    </Modal>
  )
}
const Modal = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ModalContent = styled.div`
    position: relative;
    width: 70%;
    height: 500px;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #1A1D2D;
`
const ModalBody = styled.div`
    padding: 20px;
`
const ModalClose = styled.div`
    position: absolute;
    top: -20px;
    right: -40px;
    cursor: pointer;
`

export default index
