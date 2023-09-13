import React from "react"
import {StyleSheet, View, Text} from "react-native"

export default class Cars extends React.Component{

    // 1. constructor
    constructor(props){
        super(props)
        this.state = {
            make: "",
            testState: "",
            color: ""
        }
    }

    // 2. functions that execute 


    // 3. rendering things 

    render(){
        return(
            <View style={styles.container}>
                <Text>Car Component</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });