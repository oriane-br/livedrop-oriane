import type { Meta, StoryObj } from '@storybook/react'
import { Price } from './price'

const meta: Meta<typeof Price> = {
  title: 'Atoms/Price',
  component: Price,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    amount: {
      control: { type: 'number' },
    },
    currency: {
      control: { type: 'select' },
      options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    showCurrency: {
      control: { type: 'boolean' },
    },
    strikethrough: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    amount: 99.99,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Price amount={99.99} size="sm" />
      <Price amount={99.99} size="md" />
      <Price amount={99.99} size="lg" />
      <Price amount={99.99} size="xl" />
    </div>
  ),
}

export const DifferentAmounts: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Price amount={0.99} />
      <Price amount={12.50} />
      <Price amount={99.99} />
      <Price amount={1299.99} />
      <Price amount={1234567.89} />
    </div>
  ),
}

export const WithAndWithoutCurrency: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Currency</h3>
        <Price amount={99.99} showCurrency={true} />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Without Currency</h3>
        <Price amount={99.99} showCurrency={false} />
      </div>
    </div>
  ),
}

export const DifferentCurrencies: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Price amount={99.99} currency="USD" />
      <Price amount={99.99} currency="EUR" />
      <Price amount={99.99} currency="GBP" />
      <Price amount={99.99} currency="JPY" />
      <Price amount={99.99} currency="CAD" />
    </div>
  ),
}

export const SalePrice: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Original Price</h3>
        <Price amount={149.99} strikethrough={true} />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Sale Price</h3>
        <Price amount={99.99} size="lg" />
      </div>
    </div>
  ),
}

export const SalePriceComparison: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Price amount={149.99} strikethrough={true} />
      <Price amount={99.99} size="lg" />
    </div>
  ),
}

export const CompleteExample: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Product Pricing</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Small:</span>
            <Price amount={19.99} size="sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Medium:</span>
            <Price amount={49.99} size="md" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Large:</span>
            <Price amount={99.99} size="lg" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Premium:</span>
            <Price amount={199.99} size="xl" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Sale Items</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Price amount={149.99} strikethrough={true} />
            <Price amount={99.99} size="lg" />
            <span className="text-sm text-green-600 font-medium">Save $50!</span>
          </div>
          <div className="flex items-center gap-2">
            <Price amount={79.99} strikethrough={true} />
            <Price amount={59.99} size="lg" />
            <span className="text-sm text-green-600 font-medium">25% Off</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">International Pricing</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 w-12">USD:</span>
            <Price amount={99.99} currency="USD" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 w-12">EUR:</span>
            <Price amount={99.99} currency="EUR" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 w-12">GBP:</span>
            <Price amount={99.99} currency="GBP" />
          </div>
        </div>
      </div>
    </div>
  ),
}
