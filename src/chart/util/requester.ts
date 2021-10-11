import Axios from 'axios';

Axios.defaults.baseURL = 'http://127.0.0.1:6400';

export const searchFundingEntities = async (q: string): Promise<any> => {
    return (await Axios.get('/dashboard/entities/search', {
        params: {
            q: q,
        }
    })).data as any;
}
