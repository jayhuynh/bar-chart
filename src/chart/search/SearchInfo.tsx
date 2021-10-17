import {Alert, VerticalGroup} from "@grafana/ui";
import React from "react";

const SearchInfo = ({ totalAds, totalSpend, totalImpression }: any) => {
    return (
        <Alert
            severity="info"
            title={'Overview information'}>
            <VerticalGroup spacing="lg">
                <div>
                    Total ads: <h3>{totalAds}</h3>
                </div>
                <div>
                    Total spend: <h3>{totalSpend} $</h3>
                </div>
                <div>
                    Total impession: <h3>{totalImpression}</h3>
                </div>
            </VerticalGroup>
        </Alert>
    );
}

export default SearchInfo;
