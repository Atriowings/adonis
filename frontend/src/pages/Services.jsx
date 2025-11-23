// ====================================
import React from "react";
import { Box, Typography, Button, useMediaQuery, Paper } from "@mui/material";
import { motion } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";

const services = [
  {
    id: 1,
    title: "Staffing Solutions",
    desc: "We provide end-to-end staffing solutions for temporary, contract and permanent roles. From sourcing to onboarding, we help businesses manage workforce fluctuations efficiently.",
    icon: <GroupIcon sx={{ fontSize: { xs: 50, md: 70,lg:80  }, color: "#0b3c91" }} />,
    bg: "linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%)",
  },
  {
    id: 2,
    title: "Recruitment Services",
    desc: "Our recruitment team specializes in sourcing, screening and placing the right talent to meet business goals. Build strong, high-performing teams with ease.",
    icon: <WorkIcon sx={{ fontSize: { xs: 50, md: 70 ,lg:80 }, color: "#0b3c91" }} />,
    bg: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
  },
  {
    id: 3,
    title: "Executive Search",
    desc: "We conduct confidential executive searches for leadership roles like CEO, CFO and Director positions — ensuring visionary leaders for your organization’s success.",
    icon: <SearchIcon sx={{ fontSize: { xs: 50, md: 70, lg:80 }, color: "#0b3c91" }} />,
    bg: "linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%)",
  },
  {
    id: 4,
    title: "International Recruitment",
    desc: "Our global recruitment service connects organizations with skilled international talent, managing visa compliance, relocation and onboarding for smooth transitions.",
    icon: <PublicIcon sx={{ fontSize: { xs: 50, md: 70 ,lg:80 }, color: "#0b3c91" }} />,
    bg: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
  },
];

export default function Services() {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box sx={{ width: "100%", p: 0, m: 0 }}>
      {/* Top Hero Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          textAlign: "center",
          color: "#fff",
          background: "linear-gradient(135deg, #0b3c91, #004aad)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ fontSize: { xs: "2rem", md: "2rem", lg: "2rem" } }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              mt: 2,
              opacity: 0.9,
              fontSize: { xs: "1rem", md: "1.25rem", lg: "1.25rem" },
            }}
          >
            Empowering businesses through professional staffing, recruitment and workforce management solutions — across India and globally. 
          </Typography>
        </motion.div>
      </Box>

      {/* Services Cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, md: 6 },
          py: { xs: 5, md: 8 },
          px: { xs: 2, md: 8 },
          backgroundColor: "#f4f7fb",
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Paper
              elevation={6}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: "20px",
                background: service.bg,
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: index % 2 === 0 ? "row" : "row-reverse",
                },
                alignItems: "center",
                gap: { xs: 3, md: 6 },
                transition: "all 0.4s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: "100%", md: "30%" },
                }}
              >
                {service.icon}
              </Box>

              {/* Text Content */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    fontSize: { xs: "1.25rem", md: "1.5rem", lg: "1.70rem" },
                    color: "#0b3c91",
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.15rem", lg: "1.25rem" },
                    color: "#333",
                    mb: 3,
                    textAlign: "justify",
                    lineHeight: 1.7,
                  }}
                >
                  {service.desc}
                </Typography>
                {/* <Button
                  variant="contained"
                  sx={{
                    borderRadius: "30px",
                    textTransform: "none",
                    px: 3,
                    py: 1.2,
                    background: "linear-gradient(90deg, #0b3c91, #0073e6)",
                    color: "#fff",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(90deg, #003f7f, #005ecb)",
                    },
                  }}
                >
                  Learn More
                </Button> */}
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
