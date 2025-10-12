import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    helperText: {
      control: { type: 'text' },
    },
    isRequired: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

// With label
export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
  },
}

// With error
export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
  },
}

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters long',
  },
}

// With icons
export const WithIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search products...',
    leftIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    rightIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
}

// Required field
export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    isRequired: true,
  },
}

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    value: 'Cannot edit this',
  },
}

// Different input types
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input 
        label="Text" 
        type="text" 
        placeholder="Enter text" 
      />
      <Input 
        label="Email" 
        type="email" 
        placeholder="Enter email" 
      />
      <Input 
        label="Password" 
        type="password" 
        placeholder="Enter password" 
      />
      <Input 
        label="Number" 
        type="number" 
        placeholder="Enter number" 
      />
      <Input 
        label="Phone" 
        type="tel" 
        placeholder="Enter phone number" 
      />
    </div>
  ),
}

// All states comparison
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Normal</h3>
        <Input label="Normal Input" placeholder="Normal state" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Helper Text</h3>
        <Input 
          label="With Helper" 
          placeholder="Has helper text" 
          helperText="This is helper text" 
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Error</h3>
        <Input 
          label="With Error" 
          placeholder="Has error" 
          error="This field has an error" 
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Required</h3>
        <Input 
          label="Required Field" 
          placeholder="Required field" 
          isRequired 
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Disabled</h3>
        <Input 
          label="Disabled Input" 
          placeholder="Disabled" 
          disabled 
          value="Cannot edit" 
        />
      </div>
    </div>
  ),
}

// Form example
export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <Input 
        label="First Name" 
        placeholder="Enter first name" 
        isRequired 
      />
      <Input 
        label="Last Name" 
        placeholder="Enter last name" 
        isRequired 
      />
      <Input 
        label="Email Address" 
        type="email" 
        placeholder="Enter email address" 
        isRequired 
        helperText="We'll never share your email" 
      />
      <Input 
        label="Phone Number" 
        type="tel" 
        placeholder="Enter phone number" 
        leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        }
      />
    </form>
  ),
}

// Interactive story
export const Interactive: Story = {
  args: {
    label: 'Interactive Input',
    placeholder: 'Type something...',
    onChange: (e) => console.log('Input changed:', e.target.value),
  },
}
