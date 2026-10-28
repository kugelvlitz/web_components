# Component spec prompt template

Copy this template into `src/components/<folder>/<ComponentName>.spec.md` and replace the placeholders. The finished file should read as a direct request to build the component and should stand on its own.

---

Build a reusable **[ComponentName]** using React, TypeScript, and Tailwind CSS where practical. Use component-scoped CSS for [special effects].

## Appearance

- Purpose: [what this component does].
- Shape and dimensions: [width, height, responsiveness, radius, spacing].
- Outline, fill, typography, and colors: [specific values and their visual roles].
- Decorative effects: [layers, intensity, alignment, and what belongs outside the component].

## Behavior and motion

- Initial state: [appearance and behavior before interaction].
- Hover, focus, active, and disabled states: [expected changes].
- Activation: [trigger, transition direction, duration, easing, and final state].
- Repeat activation and reset: [what replays and who owns reset controls].
- Continuous motion: [what moves, speed, and whether it continues after activation].

## API and composition

- Props and defaults: [native props and component-specific options].
- Content and events: [children, callbacks, state ownership, and composition].
- Dependencies: [shared components, styles, assets, and runtime requirements].

## Accessibility

- Semantics and keyboard interaction: [native element, accessible name, focus behavior].
- Motion and contrast preferences: [reduced motion and forced colors, when relevant].
- Decorative elements: [how they are excluded from assistive technology].

## Playground demo

- Backdrop: [demo-only background, independent of the component].
- Examples and controls: [variants, states, interactions, and demo-only reset].

## Acceptance criteria

- [Observable visual requirement].
- [Observable interaction requirement].
- [Responsive and accessibility requirement].
- Deliver the component, its demo, any required styles, and this spec updated to match the result.
