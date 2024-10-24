const deleteData = async (url, body) => {

    try {

        const token = localStorage.getItem("token")
        
        let authHeader = {}
        
        if (token !== null) {
            authHeader = {
                "Authorization": `Bearer ${token}`,
            }
        }
    
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...authHeader,
            },
            body: JSON.stringify(body)
        })

        if(!response.ok){
            const errorText = await response.text()
            throw new Error(JSON.parse(errorText).message)
        }

        return response.json()
    } catch (error) {
        throw new Error("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.")
    }
}

export default deleteData