import React from "react"
import {StyleSheet, View, Text, Button, ScrollView, TextInput} from "react-native"

export default class Cars extends React.Component{

    // 1. constructor
    constructor(props){
        super(props)
        this.state = {
            
            make: "",
            model: "",
            year: "",
            odometer: "",
            formState: "Submit",
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
        this.setState({data: response})

    }

    // 2. functions that execute 
    submit = async () => {
        console.log('state', this.state.make, this.state.model, this.state.year, this.state.odometer)
        const newCar = await createNewCar(this.state.make, this.state.model, this.state.year, this.state.odometer)
        console.log('car created', newCar)
        this.setState({formState: "Submitted!"})
    }

    // 3. rendering things 

    render(){
        // console.log("make", this.state.make)
        // console.log("odometer", this.state.odometer)
        return(
            <View style={styles.container}>
                <Text style={{color: this.props.carcolor, fontSize: "24px"}}>Car List</Text>
                {/* nest all my cars from DB inside a scrollview */}
                <ScrollView style={styles.list}>
                    {/* iterate through car array passed back from Backend */}
                    {(this.state.data.map((car) => 
                    // render each car 
                        <View key={car.car_id} style={styles.carbox}>
                            <Text style={{fontSize: "18px"}}>
                                {car.year} {car.make} {car.model} 
                            </Text>
                            <Text>
                            {car.odometer} miles
                            </Text>
                        </View>
                    ))}
                    
                </ScrollView>
                <Text style={{fontSize: "24px"}}>New Car</Text>
                <View style={styles.formView}>
                    {/* form element 1 */}
                    <View>
                  <Text>Car Make</Text>  
                  <TextInput 
                    style={styles.formInput}
                    onChangeText={(e) => this.setState({make: e})}
                  ></TextInput>
                  </View>
                  {/* form element 1 */}
                  <View>
                  <Text>Car Model</Text>  
                  <TextInput 
                    style={styles.formInput}
                    onChangeText={(e) => this.setState({model: e})}
                  ></TextInput>
                  </View>
                  {/* form element 1 */}
                  <View>
                  <Text>Car Year</Text>  
                  <TextInput 
                    style={styles.formInput}
                    onChangeText={(e) => this.setState({year: e})}
                  ></TextInput>
                  </View>
                  {/* form element 1 */}
                  <View>
                  <Text>Car Odometer</Text>  
                  <TextInput 
                    style={styles.formInput}
                    onChangeText={(e) => this.setState({odometer: e})}
                  ></TextInput>
                  </View>
                </View>
                
                <Button onPress={this.submit} title={this.state.formState}></Button>
            </View>
        )
    }

}



async function createNewCar(make, model, year, odometer){
    let reqBody = {
        "make": make,
        "model": model,
        "year": year,
        "odometer": odometer
    }
    console.log(JSON.stringify(reqBody))

    return fetch('http://localhost:3000/cars/new',{
        method:'POST',
        withCredentials: true,
        body: JSON.stringify(reqBody),
        headers:{
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':'http://localhost:3000/*',
            'Access-Control-Allow-Headers':'*',
            'Accept': 'application/json'
        }}).then(response => {
            if(response.ok){
                const newCar = response.json()
                console.log(newCar)
                return newCar
            } else {
                console.log('response not okay', response.status, response.statusText)
                var error = new Error(response.status + ':' +  response.statusText)
                error.response = response
                return error
            }
           
        }, error => {
            var errmess = new Error(error.message)
            throw errmess
        })
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
            if(response.ok){
                const cars = response.json()
                console.log(cars)
                return cars
            } else {
                console.log('response not okay', response.status, response.statusText)
                var error = new Error(response.status + ':' +  response.statusText)
                error.response = response
                return error
            }
           
        }, error => {
            var errmess = new Error(error.message)
            throw errmess
        })
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: "90%"
    },
    formInput:{
        borderColor: "#000",
        borderStyle: "solid",
        borderWidth: "1px",
        minHeight: "15px"
    },
    carbox: {
        flex: 1,
        backgroundColor: '#eeeee4',
        minHeight: "25px",
        margin: "5px",
        padding: "5px",
        alignItems: 'center',
        borderRadius: "5px",
        justifyContent: 'center',
      },
    list: {
        flex: 1,
        backgroundColor: '#aaa',
        margin: "15px",
        padding: "15px",
        borderColor: "#000",
        borderStyle: "solid",
        borderWidth: "1px",
        minHeight: "300px",
        maxHeight: "50%",
        borderRadius: "10px",
        minWidth: "70%",
        maxWidth: "90%"
        
      },
      formView: {
        flex: 1,
        backgroundColor: '#fff',
        margin: "15px",
        padding: "15px",
        borderColor: "#000",
        borderStyle: "solid",
        borderWidth: "1px",
        minHeight: "300px",
        maxHeight: "50%",
        borderRadius: "10px",
        minWidth: "70%",
        maxWidth: "90%"
        
      }
  });