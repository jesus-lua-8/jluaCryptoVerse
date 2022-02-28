import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import Chart from 'chart.js/auto'

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * 
 * @returns This will return the crypto details page with a features that include a timeline graph and clickable news regarding the corresponding coin.
 */
const CryptoDetails = () => {
    const { coinId } = useParams();                                                 //Using hook useParams allows us to have access to the url parameters and use them.
    const [ timePeriod, setTimePeriod ] = useState('7d');                           //Setting default time period to 7d when displaying the graph.
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod});
    const cryptoDetails = data?.data?.coin;

    if(isFetching) return 'Loading...';

    const time = ['3h', '24h', '7d', '30d', '3m' ,'1y', '3y', '5y'];                //This will be the array containing the set time periods for user to choose from.

    //This will be the stats for every coin, and this changes are daily.
    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
      ];
    
      //Array that contains the generic stats for choosen coin
      const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
      ];

    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {cryptoDetails.name}({cryptoDetails.symbol}) Price
                </Title>
                <p>
                    {cryptoDetails.name} live price in US dollars.
                    View value statistics, market cap and supply.
                </p>
            </Col>
            <Select defaultValue='7d' className='select-timeperiod' placeholder='Select Time Period' onChange={(value) => setTimePeriod(value)}>
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>
            {/**------Comments---------
                Line chart in the y-axis we will display the price change with repect with time. With time been in the x-axis as coinHistory.
            */}
            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details heading'>
                            {cryptoDetails.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the stats of {cryptoDetails.name}
                        </p>
                    </Col>
                    {stats.map(({icon,title,value}) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className='other-stats-info'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details heading'>
                            Other Statistics
                        </Title>
                        <p>
                            An overview showing the stats of all cryptocurrencies
                        </p>
                    </Col>
                    {genericStats.map(({icon,title,value}) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        What is {cryptoDetails.name}
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map((link) => (
                        <Row className='coin-link' key={link.name}>
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} target='blank' rel='noreferrer'>
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails;