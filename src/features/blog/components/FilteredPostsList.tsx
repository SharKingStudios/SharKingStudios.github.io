'use client';

import * as React from 'react';
import { BlogFilters, type BlogFiltersProps } from './BlogFilters';

type TagOption = {
  value: string;
  label: string;
};

export type FilteredPostsListProps = {
  allTags: Array<TagOption>;
  texts: BlogFiltersProps['texts'];
  initialSearchQuery?: string;
  initialTag?: string;
};

/**
 * Renders the hydrated filter controls. The Astro page owns the static project
 * cards, so this island communicates filter changes through a browser event
 * instead of relying on a module-level store shared across separate bundles.
 */
export function FilteredPostsList({
  allTags,
  texts,
  initialSearchQuery = '',
  initialTag = '',
}: FilteredPostsListProps) {
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);
  const [selectedTag, setSelectedTag] = React.useState(initialTag);

  React.useEffect(() => {
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

    const queryString = params.toString();
    const url = `${window.location.pathname}${
      queryString ? `?${queryString}` : ''
    }${window.location.hash}`;
    window.history.replaceState({}, '', url);
    window.dispatchEvent(
      new CustomEvent('blog:filters-change', {
        detail: { query: searchQuery, tag: selectedTag },
      })
    );
  }, [searchQuery, selectedTag]);

  return (
    <BlogFilters
      allTags={allTags}
      currentSearchQuery={searchQuery}
      currentTag={selectedTag}
      texts={texts}
      onSearchChange={setSearchQuery}
      onTagChange={setSelectedTag}
    />
  );
}
