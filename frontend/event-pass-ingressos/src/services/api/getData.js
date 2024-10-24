const getData = async (url) => {

    try {

        const token = localStorage.getItem("token")
        
        let authHeader = {}
        
        if (token !== null) {
            authHeader = {
                "Authorization": `Bearer ${token}`,
            }
        }
    
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...authHeader,
            }
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

export default getData