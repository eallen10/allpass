const env = process.env.REACT_APP_ENV

export const appConfig = {
  api: {
    networkInterface: ({
      development: 'http://localhost:8080',
      production: 'https://personalpass.net',
    })[env]
  },
  frontend: {
    networkInterface: ({
      development: 'http://localhost:3000',
      production: 'https://personalpass.net',
    })[env]
  }
}

export default appConfig