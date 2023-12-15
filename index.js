    const axios = require('axios');


   
async function getToken(code) {
    const url = 'https://www.bling.com.br/Api/v3/oauth/token';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '1.0',
        'Authorization': 'Basic MTM2ZjAxYjk4YzY5MmEyYjUzZTJmMjQ4OWZjMzNhNzExZWYzNzdlYTo0NDk3Mjk0Njc4NzIxYTA5ODdiNWRmOGMzYzU3NGIyNDM2ODVjMDI5NTRmNzEzMzQyYzBlZDhlOGYwZjE='
    };

    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('code', code);

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {

        return error.response.data; // Rejogue o erro para quem chamou a função possa lidar com ele
    }
}

async function getRefreshToken(refreshToken) {
    const url = 'https://www.bling.com.br/Api/v3/oauth/token';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '1.0',
        'Authorization': 'Basic MTM2ZjAxYjk4YzY5MmEyYjUzZTJmMjQ4OWZjMzNhNzExZWYzNzdlYTo0NDk3Mjk0Njc4NzIxYTA5ODdiNWRmOGMzYzU3NGIyNDM2ODVjMDI5NTRmNzEzMzQyYzBlZDhlOGYwZjE='
    };

    const data = new URLSearchParams();
    data.append('grant_type', 'refresh_token');
    data.append('refresh_token', refreshToken);

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        return error.response.data; // Rejogue o erro para quem chamou a função possa lidar com ele
    }
}

async function getProduto(access_token) {
    const url = 'https://bling.com.br/Api/v3/homologacao/produtos';
    console.log('access_token -> ', access_token)
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '1.0'
    };
  
    try {
      const response = await axios.get(url, null, { headers });
      console.log('Resposta:', response.data);
    } catch (error) {
      console.error('Erro:', error.response.data);
    }
  }

async function exampleUsage(tokenCode) {

    const responseToken = await getToken(tokenCode)
    if(responseToken.error){
        console.log("ERROR response token -> ", responseToken)
        return 0
    }
    console.log("OK response_token -> ", responseToken)


    var responseRefreshToken = (await getRefreshToken(responseToken?.refresh_token));
    if(responseRefreshToken.error){
        console.log("ERROR refresh token -> ", responseRefreshToken)
        return 0
    }
    console.log("OK refresh_token -> ", responseRefreshToken)

    var responseGetProduto = await getProduto(responseRefreshToken.access_token)
    console.log(responseGetProduto, "<--- RESPONSE GETPRODUTO")
}

// Chame a função de exemplo
exampleUsage('971d20abfa388d8a7943149b7b3ff187a2d2b23b');