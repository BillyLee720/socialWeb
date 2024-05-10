import { Box } from '@mui/material';

const UserImage = ({ image, size = '60px', apiUrl }) => {
  const isLocalPath = image && !image.startsWith('http');
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={isLocalPath ? `${apiUrl}/assets/${image}` : image}
      />
    </Box>
  );
};

export default UserImage;
