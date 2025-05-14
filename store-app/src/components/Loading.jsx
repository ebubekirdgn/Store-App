import { Backdrop, Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { keyframes } from "@emotion/react";

// Dönen animasyon efekti
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Hafifçe yukarı-aşağı sıçrama animasyonu
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export default function Loading({ message = "Loading..." }) {
  const theme = useTheme();

  return (
    <Backdrop
      open={true}
      sx={{
        background: theme.palette.background.default,
        zIndex: theme.zIndex.modal + 1,
        display: "flex",
        flexDirection: "column",
        gap: 4
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2
        }}
      >
        {/* Daha büyük ve animasyonlu progress */}
        <Box
          sx={{
            position: "relative",
            width: 80,
            height: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress
            thickness={3}
            size={80}
            color="primary"
            sx={{
              animation: `${spin} 1.5s linear infinite`,
            }}
          />
          {/* İçinde ikinci bir animasyonlu daire */}
          <CircularProgress
            thickness={3}
            size={60}
            color="secondary"
            sx={{
              position: "absolute",
              animation: `${spin} 1s linear infinite reverse`,
            }}
          />
        </Box>

        {/* Animasyonlu metin */}
        <Typography
          variant="h6"
          color="text.primary"
          sx={{
            fontWeight: "medium",
            animation: `${bounce} 2s ease infinite`,
            textAlign: "center",
            maxWidth: "80%",
            margin: "0 auto"
          }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}