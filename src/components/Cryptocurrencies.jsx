import React, { useState, useEffect } from 'react';
import millify from 'millify';                                               //Millify is used for decimal placement modification
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

/**
 * This is the crypto currency page, top crypto coins are displayed and allows user to see properties of
 * that coin like market cap.
 * 
 * @param {simplified} param0  this takes the simplified parameter, this is the number of cryto currencies 
 * @returns front end desing and data information of all crypto currencies.
 */
const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;

    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);    //Importing hook from services folder and fetching the data.
    const [ cryptos, setCryptos ] = useState([]);                           //This useState is created for the use of a 
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {                                                       //Once a crypto coin is searched, the user can search for a term and result will come up
        setCryptos(cryptosList?.data?.coins);                               //Setting the crypto coin data which will be used for filtering

        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));     //Finding the search term that user had input
    
        setCryptos(filteredData);
    },[cryptosList, searchTerm]);                                           //Returning by reference the cryptos list and the searchTerm

    if(isFetching) return 'Loading...';

    return (
       <>
        {!simplified && (
            <div className='search-crypto'>
                <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}/>
            </div>
        )}

        <Row gutter={[32, 32]} className='crypto-card-container'>
            {/**cryptos?.map allows us to iterate through every object passed as data by the API, with
            every object a card is created and a link for that card is provided for the user to find more information on
            the specific coin they clicked on. Using 3 details per card which is price, market cap and daily chage percentage. */}
            {cryptos?.map((currency) => (
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                    <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                        <Card 
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl} />}
                            hoverable
                        >
                            <p>Price: {millify(currency.price)} </p>
                            <p>Market Cap: {millify(currency.marketCap)} </p>
                            <p>Daily Change: {millify(currency.change)}% </p>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
       </>
    );
};

export default Cryptocurrencies;