import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { ReactNode } from 'react';

type DialogProps = {
    open: boolean,
    onClose: () => void,
    handleDelete: () => void,
    title?: string,
    description: string | ReactNode
}

export function DeleteDialogWindow({ open, onClose, handleDelete, title, description }: DialogProps) {
    return (
        <Dialog maxWidth={'xs'} fullWidth open={open} onClose={onClose}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                {description}
            </DialogContent>
            <DialogActions sx={{ marginBottom: 1 }}>
                <Button size='small' color='error' variant='contained' onClick={handleDelete}>Delete</Button>
                <Button size='small' variant='outlined' onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
