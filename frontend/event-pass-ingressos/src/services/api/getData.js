const getData = async (url) => {

    try {

        const token = localStorage.getItem("token")

        let authHeader = {}
    
        if (token !== "") {
            authHeader = {
                Authorization: `Bearer ${token}`,
            }
        }
    
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...authHeader,
            }
        })

        if(!response){
            const errorText = await response.text()
            throw new Error(`Erro ${response.status}: ${errorText}`);
        }

        return response
        
    } catch (error) {
        throw error
    }

}

export default getData