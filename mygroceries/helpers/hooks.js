import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
      console.log('checking logged status', loggedIn)
      try {
        const value = AsyncStorage.getItem('jwt').then( res => {
          if (res !== null) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
        })

      } catch (e) {
        // error reading value
      }
    
  });
  return loggedIn;
};
