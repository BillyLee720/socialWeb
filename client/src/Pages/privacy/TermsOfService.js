import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Modal,
  LinearProgress,
  Fab,
  Divider,
  Switch,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaArrowUp, FaPrint } from "react-icons/fa";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const ScrollProgress = styled(LinearProgress)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  height: 4,
}));

const ScrollTopButton = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(4),
  right: theme.spacing(4),
}));

const TermsOfService = () => {
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setProgress(progress);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
    },
    {
      title: "2. User Rights and Responsibilities",
      content:
        "Users must be 13 years or older to access our services. Users are responsible for maintaining the confidentiality of their account information.",
    },
    {
      title: "3. Intellectual Property",
      content:
        "All content on this website, including text, graphics, logos, and software, is the property of our company and protected by intellectual property laws.",
    },
    {
      title: "4. Limitation of Liability",
      content:
        "We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services.",
    },
    {
      title: "5. Termination Clause",
      content:
        "We reserve the right to terminate or suspend access to our services without prior notice for violations of these terms.",
    },
    {
      title: "6. Privacy Policy Reference",
      content:
        "Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and protect your data.",
    },
  ];

  return (
    <Box>
      <ScrollProgress variant="determinate" value={progress} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              Terms of Service
            </Typography>
            <Box>
              <Button
                startIcon={<FaPrint />}
                onClick={handlePrint}
                sx={{ mr: 2 }}
                variant="outlined"
              >
                Print
              </Button>
              <Typography component="span" sx={{ mr: 1 }}>
                Text Size
              </Typography>
              <Switch
                onChange={(e) => setFontSize(e.target.checked ? 20 : 16)}
                color="primary"
              />
            </Box>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Last Updated: {new Date().toLocaleDateString()}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {sections.map((section, index) => (
            <Box key={index} mb={4} sx={{ fontSize }}>
              <Typography variant="h5" gutterBottom>
                {section.title}
              </Typography>
              <Typography paragraph>{section.content}</Typography>
            </Box>
          ))}

          <Box display="flex" justifyContent="center" gap={2} mt={6}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setOpenModal(true)}
            >
              Accept Terms
            </Button>
            <Button variant="outlined" color="error" size="large">
              Decline
            </Button>
          </Box>
        </StyledPaper>
      </Container>

      {showScrollTop && (
        <ScrollTopButton
          size="small"
          color="primary"
          onClick={handleScrollTop}
          aria-label="scroll to top"
        >
          <FaArrowUp />
        </ScrollTopButton>
      )}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="confirmation-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Confirm Acceptance
          </Typography>
          <Typography paragraph>
            By clicking confirm, you acknowledge that you have read and agree to
            our Terms of Service.
          </Typography>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpenModal(false)}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TermsOfService;
