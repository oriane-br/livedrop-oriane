# Component Prompts Log

This document tracks the prompts and decisions made during the development of the Storefront v1 application using AI assistance (Cursor with Claude).

## Development Approach

All components were built using AI-assisted development with human review and refinement. Each component was generated through natural language prompts, then tested and adjusted for functionality, accessibility, and performance.

---

## Phase 0: Foundation Setup

### Initial Setup
*Prompt:* "Set up a complete Vite + React + TypeScript + Tailwind storefront foundation with vitest for testing"

*Decisions:*
- Chose Vite for fast build times and modern dev experience
- TypeScript for type safety
- Tailwind for utility-first styling without custom CSS frameworks
- Vitest for fast, Vite-native testing

### Storybook Configuration
*Prompt:* "Install and configure Storybook for React + Vite + TypeScript + Tailwind with proper styling support"

*Decisions:*
- Storybook for component documentation and isolated development
- Configured to import Tailwind styles for accurate previews

---

## Phase 1: Data Layer & Infrastructure

### API Layer
*Prompt:* "Create API layer with mock data fetching for products and orders. Include listProducts(), getProduct(id), getOrderStatus(id), and placeOrder(cart). Mock order statuses based on orderId pattern."

*Key Features:*
- Mock product catalog from JSON
- Simulated order status based on ID pattern
- Related products calculation by shared tags
- Error handling and null returns

### Cart State Management
*Prompt:* "Build cart state management with React Context and localStorage persistence. Include addItem, removeItem, updateQuantity, getTotal, and getItemCount functions."

*Decisions:*
- Chose React Context over Redux for simplicity
- localStorage for persistence across sessions
- Immutable state updates
- Stock validation on add/update

### Router Configuration
*Prompt:* "Set up React Router v6 with 5 routes: /, /p/:id, /cart, /checkout, /order/:id. Wrap routes with CartProvider."

*Routes Implemented:*
- / - Catalog page
- /p/:id - Product details
- /cart - Shopping cart
- /checkout - Order summary and placement
- /order/:id - Order status tracking

### Formatting Utilities
*Prompt:* "Create formatting utilities for currency (formatCurrency), dates (formatDate), ETA calculation, order ID masking (PII protection), and stock status helpers."

*Key Features:*
- Currency formatting with Intl.NumberFormat
- PII protection: mask order IDs to last 4 characters
- Stock status with color coding
- Date and ETA formatting

---

## Phase 2: Atomic Design Components

### Phase 2A: Atoms (Basic Building Blocks)

#### Button Component
*Prompt:* "Build reusable Button component with variants (primary, secondary, outline, ghost, danger), sizes (sm, md, lg), loading states, and left/right icon support. Include proper accessibility and focus states."

*Variations:* 5 variants × 3 sizes = 15 combinations

#### Input Component
*Prompt:* "Create Input component with label, error states, helper text, left/right icons, and required field indicator. Include proper ARIA attributes for accessibility."

*Features:* Labels, validation, icons, accessibility

#### Image Component
*Prompt:* "Make Image component with lazy loading, aspect ratio options (1/1, 4/3, 16/9), fallback image support, loading skeleton, and error handling."

*Optimization:* Lazy loading by default for performance

#### Badge Component
*Prompt:* "Build Badge component with color variants (default, success, warning, danger, info), sizes (sm, md, lg), rounded option, and optional icon support."

*Use Cases:* Tags, status indicators, counts

#### Price Component
*Prompt:* "Create Price component with currency formatting from format utility, multiple sizes, and optional currency symbol display."

*Features:* Consistent price display across app

#### Card Component
*Prompt:* "Make Card component with padding variants (none, sm, md, lg), hoverable state, clickable option, and composable children sections."

*Use Cases:* Base container for content grouping

---

### Phase 2B: Molecules (Composite Components)

#### ProductCard Component
*Prompt:* "Build ProductCard showing product image (1/1 aspect), title (2 lines truncated), price, first 2 tags as badges, stock status badge, and add-to-cart button. Card should be clickable to navigate to product details (except button area)."

*Composition:* Image + Price + Badge + Button atoms

#### CartLineItem Component
*Prompt:* "Create CartLineItem with horizontal layout: small product image (64px), title and price, quantity controls (+/- buttons), line total, and remove button. Disable controls at limits (min: 1, max: stock). Responsive layout for mobile."

*Features:* Quantity management, stock limits, removal

#### SearchBar Component
*Prompt:* "Make SearchBar with left search icon, right clear button (when value present), debounced onChange (300ms), Enter key submission, full width responsive design."

*Optimization:* Debouncing for performance

#### SortDropdown Component
*Prompt:* "Build SortDropdown with native select element styled with Tailwind. Options: price low-to-high, price high-to-low, name A-Z, name Z-A. Include label 'Sort by:'."

*Simplicity:* Native select for accessibility

#### TagFilter Component
*Prompt:* "Create TagFilter with clickable tag badges, selected/unselected states, horizontal scrollable layout on mobile, clear all button, and selection count in label."

*Interaction:* Multi-select filter with visual feedback

#### OrderStatusBadge Component
*Prompt:* "Build OrderStatusBadge with color-coded variants per status (Placed: info, Packed: warning, Shipped: success, Delivered: success), emoji/icon per status, optional carrier and ETA display below badge."

*Visual Feedback:* Clear status communication

---

### Phase 2C: Organisms (Complex Components)

#### ProductGrid Component
*Prompt:* "Create ProductGrid with responsive layout (1 col mobile, 2 tablet, 3-4 desktop), ProductCard for each item, empty state with custom message, proper gap and padding."

*Layout:* CSS Grid with responsive breakpoints

#### CartDrawer Component
*Prompt:* "Build CartDrawer as slide-over panel from right with backdrop, header with close button, scrollable body with CartLineItems, footer with subtotal/total and checkout button, empty state, focus trap, ESC key closes, backdrop click closes."

*Accessibility:* Focus management, keyboard navigation

#### AskSupportPanel Component
*Prompt:* "Make AskSupportPanel as slide-over from right, textarea for questions, submit button, response area with answer and citation badge, loading state, Ctrl+Enter submission, focus trap, ESC closes."

*Integration:* Calls support engine, displays citations

#### Header Component
*Prompt:* "Build Header with logo linking to home, Products link, cart button with count badge (only when > 0), Ask Support button, sticky at top, full width with max-width container, responsive."

*Layout:* Flex layout with proper spacing

#### RelatedProducts Component
*Prompt:* "Create RelatedProducts showing exactly 3 ProductCards in grid (3 cols desktop, horizontal scroll mobile with snap points), section title, empty state if no products."

*Feature:* Product discovery by shared tags

---

### Phase 2D: Templates (Layout Components)

#### PageLayout Template
*Prompt:* "Build PageLayout with Header at top, main content area with configurable max-width (sm/md/lg/xl/full), footer with copyright, integrated CartDrawer and AskSupportPanel with state management, scroll to top on route change."

*Responsibilities:*
- Layout structure for all pages
- Cart and support panel state
- Navigation integration

#### Loading Template
*Prompt:* "Create Loading template with centered spinner, optional text, fullScreen overlay option, aria-live for screen readers."

*Use Cases:* Async data loading states

#### ErrorBoundary Template
*Prompt:* "Make ErrorBoundary class component catching React errors, displaying fallback UI with error icon, message (dev only), try again button, go home link, and proper error logging."

*Safety:* Graceful error handling

---

## Phase 3: Pages (Route Implementations)

### Catalog Page
*Prompt:* "Build Catalog page with product loading from API, client-side search (token-based matching on titles/tags), sort by price/name (asc/desc), multi-select tag filter (AND logic), ProductGrid display, add-to-cart functionality, product click navigation to detail page."

*Complexity:* Multiple filters working together

*Filter Pipeline:*
1. Search filter (OR logic on tokens)
2. Tag filter (AND logic on selected tags)
3. Sort application
4. Result display

### Product Details Page
*Prompt:* "Create Product page at /p/:id loading product by ID, displaying large image, title, price, stock badge, tags, description, quantity selector (1 to stockQty), add-to-cart button, breadcrumb navigation, 3 related products (shared tags), 404 state for invalid IDs."

*Features:*
- Parameter routing with useParams
- Related products calculation
- Quantity validation
- Stock availability

### Cart Page
*Prompt:* "Make Cart page displaying all cart items using CartLineItem components, showing subtotal/tax/total calculations, proceed to checkout button, continue shopping button, clear cart confirmation, empty state with shopping CTA."

*Calculations:*
- Subtotal: sum of all line items
- Tax: 10% of subtotal
- Total: subtotal + tax

### Checkout Page
*Prompt:* "Build Checkout page with read-only order summary, item list with quantities and prices, subtotal/tax/total, no payment form (demo note), place order button calling API, loading state during placement, clear cart and navigate to order status on success, redirect to cart if empty."

*Flow:*
1. Validate cart not empty
2. Display order summary
3. Place order
4. Clear cart
5. Navigate to order status

### Order Status Page
*Prompt:* "Create OrderStatus page at /order/:id loading order by ID, displaying order ID (full), status badge with progress timeline, carrier and ETA when Shipped/Delivered, order items list, continue shopping and track package buttons, 404 for invalid IDs."

*Timeline:* Visual progress indicator for order stages

---

## Phase 4: Support Engine

### Keyword Matching Engine
*Prompt:* "Build support engine with keyword-based Q&A matching from ground-truth.json. Implement order ID detection (regex [A-Z0-9]{10,}), keyword scoring with stop word removal, confidence levels (high/medium/low/none), PII masking (last 4 chars), citation with [Qxx] format, out-of-scope refusal."

*Algorithm:*
1. Detect order ID if present
2. Tokenize query and questions
3. Score matches (question: 3x, answer: 1x, category: 2x)
4. Normalize by query length
5. Return best match above threshold

*Improvements Made:*
- Enhanced stop word list
- Category keyword boosting
- Phrase matching
- Better threshold (40 instead of 30)
- Helpful refusal messages with topic list

*PII Protection:* Always mask order IDs to last 4 characters

---

## Phase 5: Testing & Documentation

### Test Strategy
*Approach:* Mock child components in organism/page tests for isolation and speed

*Coverage:*
- Unit tests for all atoms, molecules, organisms
- Integration tests for pages
- Support panel tests for required scenarios
- Accessibility tests for keyboard navigation

### Storybook Documentation
*Stories Created:* All reusable components have stories showing:
- All variants/states
- Interactive controls
- Usage examples
- Accessibility features

---

## Key Design Decisions

### Why Atomic Design?
- *Scalability:* Easy to add new components by composing existing ones
- *Testability:* Each level tests independently
- *Reusability:* Build complex UIs from simple, proven parts
- *Documentation:* Clear hierarchy in Storybook
- *Team Collaboration:* Clear component boundaries

### Why No UI Library (Material-UI, Chakra, etc.)?
- *Assignment Requirement:* Custom components requested
- *Bundle Size:* Smaller footprint (< 200 KB)
- *Full Control:* Exact styling and behavior control
- *Learning:* Deeper understanding of component architecture
- *No Bloat:* Only build what's needed

### Why React Context over Redux?
- *Simplicity:* Cart state is simple (add/remove/update)
- *No Boilerplate:* Less code to maintain
- *Performance:* Adequate for small state tree
- *localStorage Integration:* Easy to implement persistence

### Why Keyword Matching over LLM?
- *Predictability:* Deterministic results
- *No API Costs:* Free to run
- *Fast Response:* Instant matching
- *Privacy:* No data sent to external services
- *Offline Capable:* Works without internet
- *Assignment Scope:* Sufficient for requirements

---

## AI Assistance Notes

### What AI Generated
- Component scaffolding and structure
- Initial test files
- Storybook stories
- TypeScript interfaces
- Basic styling with Tailwind

### What Was Manually Refined
- Business logic (cart operations, filters)
- Accessibility improvements
- Edge case handling
- Performance optimizations
- Test assertions and mocking strategy
- Support engine algorithm enhancements
- User experience polish

### Iteration Process
1. Provide detailed prompt to AI
2. Review generated code
3. Test functionality
4. Refine prompt for improvements
5. Integrate with existing code
6. Add tests and documentation

---

## Challenges & Solutions

### Challenge 1: Tag Filter Not Clickable
*Issue:* Badge components weren't interactive
*Solution:* Wrapped badges in button elements with onClick handlers

### Challenge 2: Product Card Navigation
*Issue:* Clicking cards didn't navigate
*Solution:* Added navigate() call in onProductClick handler, passed through ProductGrid

### Challenge 3: Support Engine Wrong Matches
*Issue:* "rewards" query matched "returns" answer
*Solution:* Enhanced keyword algorithm with category boosting, better stop words, phrase matching

### Challenge 4: Test Mocking Complexity
*Issue:* Page tests failing due to missing mocks
*Solution:* Centralized mock setup for useCart, useNavigate, and format utilities

### Challenge 5: ESC Key Not Working
*Issue:* ESC key not closing drawers/panels
*Solution:* Added useEffect with keydown listener on document in both drawer components

---

## Performance Optimizations

1. *Lazy Loading Images:* All product images load lazily
2. *Debounced Search:* 300ms debounce prevents excessive filtering
3. *Memoized Filters:* useMemo for filtered product calculations
4. *Code Splitting:* Router-level code splitting (if implemented)
5. *localStorage:* Persist cart without backend calls

---

## Accessibility Features

1. *Keyboard Navigation:* All interactive elements accessible via Tab
2. *Focus Management:* Focus trap in drawers/panels
3. *ARIA Labels:* All buttons, inputs, and dialogs properly labeled
4. *Screen Readers:* Semantic HTML, proper heading hierarchy
5. *Color Contrast:* All text meets WCAG AA standards
6. *ESC Key:* Closes all modals consistently

---

## Future Enhancements (Out of Scope)

1. *LLM Integration:* OpenAI API for smarter support responses
2. *Vector Search:* Semantic matching for support queries
3. *User Accounts:* Login, order history, saved carts
4. *Real Backend:* API instead of mock data
5. *Payment Integration:* Stripe/PayPal checkout
6. *Product Reviews:* User-generated ratings and reviews
7. *Wishlist:* Save products for later
8. *Advanced Search:* Faceted search, price ranges, availability filters

---

## Lessons Learned

1. *AI Pair Programming:* Effective for scaffolding, requires human refinement
2. *Atomic Design:* Excellent for component organization and reusability
3. *Test Mocking:* Proper setup crucial for reliable tests
4. *Accessibility First:* Easier to build in than retrofit
5. *Mock Data Advantages:* Fast development, predictable testing
6. *Simple State Management:* Context sufficient for most use cases
7. *Keyword Matching Limits:* Works well for known domains, needs tuning

---

## Project Statistics

- *Total Components:* 32 (6 atoms + 6 molecules + 5 organisms + 3 templates + 5 pages + 7 utilities)
- *Test Files:* 27+
- *Test Cases:* 300+
- *Storybook Stories:* 25+
- *Lines of Code:* ~5,000+ (excluding tests)
- *Development Time:* ~8 hours (with AI assistance)
- *Bundle Size:* < 200 KB gzipped ✅

---

## Conclusion

This project demonstrates successful AI-assisted development of a complete e-commerce frontend using modern React practices, atomic design principles, and accessibility-first approach. All functional requirements were met within the tight deadline, proving the effectiveness of structured prompting and iterative refinement with AI tools.

The keyword-based support system, while simple, provides a solid foundation that could be enhanced with more sophisticated NLP or LLM integration in the future. The atomic design architecture ensures the codebase is maintainable, testable, and ready for future expansion.