import { Stack, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { spots, type Spot } from '../data/spots';

const ALL_CATEGORIES = '全部';

export default function SpotListScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  // Derived from the data in first-appearance order, so adding a spot with a
  // new category surfaces a chip automatically — nothing to keep in sync.
  const categories = useMemo(() => {
    const uniqueCategories: string[] = [];
    for (const spot of spots) {
      if (!uniqueCategories.includes(spot.category)) {
        uniqueCategories.push(spot.category);
      }
    }
    return [ALL_CATEGORIES, ...uniqueCategories];
  }, []);

  const filteredSpots = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return spots.filter((spot) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES ||
        spot.category === selectedCategory;
      if (!matchesCategory) {
        return false;
      }
      if (normalizedQuery.length === 0) {
        return true;
      }
      return (
        spot.name.toLowerCase().includes(normalizedQuery) ||
        spot.englishName.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query, selectedCategory]);

  const handleCategoryPress = (category: string) => {
    // Tapping the already-selected chip clears the filter back to "全部".
    setSelectedCategory((current) =>
      current === category && category !== ALL_CATEGORIES
        ? ALL_CATEGORIES
        : category,
    );
  };

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
      <View style={styles.controls}>
        <View style={styles.searchField}>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="搜索景点名称"
            placeholderTextColor="#9A9AA0"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            clearButtonMode="while-editing"
            accessibilityLabel="搜索景点名称"
          />
          {/* clearButtonMode is iOS-only, so Android gets its own clear button. */}
          {query.length > 0 && Platform.OS !== 'ios' ? (
            <Pressable
              onPress={() => setQuery('')}
              hitSlop={8}
              style={styles.clearButton}
              accessibilityRole="button"
              accessibilityLabel="清除搜索"
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </Pressable>
          ) : null}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.chipScroll}
          contentContainerStyle={styles.chipRow}
        >
          {categories.map((category) => (
            <CategoryChip
              key={category}
              label={category}
              selected={category === selectedCategory}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={filteredSpots}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={EmptyState}
        renderItem={({ item }) => (
          <SpotCard spot={item} onPress={() => router.push(`/spot/${item.id}`)} />
        )}
      />
    </SafeAreaView>
  );
}

function CategoryChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>没有找到匹配的景点</Text>
      <Text style={styles.emptyStateSubtitle}>试试其他关键词，或切换分类。</Text>
    </View>
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
  controls: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    paddingVertical: 0,
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF1FE',
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A73E8',
  },
  // Horizontal ScrollView defaults to flexGrow: 1, which would stretch it to
  // fill the screen height; keep it sized to its chips.
  chipScroll: {
    flexGrow: 0,
  },
  chipRow: {
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#EAF1FE',
  },
  chipSelected: {
    backgroundColor: '#1A73E8',
  },
  chipPressed: {
    opacity: 0.85,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A73E8',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
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
