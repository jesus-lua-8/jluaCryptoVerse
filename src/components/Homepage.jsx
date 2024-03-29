import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';

const { Title } = Typography;

/**
 * 
 * @returns This will return the homepage with a limit of crypto coins and news available. To see more the user can click on see more.
 */
const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);                //This hook has access to the API data that can be used and implemented.
    const globalStats = data?.data?.stats;

    if(isFetching) return 'Loading...';

    return (
        <>
           <Title level={2} className='heading'>Global Crypto Stats</Title>
           <Row gutter={[32,32]}>
                <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStats?.total}/></Col>
                <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats?.totalExchanges)}/></Col>
                <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats?.totalMarketCap)}/></Col>
                <Col span={12}><Statistic title='Total 24th Volume' value={millify(globalStats?.total24hVolume)}/></Col>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.total} /></Col>
                <Col span={12}><Statistic title='Total Markets' value={millify(globalStats?.totalMarkets)}/></Col>
           </Row>
           <div className='home-heading-container'>
            <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
            <Title level={3} className='show-more'><Link to="/cryptocurrencies">Show More</Link></Title>
           </div>
           <Cryptocurrencies simplified />
           <div className='home-heading-container'>
            <Title level={2} className='home-title'>Latest Crypto News</Title>
            <Title level={3} className='show-more'><Link to="/news">Show More</Link></Title>
           </div>
           <News  simplified />
        </>
    )
}

export default Homepage;
