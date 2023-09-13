import React from "react"
import {StyleSheet, View, Text, Button, ScrollView} from "react-native"

export default class Cars extends React.Component{

    // 1. constructor
    constructor(props){
        super(props)
        this.state = {
            make: "",
            testState: "Click Me!",
            color: ""
        }
    }

    // 2. functions that execute 
    buttonClicked = () => {
        this.setState({testState: "Clicked!"})
    }

    // 3. rendering things 

    render(){
        return(
            <View style={styles.container}>
                <Text style={{color: this.props.carcolor}}>Car Component</Text>
                <ScrollView style={styles.list}></ScrollView>
                <Button onPress={this.buttonClicked} title={this.state.testState}></Button>
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
    list: {
        flex: 1,
        backgroundColor: '#aaa',
        borderColor: "#000",
        borderStyle: "solid",
        borderWidth: "1px",
        minHeight: "300px",
        maxHeight: "50%",
        borderRadius: "10px",
        minWidth: "100px"
        
      }
  });