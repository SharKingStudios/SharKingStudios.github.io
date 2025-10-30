'use client';

import * as React from 'react';
import {
  searchQueryAtom,
  selectedTagAtom,
  filteredPostIdsAtom,
  filtersInitializedAtom,
} from '@/stores/blogFilterStore';
import { BlogFilters, type BlogFiltersProps } from './BlogFilters';
// Tu devras créer ou ajuster l'import pour BlogPostCard si tu veux le rendre depuis React
// Pour l'instant, nous allons supposer que BlogPostCard est un composant Astro et que nous devons passer les données filtrées à Astro.
// Cela signifie que FilteredPostsList ne rendra que les filtres, et passera les posts filtrés à un slot ou à un autre composant.
// OU, nous transformons BlogPostCard en un composant React.

// For a full client approach, it is simpler if BlogPostCard is also React.
// If BlogPostCard must remain Astro, the logic of rendering filtered posts will remain in AllBlogPostsScreen.astro,
// and this component will only calculate and return filtered posts via a callback.

// Option 1: BlogPostCard becomes React (simpler for full client filtering)
// Supposons que tu aies une version React de BlogPostCard
// import BlogPostCardReact from './BlogPostCardReact';

// Option 2: This component only filters and returns data (more complex to integrate with Astro for rendering)

// Allons avec l'idée que ce composant gère l'affichage, donc BlogPostCard devrait être utilisable ici.
// Si BlogPostCard est .astro, il ne peut pas être utilisé directement dans .tsx comme ça.
// Pour l'instant, je vais simuler le rendu des posts.

// Let's redefine PostData to be more explicit about what FilteredPostsList expects.
// It expects data that was originally in frontmatter (title, description, tags)
// and also the body for searching, plus slug and id.
export type PostDataForFilter = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags?: Array<string>;
  body: string; // For searching in content
  pubDate: Date;
  // Add any other fields from CollectionEntry<'blog'>['data'] you might need for display or filtering
};

export type FilteredPostsListProps = {
  allPosts: Array<PostDataForFilter>;
  texts: BlogFiltersProps['texts'] & { noPostsFound: string };
  lang: string;
  initialSearchQuery?: string;
  initialTag?: string;
};

// Note: We are not using useStore here to read initial values from the store,
// because initialSearchQuery and initialTag are passed as props from Astro.
// The component will initialize its own state from these props, then update the store.
export function FilteredPostsList({
  allPosts,
  texts,
  lang,
  initialSearchQuery = '',
  initialTag = '',
}: FilteredPostsListProps) {
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);
  const [selectedTag, setSelectedTag] = React.useState(initialTag);

  React.useEffect(() => {
    // Met à jour l'URL lorsque les filtres changent
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    if (selectedTag) {
      params.set('tag', selectedTag);
    } else {
      params.delete('tag');
    }

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );
    searchQueryAtom.set(searchQuery);
    selectedTagAtom.set(selectedTag);
  }, [searchQuery, selectedTag]);

  const filteredPosts = React.useMemo(() => {
    let posts = allPosts;

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCaseQuery) ||
          post.description.toLowerCase().includes(lowerCaseQuery) ||
          post.body.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (selectedTag) {
      posts = posts.filter((post) => post.tags?.includes(selectedTag));
    }

    const postIds = posts.map((p) => p.id);
    filteredPostIdsAtom.set(postIds);
    if (!filtersInitializedAtom.get()) {
      filtersInitializedAtom.set(true);
    }
    return posts;
  }, [allPosts, searchQuery, selectedTag]);

  // Extract unique tags for the BlogFilters component
  const uniqueTagsForFilter = React.useMemo(() => {
    const allTagsRaw = allPosts.flatMap((post) => post.tags || []);
    return [...new Set(allTagsRaw)].sort().map((tag) => ({
      value: tag,
      label: tag.charAt(0).toUpperCase() + tag.slice(1),
    }));
  }, [allPosts]);

  return (
    <BlogFilters
      allTags={uniqueTagsForFilter}
      currentSearchQuery={searchQuery}
      currentTag={selectedTag}
      texts={texts}
      onSearchChange={setSearchQuery}
      onTagChange={setSelectedTag}
    />
  );
}
