import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
  IconButton,
  Divider,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Navbar from 'Pages/navbar/navbar';
import * as yup from 'yup';
import { setProfile, setPosts } from 'state';

//Typography為呈現文字的元件

const EditNamePage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)'); //監聽css min-width 當寬度大於1000px為True
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const { palette } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const medium = palette.neutral.medium;

  const user = useSelector((state) => state.user);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const apiUrl = useSelector((state) => state.host);

  const initialValuesName = {
    firstName: `${user.firstName}`,
    lastName: `${user.lastName}`,
  };
  const NameSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
  });

  const handleFormSubmit = async (data) => {
    const response = await fetch(`${apiUrl}/profile/${_id}/name`, {
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
          user: res.user,
        }),
        setPosts({
          posts: res.posts,
        })
      );
      navigate('/home');
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
            Name
          </Typography>
        </Box>
        <Formik
          initialValues={initialValuesName}
          onSubmit={handleFormSubmit}
          validationSchema={NameSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
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
                  label="First Name"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Last Name"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 4' }}
                />
              </Box>
              <Box>
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
export default EditNamePage;
