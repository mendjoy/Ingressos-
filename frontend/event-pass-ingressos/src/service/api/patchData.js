import api from "@/utils/axios"

const patchData = async (url, body) => {

    try {

        const response = await api.patch(url, body)
        return response.data
        
    } catch (error) {

        throw new Error("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.")
    
    }
}

export default patchData