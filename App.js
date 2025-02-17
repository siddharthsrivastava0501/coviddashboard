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
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {Text} from 'react-native-elements'
import axios from 'axios';
import T from './Table'
import {LineChart} from 'react-native-chart-kit'

// This is all the axios stuff that we don't need to care about
const endpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate", "newDeaths": "newDeaths28DaysByPublishDate"}'
);
 
const api = axios.create({
    baseURL: endpoint 
})

async function getData() {
    let data = await api.get().then(({ data }) => data).catch(error => console.log(error))
    return data;
}

// Convert a date to nothing or to the name of the month if it is on the start of the month
function inputToMonth(date) {
    const breakdown = date.split('-')
    const months = {
        "01": 'Jan',
        "02": 'Feb',
        "03": 'Mar',
        "04": 'Apr',
        "05": 'May',
        "06": 'Jun',
        "07": 'July',
        "08": 'Aug',
        "09": 'Sept',
        "10": 'Oct',
        "11": 'Nov',
        "12": 'Dec',
    }
    if (breakdown[2] == "01") {
        return months[breakdown[1]]
    } else {
        return "";
    }
}

// Takes a value and an array and calculates the % difference between value and the last 7 values of the array
function getPercent (v, a) {
    const lastSeven = a.slice(a.length - 9, a.length-2)
    const average = lastSeven.reduce((x,y) => x + y)/7
    const percentChange = ((v - average)/v)*100
    var color = ""
    if (Math.abs(percentChange) == percentChange) {
        color = "#DB5461"
    } else {
        color = "#0E5A30"
    }

    return [percentChange, color]
}

function Footer() {
    return (
        <View style={{flex: 1, alignItems: 'center', marginTop: 'auto', marginBottom: 0}}>
            <Text style={{fontFamily: 'FiraSans-Regular', fontSize: 10}}>STAY HOME - PROTECT THE NHS - SAVE LIVES</Text>
        </View>
    )
}

const App = () => {

    const [cases, setCases] = useState(0);
    const [tempDates, setTempDates] = useState(0);
    const [dates, setDates] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log("Updating")
        getData().then(({data}) => {
            d = data.map(e => e["date"]).slice(0,100)
            setDates(d.reverse())

            caseNo = data.map(e => e["newCases"]).slice(0,100)
            setCases(caseNo.reverse())

            deathNo = data.map(e => e["newDeaths"]).slice(0,100)
            setDeaths(deathNo.reverse())

        })
        .then(() => {
            const newDates = dates.map((x) => inputToMonth(x))
            setDates(newDates)
            setLoading(false)
        })
        .catch(() => {
            console.log("ERROR");
        })
    }, [])

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        )
    } else {
        return (
            <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
                        <Text h3 style={{fontFamily: 'FiraSans-Regular', textDecorationLine: 'underline'}}>COVID-19 : England</Text>
                        
                    </View>
    
                    {/* The table (need to do a fetch somehwere in here to get the data) */}
                    <T newCases={cases[cases.length - 1]} newDeaths={deaths[deaths.length - 1]} changeCases={getPercent(cases[cases.length - 1], cases)[0].toFixed(2)} changeDeaths={getPercent(deaths[deaths.length - 1], deaths)[0].toFixed(2)} changeCasesColor={getPercent(cases[cases.length - 1], cases)[1]} changeDeathsColor={getPercent(deaths[deaths.length - 1], deaths)[1]} />
                
                    {/* Growth in cases chart */}
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 30}} >
                        <Text style={{fontFamily: 'FiraSans-Regular', fontSize: 13}}>Daily cases</Text>
                        <LineChart
                            data={{
                            labels: dates,
                            datasets: [
                                {
                                data: cases,
                                color: (opacity = 1) => `rgba(2, 8, 135, ${1})`, // optional
                                strokeWidth: 2 // optional    
                                }
                            ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height= {300}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundGradientFrom: "#fff",
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientTo: "#fff",
                                backgroundGradientToOpacity: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                strokeWidth: 2, // optional, default 3
                                barPercentage: 0.5,
                                decimalPlaces: 0,
                                useShadowColorFromDataset: false // optional
                            }}
                            bezier
                            height={220}
                            withShadow = {false}
                            withDots = {false}
                            withInnerLines = {false}
                            fromZero = {true}
                            style={{
                            marginVertical: 8,
                            marginHorizontal: 10,
                            }}
                        />

                        <Text style={{fontFamily: 'FiraSans-Regular', fontSize: 13, marginTop: 25}}>Daily deaths</Text>
                        <LineChart
                            data={{
                            labels: dates,
                            datasets: [
                                {
                                data: deaths,
                                color: (opacity = 1) => `rgba(2, 8, 135, ${1})`, // optional
                                strokeWidth: 2 // optional    
                                }
                            ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height= {300}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundGradientFrom: "#fff",
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientTo: "#fff",
                                backgroundGradientToOpacity: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                strokeWidth: 2, // optional, default 3
                                barPercentage: 0.5,
                                decimalPlaces: 0,
                                useShadowColorFromDataset: false // optional
                            }}
                            bezier
                            height={220}
                            withShadow = {false}
                            withDots = {false}
                            withInnerLines = {false}
                            fromZero = {true}
                            style={{
                            marginVertical: 8,
                            marginHorizontal: 10,
                            }}
                        />
                    </View>
                    <Footer />
                
                </ScrollView>
            </SafeAreaView>
            </>
        );
    }

    
};


export default App;
