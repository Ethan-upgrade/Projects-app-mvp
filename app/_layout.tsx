import { Stack } from 'expo-router';

import { BookmarksProvider } from '../context/BookmarksContext';

export default function RootLayout() {
  return (
    <BookmarksProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: '景点收藏本' }} />
        <Stack.Screen name="spot/[id]" options={{ title: '景点详情' }} />
        <Stack.Screen name="bookmarks" options={{ title: '我的收藏' }} />
      </Stack>
    </BookmarksProvider>
  );
}
