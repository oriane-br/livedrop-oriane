import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './header'

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    cartItemCount: {
      control: { type: 'number', min: 0, max: 150 },
    },
    onCartClick: { action: 'cart clicked' },
    onSupportClick: { action: 'support clicked' },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {
    cartItemCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default header with no items in cart. Badge is hidden when count is 0.',
      },
    },
  },
}

export const WithCartItems: Story = {
  args: {
    cartItemCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with items in cart. Badge shows the count and is visible.',
      },
    },
  },
}

export const ManyCartItems: Story = {
  args: {
    cartItemCount: 42,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with many items in cart. Badge shows the exact count.',
      },
    },
  },
}

export const OverflowCartItems: Story = {
  args: {
    cartItemCount: 150,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with more than 99 items. Badge shows "99+" to prevent overflow.',
      },
    },
  },
}

export const MobileView: Story = {
  args: {
    cartItemCount: 3,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Header on mobile devices. Text labels are hidden, only icons are shown. Mobile navigation is visible.',
      },
    },
  },
}

export const TabletView: Story = {
  args: {
    cartItemCount: 7,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Header on tablet devices. Shows a balanced layout with some text labels.',
      },
    },
  },
}

export const DesktopView: Story = {
  args: {
    cartItemCount: 12,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Header on desktop devices. Full layout with all text labels and navigation visible.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    cartItemCount: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive header. Try clicking the cart button, support button, or navigation links. The logo also links to the homepage.',
      },
    },
  },
}

export const EmptyCart: Story = {
  args: {
    cartItemCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with empty cart. No badge is displayed when cart is empty.',
      },
    },
  },
}

export const SingleItem: Story = {
  args: {
    cartItemCount: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with exactly one item in cart. Badge shows "1".',
      },
    },
  },
}
