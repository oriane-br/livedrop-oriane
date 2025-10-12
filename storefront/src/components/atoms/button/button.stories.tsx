import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story showing all variants
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

// All variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
}

// Sizes story
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

// With icons story
export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button 
        leftIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
      >
        Add Item
      </Button>
      <Button 
        rightIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        }
      >
        Continue
      </Button>
      <Button 
        leftIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
        rightIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        }
      >
        Both Icons
      </Button>
    </div>
  ),
}

// Loading states story
export const LoadingStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button isLoading>Loading Primary</Button>
      <Button variant="secondary" isLoading>Loading Secondary</Button>
      <Button variant="outline" isLoading>Loading Outline</Button>
      <Button variant="ghost" isLoading>Loading Ghost</Button>
      <Button variant="danger" isLoading>Loading Danger</Button>
    </div>
  ),
}

// Disabled story
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>Disabled Primary</Button>
      <Button variant="secondary" disabled>Disabled Secondary</Button>
      <Button variant="outline" disabled>Disabled Outline</Button>
      <Button variant="ghost" disabled>Disabled Ghost</Button>
      <Button variant="danger" disabled>Disabled Danger</Button>
    </div>
  ),
}

// Interactive story
export const Interactive: Story = {
  args: {
    children: 'Click me',
    onClick: () => alert('Button clicked!'),
  },
}

// All variants in a grid
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="primary" disabled>Primary Disabled</Button>
      <Button variant="secondary" disabled>Secondary Disabled</Button>
      <Button variant="outline" disabled>Outline Disabled</Button>
      <Button variant="ghost" disabled>Ghost Disabled</Button>
      <Button variant="danger" disabled>Danger Disabled</Button>
    </div>
  ),
}
