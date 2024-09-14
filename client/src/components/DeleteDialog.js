import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Divider,
} from "@mui/material";

const DeleteDialog = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete this post ?</DialogTitle>
      <Divider />
      <DialogContent>Please make sure to delete this post ?</DialogContent>
      <DialogActions>
        <Button onClick={onDelete} variant="contained">
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
