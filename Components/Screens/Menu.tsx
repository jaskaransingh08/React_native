import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateTask from './CreateTask';
import Todos from './Todos';
const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Create Task" component={CreateTask}
      options={{
        tabBarIcon: ({ color, size }) => (
        null
        ),
        
        tabBarLabelStyle: {
          fontSize: 20, 
          marginBottom:10
        },
        headerShown:false
      }} />
      <Tab.Screen name="Task list" component={Todos} 
      options={{
        tabBarIcon: ({ color, size }) => (
        null

        ),
        tabBarLabelStyle: {
          fontSize: 20,
          marginBottom:10 
        },
        headerShown:false

      }}/>
    </Tab.Navigator>
  );
}