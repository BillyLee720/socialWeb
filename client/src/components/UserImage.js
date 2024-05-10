import { Box } from '@mui/material';

const UserImage = ({ image, size = '60px', url }) => {
  const isLocalPath = image && !image.startsWith('http');
  const web = process.env.NODE_ENV;
  let imageUrl = '';

  if (web === 'development') {
    //local內部資料夾
    if (image && !image.startsWith('http')) {
      imageUrl = `${url}/assets/${image}`;
    } else {
      //local 外部來源
      imageUrl = image;
    }
  } else {
    // Production端內部
    if (image && !image.startsWith('http')) {
      imageUrl = `${url}/assets/${image}`;
    } else {
      imageUrl = `${image}`;
    }
  }
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={imageUrl}
      />
    </Box>
  );
};

export default UserImage;
