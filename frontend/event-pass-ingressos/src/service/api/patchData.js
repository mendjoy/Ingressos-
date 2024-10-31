const patchData = async (url, body) => {

    try {

        const token = localStorage.getItem("token")

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        return await response.json()
        
    } catch (error) {
        throw new Error("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.")
    }
}

export default patchData