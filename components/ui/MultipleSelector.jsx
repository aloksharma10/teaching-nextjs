'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useState, useCallback, useMemo, useRef } from 'react';
import { Command as CommandPrimitive, useCommandState } from 'cmdk';
import { X } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from './input';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options, groupBy) {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      '': options,
    };
  }

  const groupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy]) || '';
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption, picked) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption));

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter((val) => !picked.find((p) => p.value === val.value));
  }
  return cloneOption;
}

function isOptionsExist(groupOption, targetOption) {
  for (const [key, value] of Object.entries(groupOption)) {
    if (value.some((option) => targetOption.find((p) => p.value === option.value))) {
      return true;
    }
  }
  return false;
}

/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
const CommandEmpty = forwardRef((props, forwardedRef) => {
  const render = useCommandState((state) => state.filtered.count === 0);

  if (!render) return null;

  return (
    <div
      ref={forwardedRef}
      className={cn('py-6 text-center text-sm', props.className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
});

CommandEmpty.displayName = 'CommandEmpty';

const MultipleSelector = forwardRef(({
  value,
  onChange,
  placeholder,
  defaultOptions = [],
  options: arrayOptions,
  delay,
  onSearch,
  loadingIndicator,
  emptyIndicator,
  maxSelected = Number.MAX_SAFE_INTEGER,
  onMaxSelected,
  hidePlaceholderWhenSelected,
  disabled,
  groupBy,
  className,
  badgeClassName,
  selectFirstItem = true,
  creatable = false,
  triggerSearchOnFocus = false,
  commandProps,
  inputProps
}, ref) => {

  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selected, setSelected] = useState(value || []);
  const [options, setOptions] = useState(transToGroupOption(defaultOptions, groupBy));

  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

  useEffect(() => {
    setOptions(transToGroupOption(defaultOptions, groupBy))
  }, [defaultOptions])

  useImperativeHandle(ref, () => ({
    selectedValue: [...selected],
    input: inputRef.current,
    focus: () => inputRef.current?.focus(),
  }), [selected]);

  const handleUnselect = useCallback((option) => {
    const newOptions = selected.filter((s) => s.value !== option.value);
    setSelected(newOptions);
    onChange?.(newOptions);
  }, [onChange, selected]);

  const handleKeyDown = useCallback((e) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '' && selected.length > 0) {
          handleUnselect(selected[selected.length - 1]);
        }
      }
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, [handleUnselect, selected]);

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    if (!arrayOptions || onSearch) {
      return;
    }
    const newOption = transToGroupOption(arrayOptions || [], groupBy);
    if (JSON.stringify(newOption) !== JSON.stringify(options)) {
      setOptions(newOption);
    }
  }, [defaultOptions, arrayOptions, groupBy, onSearch, options]);

  useEffect(() => {
    const doSearch = async () => {
      setIsLoading(true);
      const res = await onSearch?.(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
      setIsLoading(false);
    };

    const exec = async () => {
      if (!onSearch || !open) return;

      if (triggerSearchOnFocus) {
        await doSearch();
      }

      if (debouncedSearchTerm) {
        await doSearch();
      }
    };

    void exec();
  }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

  const CreatableItem = () => {
    if (!creatable) return undefined;
    if (
      isOptionsExist(options, [{ value: inputValue, label: inputValue }]) ||
      selected.find((s) => s.value === inputValue)
    ) {
      return undefined;
    }

    const Item = (
      <CommandItem
        value={inputValue}
        className="cursor-pointer"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onSelect={(value) => {
          if (selected.length >= maxSelected) {
            onMaxSelected?.(selected.length);
            return;
          }
          setInputValue('');
          const newOptions = [...selected, { value, label: value }];
          setSelected(newOptions);
          onChange?.(newOptions);
        }}
      >
        {`Create "${inputValue}"`}
      </CommandItem>
    );

    if (!onSearch && inputValue.length > 0) {
      return Item;
    }

    if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
      return Item;
    }

    return undefined;
  };

  const EmptyItem = useCallback(() => {
    if (!emptyIndicator) return undefined;

    if (onSearch && !creatable && Object.keys(options).length === 0) {
      return (
        <CommandItem value="-" disabled>
          {emptyIndicator}
        </CommandItem>
      );
    }

    return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
  }, [creatable, emptyIndicator, onSearch, options]);

  const selectables = useMemo(
    () => removePickedOption(options, selected),
    [options, selected]
  );

  const commandFilter = useCallback(() => {
    if (commandProps?.filter) {
      return commandProps.filter;
    }

    if (creatable) {
      return (value, search) => {
        return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
      };
    }
    return undefined;
  }, [creatable, commandProps?.filter]);

  return (
    <Command
      {...commandProps}
      onKeyDown={(e) => {
        handleKeyDown(e);
        commandProps?.onKeyDown?.(e);
      }}
      className={cn('h-auto overflow-visible bg-transparent', commandProps?.className)}
      shouldFilter={
        commandProps?.shouldFilter !== undefined ? commandProps.shouldFilter : !onSearch
      }
      filter={commandFilter()}
    >

      <div
        className={cn(
          'min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          {
            'px-3 py-2': selected.length !== 0,
            'cursor-text': !disabled && selected.length !== 0,
          },
          className
        )}
        onClick={() => {
          setOpen(true)
          if (disabled) return;
          inputRef.current?.focus();
        }}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => (
            <Badge
              key={option.value}
              className={cn(
                'data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground',
                'data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground',
                badgeClassName
              )}
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                handleUnselect(option);
              }}
            >
              {option.label}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          {!hidePlaceholderWhenSelected && selected.length === 0 && (
            <div className="text-muted-foreground">{placeholder}</div>
          )}
        </div>
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          autoComplete="off"
          className='hidden'
          placeholder=""
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => {
            if (triggerSearchOnFocus) {
              setOpen(true);
            }
          }}
          disabled={disabled}
          {...inputProps}
        />
      </div>

      {open && <CommandList>
        <ScrollArea className="h-[200px] w-full rounded-md border p-3">
          <CommandGroup>
            <CreatableItem />
            <EmptyItem />
            {Object.keys(selectables).map((key) => (
              <CommandGroup key={key} heading={key} >
                {selectables[key].map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(value) => {
                      if (selected.length >= maxSelected) {
                        onMaxSelected?.(selected.length);
                        return;
                      }
                      const newOptions = [...selected, option];
                      setSelected(newOptions);
                      onChange?.(newOptions);
                      if (selectFirstItem) {
                        setOpen(false);
                      }
                      setInputValue('');
                    }}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandGroup>
        </ScrollArea>
      </CommandList>}

    </Command>
  );
});

MultipleSelector.displayName = 'MultipleSelector';

export default MultipleSelector;