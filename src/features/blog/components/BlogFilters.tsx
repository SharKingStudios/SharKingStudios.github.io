'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type TagOption = {
  value: string;
  label: string;
};

export type BlogFiltersProps = {
  onSearchChange: (query: string) => void;
  onTagChange: (tag: string) => void;
  allTags: Array<TagOption>;
  currentSearchQuery: string;
  currentTag: string;
  texts: {
    searchPlaceholder: string;
    filterByTagButtonLabel: string;
    noTagFound: string;
    selectTagCommandPlaceholder: string;
    allTagsLabel: string;
  };
};

export function BlogFilters({
  allTags,
  currentSearchQuery,
  currentTag,
  texts,
  onSearchChange,
  onTagChange,
}: BlogFiltersProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const handleInternalSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onSearchChange(event.target.value);
  };

  const handleInternalTagSelect = (tagValueFromCommand: string) => {
    let newSelectedTagValue: string;
    if (tagValueFromCommand === '') {
      // "All Tags" selected
      newSelectedTagValue = '';
    } else if (tagValueFromCommand === currentTag) {
      // Clicked current tag to deselect
      newSelectedTagValue = '';
    } else {
      // Selected a new tag
      newSelectedTagValue = tagValueFromCommand;
    }
    onTagChange(newSelectedTagValue);
    setPopoverOpen(false);
  };

  const displayTags = [{ value: '', label: texts.allTagsLabel }, ...allTags];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <Input
        type="search"
        placeholder={texts.searchPlaceholder}
        value={currentSearchQuery}
        onChange={handleInternalSearchChange}
        className="w-full sm:max-w-xs"
      />
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={popoverOpen}
            className="w-full sm:w-[200px] justify-between"
          >
            {currentTag && allTags.find((tag) => tag.value === currentTag)
              ? allTags.find((tag) => tag.value === currentTag)?.label
              : texts.filterByTagButtonLabel}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-[200px] p-0">
          <Command>
            <CommandInput placeholder={texts.selectTagCommandPlaceholder} />
            <CommandList>
              <CommandEmpty>{texts.noTagFound}</CommandEmpty>
              <CommandGroup>
                {displayTags.map((tag) => (
                  <CommandItem
                    key={tag.value}
                    value={tag.value} // This value is passed to onSelect
                    onSelect={(selectedValue) => {
                      handleInternalTagSelect(selectedValue);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 size-4',
                        currentTag === tag.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {tag.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
