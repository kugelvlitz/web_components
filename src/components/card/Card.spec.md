# Card — component spec prompt

Build a reusable `Card` using React, TypeScript, and Tailwind CSS to group related content and optional actions.

## Appearance

- Use a white surface with a 1 px stone-200 border, 16 px rounded corners, and 24 px padding.
- Render the heading as an `<h3>` with 18 px semibold text and slightly tightened letter spacing.
- An optional description appears 8 px below the heading, using 14 px stone-500 text and a 24 px line height.
- Optional children appear in a separate content region with a 24 px top margin.
- Let the parent layout determine width. Keep the component flexible enough for single-column and multi-column layouts.

## API, behavior, and accessibility

- Render a semantic `<article>`.
- Require a `heading: string` prop and accept `description?: string`, `children`, `className`, and native HTML attributes for the article.
- Omit the description or children region when its content is absent.
- Keep action state with the caller. Buttons and other controls inside the card retain their own semantics and keyboard behavior.
- The card itself is a content container; its default rendering has no click action or animation.

## Playground demo and acceptance

- Show two cards in a grid that becomes two columns at a medium breakpoint.
- The first example has descriptive content and a small emerald badge.
- The second composes a reusable Button with a save/undo action and `aria-pressed` reflecting the saved state.
- Keep the grid, example text, and save state in `Card.demo.tsx`.
- Mark the demo's save action with `data-wave-trigger` so the playground can trigger its ambient dot-wave background. Keep the background outside the reusable card.
- Verify the optional regions, responsive layout, and action's keyboard behavior.
- Deliver `Card.tsx`, `Card.demo.tsx`, and this spec. The base card needs only React and Tailwind; the demo also uses Button.
