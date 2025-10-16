import type { Meta, StoryObj } from '@storybook/react'
import { Loading } from './loading'

const meta: Meta<typeof Loading> = {
  title: 'Templates/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      control: 'text',
    },
    fullScreen: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Loading>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default inline loading spinner with default text.',
      },
    },
  },
}

export const InlineLoading: Story = {
  args: {
    text: 'Loading content...',
    fullScreen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline loading spinner that can be used within page content.',
      },
    },
  },
}

export const FullScreenLoading: Story = {
  args: {
    text: 'Please wait...',
    fullScreen: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full screen loading overlay with backdrop blur. Covers the entire viewport.',
      },
    },
  },
}

export const WithCustomText: Story = {
  args: {
    text: 'Processing your request...',
    fullScreen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner with custom text message.',
      },
    },
  },
}

export const WithoutText: Story = {
  args: {
    text: '',
    fullScreen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner without any text, just the animated spinner.',
      },
    },
  },
}

export const FullScreenWithoutText: Story = {
  args: {
    text: '',
    fullScreen: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full screen loading overlay without text, just the spinner.',
      },
    },
  },
}

export const LongText: Story = {
  args: {
    text: 'This is a longer loading message that might wrap to multiple lines',
    fullScreen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner with longer text to test text wrapping and layout.',
      },
    },
  },
}

export const InContext: Story = {
  args: {
    text: 'Loading products...',
    fullScreen: false,
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Featured Products</h2>
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Loading component used within a page context to show how it looks in real usage.',
      },
    },
  },
}

export const FullScreenInContext: Story = {
  args: {
    text: 'Saving your changes...',
    fullScreen: true,
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Settings Page</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
            <p className="text-gray-600 mb-4">
              This is some content that would be covered by the full screen loading overlay.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Save Changes
            </button>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full screen loading overlay shown over page content to demonstrate the overlay effect.',
      },
    },
  },
}
