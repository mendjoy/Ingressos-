import api from "@/utils/axios"

const deleteData = async (url, body) => {

    try {

        const response = await api.delete(url, body)
        return response.data
        
    } catch (error) {
        
        if(error.response){

            throw Error(error.response.data.message)

        }else{
            
            throw Error("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.")
    
        }
    }
}

export default deleteData