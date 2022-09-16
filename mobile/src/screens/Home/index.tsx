import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { Game, GameCard } from "../../components/GameCard";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";

export const Home = () => {
  const navigation = useNavigation();
  const [games, setGames] = useState<Game[]>([]);

  const handleOpenGame = ({ id, title, bannerUrl }: Game) => {
    navigation.navigate("game", { id, title, bannerUrl });
  };

  useEffect(() => {
    fetch("http://192.168.10.122:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(game) => game.id}
          renderItem={({ item: game }) => (
            <GameCard game={game} onPress={() => handleOpenGame(game)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
};
