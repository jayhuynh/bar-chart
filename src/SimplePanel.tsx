import React from 'react';
import { Field, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';


interface Props extends PanelProps<SimpleOptions> {
}

const genderDistributionComponent = (data) => {
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
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis unit="%" type="number" domain={[0, 100]}/>
        <Legend/>
        <Bar dataKey="percentage" fill="#ff6212"/>
      </BarChart>
    </ResponsiveContainer>
  );
};

const ageGenderDistributionComponent = (data) => {
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
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="female" fill="#8884d8"/>
        <Bar dataKey="male" fill="#82ca9d"/>
        <Bar dataKey="unknown" fill="#ddc3a5"/>
      </BarChart>
    </ResponsiveContainer>
  );
};

const regionDistributionComponent = (data) => {
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
        <XAxis type="number"/>
        <YAxis  dataKey="name" type="category"/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="percentage" maxBarSize={40} fill="#d902ee"/>
      </BarChart>
    </ResponsiveContainer>
  );
};

const getChart = (options, data) => {
  if (options.text === 'agegender') {
    return ageGenderDistributionComponent(data);
  }
  if (options.text === 'region') {
    return regionDistributionComponent(data);
  }
  return genderDistributionComponent(data);
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();


  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `,
      )}
    >

      {getChart(options, data)}

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
