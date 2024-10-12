const postData = async (url, body) => {

    try {

        const token = localStorage.getItem("token")

        let authHeader = {}

        if (token !== null) {
            authHeader = {
                "Authorization": `Bearer ${token}`,
            }
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader
            },
            body: JSON.stringify(body),
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

export default postData
