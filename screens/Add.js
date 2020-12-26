import React,{useState} from 'react'
import {Text,StyleSheet,ScrollView} from 'react-native'

import {Container,Form,Item,Input,Button,H1} from 'native-base'
import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage';

const Add = ({navigation,route}) => {

    const [name,setName] = useState('')
    const [desc,setDesc] = useState('')

    const addTodo = async () => {
        try {
            
            if(!name || !desc){
                return alert("Please Add Both Fields")
            }

            const todo = {
                id: shortid.generate(),
                name: name,
                desc: desc,
                isDone: false
            }

            const storedValue = await AsyncStorage.getItem('@todo_list')
            const prevList = await JSON.parse(storedValue)

            if(!prevList){
                const newList = [todo] 
                await AsyncStorage.setItem('@todo_list',JSON.stringify(newList))
            }else{
                prevList.push(todo)
                await AsyncStorage.setItem('@todo_list',JSON.stringify(prevList))
            }

            navigation.navigate('Home')


        } catch (error) {
            console.log("Error: " + error);
        }
    }

    return(
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <H1 style={styles.heading}>Add TODO</H1>
                <Form>
                    <Item rounded style={styles.formItem}>
                        <Input placeholder="Eat an Apple" style={{color:'#eeeeee'}} 
                        value={name} onChangeText={(text)=>(setName(text))}
                         />
                    </Item>
                    <Item rounded style={styles.formItem}>
                        <Input placeholder="A Lil Description" style={{color:'#eeeeee'}}
                        value={desc} onChangeText={(text)=>(setDesc(text))} />
                    </Item>

                    <Button rounded block style={{backgroundColor:'#0A79DF'}} onPress={addTodo} >
                        <Text style={{color:'#EEE'}}>Add</Text>
                    </Button>
                </Form>
            </ScrollView>
        </Container>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
      padding: 20
    },
    heading: {
      textAlign: 'center',
      color: '#EEE',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });
  