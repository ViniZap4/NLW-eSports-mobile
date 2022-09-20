import { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context"

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';


export function Home() {
  const [games, setGames] = useState<GameCard[]>([])

  useEffect(()=>{
    fetch("http://192.168.15.58:3333/games")
    .then(response => response.json())
    .then(data => setGames(data))
  },[])

  const navigation = useNavigation()

  function handleOpenGame({ id, title, bannerUrl} : GameCard){
    navigation.navigate('game', {id, title, bannerUrl})
  } 

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />
        
        <Heading 
          title="Encontre o seu Duo!"
          subtitle="Selecione o game que deseja jogar!"
        />
  
        <FlatList 
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) =>(
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />

      </SafeAreaView>
    </Background>
  );
}