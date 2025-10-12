import type { Meta, StoryObj } from '@storybook/react'
import { PageLayout } from './page-layout'

const meta: Meta<typeof PageLayout> = {
  title: 'Templates/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    showHeader: {
      control: 'boolean',
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    className: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof PageLayout>

const SampleContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Page Title</h1>
    <p className="text-lg text-gray-600">
      This is sample content to demonstrate the page layout. The content is contained within
      the specified max-width and has proper spacing and typography.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-semibold text-gray-900">Card {i + 1}</h3>
          <p className="text-sm text-gray-600 mt-2">
            This is a sample card to show how content looks within the layout.
          </p>
        </div>
      ))}
    </div>
  </div>
)

const LongContent = () => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-gray-900">Long Content Page</h1>
    {Array.from({ length: 10 }, (_, i) => (
      <section key={i} className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Section {i + 1}</h2>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
          sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt.
        </p>
      </section>
    ))}
  </div>
)

export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default page layout with header, main content area, and footer. Includes cart and support functionality.',
      },
    },
  },
}

export const WithoutHeader: Story = {
  args: {
    children: <SampleContent />,
    showHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout without header. Useful for landing pages or special layouts.',
      },
    },
  },
}

export const SmallMaxWidth: Story = {
  args: {
    children: <SampleContent />,
    maxWidth: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with small max-width (max-w-3xl). Good for focused content like blog posts.',
      },
    },
  },
}

export const MediumMaxWidth: Story = {
  args: {
    children: <SampleContent />,
    maxWidth: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with medium max-width (max-w-5xl). Balanced for most content types.',
      },
    },
  },
}

export const LargeMaxWidth: Story = {
  args: {
    children: <SampleContent />,
    maxWidth: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with large max-width (max-w-7xl). Default size for most pages.',
      },
    },
  },
}

export const ExtraLargeMaxWidth: Story = {
  args: {
    children: <SampleContent />,
    maxWidth: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with extra large max-width (max-w-screen-2xl). For wide content like dashboards.',
      },
    },
  },
}

export const FullWidth: Story = {
  args: {
    children: <SampleContent />,
    maxWidth: 'full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with full width (no max-width). For full-screen layouts.',
      },
    },
  },
}

export const LongContentStory: Story = {
  args: {
    children: <LongContent />,
    maxWidth: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with long content to test scrolling behavior and layout stability.',
      },
    },
  },
}

export const WithCustomClass: Story = {
  args: {
    children: <SampleContent />,
    className: 'bg-gradient-to-br from-blue-50 to-indigo-100',
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with custom background styling applied to the main container.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo. Try clicking the cart button, support button, or any interactive elements to see the layout behavior.',
      },
    },
  },
}

export const MobileView: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Page layout on mobile devices. Shows responsive behavior and mobile-optimized layout.',
      },
    },
  },
}

export const TabletView: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Page layout on tablet devices. Shows intermediate responsive behavior.',
      },
    },
  },
}

export const DesktopView: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Page layout on desktop devices. Shows full desktop layout with all features.',
      },
    },
  },
}
