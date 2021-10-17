import Axios from 'axios';

// Axios.defaults.baseURL = 'http://127.0.0.1:6400';
Axios.defaults.baseURL = 'http://34.87.216.9:6400';
// Axios.defaults.baseURL = 'http://feadsa.live:6400';

export const REQUEST_INTERVAL = 5000

export const searchFundingEntities = async (q: string): Promise<any> => {
    return (await Axios.get('/dashboard/entities/search', {
        params: {
            q: q,
        }
    })).data as any;
}

export const getTopicList = async (): Promise<any> => {
    return (await Axios.get('/dashboard/topics')).data as any;
}

export const getAggregatingList = async (): Promise<any> => {
    return (await Axios.get('/dashboard/topics/aggregating')).data as any;
}

export const getTopicProgress = async (q: string): Promise<any> => {
    return (await Axios.get('/dashboard/ads/progress', {
        params: {
            q: q,
        }
    })).data as any;
}

export const createTopicReuqest = async (q: string): Promise<any> => {
    return (await Axios.post('/dashboard/ads/search', {
        query: q

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

export const searchTopic = async (q: string, from: number, to: number): Promise<any> => {
    return (await Axios.get(`/dashboard/ads/search`, {
        params: {
            q,
            from,
            to,
        }
    })).data as any;
}

export const getTarget = async (
    targetType: number,
    targetName: string,
    ccFrom: number,
    ccTo: number,
) => {
    let result;
    if (targetType === 0) {
        result = (await getParty(
            encodeURIComponent(targetName || ''),
            ccFrom,
            ccTo)).data;
    } else {
        result = (await getFundingEntity(
            encodeURIComponent(targetName || ''),
            ccFrom,
            ccTo)).data;
    }
    return result;
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
        const result = await getTarget(targetType, targetName, ccFrom, ccTo);
        setDataCallback(result)
    })()

    return setInterval(() => {
        (async () => {
            // Case parties
            const result = await getTarget(targetType, targetName, ccFrom, ccTo);
            setDataCallback(result)
        })()
    }, REQUEST_INTERVAL);
}

export const intervalSearchQueryRequest = (
    q: string,
    ccFrom: number,
    ccTo: number,
    setDataCallback: any,
) => {
    (async () => {
        // Case parties
        const result = await searchTopic(q, ccFrom, ccTo);
        setDataCallback(result.data)
    })()

    return setInterval(() => {
        (async () => {
            // Case parties
            const result = await searchTopic(q, ccFrom, ccTo);
            setDataCallback(result.data)
        })()
    }, REQUEST_INTERVAL);
}

export const intervalAggListRequest = (
    setDataCallback: any,
) => {
    (async () => {
        // Case parties
        const result = await getAggregatingList();
        setDataCallback(result.data)
    })()

    return setInterval(() => {
        (async () => {
            // Case parties
            const result = await getAggregatingList();
            setDataCallback(result.data)
        })()
    }, REQUEST_INTERVAL);
}
