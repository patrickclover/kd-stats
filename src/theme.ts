import { extendTheme, Theme } from '@chakra-ui/react'

const config: Theme | Record<string, any> = {
  config: {
    useSystemColorMode: true,
  },
  styles: {
    global: props => ({
      'html, body': {
        color: props.colorMode === 'dark' ? 'white' : 'black',
        background: props.colorMode === 'dark' ? 'black' : 'white',
      },
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
      },
    }),
  },
}

export default extendTheme(config)
