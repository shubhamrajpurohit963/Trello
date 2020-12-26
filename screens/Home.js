import React,{useState,useEffect} from 'react'
import {StyleSheet,ScrollView} from 'react-native'


import {Fab, Icon,List,ListItem,Left,Button,Body,Right,CheckBox,Title,H1,Subtitle,Container,Text,Spinner} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage'

import {useIsFocused} from '@react-navigation/native'

const Home = ({navigation, route}) => {
    
    const [list,setList] = useState([])
    const [loading,setLoading] = useState(false)

    const isFocused = useIsFocused()    

    const getList = async () => {
        setLoading(true)

        const storedList = await AsyncStorage.getItem('@todo_list')
        if(!storedList){
            setList([])
        }

        const list = JSON.parse(storedList)
        setList(list)
        
        setLoading(false)
    }
    
    const deleteTodo = async (id) => {

        const newList = await list.filter((i)=>i.id !== id)

        //updating original storage
        await AsyncStorage.setItem('@todo_list',JSON.stringify(newList))

        //updating local state
        setList(newList)
    }


    const markTodo = async (id) => {
        const newArray = list.map((i)=>{
            if(i.id==id){
                i.isDone = !i.isDone
            }
            return i
        })

        await AsyncStorage.setItem('@todo_list',JSON.stringify(newArray))
        
        setList(newArray) 
    }

    useEffect(()=>{
        getList()
    },[isFocused])

    if(loading){
        return(
            <Container style={styles.container}>
                <Spinner color="#00b7c2" />
            </Container>
        )
    }

    
    
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Pending TODOs</Text>
                {list.length==0 ? (
                    <Container style={styles.container}>
                        <H1 style={styles.heading}>TODO list is Empty, 
                        Please Add Some</H1>
                    </Container>
                ) : (
                    <>
                    <H1 style={styles.heading}>Next Todo to Complete</H1>
                    <List>
                        {list.map((aTodo)=>
                         (
                            <ListItem style={styles.listItem} noBorder key={aTodo.id}>
                            <Left>
                                <Button style={styles.actionButton} danger 
                                onPress={()=>(deleteTodo(aTodo.id))}>
                                    <Icon name="trash" active /></Button>
                                <Button style={styles.actionButton}
                                onPress={()=>{
                                    navigation.navigate('Edit',{aTodo})
                                }}>
                                    <Icon name="edit" type="Feather" active /></Button>
                            </Left>
                            <Body>
                                <Title style={styles.seasonName}>{aTodo.name}</Title>
                                <Text style={styles.seasonName}>{aTodo.desc}</Text>
                            </Body>
                            <Right>
                                <CheckBox 
                                checked={aTodo.isDone}
                                onPress= {()=>(markTodo(aTodo.id))}
                                />
                            </Right>
                        </ListItem>
                        ))}
                    </List>
                    </>
                )}
            
            <Fab style={{backgroundColor:"#5067ff"}} 
            position="bottomRight" 
            onPress={() => navigation.navigate('Add')}>
                
                <Icon name="add"></Icon>
            </Fab>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#eee',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#fdcb9e',
      textAlign: 'justify',
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });