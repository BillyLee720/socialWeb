import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import Navbar from 'Pages/navbar/navbar';
//Typography為呈現文字的元件

const InfoPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)'); //監聽css min-width 當寬度大於1000px為True
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const user = useSelector((state) => state.user);
  const primaryLight = theme.palette.primary.light;

  console.log(user);

  return (
    <Box>
      <Navbar />
      <Box display="flex" flexDirection="column">
        <Box
          width={isNonMobileScreens ? '50%' : '93%'}
          p="2rem"
          m="2rem auto"
          border="1.5px solid"
          borderColor={medium}
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h3" sx={{ mb: '1.5rem' }}>
            Information
          </Typography>
          {/* Icon */}
          <Box
            onClick={() => {
              navigate(`/profile/`);
            }}
            sx={{
              '&:hover': {
                cursor: 'pointer',
                color: primaryLight,
              },
              p: '1rem 0',
            }}
          >
            <FlexBetween gap="1rem" mb="1rem">
              <FlexBetween gap="3rem">
                <Typography fontSize="large" sx={{ color: main }}>
                  Icon
                </Typography>
                <Typography color={main}>Change Your Icon</Typography>
              </FlexBetween>
              <UserImage image={user.picturePath} />
            </FlexBetween>
          </Box>
          <Divider />

          {/* User Name */}
          <Box
            onClick={() => {
              navigate(`/profile/name`);
            }}
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
              p: '1rem 0',
            }}
          >
            <FlexBetween gap="1rem" mb="0.5rem">
              <FlexBetween gap="3rem">
                <Typography fontSize="large" sx={{ color: main }}>
                  Your Name
                </Typography>
                <Typography color={main} fontSize="medium">
                  {user.firstName} , {user.lastName}
                </Typography>
              </FlexBetween>
              <NavigateNext fontSize="large" sx={{ color: main }} />
            </FlexBetween>
          </Box>
          <Divider />
          {/* Password */}
          <Box
            onClick={() => {
              navigate(`/profile/`);
            }}
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
              p: '1rem 0',
            }}
          >
            <FlexBetween gap="1rem" mb="0.5rem">
              <FlexBetween gap="3rem">
                <Typography fontSize="large" sx={{ color: main }}>
                  Password
                </Typography>
                <Typography color={main}>Change Password</Typography>
              </FlexBetween>
              <NavigateNext fontSize="large" sx={{ color: main }} />
            </FlexBetween>
          </Box>
          <Divider />
          {/* Email */}
          <Box
            onClick={() => {
              navigate(`/profile/`);
            }}
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
              p: '1rem 0',
            }}
          >
            <FlexBetween gap="1rem" mb="0.5rem">
              <FlexBetween gap="3rem">
                <Typography fontSize="large" sx={{ color: main }}>
                  Email
                </Typography>
                <Typography color={main} fontSize="medium">
                  {user.email}
                </Typography>
              </FlexBetween>
              <NavigateNext fontSize="large" sx={{ color: main }} />
            </FlexBetween>
          </Box>
          <Divider />
          {/* location */}
          <Box
            onClick={() => {
              navigate(`/profile/location`);
            }}
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
              p: '1rem 0',
            }}
          >
            <FlexBetween gap="1rem" mb="0.5rem">
              <FlexBetween gap="3rem">
                <Typography fontSize="large" sx={{ color: main }}>
                  Location
                </Typography>
                <Typography color={main} fontSize="medium">
                  {user.location}
                </Typography>
              </FlexBetween>
              <NavigateNext fontSize="large" sx={{ color: main }} />
            </FlexBetween>
          </Box>
          <Divider />
          {/* occupation */}
          <Box
            onClick={() => {
              navigate(`/profile/occupation`);
            }}
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
              p: '1rem 0',
            }}
          >
            <FlexBetween gap="1rem" mb="0.5rem">
              <FlexBetween gap="3rem">
                <Typography fontSize="large" sx={{ color: main }}>
                  Occupation
                </Typography>
                <Typography color={main} fontSize="medium">
                  {user.occupation}
                </Typography>
              </FlexBetween>
              <NavigateNext fontSize="large" sx={{ color: main }} />
            </FlexBetween>
          </Box>
        </Box>
        <Box
          width={isNonMobileScreens ? '50%' : '93%'}
          p="2rem"
          m="2rem auto"
          border="1.5px solid"
          borderColor={medium}
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h3" sx={{ mb: '1.5rem' }}>
            Platform
          </Typography>
          {/* Twitter */}
          <Box
            onClick={() => {
              navigate(`/profile/`);
            }}
            sx={{
              '&:hover': {
                cursor: 'pointer',
                color: primaryLight,
              },
              p: '1rem 0',
            }}
          >
            <FlexBetween gap="1rem" mb="1rem">
              <FlexBetween gap="3rem">
                <Typography fontSize="large" sx={{ color: main }}>
                  Icon
                </Typography>
                <Typography color={main}>Change Your Icon</Typography>
              </FlexBetween>
              <UserImage image={user.picturePath} />
            </FlexBetween>
          </Box>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};
export default InfoPage;
