import React from 'react';
import { Field, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useQuery } from 'routes/useQuery';
import {Dashboard} from "./chart/Dashboard";

interface Props extends PanelProps<SimpleOptions> { }

const genderDistributionComponent = (data: any) => {
  const transformData = (fields: Field[]) => {
    return fields.map((field: Field) => {
      return {
        name: field.name,
        percentage: field.values.get(0) * 100,
      };
    });
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={transformData(data.series[0].fields)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis unit="%" type="number" domain={[0, 100]} />
        <Legend />
        <Bar dataKey="percentage" fill="#ff6212" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const ageGenderDistributionComponent = (data: any) => {
  const transformData = (field: Field) => {
    const age = field.values.get(0);
    return age;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={transformData(data.series[0].fields[0])}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="female" fill="#8884d8" />
        <Bar dataKey="male" fill="#82ca9d" />
        <Bar dataKey="unknown" fill="#ddc3a5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const regionDistributionComponent = (data: any) => {
  const transformData = (field: Field) => {
    const regions = field.values.get(0);
    return regions;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={600}
        height={600}
        data={transformData(data.series[0].fields[0])}
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        layout="vertical"
      >
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="percentage" maxBarSize={40} fill="#d902ee" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// const mapComponent = (data: any) => {
//   const transformData = (field: Field) => {
//     const regions = field.values.get(0);
//     return regions;
//   };

//   const rows = [
//     {
//       name: 'New York ',
//       pop: '8287238',
//       lat: '40.7305991',
//       lon: '-73.9865812',
//     },
//     {
//       name: 'Los Angeles ',
//       pop: '3826423',
//       lat: '34.053717',
//       lon: '-118.2427266',
//     },
//     {
//       name: 'Chicago ',
//       pop: '2705627',
//       lat: '41.8755546',
//       lon: '-87.6244212',
//     },
//     {
//       name: 'Houston ',
//       pop: '2129784',
//       lat: '29.7589382',
//       lon: '-95.3676974',
//     },
//     {
//       name: 'Philadelphia ',
//       pop: '1539313',
//       lat: '39.952335',
//       lon: '-75.163789',
//     },
//     {
//       name: 'Phoenix ',
//       pop: '1465114',
//       lat: '33.4467681',
//       lon: '-112.0756724',
//     },
//     {
//       name: 'San Antonio ',
//       pop: '1359174',
//       lat: '29.4246002',
//       lon: '-98.4951405',
//     },
//     {
//       name: 'San Diego ',
//       pop: '1321016',
//       lat: '32.7174209',
//       lon: '-117.1627714',
//     },
//     {
//       name: 'Dallas ',
//       pop: '1219399',
//       lat: '32.7761963',
//       lon: '-96.7968994',
//     },
//     {
//       name: 'San Jose ',
//       pop: '971495',
//       lat: '37.3438502',
//       lon: '-121.8831349',
//     },
//     {
//       name: 'Austin ',
//       pop: '839714',
//       lat: '30.2711286',
//       lon: '-97.7436995',
//     },
//     {
//       name: 'Jacksonville ',
//       pop: '829543',
//       lat: '30.3321838',
//       lon: '-81.655651',
//     },
//     {
//       name: 'Indianapolis  ',
//       pop: '827346',
//       lat: '39.7683331',
//       lon: '-86.1583502',
//     },
//     {
//       name: 'San Francisco ',
//       pop: '816239',
//       lat: '37.7792768',
//       lon: '-122.4192704',
//     },
//     {
//       name: 'Columbus ',
//       pop: '799270',
//       lat: '39.9622601',
//       lon: '-83.0007065',
//     },
//     {
//       name: 'Fort Worth ',
//       pop: '761895',
//       lat: '32.753177',
//       lon: '-97.3327459',
//     },
//     {
//       name: 'Charlotte ',
//       pop: '756204',
//       lat: '35.2270869',
//       lon: '-80.8431268',
//     },
//     {
//       name: 'Detroit ',
//       pop: '702149',
//       lat: '42.3486635',
//       lon: '-83.0567375',
//     },
//     {
//       name: 'El Paso ',
//       pop: '665503',
//       lat: '31.8111305',
//       lon: '-106.5013493',
//     },
//     {
//       name: 'Memphis ',
//       pop: '655975',
//       lat: '35.1490215',
//       lon: '-90.0516285',
//     },
//     {
//       name: 'Boston ',
//       pop: '630645',
//       lat: '42.3604823',
//       lon: '-71.0595678',
//     },
//     {
//       name: 'Seattle ',
//       pop: '622175',
//       lat: '47.6038321',
//       lon: '-122.3300624',
//     },
//     {
//       name: 'Baltimore ',
//       pop: '620889',
//       lat: '39.2908608',
//       lon: '-76.6108073',
//     },
//     {
//       name: 'Washington ',
//       pop: '620427',
//       lat: '38.8949549',
//       lon: '-77.0366456',
//     },
//     {
//       name: 'Denver ',
//       pop: '619390',
//       lat: '39.7391536',
//       lon: '-104.9847034',
//     },
//     {
//       name: 'Nashville-Davidson   ',
//       pop: '612243',
//       lat: '36.187025',
//       lon: '-86.78086153',
//     },
//     {
//       name: 'Louisville/Jefferson County   ',
//       pop: '601709',
//       lat: '38.209237',
//       lon: '-85.7038502',
//     },
//     {
//       name: 'Milwaukee ',
//       pop: '597435',
//       lat: '43.0349931',
//       lon: '-87.922497',
//     },
//     {
//       name: 'Portland ',
//       pop: '593859',
//       lat: '45.5202471',
//       lon: '-122.6741949',
//     },
//     {
//       name: 'Oklahoma City ',
//       pop: '589896',
//       lat: '35.4729886',
//       lon: '-97.5170536',
//     },
//     {
//       name: 'Las Vegas ',
//       pop: '588257',
//       lat: '36.1662859',
//       lon: '-115.149225',
//     },
//     {
//       name: 'Albuquerque ',
//       pop: '551813',
//       lat: '35.0841034',
//       lon: '-106.6509851',
//     },
//     {
//       name: 'Tucson ',
//       pop: '524192',
//       lat: '32.2217422',
//       lon: '-110.9264759',
//     },
//     {
//       name: 'Fresno ',
//       pop: '501357',
//       lat: '36.7394421',
//       lon: '-119.7848307',
//     },
//     {
//       name: 'Sacramento ',
//       pop: '471625',
//       lat: '38.5815719',
//       lon: '-121.4943996',
//     },
//     {
//       name: 'Long Beach ',
//       pop: '465825',
//       lat: '33.7774658',
//       lon: '-118.1884871',
//     },
//     {
//       name: 'Kansas City ',
//       pop: '462035',
//       lat: '39.0844687',
//       lon: '-94.5630298',
//     },
//     {
//       name: 'Mesa ',
//       pop: '444954',
//       lat: '33.436188',
//       lon: '-111.5860661',
//     },
//     {
//       name: 'Virginia Beach ',
//       pop: '442984',
//       lat: '36.7953025',
//       lon: '-76.05092502',
//     },
//     {
//       name: 'Atlanta ',
//       pop: '432135',
//       lat: '33.7490987',
//       lon: '-84.3901849',
//     },
//     {
//       name: 'Omaha ',
//       pop: '429604',
//       lat: '41.2587317',
//       lon: '-95.9378732',
//     },
//     {
//       name: 'Colorado Springs ',
//       pop: '427416',
//       lat: '38.8339578',
//       lon: '-104.8253485',
//     },
//     {
//       name: 'Raleigh ',
//       pop: '414135',
//       lat: '35.7804015',
//       lon: '-78.6390779',
//     },
//     {
//       name: 'Miami ',
//       pop: '412438',
//       lat: '25.7742658',
//       lon: '-80.1936589',
//     },
//     {
//       name: 'Oakland ',
//       pop: '396649',
//       lat: '37.8044557',
//       lon: '-122.2713563',
//     },
//     {
//       name: 'Tulsa ',
//       pop: '392751',
//       lat: '36.1556805',
//       lon: '-95.9929113',
//     },
//     {
//       name: 'Cleveland ',
//       pop: '392505',
//       lat: '41.5051613',
//       lon: '-81.6934446',
//     },
//     {
//       name: 'Minneapolis ',
//       pop: '388253',
//       lat: '44.9772995',
//       lon: '-93.2654692',
//     },
//     {
//       name: 'Wichita ',
//       pop: '383696',
//       lat: '37.6922361',
//       lon: '-97.3375448',
//     },
//     {
//       name: 'Arlington ',
//       pop: '370908',
//       lat: '32.7355816',
//       lon: '-97.1071186',
//     },
//     {
//       name: 'New Orleans ',
//       pop: '360877',
//       lat: '29.9499323',
//       lon: '-90.0701156',
//     },
//     {
//       name: 'Bakersfield ',
//       pop: '353533',
//       lat: '35.3738712',
//       lon: '-119.0194639',
//     },
//     {
//       name: 'Tampa ',
//       pop: '346934',
//       lat: '27.9477595',
//       lon: '-82.458444',
//     },
//     {
//       name: 'Anaheim ',
//       pop: '340830',
//       lat: '33.8347516',
//       lon: '-117.911732',
//     },
//     {
//       name: 'Santa Ana ',
//       pop: '328856',
//       lat: '33.7499595',
//       lon: '-117.8732826',
//     },
//     {
//       name: 'St. Louis ',
//       pop: '319188',
//       lat: '38.6272733',
//       lon: '-90.1978889',
//     },
//     {
//       name: 'Riverside ',
//       pop: '310025',
//       lat: '33.9533546',
//       lon: '-117.3961623',
//     },
//     {
//       name: 'Corpus Christi ',
//       pop: '308069',
//       lat: '27.8002542',
//       lon: '-97.3955744',
//     },
//     {
//       name: 'Pittsburgh ',
//       pop: '306099',
//       lat: '40.4416941',
//       lon: '-79.9900861',
//     },
//     {
//       name: 'Lexington-Fayette urban county',
//       pop: '301213',
//       lat: '38.0464066',
//       lon: '-84.4970393',
//     },
//     {
//       name: 'Cincinnati ',
//       pop: '296114',
//       lat: '39.1014537',
//       lon: '-84.5124602',
//     },
//     {
//       name: 'Stockton ',
//       pop: '295386',
//       lat: '37.9577016',
//       lon: '-121.2907796',
//     },
//     {
//       name: 'St. Paul ',
//       pop: '288884',
//       lat: '44.9504037',
//       lon: '-93.1015026',
//     },
//     {
//       name: 'Toledo ',
//       pop: '285549',
//       lat: '41.6786754',
//       lon: '-83.5127283',
//     },
//     {
//       name: 'Newark ',
//       pop: '277854',
//       lat: '40.735657',
//       lon: '-74.1723667',
//     },
//     {
//       name: 'Greensboro ',
//       pop: '272521',
//       lat: '36.0726355',
//       lon: '-79.7919754',
//     },
//     {
//       name: 'Plano ',
//       pop: '267620',
//       lat: '33.0136764',
//       lon: '-96.6925096',
//     },
//     {
//       name: 'Lincoln ',
//       pop: '262389',
//       lat: '40.8000554',
//       lon: '-96.6674005',
//     },
//     {
//       name: 'Buffalo ',
//       pop: '260525',
//       lat: '42.8864468',
//       lon: '-78.8783689',
//     },
//     {
//       name: 'Henderson ',
//       pop: '259958',
//       lat: '40.8156124',
//       lon: '-90.9104547',
//     },
//     {
//       name: 'Fort Wayne ',
//       pop: '254607',
//       lat: '41.0799898',
//       lon: '-85.1386015',
//     },
//     {
//       name: 'Jersey City ',
//       pop: '253117',
//       lat: '40.7281575',
//       lon: '-74.0776417',
//     },
//     {
//       name: 'Chula Vista ',
//       pop: '248684',
//       lat: '32.6400541',
//       lon: '-117.0841955',
//     },
//     {
//       name: 'St. Petersburg ',
//       pop: '246042',
//       lat: '27.7703796',
//       lon: '-82.6695085',
//     },
//     {
//       name: 'Orlando ',
//       pop: '243787',
//       lat: '28.5421175',
//       lon: '-81.3790462',
//     },
//     {
//       name: 'Laredo ',
//       pop: '241188',
//       lat: '27.5060991',
//       lon: '-99.5088979',
//     },
//     {
//       name: 'Chandler ',
//       pop: '239977',
//       lat: '33.3067132',
//       lon: '-111.8408489',
//     },
//     {
//       name: 'Madison ',
//       pop: '236923',
//       lat: '43.074761',
//       lon: '-89.3837613',
//     },
//     {
//       name: 'Lubbock ',
//       pop: '233586',
//       lat: '33.5778631',
//       lon: '-101.8551665',
//     },
//     {
//       name: 'Winston-Salem ',
//       pop: '231873',
//       lat: '36.0998167',
//       lon: '-80.2441445',
//     },
//     {
//       name: 'Hialeah ',
//       pop: '231352',
//       lat: '25.8670435',
//       lon: '-80.29146312',
//     },
//     {
//       name: 'Garland ',
//       pop: '230205',
//       lat: '32.912624',
//       lon: '-96.6388833',
//     },
//     {
//       name: 'Baton Rouge ',
//       pop: '228939',
//       lat: '30.4507462',
//       lon: '-91.154551',
//     },
//     {
//       name: 'Glendale ',
//       pop: '228645',
//       lat: '34.1423455',
//       lon: '-118.2483671',
//     },
//     {
//       name: 'Chesapeake ',
//       pop: '225333',
//       lat: '36.8190369',
//       lon: '-76.2749399',
//     },
//     {
//       name: 'Irvine ',
//       pop: '220528',
//       lat: '33.6856969',
//       lon: '-117.8259819',
//     },
//     {
//       name: 'Irving ',
//       pop: '220012',
//       lat: '32.8629195',
//       lon: '-96.97917017',
//     },
//     {
//       name: 'Scottsdale ',
//       pop: '219841',
//       lat: '33.5091215',
//       lon: '-111.8992365',
//     },
//     {
//       name: 'North Las Vegas ',
//       pop: '218971',
//       lat: '36.2008371',
//       lon: '-115.1120958',
//     },
//     {
//       name: 'Fremont ',
//       pop: '217630',
//       lat: '37.5482697',
//       lon: '-121.9885719',
//     },
//     {
//       name: 'Gilbert ',
//       pop: '214057',
//       lat: '33.294207',
//       lon: '-111.7379465',
//     },
//     {
//       name: 'San Bernardino ',
//       pop: '212061',
//       lat: '34.1083449',
//       lon: '-117.2897652',
//     },
//     {
//       name: 'Rochester ',
//       pop: '210891',
//       lat: '43.1854754',
//       lon: '-77.61068605',
//     },
//     {
//       name: 'Boise City ',
//       pop: '209280',
//       lat: '43.5988375',
//       lon: '-116.243255',
//     },
//     {
//       name: 'Spokane ',
//       pop: '209025',
//       lat: '47.6588603',
//       lon: '-117.4247134',
//     },
//     {
//       name: 'Montgomery ',
//       pop: '207513',
//       lat: '32.3669656',
//       lon: '-86.3006485',
//     },
//     {
//       name: 'Richmond ',
//       pop: '206977',
//       lat: '37.5385087',
//       lon: '-77.43428',
//     },
//     {
//       name: 'Des Moines ',
//       pop: '205908',
//       lat: '41.5910641',
//       lon: '-93.6037149',
//     },
//     {
//       name: 'Modesto ',
//       pop: '204312',
//       lat: '37.6390972',
//       lon: '-120.9968782',
//     },
//     {
//       name: 'Shreveport ',
//       pop: '201875',
//       lat: '32.4828485',
//       lon: '-93.82848316',
//     },
//   ];

//   function unpack(rows: any, key: any) {
//     return rows.map(function(row: any) {
//       return row[key];
//     });
//   }

//   var cityName = unpack(rows, 'name'),
//     cityPop = unpack(rows, 'pop'),
//     cityLat = unpack(rows, 'lat'),
//     cityLon = unpack(rows, 'lon'),
//     color = [, 'rgb(255,65,54)', 'rgb(133,20,75)', 'rgb(255,133,27)', 'lightgrey'],
//     citySize = [],
//     hoverText = [],
//     scale = 50000;

//   for (var i = 0; i < cityPop.length; i++) {
//     cityPop[i] = Math.random() * 10 + Math.random() * 10;
//     var currentSize = cityPop[i];
//     var currentText = cityName[i] + ' pop: ' + cityPop[i];
//     citySize.push(currentSize);
//     hoverText.push(currentText);
//   }

//   var data: any = [
//     {
//       type: 'scattergeo',
//       locationmode: 'USA-states',
//       lat: cityLat,
//       lon: cityLon,
//       hoverinfo: 'text',
//       text: hoverText,
//       marker: {
//         size: citySize,
//         line: {
//           color: 'black',
//           width: 2,
//         },
//       },
//     },
//   ];

//   var layout = {
//     title: 'Map distribution',
//     showlegend: false,
//     geo: {
//       scope: 'usa',
//       projection: {
//         type: 'albers usa',
//       },
//       showland: true,
//       landcolor: 'rgb(217, 217, 217)',
//       subunitwidth: 1,
//       countrywidth: 1,
//       subunitcolor: 'rgb(255,255,255)',
//       countrycolor: 'rgb(255,255,255)',
//     },
//   };

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <Plot data={data} layout={layout} />
//     </ResponsiveContainer>
//   );
// };

const getChart = (options: any, data: any) => {
  if (options.text === 'agegender') {
    return ageGenderDistributionComponent(data);
  }
  if (options.text === 'region') {
    return regionDistributionComponent(data);
  }
  // if (options.text === 'map') {
  //   return mapComponent(data);
  // }
  return <></>;
};

export const SimplePanel: React.FC<Props> = ({ width, height, ...rest }) => {
  const theme = useTheme();
  const styles = getStyles();
  const { queryDictionary } = useQuery();
  const query = queryDictionary();

  // console.log(query);
    const chartType = rest.options.text;
    const newData = rest.data


  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <Dashboard chartType={chartType} data={newData} size={{ width, height }} />
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
