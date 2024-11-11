import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://sandbox-partners-api.airalo.com/v2'
const CLIENT_ID = '7e29e2facf83359855f746fc490443e6'
const CLIENT_SECRET = 'e5NNajm6jNAzrWsKoAdr41WfDiMeS1l6IcGdhmbb'
const GRANT_TYPE = 'client_credentials'

let issuedAt: number
 
export class ApiClient { 
  private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: BASE_URL,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }

    public async postToken() {
        const body = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: GRANT_TYPE
        }
        const response = await this.client.post(`${BASE_URL}/token`, body)
        issuedAt = Date.now() /1000
        return response
    }

    public isTokenValid(responseData: Token): boolean {
        const currentTimeInSeconds = Date.now() / 1000;
        const expirationTime = issuedAt + responseData.expires_in;
        return currentTimeInSeconds < expirationTime;
      }
    
    public async postOrder(token: Token, body: PostOrderBodyRequest ) {
        if (this.isTokenValid(token)) {
            const headers = {
                Authorization: `Bearer ${token.access_token}`
            }
            return await this.client.post(`${BASE_URL}/orders`, body, {headers})
        }
        else {
            throw new Error("The token has expired.");
        }
    }
    
    public async getESims(token: Token, params?: GetESimsParamsRequest ) {
        if (this.isTokenValid(token)) {
            const headers = {
                Authorization: `Bearer ${token.access_token}`
            }

            return await this.client.get(`${BASE_URL}/sims`,  {headers: headers, params : params})
        }
        else {
            throw new Error("The token has expired.");
        }
    }

}   
