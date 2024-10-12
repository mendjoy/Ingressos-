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

        if(!response.ok){
            const errorText = await response.text()
            throw Error(JSON.parse(errorText).message)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        throw error
    }
}

export default patchData