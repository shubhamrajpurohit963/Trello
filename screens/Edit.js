import React,{useState,useEffect} from 'react'
import {StyleSheet,ScrollView} from 'react-native'

import {Fab, Icon,List,ListItem,Left,Button,Body,Right,CheckBox,Title,H1,Subtitle,Container,Text,Spinner,Form, Item,Input} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage'

const Edit = ({navigation,route}) => {

   const [name,setName] = useState('')
   const [desc,setDesc] = useState('')
   const [id,setId] = useState(null)

  
   const update = async () => {
        try {
          if(!name || !desc){
            return alert("Please Fill Both Values")
          }

          const listToUpdate = {
            id,
            name,
            desc,
            isDone: false
          }

          const storedValue = await AsyncStorage.getItem('@todo_list')
          const list = await JSON.parse(storedValue)

          list.map((i)=>{
              if(i.id==id){
                i.name = name
                i.desc = desc
              }
              return i;
          })

          await AsyncStorage.setItem('@todo_list',JSON.stringify(list))
          navigation.navigate('Home')

        } catch (error) {
          console.log(error)
        }
   }

   useEffect(()=>{
      const {aTodo} = route.params
      const {id,name,desc} = aTodo
      setId(id)
      setName(name)
      setDesc(desc)
   },[]) 

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

                <Button rounded block style={{backgroundColor:'#0A79DF'}} onPress={update} >
                    <Text style={{color:'#EEE'}}>Update</Text>
                </Button>
            </Form>
        </ScrollView>
    </Container>
)
}

export default Edit


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
      padding: 20

    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });
  