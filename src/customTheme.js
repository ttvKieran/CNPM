import { createTheme } from '@mui/material/styles';

export const getCustomTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#2196F3' : '#121212',
      light: mode === 'light' ? '#64B5F6' : '#333333',
      dark: mode === 'light' ? '#1976D2' : '#000000',
      contrastText: mode === 'light' ? '#FFFFFF' : '#FFFFFF',
    },
    secondary: {
      main: mode === 'light' ? '#FF4081' : '#FFFFFF',
      light: mode === 'light' ? '#FF80AB' : '#F5F5F5',
      dark: mode === 'light' ? '#C2185B' : '#CCCCCC',
      contrastText: mode === 'light' ? '#FFFFFF' : '#121212',
    },
    background: {
      default: mode === 'light' ? '#F8FAFF' : '#0A0A0A',
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#333333' : '#FFFFFF',
      secondary: mode === 'light' ? '#666666' : '#CCCCCC',
    },
    divider: mode === 'light' ? '#E3F2FD' : '#333333',
    success: {
      main: mode === 'light' ? '#4CAF50' : '#66BB6A',
    },
    warning: {
      main: mode === 'light' ? '#FF9800' : '#FFA726',
    },
    error: {
      main: mode === 'light' ? '#F44336' : '#EF5350',
    },
    info: {
      main: mode === 'light' ? '#2196F3' : '#42A5F5',
    },
  },
  
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01562em',
      background: mode === 'light' 
        ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
        : 'linear-gradient(45deg, #FFFFFF 30%, #CCCCCC 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },

  shape: {
    borderRadius: 16,
  },

  shadows: mode === 'light' ? [
    'none',
    '0px 2px 8px rgba(33, 150, 243, 0.1)',
    '0px 4px 16px rgba(33, 150, 243, 0.12)',
    '0px 6px 24px rgba(33, 150, 243, 0.14)',
    '0px 8px 32px rgba(33, 150, 243, 0.16)',
    '0px 12px 40px rgba(33, 150, 243, 0.18)',
    '0px 16px 48px rgba(33, 150, 243, 0.2)',
    '0px 20px 56px rgba(33, 150, 243, 0.22)',
    '0px 24px 64px rgba(33, 150, 243, 0.24)',
    '0px 28px 72px rgba(33, 150, 243, 0.26)',
    '0px 32px 80px rgba(33, 150, 243, 0.28)',
    '0px 36px 88px rgba(33, 150, 243, 0.3)',
    '0px 40px 96px rgba(33, 150, 243, 0.32)',
    '0px 44px 104px rgba(33, 150, 243, 0.34)',
    '0px 48px 112px rgba(33, 150, 243, 0.36)',
    '0px 52px 120px rgba(33, 150, 243, 0.38)',
    '0px 56px 128px rgba(33, 150, 243, 0.4)',
    '0px 60px 136px rgba(33, 150, 243, 0.42)',
    '0px 64px 144px rgba(33, 150, 243, 0.44)',
    '0px 68px 152px rgba(33, 150, 243, 0.46)',
    '0px 72px 160px rgba(33, 150, 243, 0.48)',
    '0px 76px 168px rgba(33, 150, 243, 0.5)',
    '0px 80px 176px rgba(33, 150, 243, 0.52)',
    '0px 84px 184px rgba(33, 150, 243, 0.54)',
    '0px 88px 192px rgba(33, 150, 243, 0.56)',
  ] : [
    'none',
    '0px 2px 8px rgba(0, 0, 0, 0.3)',
    '0px 4px 16px rgba(0, 0, 0, 0.35)',
    '0px 6px 24px rgba(0, 0, 0, 0.4)',
    '0px 8px 32px rgba(0, 0, 0, 0.45)',
    '0px 12px 40px rgba(0, 0, 0, 0.5)',
    '0px 16px 48px rgba(0, 0, 0, 0.55)',
    '0px 20px 56px rgba(0, 0, 0, 0.6)',
    '0px 24px 64px rgba(0, 0, 0, 0.65)',
    '0px 28px 72px rgba(0, 0, 0, 0.7)',
    '0px 32px 80px rgba(0, 0, 0, 0.75)',
    '0px 36px 88px rgba(0, 0, 0, 0.8)',
    '0px 40px 96px rgba(0, 0, 0, 0.85)',
    '0px 44px 104px rgba(0, 0, 0, 0.9)',
    '0px 48px 112px rgba(0, 0, 0, 0.95)',
    '0px 52px 120px rgba(0, 0, 0, 1)',
    '0px 56px 128px rgba(0, 0, 0, 1)',
    '0px 60px 136px rgba(0, 0, 0, 1)',
    '0px 64px 144px rgba(0, 0, 0, 1)',
    '0px 68px 152px rgba(0, 0, 0, 1)',
    '0px 72px 160px rgba(0, 0, 0, 1)',
    '0px 76px 168px rgba(0, 0, 0, 1)',
    '0px 80px 176px rgba(0, 0, 0, 1)',
    '0px 84px 184px rgba(0, 0, 0, 1)',
    '0px 88px 192px rgba(0, 0, 0, 1)',
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: mode === 'light' 
            ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            : 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: mode === 'light' 
            ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
            : 'linear-gradient(45deg, #333333 30%, #1a1a1a 90%)',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: mode === 'light' 
            ? '0 4px 20px rgba(33, 150, 243, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.5)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'light' 
              ? '0 8px 30px rgba(33, 150, 243, 0.4)'
              : '0 8px 30px rgba(0, 0, 0, 0.7)',
            background: mode === 'light' 
              ? 'linear-gradient(45deg, #1976D2 30%, #1BA8E3 90%)'
              : 'linear-gradient(45deg, #444444 30%, #2a2a2a 90%)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        outlined: {
          background: 'transparent',
          border: mode === 'light' 
            ? '2px solid #2196F3'
            : '2px solid #FFFFFF',
          color: mode === 'light' ? '#2196F3' : '#FFFFFF',
          '&:hover': {
            background: mode === 'light' 
              ? 'rgba(33, 150, 243, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
            border: mode === 'light' 
              ? '2px solid #1976D2'
              : '2px solid #CCCCCC',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(30, 30, 30, 0.9)',
          backdropFilter: 'blur(10px)',
          border: mode === 'light' 
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: mode === 'light' 
              ? '0 20px 40px rgba(33, 150, 243, 0.2)'
              : '0 20px 40px rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: mode === 'light' 
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: mode === 'light' 
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(255, 255, 255, 0.08)',
            },
            '&.Mui-focused': {
              background: mode === 'light' 
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(255, 255, 255, 0.1)',
              transform: 'scale(1.02)',
            },
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          background: mode === 'light' 
            ? 'linear-gradient(45deg, #E3F2FD 30%, #BBDEFB 90%)'
            : 'linear-gradient(45deg, #333333 30%, #444444 90%)',
          color: mode === 'light' ? '#1976D2' : '#FFFFFF',
          border: mode === 'light' 
            ? '1px solid rgba(33, 150, 243, 0.3)'
            : '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            background: mode === 'light' 
              ? 'linear-gradient(45deg, #BBDEFB 30%, #90CAF9 90%)'
              : 'linear-gradient(45deg, #444444 30%, #555555 90%)',
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: mode === 'light' 
            ? '1px solid rgba(33, 150, 243, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: mode === 'light' 
            ? '0 4px 20px rgba(33, 150, 243, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 0',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: mode === 'light' 
              ? 'rgba(33, 150, 243, 0.08)'
              : 'rgba(255, 255, 255, 0.08)',
            transform: 'translateX(8px)',
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1) rotate(5deg)',
            background: mode === 'light' 
              ? 'rgba(33, 150, 243, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          border: mode === 'light' 
            ? '3px solid rgba(33, 150, 243, 0.2)'
            : '3px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            transform: 'scale(1.1)',
            border: mode === 'light' 
              ? '3px solid rgba(33, 150, 243, 0.5)'
              : '3px solid rgba(255, 255, 255, 0.5)',
          },
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          background: mode === 'light' 
            ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
            : 'linear-gradient(45deg, #333333 30%, #1a1a1a 90%)',
          color: '#FFFFFF',
          boxShadow: mode === 'light' 
            ? '0 8px 32px rgba(33, 150, 243, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1) rotate(10deg)',
            boxShadow: mode === 'light' 
              ? '0 12px 40px rgba(33, 150, 243, 0.4)'
              : '0 12px 40px rgba(0, 0, 0, 0.7)',
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          background: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(20px)',
          border: mode === 'light' 
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },

  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});