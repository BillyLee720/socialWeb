import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Friend from "components/Friend";
import { useEffect, useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { useLocation } from "react-router-dom";
import Navbar from "Pages/navbar/navbar";
const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const apiUrl = useSelector((state) => state.host);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const [searchResults, setSearchResults] = useState([]);
  const SearchResults = async () => {
    const response = await fetch(`${apiUrl}/users/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: query }),
    });
    const results = await response.json();
    setSearchResults(results);
    console.log(results);
  };
  useEffect(() => {
    SearchResults();
  }, [query]);

  return (
    <Box>
      <Navbar />
      <Box
        width={isNonMobileScreens ? "70%" : "93%"}
        p="2rem"
        m="2rem auto"
        gap="0.5rem"
        justifyContent="space-between"
      >
        {" "}
        <WidgetWrapper>
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: "1.5rem" }}
          >
            Search Results
          </Typography>
          <Box display="flex" flexDirection="column" gap="1.5rem">
            {Array.isArray(searchResults) &&
              searchResults.map((user) => (
                <Friend
                  key={user._id}
                  friendId={user._id}
                  name={`${user.firstName} ${user.lastName}`}
                  subtitle={user.location}
                  userPicturePath={user.picturePath}
                />
              ))}
          </Box>
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default SearchPage;
