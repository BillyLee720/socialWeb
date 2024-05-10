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
import { setProfile } from 'state';

//Typography為呈現文字的元件

const OccupationPage = () => {
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

  const initialValuesOccupation = {
    occupation: user.occupation === null ? '' : `${user.occupation}`,
  };

  const OccupationSchema = yup.object().shape({
    occupation: yup.string(),
  });

  const handleFormSubmit = async (data) => {
    const sameData =
      data.occupation === user.occupation ||
      (data.occupation === '' && user.occupation === null);

    console.log(sameData);
    if (sameData) {
      navigate(`/userInfo`);
    } else {
      const response = await fetch(`${apiUrl}/profile/${_id}/occupation`, {
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
            Occupation
          </Typography>
        </Box>
        <Formik
          initialValues={initialValuesOccupation}
          onSubmit={handleFormSubmit}
          validationSchema={OccupationSchema}
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
                  label="Occupation"
                  value={values.occupation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: 'span 4' }}
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
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
export default OccupationPage;
