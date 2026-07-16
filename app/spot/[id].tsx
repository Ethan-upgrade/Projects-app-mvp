import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBookmarks } from '../../context/BookmarksContext';
import { spots } from '../../data/spots';

export default function SpotDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const spot = spots.find((candidate) => candidate.id === id);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!spot) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
        <Stack.Screen options={{ title: '未找到景点' }} />
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>没有找到该景点，可能已被移除。</Text>
        </View>
      </SafeAreaView>
    );
  }

  const bookmarked = isBookmarked(spot.id);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <Stack.Screen options={{ title: spot.name }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: spot.imageUrl }} style={styles.heroImage} />
        <View style={styles.body}>
          <Text style={styles.name}>{spot.name}</Text>
          <Text style={styles.englishName}>{spot.englishName}</Text>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryText}>{spot.category}</Text>
          </View>
          <Text style={styles.description}>{spot.shortDesc}</Text>

          <Pressable
            onPress={() => toggleBookmark(spot.id)}
            style={({ pressed }) => [
              styles.bookmarkButton,
              bookmarked && styles.bookmarkButtonActive,
              pressed && styles.bookmarkButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={bookmarked ? '取消收藏' : '收藏该景点'}
          >
            <Text
              style={[
                styles.bookmarkButtonText,
                bookmarked && styles.bookmarkButtonTextActive,
              ]}
            >
              {bookmarked ? '★ 已收藏' : '☆ 收藏'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  heroImage: {
    width: '100%',
    height: 240,
  },
  body: {
    padding: 20,
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  englishName: {
    fontSize: 15,
    color: '#6B6B6F',
  },
  categoryPill: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#EAF1FE',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A73E8',
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#3C3C43',
  },
  bookmarkButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D5',
  },
  bookmarkButtonActive: {
    backgroundColor: '#1A73E8',
    borderColor: '#1A73E8',
  },
  bookmarkButtonPressed: {
    opacity: 0.85,
  },
  bookmarkButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  bookmarkButtonTextActive: {
    color: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 15,
    color: '#6B6B6F',
    textAlign: 'center',
  },
});
