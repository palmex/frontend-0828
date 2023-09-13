import React from "react"
import {StyleSheet, View, Text, Button, ScrollView} from "react-native"

export default class Cars extends React.Component{

    // 1. constructor
    constructor(props){
        super(props)
        this.state = {
            make: "",
            testState: "Click Me!",
            color: "",
            // "make", "model", "car_id", "year", "odometer"
            data: []
        }
    }

    async componentDidMount(){
        console.log('component did mount')
        // this is where I want to make my api call
        const response = await fetchCars()
        console.log(response)
        // this.setState({data: response})

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
                <ScrollView style={styles.list}>
                    {(this.state.data.map((car) => 
                        <View key={car.car_id}>
                            <Text>
                                {car.make}
                            </Text>
                        </View>
                    ))}
                    
                </ScrollView>
                <Button onPress={this.buttonClicked} title={this.state.testState}></Button>
            </View>
        )
    }

}

async function fetchCars(){
    return fetch('http://localhost:3000/cars/all',{
        method:'GET',
        withCredentials: true,
        headers:{
            'admin':'true',
            'Access-Control-Allow-Origin':'http://localhost:3000/*',
            'Access-Control-Allow-Headers':'*',
            'Accept': 'application/json'
        }}).then(response => {
            console.log(response)
            return response
        })
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