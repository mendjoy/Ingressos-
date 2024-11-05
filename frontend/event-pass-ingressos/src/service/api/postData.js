import api from "@/utils/axios"

const postData = async (url, body) => {

    try {

        const response = await api.post(url, body)
        return response.data
    
    } catch (error) {
  
        throw Error("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.")
    
    }
}

export default postData
