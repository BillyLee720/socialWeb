import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
  IconButton,
  Divider,
  InputAdornment,
} from '@mui/material';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Navbar from 'Pages/navbar/navbar';
import * as yup from 'yup';
import { setProfile } from 'state';

//Typography為呈現文字的元件

const PasswordPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)'); //監聽css min-width 當寬度大於1000px為True
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const { palette } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const medium = palette.neutral.medium;

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const apiUrl = useSelector((state) => state.host);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const PasswordSchema = yup.object().shape({
    password: yup.string().required('required'),
    confirmPassword: yup.string().required('required'),
  });

  const handleFormSubmit = async (data, { setErrors }) => {
    const passwordConfirm = data.password === data.confirmPassword;
    if (passwordConfirm) {
      const response = await fetch(`${apiUrl}/profile/${_id}/password`, {
        method: 'PATCH',
        body: JSON.stringify(data),
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
            user: res,
          })
        );
        navigate('/home');
      }
    } else {
      setErrors({ confirmPassword: 'password not match' });
    }
  };
  return (
    <Box>
      <Navbar />
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        border="1.5px solid"
        borderColor={medium}
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Box display="flex" flexDirection="row">
          <IconButton onClick={() => navigate(`/userInfo`)}>
            <ArrowBack />
          </IconButton>
          <Typography fontWeight="500" variant="h3" sx={{ mb: '1.5rem' }}>
            Password
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={PasswordSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
            setErrors,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                sx={{
                  '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                }}
              >
                <TextField
                  label="New Password"
                  type={showPassword ? 'password' : 'text'}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: 'span 4' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Your Password"
                  type={showConfirmPassword ? 'password' : 'text'}
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="confirmPassword"
                  error={
                    Boolean(touched.confirmPassword) &&
                    Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: 'span 4' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box
                display="grid"
                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                gap="30px"
              >
                <Button
                  fullWidth
                  type="submit"
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
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
export default PasswordPage;
