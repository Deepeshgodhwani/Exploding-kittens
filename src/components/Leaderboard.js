import React, { useEffect, useState } from 'react'


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'

function Leaderboard() {
    const { isOpen, onOpen, onClose } = useDisclosure()
        
        
     useEffect(()=>{
         
     },[])

     
  return (
    <div> 
        <p className='cursor-pointer font-bold text-lg ' onClick={onOpen}>Leaderboard</p>
         <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent position={"relative"} backgroundColor="transparent">
         <div className='bg-[rgb(155,5,21)] w-full z-0 absolute h-full rounded-md opacity-80'></div>
            <div className='px-4 text-white font-bold text-2xl py-2 z-10 flex items-center'>
             <p>Leaderboard </p>
            <ModalCloseButton />
            </div>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Leaderboard