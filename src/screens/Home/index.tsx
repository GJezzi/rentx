import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp} from '@react-navigation/native-stack'
import { RFValue} from 'react-native-responsive-fontsize'

import { RootsParamList } from '../../@types/navigation';

import { CarDTO } from '../../dtos/CarDTO';

import { api } from '../../services/api';

import { Car } from '../../components/Car'
import { Load } from '../../components/Load'

import Logo from '../../assets/logo.svg'

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootsParamList, 'Home'>;

export const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCarDetails = () => {
    navigation.navigate('CarDetails');
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [])
  

  return( 
    <Container>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='transparent' 
        translucent
      />
        <Header>
          <HeaderContent>
            <Logo width={RFValue(108)} height={RFValue(12)}/>
            <TotalCars>Total de 12 carros</TotalCars>
          </HeaderContent>
        </Header>
        {loading ? <Load/> :
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={handleCarDetails} />}
          />
        }
    </Container>
  )
}





