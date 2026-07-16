import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

// In-memory only: bookmarks reset on app restart. No AsyncStorage/persistence
// is wired up for this MVP — intentionally skipped, called out here so it's
// not mistaken for a bug.

interface BookmarksState {
  ids: ReadonlySet<string>;
}

type BookmarksAction = { type: 'toggle'; id: string };

function bookmarksReducer(
  state: BookmarksState,
  action: BookmarksAction,
): BookmarksState {
  switch (action.type) {
    case 'toggle': {
      const next = new Set(state.ids);
      if (next.has(action.id)) {
        next.delete(action.id);
      } else {
        next.add(action.id);
      }
      return { ids: next };
    }
    default:
      return state;
  }
}

interface BookmarksContextValue {
  bookmarkedIds: ReadonlySet<string>;
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (id: string) => void;
}

const BookmarksContext = createContext<BookmarksContextValue | undefined>(
  undefined,
);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookmarksReducer, {
    ids: new Set<string>(),
  });

  const toggleBookmark = useCallback((id: string) => {
    dispatch({ type: 'toggle', id });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => state.ids.has(id),
    [state.ids],
  );

  const value = useMemo<BookmarksContextValue>(
    () => ({ bookmarkedIds: state.ids, isBookmarked, toggleBookmark }),
    [state.ids, isBookmarked, toggleBookmark],
  );

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks(): BookmarksContextValue {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
}
