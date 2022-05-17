import { useMemo, useState } from "react";
import type { ChangeEvent, FC, KeyboardEvent } from "react";
import PropTypes from "prop-types";
import { Box, Chip, Divider, Input, Typography } from "@mui/material";
import { useUpdateEffect } from "../../../hooks/use-update-effect";
import { Search as SearchIcon } from "../../../icons/search";
import { MultiSelect } from "../../multi-select";
import {
	transactionTypeOptions,
	transactionStatusOptions,
} from "types/transaction";

export interface Filters {
	name?: string;
	transactionType: string[];
	status: string[];
	inStock?: boolean;
}

interface ProjectListFiltersProps {
	onChange?: (filters: Filters) => void;
}

interface FilterItem {
	label: string;
	field: "name" | "transactionType" | "status" | "inStock";
	value: unknown;
	displayValue?: unknown;
}

export const ProjectListFilters: FC<ProjectListFiltersProps> = (props) => {
	const { onChange, ...other } = props;
	const [queryValue, setQueryValue] = useState<string>("");
	const [filterItems, setFilterItems] = useState<FilterItem[]>([]);

	useUpdateEffect(
		() => {
			const filters: Filters = {
				name: undefined,
				transactionType: [],
				status: [],
				inStock: undefined,
			};

			// Transform the filter items in an object that can be used by the parent component to call the
			// serve with the updated filters
			filterItems.forEach((filterItem) => {
				switch (filterItem.field) {
					case "name":
						// There will (or should) be only one filter item with field "name"
						// so we can set up it directly
						filters.name = filterItem.value as string;
						break;
					case "transactionType":
						filters.transactionType.push(
							filterItem.value as string
						);
						break;
					case "status":
						filters.status.push(filterItem.value as string);
						break;
					default:
						break;
				}
			});

			onChange?.(filters);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filterItems]
	);

	const handleDelete = (filterItem: FilterItem): void => {
		setFilterItems((prevState) =>
			prevState.filter((_filterItem) => {
				return !(
					filterItem.field === _filterItem.field &&
					filterItem.value === _filterItem.value
				);
			})
		);
	};

	const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setQueryValue(event.target.value);
	};

	const handleQueryKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
		if (event.code === "Enter" && queryValue) {
			// We only allow one chip for the name field

			const filterItem = filterItems.find(
				(filterItem) => filterItem.field === "name"
			);

			if (filterItem) {
				setFilterItems((prevState) =>
					prevState.map((filterItem) => {
						if (filterItem.field === "name") {
							return {
								...filterItem,
								value: queryValue,
							};
						}

						return filterItem;
					})
				);
			} else {
				setFilterItems((prevState) => [
					...prevState,
					{
						label: "Name",
						field: "name",
						value: queryValue,
					},
				]);
			}

			setQueryValue("");
		}
	};

	const handleCategoryChange = (values: string[]): void => {
		setFilterItems((prevState) => {
			const valuesFound: string[] = [];

			// First cleanup the previous filter items
			const newFilterItems = prevState.filter((filterItem) => {
				if (filterItem.field !== "transactionType") {
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
					const option = transactionTypeOptions.find(
						(option) => option.value === value
					);

					newFilterItems.push({
						label: "Category",
						field: "transactionType",
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
				if (filterItem.field !== "status") {
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
					const option = transactionStatusOptions.find(
						(option) => option.value === value
					);

					newFilterItems.push({
						label: "Status",
						field: "status",
						value,
						displayValue: option!.label,
					});
				}
			});

			return newFilterItems;
		});
	};

	const handleStockChange = (values: string[]): void => {
		// Stock can only have one value, even if displayed as multi-select, so we select the first one.
		// This example allows you to select one value or "All", which is not included in the
		// rest of multi-selects.

		setFilterItems((prevState) => {
			// First cleanup the previous filter items
			const newFilterItems = prevState.filter(
				(filterItem) => filterItem.field !== "inStock"
			);
			const latestValue = values[values.length - 1];

			switch (latestValue) {
				case "available":
					newFilterItems.push({
						label: "Stock",
						field: "inStock",
						value: "available",
						displayValue: "Available",
					});
					break;
				case "outOfStock":
					newFilterItems.push({
						label: "Stock",
						field: "inStock",
						value: "outOfStock",
						displayValue: "Out of Stock",
					});
					break;
				default:
					// Should be "all", so we do not add this filter
					break;
			}

			return newFilterItems;
		});
	};

	// We memoize this part to prevent re-render issues
	const transactionTypeValues = useMemo(
		() =>
			filterItems
				.filter(
					(filterItems) => filterItems.field === "transactionType"
				)
				.map((filterItems) => filterItems.value) as string[],
		[filterItems]
	);

	const statusValues = useMemo(
		() =>
			filterItems
				.filter((filterItems) => filterItems.field === "status")
				.map((filterItems) => filterItems.value) as string[],
		[filterItems]
	);

	return (
		<div {...other}>
			<Box
				sx={{
					alignItems: "center",
					display: "flex",
					p: 2,
				}}>
				<SearchIcon fontSize="small" />
				<Box
					sx={{
						flexGrow: 1,
						ml: 3,
					}}>
					<Input
						disableUnderline
						fullWidth
						onChange={handleQueryChange}
						onKeyUp={handleQueryKeyup}
						placeholder="Enter a keyword"
						value={queryValue}
					/>
				</Box>
			</Box>
			<Divider />
			{filterItems.length > 0 ? (
				<Box
					sx={{
						alignItems: "center",
						display: "flex",
						flexWrap: "wrap",
						p: 2,
					}}>
					{filterItems.map((filterItem, i) => (
						<Chip
							key={i}
							label={
								<Box
									sx={{
										alignItems: "center",
										display: "flex",
										"& span": {
											fontWeight: 600,
										},
									}}>
									<span>{filterItem.label}</span>:{" "}
									{filterItem.displayValue ||
										filterItem.value}
								</Box>
							}
							onDelete={(): void => handleDelete(filterItem)}
							sx={{ m: 1 }}
							variant="outlined"
						/>
					))}
				</Box>
			) : (
				<Box sx={{ p: 3 }}>
					<Typography color="textSecondary" variant="subtitle2">
						No filters applied
					</Typography>
				</Box>
			)}
			<Divider />
			<Box
				sx={{
					alignItems: "center",
					display: "flex",
					flexWrap: "wrap",
					p: 1,
				}}>
				<MultiSelect
					label="Type"
					onChange={handleCategoryChange}
					options={transactionTypeOptions}
					value={transactionTypeValues}
				/>
				<MultiSelect
					label="Status"
					onChange={handleStatusChange}
					options={transactionStatusOptions}
					value={statusValues}
				/>
			</Box>
		</div>
	);
};

ProjectListFilters.propTypes = {
	onChange: PropTypes.func,
};
