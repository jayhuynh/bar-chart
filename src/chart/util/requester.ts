import Axios from 'axios';

Axios.defaults.baseURL = 'http://127.0.0.1:6400';

export const REQUEST_INTERVAL = 5000

export const searchFundingEntities = async (q: string): Promise<any> => {
    return (await Axios.get('/dashboard/entities/search', {
        params: {
            q: q,
        }
    })).data as any;
}

export const getFundingEntity = async (hash: string, from: number, to: number): Promise<any> => {
    return (await Axios.get(`/dashboard/fundings/${hash}`, {
        params: {
            from,
            to,
        }
    })).data as any;
}

export const getParty = async (name: string, from: number, to: number): Promise<any> => {
    return (await Axios.get(`/dashboard/parties/${name}`, {
        params: {
            from,
            to,
        }
    })).data as any;
}

export const intervalGetRequest = (
    targetType: number,
    targetName: string,
    ccFrom: number,
    ccTo: number,
    setDataCallback: any,
) => {
    (async () => {
        // Case parties
        if (targetType === 0) {
            const result: any = (await getParty(
                encodeURIComponent(targetName || ''),
                ccFrom,
                ccTo)).data;
            setDataCallback(result)
        } else {
            const result: any = (await getFundingEntity(
                encodeURIComponent(targetName || ''),
                ccFrom,
                ccTo)).data;
            setDataCallback(result)
        }
    })()

    return setInterval(() => {
        (async () => {
            // Case parties
            if (targetType === 0) {
                const result: any = (await getParty(
                    encodeURIComponent(targetName || ''),
                    ccFrom,
                    ccTo)).data;
                setDataCallback(result)
            } else {
                const result: any = (await getFundingEntity(
                    encodeURIComponent(targetName || ''),
                    ccFrom,
                    ccTo)).data;
                setDataCallback(result)
            }
        })()
    }, REQUEST_INTERVAL);
}
