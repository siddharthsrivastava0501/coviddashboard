import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Text} from 'react-native-elements'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class T extends Component {

    // Props will have newCases and newDeaths
    constructor(props) {
      super(props);
    }

    textData (i, color) {
        return (
            <Text style={{color: color, fontFamily: 'FiraSans-Black', textAlign: 'center'}}>
                {i + "%"}
            </Text>
        )
    }
   
    render() {
      const state = this.state;
      return (
        <View style={{marginTop: 30}}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#fff'}}>
            <Row data={["New cases", "New deaths"]} textStyle={{textAlign: 'center', fontFamily: 'FiraSans-Regular', fontSize: 11}}/>
            <Row data={[this.props.newCases, this.props.newDeaths]} textStyle={{textAlign: 'center', fontFamily: 'FiraSans-Black', fontSize: 35}}/>
            {
                    <Row data={[
                        <Cell data={this.textData(this.props.changeCases, this.props.changeCasesColor)} />,
                        <Cell data={this.textData(this.props.changeDeaths, this.props.changeDeathsColor)} />,
                    ]} />
            }
          </Table>
        </View>
      )
    }
}