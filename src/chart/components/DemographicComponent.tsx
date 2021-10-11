import {extractData, roundTo} from "../util/helper";
import BarNivo from "../bar/BarNivo";
import React, {useEffect, useState} from "react";
import {useQuery} from "../../routes/useQuery";
import {getAllTypeRequest, intervalGetRequest} from "../util/requester";


const DemographicComponent = () => {
    const {queryDictionary} = useQuery();
    const [data, setData] = useState();

    useEffect(() => {
        const query = queryDictionary();
        const interval = intervalGetRequest(
            Number(query.targetType),
            query.targetName as string,
            Number(query.ccFrom),
            Number(query.ccTo),
            setData)

        return () => clearInterval(interval);
    }, [queryDictionary])

    const demographic: any = _.get(data, 'stat.demographic');
    if (_.isEmpty(demographic)) return <></>;

    const barData = Object.keys(demographic).sort((a: string, b: string) => {
        return Number(a.slice(0, 2)) - Number(b.slice(0, 2))
    }).map((key) => {
        return {
            age: key,
            male: roundTo(demographic[key].male, 2),
            female: roundTo(demographic[key].female, 2),
            unknown: roundTo(demographic[key].unknown, 2),
        };
    });

    return (
        <BarNivo data={barData}
                 props={{
                     keys: ['female', 'male', 'unknown'],
                     groupMode: 'grouped',
                     indexBy: 'age'
                 }}
                 labelY={'Count'}
                 labelX={'Age'}/>
    );
}

export default DemographicComponent;
