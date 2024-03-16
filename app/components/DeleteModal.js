import React from 'react';
import {Button, Modal} from "native-base";

const DeleteModal = ({showModal,closeModal,handleDelete}) => {
    return (
        <Modal isOpen={showModal}
               onClose={closeModal}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton/>
                <Modal.Header>یادداشت حذف شود؟</Modal.Header>
                {/*<Modal.Body>*/}
                {/*    آیا از حذف یادداشت مطمئنید؟*/}
                {/*</Modal.Body>*/}
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button colorScheme="error" onPress={closeModal}>
                            خیر
                        </Button>
                        <Button colorScheme="success" onPress={handleDelete}>
                            بله
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

export default DeleteModal;