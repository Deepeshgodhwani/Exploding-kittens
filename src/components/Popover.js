import React, { useEffect } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

function Popover(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { popupData, setPopupVisible } = props;
  const cancelRef = React.useRef();

  useEffect(() => {
    onOpen();
    // eslint-disable-next-line
  }, []);

  const ClosePopOver = () => {
    setPopupVisible(false);
    onClose();
  };

  return (
    <div>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent
          backgroundColor={"rgb(244,245,255)"}
          width={"15rem"}
        >
          <div className="flex items-center py-8 px-2 flex-col space-y-7 text-black">
            <p className="font-bold text-2xl">{popupData.message}</p>
            <button
              className="bg-blue-400 px-6 font-semibold py-2 rounded-md"
              ref={cancelRef}
              onClick={ClosePopOver}
            >
              {popupData.btnText}
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Popover;
