/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import {Text} from 'react-native-elements'
import axios from 'axios';
import T from './Table'

// This is all the axios stuff that we don't need to care about
const endpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate"}'
 );
 
const api = axios.create({
baseURL: endpoint 
})

async function getData() {
let data = await api.get().then(({ data }) => data).catch(error => console.log(error))
return data;
}


const App: () => React$Node = () => {

    const [cases, setCases] = useState(0);
    const [dates, setDates] = useState(0);

    useEffect(() => {
        console.log("Updating")
        getData().then(({data}) => {
           d = data.map(e => e["date"]).slice(0,180)
           setDates(d.reverse())
           caseNo = data.map(e => e["newCases"]).slice(0,180)
           setCases(caseNo.reverse())
        })
        .then(() => {
           //console.log(chartData.labels)
           console.log(cases)
        })
     }, [])

    return (
        <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
            <ScrollView>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
                    <Text h3 style={{fontFamily: 'FiraSans-Regular', textDecorationLine: 'underline'}}>COVID-19 : England</Text>
                    
                </View>

                {/* The table (need to do a fetch somehwere in here to get the data) */}
                <T newCases={20000} newDeaths={1000} changeCases="-30" changeDeaths="-50" changeCasesColor="#0E5A30" changeDeathsColor="#DB5461"/>
            
                {/* Growth in cases chart */}
                
            
            </ScrollView>
        </SafeAreaView>
        </>
    );
};


export default App;
