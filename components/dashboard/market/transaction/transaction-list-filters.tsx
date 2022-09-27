import { useMemo, useState } from 'react';
import type { ChangeEvent, FC, KeyboardEvent } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Divider, Input, Typography } from '@mui/material';
import { useUpdateEffect } from 'hooks/use-update-effect';
import { Search as SearchIcon } from 'icons/search';
import { MultiSelect } from 'components/multi-select';
import { transactionTypeOptions, transactionStatusOptions, transactionRecentOptions } from 'types/transaction';

export interface Filters {
  name?: string;
  txn_type: string[];
  status: string[];
}

interface ProjectListFiltersProps {
  onChange?: (filters: Filters) => void;
}

interface FilterItem {
  label: string;
  field: 'name' | 'txn_type' | 'status';
  value: unknown;
  displayValue?: unknown;
}

export const ProjectListFilters: FC<ProjectListFiltersProps> = (props) => {
  const { onChange, ...other } = props;
  const [queryValue, setQueryValue] = useState<string>('');
  const [filterItems, setFilterItems] = useState<FilterItem[]>([]);

  useUpdateEffect(
    () => {
      const filters: Filters = {
        name: undefined,
        txn_type: [],
        status: [],
      };

      // Transform the filter items in an object that can be used by the parent component to call the
      // serve with the updated filters
      filterItems.forEach((filterItem) => {
        switch (filterItem.field) {
          case 'name':
            // There will (or should) be only one filter item with field "name"
            // so we can set up it directly
            filters.name = filterItem.value as string;
            break;
          case 'txn_type':
            filters.txn_type.push(filterItem.value as string);
            break;
          case 'status':
            filters.status.push(filterItem.value as string);
            break;
          default:
            break;
        }
      });

      onChange?.(filters);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterItems],
  );

  const handleDelete = (filterItem: FilterItem): void => {
    setFilterItems((prevState) =>
      prevState.filter((_filterItem) => {
        return !(filterItem.field === _filterItem.field && filterItem.value === _filterItem.value);
      }),
    );
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQueryValue(event.target.value);
  };

  const handleQueryKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === 'Enter' && queryValue) {
      // We only allow one chip for the name field

      const filterItem = filterItems.find((filterItem) => filterItem.field === 'name');

      if (filterItem) {
        setFilterItems((prevState) =>
          prevState.map((filterItem) => {
            if (filterItem.field === 'name') {
              return {
                ...filterItem,
                value: queryValue,
              };
            }

            return filterItem;
          }),
        );
      } else {
        setFilterItems((prevState) => [
          ...prevState,
          {
            label: 'Name',
            field: 'name',
            value: queryValue,
          },
        ]);
      }

      setQueryValue('');
    }
  };

  const handleTxnTypeChange = (values: string[]): void => {
    setFilterItems((prevState) => {
      const valuesFound: string[] = [];

      // First cleanup the previous filter items
      const newFilterItems = prevState.filter((filterItem) => {
        if (filterItem.field !== 'txn_type') {
          return true;
        }

        const found = values.includes(filterItem.value as string);

        if (found) {
          valuesFound.push(filterItem.value as string);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newFilterItems;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = transactionTypeOptions.find((option) => option.value === value);

          newFilterItems.push({
            label: 'Type',
            field: 'txn_type',
            value,
            displayValue: option!.label,
          });
        }
      });

      return newFilterItems;
    });
  };

  const handleStatusChange = (values: string[]): void => {
    setFilterItems((prevState) => {
      const valuesFound: string[] = [];

      // First cleanup the previous filter items
      const newFilterItems = prevState.filter((filterItem) => {
        if (filterItem.field !== 'status') {
          return true;
        }

        const found = values.includes(filterItem.value as string);

        if (found) {
          valuesFound.push(filterItem.value as string);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newFilterItems;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = transactionStatusOptions.find((option) => option.value === value);

          newFilterItems.push({
            label: 'Status',
            field: 'status',
            value,
            displayValue: option!.label,
          });
        }
      });

      return newFilterItems;
    });
  };

  // We memoize this part to prevent re-render issues
  const transactionTypeValues = useMemo(
    () =>
      filterItems
        .filter((filterItems) => filterItems.field === 'txn_type')
        .map((filterItems) => filterItems.value) as string[],
    [filterItems],
  );

  const statusValues = useMemo(
    () =>
      filterItems
        .filter((filterItems) => filterItems.field === 'status')
        .map((filterItems) => filterItems.value) as string[],
    [filterItems],
  );

  // const RecentOptionsValues = useMemo(
  //   () =>
  //     filterItems
  //       .filter((filterItems) => filterItems.field === 'Most recent')
  //       .map((filterItems) => filterItems.value) as string[],
  //   [filterItems],
  // )

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          p: 1.5,
        }}
      >
        <SearchIcon fontSize="small" />
        <Box
          sx={{
            flexGrow: 1,
            ml: 3,
          }}
        >
          <Input
            disableUnderline
            fullWidth
            onChange={handleQueryChange}
            onKeyUp={handleQueryKeyup}
            placeholder="Search by type / wallet address / amount"
            value={queryValue}
          />
        </Box>
      </Box>
      <Divider />
      {filterItems.length > 0 ? (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            p: 0.5,
            pl: 1,
          }}
        >
          {filterItems.map((filterItem, i) => (
            <Chip
              key={i}
              label={
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    '& span': {
                      fontWeight: 600,
                    },
                  }}
                >
                  <span>{filterItem.label}</span>: {filterItem.displayValue || filterItem.value}
                </Box>
              }
              onDelete={(): void => handleDelete(filterItem)}
              sx={{ m: 1 }}
              variant="outlined"
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography color="textSecondary" variant="subtitle2">
            No filters applied
          </Typography>
        </Box>
      )}
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          p: 1,
        }}
      >
        <MultiSelect
          label="Type"
          onChange={handleTxnTypeChange}
          options={transactionTypeOptions}
          value={transactionTypeValues}
        />
        <MultiSelect
          label="Status"
          onChange={handleStatusChange}
          options={transactionStatusOptions}
          value={statusValues}
        />
        {/* <MultiSelect
          label="Most recent"
          onChange={handleStatusChange}
          options={transactionRecentOptions}
          value={RecentOptionsValues}
        /> */}
      </Box>
    </div>
  );
};

ProjectListFilters.propTypes = {
  onChange: PropTypes.func,
};
