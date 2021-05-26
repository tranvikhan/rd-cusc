const axios = require('axios')
async function AxiosClient(options) {
  return await axios({
    ...options,
  })
    .then((res) => {
      return res.data.result
    })
    .catch((err) => {
      const error = new Error('An error occurred while fetching the data.')
      error.info = err.response.data.result
      error.status = err.response.status
      throw error
    })
}
export default AxiosClient
