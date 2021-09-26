import createMuiTheme, {
  Theme,
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';
import { Palette } from '@material-ui/core/styles/createPalette';

const ACTIVE_ORANGE = '#ED440B';
const COMPONENT_BACKGROUND = '#222323';
const ACTIVE_TEXT = '#313131';
const DISABLED = '#4F5050';
const IDLE = '#686868';

interface CustomPalette extends Palette {
  custom: {
    colors: {
      active: string;
      done: string;
      idle: string;
      disabled: string;
      activeText: string;
      componentBackground: string;
    };
    styles: {
      done: {
        borderColor: string;
        backgroundColor: string;
        opacity: number;
        color: string;
      };
      base: {
        borderColor: string;
        backgroundColor: string;
      };
      active: {
        backgroundColor: string;
        color: string;
      };
    };
    background: {
      base: string;
      active: string;
      done: string;
    };
    active: {
      highlight: string;
      hover: string;
      contrastColor: string;
    };
    offWhite: string;
  };
}

export interface AppTheme extends Theme {
  palette: CustomPalette;
}

interface AppThemeOptions extends ThemeOptions {
  palette: CustomPalette;
}

export function getTheme(): Theme {
  return createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '*::-webkit-scrollbar': {
            display: 'none',
          },
        },
      },
    },
    palette: {
      custom: {
        colors: {
          active: ACTIVE_ORANGE,
          done: ACTIVE_TEXT,
          activeText: ACTIVE_TEXT,
          idle: IDLE,
          disabled: DISABLED,
          componentBackground: COMPONENT_BACKGROUND,
        },
        styles: {
          done: {
            borderColor: ACTIVE_ORANGE,
            backgroundColor: ACTIVE_ORANGE,
            opacity: 0.6,
            color: ACTIVE_TEXT,
          },
          base: {
            borderColor: COMPONENT_BACKGROUND,
            backgroundColor: COMPONENT_BACKGROUND,
          },
          active: {
            backgroundColor: ACTIVE_ORANGE,
            color: ACTIVE_TEXT,
          },
        },
        // background: '#f3f4f2',
        offWhite: '#F5F5F5',
        // headerHighlight: '#502df1',
        active: {
          // highlight: '#5532f1',
          highlight: '#674bf2',
          hover: '#E8E5F4',
          contrastColor: '#6B8E9B',
          // contrastColor: '#708C9B', // text and icon colors
          // background: '#b5aaf5', // left border highlight
        },
      },
      text: {
        // primary: '#686868',
        // secondary: '#686868',
      },
      type: 'dark',
      primary: {
        light: '#F0693B',
        main: '#ED440B',
        dark: '#A52F07',
        // contrastText: '#6B8E9B',
        contrastText: '#FFF',
      },
      secondary: {
        light: '#834BFF',
        main: '#651FFF',
        dark: '#4615B2',
        contrastText: '#FFF',
      },
    },
  } as unknown as AppThemeOptions);
}
