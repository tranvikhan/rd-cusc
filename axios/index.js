const axios = require('axios')
async function AxiosClient(options) {
  return await axios({
    ...options,
    maxContentLength: 100000000,
    maxBodyLength: 1000000000,
  })
    .then((res) => {
      return res.data.result
    })
    .catch((err) => {
      const error = new Error('An error occurred while fetching the data.')
      error.info =
        err.response.data.result.error && err.response.status === 400
          ? 'Lỗi server'
          : err.response.data.result
      error.status = err.response.status
      throw error
    })
}
export default AxiosClient
