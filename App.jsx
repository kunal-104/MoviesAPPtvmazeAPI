import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// App Component
const App = () =>{

  useEffect(() => {
    if(Platform.OS === 'android'){
      SplashScreen.hide();
    }
  

  }, [])
  

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=all`
        );
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Tab.Navigator Component
  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // No headers for tabs
        tabBarStyle: { backgroundColor: '#000', borderTopWidth: 0 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'; // Example icons
            return <AntDesign name={iconName} size={30} color={color} />;
          } else if (route.name === 'Search') {
            iconName = focused ? 'movie-search' : 'movie-search-outline'; // Example icons
            return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
          }
        },
        tabBarActiveTintColor: '#ff6347', // Active tab color
        tabBarInactiveTintColor: '#fff', // Inactive tab color
        tabBarLabelStyle: { display: 'none' }, // Hides the tab labels
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{movies}}/>
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
  
  // Main Stack.Navigator
  const StackNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator} // Include Tab Navigator here
        options={{ headerShown: false }} // Hide stack header for tabs
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
           headerShown: true, 
           headerStyle: {
            backgroundColor: '#000', // Change the background color
          },
          headerTitleStyle: {
            color: '#ff6347', // Change the header text color
          },
          headerTintColor: '#fff', 
         }} // Show header for stack-only screens
      />
    </Stack.Navigator>
  );



  
  return(
  <NavigationContainer>
    <StackNavigator />
  </NavigationContainer>
)};

export default App;
