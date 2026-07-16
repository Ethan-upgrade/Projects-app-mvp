import { Stack, useRouter } from 'expo-router';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { spots, type Spot } from '../data/spots';

export default function SpotListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/bookmarks')}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="查看我的收藏"
            >
              <Text style={styles.headerButtonText}>收藏</Text>
            </Pressable>
          ),
        }}
      />
      <FlatList
        data={spots}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <SpotCard spot={item} onPress={() => router.push(`/spot/${item.id}`)} />
        )}
      />
    </SafeAreaView>
  );
}

function SpotCard({ spot, onPress }: { spot: Spot; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`查看${spot.name}详情`}
    >
      <Image source={{ uri: spot.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{spot.name}</Text>
        <Text style={styles.cardEnglishName}>{spot.englishName}</Text>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{spot.category}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A73E8',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardImage: {
    width: 96,
    height: 96,
  },
  cardBody: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    gap: 4,
  },
  cardName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  cardEnglishName: {
    fontSize: 13,
    color: '#6B6B6F',
  },
  categoryPill: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: '#EAF1FE',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A73E8',
  },
});
