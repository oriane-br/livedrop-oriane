import type { Meta, StoryObj } from '@storybook/react'
import { AskSupportPanel } from './ask-support-panel'

const meta: Meta<typeof AskSupportPanel> = {
  title: 'Organisms/AskSupportPanel',
  component: AskSupportPanel,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    onClose: { action: 'closed' },
  },
}

export default meta
type Story = StoryObj<typeof AskSupportPanel>

export const Default: Story = {
  args: {
    isOpen: true,
  },
}

export const Empty: Story = {
  args: {
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Initial state with empty question input and helper text.',
      },
    },
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
  },
}

export const WithQuestionAndAnswer: Story = {
  args: {
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Panel with a sample question and answer displayed. Try asking a question to see the response format.',
      },
    },
  },
}

export const LoadingState: Story = {
  args: {
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the loading state while processing a question. This state appears when the support engine is processing.',
      },
    },
  },
}

export const OutOfScopeResponse: Story = {
  args: {
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the error state when the support engine cannot find a relevant answer to the question.',
      },
    },
  },
}

export const WithOrderStatusResponse: Story = {
  args: {
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a response that includes order status information with proper citation.',
      },
    },
  },
}

export const WithHistory: Story = {
  args: {
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Panel showing multiple Q&A pairs in the history section. Previous questions are displayed below the current response.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo. Try asking questions about orders, returns, or policies. Use Ctrl+Enter to submit quickly, or click the submit button. Use ESC or click outside to close.',
      },
    },
  },
}
