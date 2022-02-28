import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import Chart from 'chart.js/auto'

const { Title } = Typography;

/**
 * @coinHistory parameter that takes in the timeline of data per coin.
 * @currentPrice parameter that cointains the price range for a particular time period
 * @coinName parameter that contains the name of the crypto coin.
 * 
 * @return Function returns a line graph with all data input for display.
 */
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date((coinHistory?.data?.history[i].timestamp)*1000).toLocaleDateString());
  }

  console.log(coinTimestamp);

  //This takes care of the y axis data, where the price range is displayed.
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  //Options is the about the users options to choose from 3h - 5y time range.
  const options = {
    scales: {
      yAxes:
        {
          ticks: {
            beginAtZero: true,
          },
        },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}&#x00025;</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;