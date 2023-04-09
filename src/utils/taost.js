export const setToast=(toast,status,description)=>{
    toast({
        description,
        status,
        duration:2000,
        isClosable: true,
        position: 'top'
    });
}