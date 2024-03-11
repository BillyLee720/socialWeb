import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';
import { useEffect } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

//Typography為呈現文字的元件

// const GoogleLogin = () => {

const LoginPage = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)'); //監聽css min-width 當寬度大於1000px為True
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          SocialWeb
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
        <Form></Form>
        <button onClick={() => login()}>Google </button>;
      </Box>
    </Box>
  );
};
export default LoginPage;
