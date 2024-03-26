import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

type Todo={
  id:number,
  text:string
}
type state={
    todos:Todo[]
}
const initialState:state = {
  todos: [],
};
type actions=
    | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'REMOVE_TODO'; payload: { id: number } };


const reducer = (state:state, action:actions):state => {
  switch (action.type) {
    case "ADD_TODO":
        return{todos:[...state.todos,action.payload]};
    case "REMOVE_TODO":
        return {todos:state.todos.filter(todo=> todo.id!== action.payload.id)}    
        default:
            return state;
    }

};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      const newTodo = { id: Date.now(), text };
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setText('');
    }
  };

  const handleRemoveTodo = (id:number )=> {
    dispatch({ type: 'REMOVE_TODO', payload: { id } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Enter a new task"
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>
      <FlatList
        data={state.todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
            <Button title="Remove" onPress={() => handleRemoveTodo(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default TodoApp;
