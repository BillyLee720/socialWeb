import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { NavigateNext, Delete, Edit, Google } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import Navbar from 'Pages/navbar/navbar';
import Dropzone from 'react-dropzone';
import { setProfile, setPosts } from 'state';

//Typography為呈現文字的元件

const InfoPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)'); //監聽css min-width 當寬度大於1000px為True
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const apiUrl = useSelector((state) => state.host);

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const user = useSelector((state) => state.user);
  const primaryLight = theme.palette.primary.light;
  const [showDropzone, setShowDropzone] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pictureValue, setPictureValue] = useState(null);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setShowDropzone(false);
    setOpenModal(false);
    setPictureValue(null);
  };
  const changeIcon = () => {
    setShowDropzone(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('picture', pictureValue);
    // formData.append('picturePath', pictureValue.name);

    const response = await fetch(`${apiUrl}/profile/${_id}/avatar`, {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    console.log(res);
    if (res) {
      dispatch(
        setProfile({
          user: res.user,
        }),
        setPosts({
          posts: res.posts,
        })
      );
      navigate('/home');
    }
  };
  const removeIcon = async () => {
    const response = await fetch(`${apiUrl}/profile/${_id}/avatar`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    console.log(res);
    if (res) {
      dispatch(
        setProfile({
          user: res.user,
        }),
        setPosts({
          posts: res.posts,
        })
      );
      navigate('/home');
    }
  };

  // const getLink = async () => {
  //   const platform = await fetch(`${apiUrl}/${_id}/link`, {
  //     method: 'GET',
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  // };

  // useEffect(() => {
  //   getLink();
  // }, []);
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
            onClick={handleOpen}
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
              <UserImage image={user.picturePath} apiUrl={apiUrl} />
            </FlexBetween>
          </Box>
          <Divider />
          {/* Email */}
          <Box
            onClick={() => {}}
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
              navigate(`/profile/password`);
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
          {/* Google */}
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
                  Google
                </Typography>
                <Typography color={main}>Change Your Icon</Typography>
              </FlexBetween>
              <Google fontSize="large" sx={{ color: main }} />
            </FlexBetween>
          </Box>
          <Divider />
        </Box>
      </Box>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Profile picture</DialogTitle>
        {showDropzone ? (
          <form onSubmit={handleSubmit}>
            <Box
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFile=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setPictureValue(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!pictureValue ? (
                      <p>Add Picture Here ( .JPG/.JPEG/.PNG )</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{pictureValue.name}</Typography>
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
              <Box
                display="grid"
                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                gap="30px"
              >
                <Button
                  fullWidth
                  type="submit"
                  disabled={!pictureValue}
                  sx={{
                    m: '2rem 0',
                    p: '1rem',
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    '&:hover': { color: palette.primary.main },
                    gridColumn: 'span 2',
                  }}
                >
                  Update
                </Button>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: '2rem 0',
                    p: '1rem',
                    border: '1.5px solid',
                    borderColor: palette.primary.main,
                    backgroundColor: palette.background.alt,
                    '&:hover': { color: palette.primary.main },
                    gridColumn: 'span 2',
                  }}
                  onClick={() => {
                    navigate(`/userInfo`);
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        ) : (
          <>
            <DialogContent>
              <Typography>
                Use bottom to change your profile picture or remove
              </Typography>
              <UserImage image={user.picturePath} apiUrl={apiUrl} />
            </DialogContent>
            <DialogActions>
              <FlexBetween>
                <IconButton onClick={changeIcon}>
                  <Edit />
                  <Typography>Change</Typography>
                </IconButton>
                <IconButton onClick={removeIcon}>
                  <Delete />
                  <Typography>Remove</Typography>
                </IconButton>
              </FlexBetween>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};
export default InfoPage;
