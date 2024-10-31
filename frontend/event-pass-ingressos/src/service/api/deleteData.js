const deleteData = async (url, body) => {

    try {

        const token = localStorage.getItem("token")
        
        let authHeader = {}
        
        if (token !== null) {
            authHeader = {
                "Authorization": `Bearer ${token}`,
            }
        }
    
        const response = await fetch("http://localhost:8080" + url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...authHeader,
            },
            body: JSON.stringify(body)
        })

        return await response.json()
        
    } catch (error) {
        throw new Error("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.")
    }
}

export default deleteData