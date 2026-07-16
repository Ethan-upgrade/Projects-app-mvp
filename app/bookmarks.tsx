import { Stack, useRouter } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBookmarks } from '../context/BookmarksContext';
import { spots, type Spot } from '../data/spots';

export default function BookmarksScreen() {
  const router = useRouter();
  const { bookmarkedIds } = useBookmarks();
  const bookmarkedSpots = spots.filter((spot) => bookmarkedIds.has(spot.id));

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <Stack.Screen options={{ title: '我的收藏' }} />
      {bookmarkedSpots.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>还没有收藏的景点</Text>
          <Text style={styles.emptyStateSubtitle}>
            回到列表页，点开景点详情页的“收藏”按钮即可添加。
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedSpots}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <BookmarkCard
              spot={item}
              onPress={() => router.push(`/spot/${item.id}`)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

function BookmarkCard({ spot, onPress }: { spot: Spot; onPress: () => void }) {
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
    width: 80,
    height: 80,
  },
  cardBody: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    gap: 4,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  cardEnglishName: {
    fontSize: 13,
    color: '#6B6B6F',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#6B6B6F',
    textAlign: 'center',
  },
});
