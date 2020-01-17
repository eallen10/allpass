const env = process.env.REACT_APP_ENV

export const appConfig = {
  api: {
    networkInterface: ({
      development: 'http://localhost:8080',
      production: 'https://personalpass.net',
    })[env],
    // add more here
  },
}

export default appConfig