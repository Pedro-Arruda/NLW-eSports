import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { GameParams } from "../../@types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, TouchableOpacity, View, Text } from "react-native";

import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { Duo, DuoCard } from "../../components/DuoCard";
import { Background } from "../../components/Background";

import logoImg from "../../assets/logo-nlw-esports.png";
import { styles } from "./styles";

export const Game = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [duos, setDuos] = useState<Duo[]>([]);

  const game = route.params as GameParams;

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetch(`http://192.168.10.122:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(duo) => duo.id}
          renderItem={({ item: duo }) => (
            <DuoCard duo={duo} onConnect={() => {}} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
};
