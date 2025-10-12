# Accessibility Checklist

## Keyboard Navigation
- [x] All interactive elements reachable via Tab
- [x] Cart drawer opens/closes with keyboard
- [x] Support panel opens/closes with keyboard
- [x] ESC key closes modals
- [x] Enter submits forms
- [x] Arrow keys work in quantity selectors (optional)

## Focus Management
- [x] Focus trapped in cart drawer when open
- [x] Focus trapped in support panel when open
- [x] Focus returns to trigger element when closed
- [x] Visible focus indicators on all interactive elements

## ARIA Labels
- [x] All buttons have aria-label or text content
- [x] Form inputs have associated labels
- [x] Modal dialogs have role="dialog" and aria-modal="true"
- [x] Loading states have aria-live regions
- [x] Error messages associated with form fields

## Screen Reader Support
- [x] Alt text on all images
- [x] Semantic HTML (nav, main, aside, etc.)
- [x] Heading hierarchy (h1, h2, h3)
- [x] Lists use proper markup (ul, ol)
- [x] Tables have proper headers (if any)

## Color & Contrast
- [x] Text meets WCAG AA contrast ratios
- [x] Interactive states visible (hover, focus, active)
- [x] Information not conveyed by color alone

## Testing Performed
- [x] Keyboard-only navigation test
- [x] Screen reader test (optional)
- [x] Axe DevTools scan (optional)

## Known Issues
- None

## Future Improvements
- Add skip to main content link
- Implement live region announcements for cart updates
- Add keyboard shortcuts (? to show help)
