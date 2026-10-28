# Button — component spec prompt

Build a reusable `Button` with React, TypeScript, and Tailwind CSS for everyday interface actions.

## Appearance

- Use an inline flex layout, centered content, an 8 px corner radius, a 1 px border, medium-weight 14 px text, and an 8 px gap between children.
- Support `variant="primary" | "secondary" | "ghost"`, defaulting to `primary`.
- Primary: emerald-800 fill and border with white text; darken to emerald-900 on hover.
- Secondary: white fill, stone-300 border, and stone-800 text; use stone-100 fill on hover.
- Ghost: transparent fill and border with stone-600 text; use stone-100 fill and stone-900 text on hover.
- Support `size="sm" | "md"`, defaulting to `md`. Small has a 36 px minimum height, 12 px horizontal padding, and 6 px vertical padding. Medium has a 44 px minimum height, 16 px horizontal padding, and 10 px vertical padding.

## Behavior, API, and accessibility

- Render a native `<button>` and default `type` to `button`.
- Accept native button attributes, children, event handlers, and an additional `className`.
- Keep application state and action behavior with the caller.
- Preserve native Enter and Space activation, accessible naming, form behavior when explicitly requested, and disabled semantics.
- Show a visible emerald-700 keyboard focus outline, 2 px thick and offset by 4 px.
- Disabled buttons have 40% opacity and cannot activate. Use color transitions for interaction feedback.

## Playground demo and acceptance

- Show all three variants, both sizes, and a disabled example on a light preview surface.
- Include a separate click-counter example with a live status message and a reset control.
- Keep the preview surface, counter state, and reset control outside the reusable component.
- Mark main demo actions with `data-wave-trigger` so the playground can send an ambient dot wave from the button's center. Reset remains separate, and the reusable button has no background dependency.
- The button must size naturally to its content, support wrapping demo layouts, and work with pointer and keyboard input.
- Deliver `Button.tsx`, `Button.demo.tsx`, and this spec. No custom animation library is needed.
