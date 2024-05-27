

const baseUrl = "https://api.zerobounce.net/v2"
export const validateEmail = async ({
    email
}) => {
    const url = `${baseUrl}/validate?api_key=${process.env.ZERO_BOUNCE_API_KEY}&email=${email}`

    try {
        const response = await fetch(url, {method: 'GET'});

        if(!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err)
    } 
} 