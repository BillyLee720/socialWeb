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
import Friend from "./Friend";

const PostDialog = ({
  open,
  onClose,
  onSave,
  value,
  setValue,
  friendId,
  name,
  userPicturePath,
  imageUrl,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontSize: "1.5rem" }}>
        Edit Post
      </DialogTitle>
      <Divider />

      <DialogContent>
        <Friend
          friendId={friendId}
          name={name}
          userPicturePath={userPicturePath}
        />
        <div style={{ margin: "1rem 0" }}></div>
        <TextField
          fullWidth
          rows={4}
          variant="standard"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ border: "none" }}
        />
        {imageUrl && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 2, // 添加上下間距
            }}
          >
            <img
              src={imageUrl}
              alt="Post Image"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "0.75rem",
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave} variant="contained">
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
