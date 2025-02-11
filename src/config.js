// const devAPIURL = "http://127.0.0.1:5000"
const devAPIURL = "http://localhost:3000"
const prodAPIURL = "https://healthmate-be.vercel.app"
const isProd = false

export const getBaseUrl = (url) => {
  if (isProd) return `${prodAPIURL}${url}`
  else return `${devAPIURL}${url}`
}

