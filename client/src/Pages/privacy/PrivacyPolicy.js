import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import { FaPrint, FaDownload, FaChevronRight } from "react-icons/fa";

const HeaderWrapper = styled(Paper)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1000,
  padding: "1rem",
  backgroundColor: "#1976D2",
  color: "#ffffff",
}));

const ContentSection = styled(Box)({
  marginBottom: "2rem",
  "&:hover": {
    "& .section-icon": {
      transform: "translateX(5px)",
      transition: "transform 0.3s ease",
    },
  },
});

const PrivacyPolicy = () => {
  const [lastUpdated] = useState("December 15, 2023");

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    {
      title: "Interpretation and Definitions",
      content:
        "These Privacy Policy (\"Policy\") terms have specific meanings. When we say 'Services', we mean our digital platforms and products. 'Personal Data' refers to any information that can identify you.",
    },
    {
      title: "Types of Data Collected",
      content:
        "We collect various types of data including but not limited to: personal identification information (name, email, phone number), usage data, and device information.",
    },
    {
      title: "Use of Personal Data",
      content:
        "Your data helps us provide and improve our Services. We use it to maintain your account, send updates, and enhance security.",
    },
    {
      title: "Data Retention and Transfer",
      content:
        "We retain your data as long as necessary for the purposes outlined in this Policy. Data may be transferred internationally with appropriate safeguards.",
    },
    {
      title: "User Rights",
      content:
        "You have the right to access, correct, or delete your personal data. You can also object to processing and request data portability.",
    },
    {
      title: "Security Measures",
      content:
        "We implement appropriate technical and organizational measures to protect your data against unauthorized access or processing.",
    },
    {
      title: "Children's Privacy",
      content:
        "Our Services are not intended for children under 13. We do not knowingly collect data from children.",
    },
    {
      title: "Contact Information",
      content:
        "For privacy-related inquiries, contact us at: privacy@socialweb.com",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <HeaderWrapper>
        <Container>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" component="h1" gutterBottom>
                SocialWeb
              </Typography>
              <Typography variant="subtitle1">
                Privacy Policy (Last Updated: {lastUpdated})
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={handlePrint}
                aria-label="Print policy"
                sx={{ color: "white" }}
              >
                <FaPrint />
              </IconButton>
              <IconButton aria-label="Download PDF" sx={{ color: "white" }}>
                <FaDownload />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </HeaderWrapper>

      <Container sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "#1976D2" }}
          >
            Privacy Policy
          </Typography>

          {sections.map((section, index) => (
            <React.Fragment key={index}>
              <ContentSection>
                <Box display="flex" alignItems="center">
                  <FaChevronRight
                    className="section-icon"
                    style={{ marginRight: "10px", color: "#1976D2" }}
                  />
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ color: "#333333" }}
                  >
                    {section.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: "#333333", ml: 4 }}
                >
                  {section.content}
                </Typography>
              </ContentSection>
              {index < sections.length - 1 && <Divider sx={{ my: 3 }} />}
            </React.Fragment>
          ))}

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<FaPrint />}
              onClick={handlePrint}
              sx={{ mr: 2 }}
            >
              Print Policy
            </Button>
            <Button
              variant="outlined"
              startIcon={<FaDownload />}
              href="/privacy-policy.pdf"
              download
            >
              Download PDF
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
