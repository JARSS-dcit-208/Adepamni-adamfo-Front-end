export default defineNuxtPlugin((nuxtApp) => {

  function axiosInstance(){
    const { $axiosClient } = useNuxtApp();
    return $axiosClient
  }
  async function getRequest(path, params = {}){
    const $axiosClient = axiosInstance()
    const response = await $axiosClient.get(path, {params})
    return response.data
  }

  const api = {
    // customers
    async getCustomers(params = {}){
      return getRequest('customers', params)
    },
    async getCustomer(id){
      return getRequest(`customers/${id}`)
    },
    async searchCustomers(params){
      return getRequest('customers/search', params)
    },

    async upsertCustomer(customerId, params){
      if(customerId){
        return this.updateCustomer(customerId, params) 
      }else{
        return this.createCustomer(params) 
      }
    },

    async createCustomer(params){
      const axiosClient = axiosInstance()
      const response = await axiosClient.post(`customers`, params, {
      })
      return response
    },

    async updateCustomer(customerId, params){
      const axiosClient = axiosInstance()
      const response = await axiosClient.put(`customers/${customerId}`, params, {
      })
      return response
    },

    // dresses
    async upsertDress(customerId, dressId, params){
      console.info(dressId)
      if(dressId){
        return this.updateDress(customerId, dressId, params) 
      }else{
        return this.createDress(customerId, params) 
      }
    },

    async createDress(customerId, params){
      const axiosClient = axiosInstance()
      const response = await axiosClient.post(`customers/${customerId}/dresses`, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response
    },

    async updateDress(customerId, dressId, params){
      const axiosClient = axiosInstance()
      const response = await axiosClient.put(`customers/${customerId}/dresses/${dressId}`, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response
    },

    // payments
    
    async getPayments(params = {}){
      return getRequest('payments', params)
    },

    async createPayment(customerId, params){
      params.customer_id = customerId
      const axiosClient = axiosInstance()
      const response = await axiosClient.post(`payments`, params, {
      })
      return response
    },
  }

  return {
    provide: {
      api: api,
    },
  };
});