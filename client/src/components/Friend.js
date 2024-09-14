import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { create } from "@mui/material/styles/createTransitions";
import React, { useState } from "react";

const Friend = ({ friendId, name, subtitle, userPicturePath, createdAt }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends); //object
  const apiUrl = useSelector((state) => state.host);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const friendIds = friends.map((friend) => friend._id);
  // console.log(friendIds);
  const isFriend = Array.isArray(friendIds)
    ? friendIds.includes(friendId)
    : false;
  const inPerson = friendId === _id;

  const patchFriend = async () => {
    const response = await fetch(`${apiUrl}/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} url={apiUrl} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": { color: palette.primary.light, cursor: "pointer" },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {createdAt ? (
              <>
                {createdAt} , {subtitle}
              </>
            ) : (
              <>{subtitle}</>
            )}
          </Typography>
        </Box>
      </FlexBetween>
      {!inPerson && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
