import api from '@/utils/axios'

const getData = async (url) => {

    try {

        const response = await api.get(url)
        return response.data
    
    } catch (error) {
      
        throw new Error("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.")

    }
}

export default getData