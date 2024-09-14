import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  MoreHoriz,
  Edit,
  Delete,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { formatDistanceToNow } from "date-fns";
import PostDialog from "components/PostDialog";
import DeleteDialog from "components/DeleteDialog";
import { Navigate, useNavigate } from "react-router-dom";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const apiUrl = useSelector((state) => state.host);
  const navigate = useNavigate();

  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const isLocalPath = picturePath && !picturePath.startsWith("http");
  const relativeTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: false,
  });

  const inPerson = postUserId === loggedInUserId;
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editData, setEditData] = useState(description);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  //post menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // edit post
  const handleEdit = () => {
    setIsEditing(true);
    setAnchorEl(null);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditData(description);
  };
  const handleSave = async () => {
    if (editData === description) {
      handleCancel();
      return;
    }
    const response = await fetch(`${apiUrl}/posts/${postId}/edit`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: editData }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setIsEditing(false);
  };

  // delete post
  const openDeleteDialog = () => {
    setIsDelete(true);
    setAnchorEl(null);
  };
  const closeDelete = () => {
    setIsDelete(false);
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate(0);
    setIsEditing(false);
  };

  const patchLike = async () => {
    const response = await fetch(`${apiUrl}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatePost = await response.json();
    dispatch(setPost({ post: updatePost }));
  };
  return (
    <WidgetWrapper m="2rem 0">
      <FlexBetween>
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
          createdAt={relativeTime}
        />
        {inPerson && (
          <Box>
            <IconButton onClick={handleClick}>
              <MoreHoriz />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleEdit}>
                <ListItemIcon disableRipple>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit Post</ListItemText>
              </MenuItem>
              <MenuItem onClick={openDeleteDialog}>
                <ListItemIcon disableRipple>
                  <Delete fontSize="small" />
                </ListItemIcon>
                <ListItemText> Delete</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </FlexBetween>

      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={isLocalPath ? `${apiUrl}/assets/${picturePath}` : picturePath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* Like */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* Comment */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
      <PostDialog
        open={isEditing}
        onClose={handleCancel}
        onSave={handleSave}
        value={editData}
        setValue={setEditData}
        friendId={postUserId}
        name={name}
        userPicturePath={userPicturePath}
        imageUrl={isLocalPath ? `${apiUrl}/assets/${picturePath}` : picturePath}
      />
      <DeleteDialog
        open={isDelete}
        onClose={closeDelete}
        onDelete={handleDelete}
      />
    </WidgetWrapper>
  );
};
export default PostWidget;
