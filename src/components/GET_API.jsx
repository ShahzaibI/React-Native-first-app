import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GET_API = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        // fetch('http://10.0.2.2:3000/users')
        // .then((response)=> {
        //     response.json().then((result)=>{
        //         console.log("result", result);
        //     });
        // });
        axios.get('http://10.0.2.2:3000/users')
        .then((response) => {
            console.log(response.data);
            setMyData(response.data);
        })
    }, []);
    return (
        <View>
            <Text style={{fontSize:24, marginBottom:10}}>GET_API</Text>
            {
                myData.length > 0 ?
                myData.map((item)=>
                    <Text style={{fontSize:20}} key={item.id}>{item.name}</Text>
                ) : null
            }
        </View>
    );
};

export default GET_API;