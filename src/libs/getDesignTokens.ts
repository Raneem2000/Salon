
import { blue, grey } from '@mui/material/colors';
import {PaletteMode} from "@mui/material"
const getDesignTokens = (mode : PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // 👇 palette values for light mode
            primary: { main: blue[700] },
            text: {
              primary: grey[900],
            },
          }
        : {
            // 👇 palette values for dark mode
            primary: { main: blue[500] },
            text: {
              primary: '#fff',
            },
          }),
    },
  });
  export default getDesignTokens

  