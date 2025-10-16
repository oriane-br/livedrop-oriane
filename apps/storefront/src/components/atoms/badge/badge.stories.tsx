import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge icon={<span>✓</span>}>Success</Badge>
      <Badge variant="warning" icon={<span>⚠</span>}>Warning</Badge>
      <Badge variant="danger" icon={<span>✕</span>}>Error</Badge>
      <Badge variant="info" icon={<span>ℹ</span>}>Info</Badge>
    </div>
  ),
}

export const RoundedVsDefault: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default Rounded</Badge>
      <Badge rounded>Fully Rounded</Badge>
      <Badge variant="success">Default Success</Badge>
      <Badge variant="success" rounded>Rounded Success</Badge>
    </div>
  ),
}

export const CompleteExample: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">With Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Badge icon={<span>✓</span>}>Complete</Badge>
          <Badge variant="warning" icon={<span>⚠</span>}>Pending</Badge>
          <Badge variant="danger" icon={<span>✕</span>}>Failed</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Rounded</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge rounded>Rounded</Badge>
          <Badge variant="success" rounded>Success Rounded</Badge>
        </div>
      </div>
    </div>
  ),
}
