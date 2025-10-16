import React from 'react'

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

export interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
  label?: string
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onChange,
  label = 'Sort by:',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as SortOption)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-dropdown" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id="sort-dropdown"
        name="sort"
        value={value}
        onChange={handleChange}
        className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer min-w-[180px]"
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  )
}
