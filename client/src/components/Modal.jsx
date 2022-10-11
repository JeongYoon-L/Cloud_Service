import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(props.isModalOpen);
    console.log(props.isModalOpen)
    console.log(open)
    const handleOpen = () => setOpen(props.isModalOpen);
    const handleClose = () => {
        setOpen(false);
        props.isModalReqAddClickedPage(false);
    }



    return (
        <>
            {/* <Button onClick={handleOpen} style={{float:"right"}}>{props.icon}</Button> */}
            <Modal
                open={props.isModalOpen}
                onClose={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
                <Box sx={style}>
                <Button onClick={handleClose}>X</Button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
