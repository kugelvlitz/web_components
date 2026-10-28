# Bloom Button — component spec prompt

Build a reusable `BloomButton` with React and TypeScript. Use component-scoped CSS for the animated glow and Tailwind for its playground demo.

## Appearance

- Create a transparent button with white text, a white 1 px outline at 80% opacity, 14 px rounded corners, and a minimum height of 58 px.
- Use 16 px vertical and 36 px horizontal padding, medium-weight 14 px text, and subtle letter spacing.
- Place two moving chromatic light sections around the outline, leaving quieter sections between them.
- Use cyan `#00eaff`, blue-violet `#6665ff`, pink `#ff398e`, and red-orange `#ff6038` in a rotating conic gradient.
- Cut out the center of the effect so the backdrop remains visible through the button.
- Layer a sharp colored edge at 80% opacity, a glow blurred by 7 px at 95% opacity, and a wider aura blurred by 19 px at 55% opacity. Apply blur outside the ring mask so the light extends beyond the outline.

## Behavior and motion

- Support `speed="slow" | "medium" | "fast"`, defaulting to `slow`. Continuously rotate clockwise with linear timing: 7 seconds per turn for slow (the original speed), 3.5 seconds for medium, and 1.75 seconds for fast.
- On activation, immediately switch to the green palette `#b3ffad`, `#24ff76`, `#00d957`, and `#64ff7d`.
- Add one extra turn over 1.1 seconds with easing `cubic-bezier(0.16, 0.65, 0.3, 1)`, alongside the continuous orbit.
- Remain green after activation. Subsequent activations replay the extra turn.
- Keep the selected orbit speed in the green state. Speed variants leave the 1.1-second click burst unchanged.
- Brighten the outline and lift the button by 1 px on hover. On press, return to its original position and scale to 98%.
- A demo-only reset remounts the button to restore the chromatic state.

## API and accessibility

- Use a native button, accept native button attributes and children, support `className` and `onClick`, and default `type` to `button`.
- Run the caller's click handler before starting the internal effect; respect `event.preventDefault()`.
- Support pointer, Enter, and Space activation. Keep decorative layers hidden from assistive technology and unable to intercept pointer events.
- Use a visible white 2 px keyboard focus outline offset by 8 px.
- Disabled buttons have 35% opacity, cannot activate, and pause the effect.
- Under reduced motion, stop rotation and transforms while retaining the green state change. Under forced colors, hide the decorative effect and use system button text colors for the outline and label.

## Demo and acceptance

- Put the button on a black dotted playground backdrop owned by the demo or playground, not by the button.
- Include a state message and a separate reset control. Use “Give it a spin” as example text.
- Include keyboard-accessible Slow, Medium, and Fast demo controls displaying seconds per turn and the selected state via `aria-pressed`. Switching speed preserves the button's chromatic/green state; reset preserves the selected speed.
- Keep the button reusable independently of that message, backdrop, and reset control.
- Keep the playground backdrop static for this demo. Clicking the button runs its own bloom animation without triggering a page-wide wave; wave integration belongs to separate demos.
- Verify repeated activation, keyboard focus, disabled behavior, reduced motion, and a narrow viewport.
- Deliver `BloomButton.tsx`, `BloomButton.css`, `BloomButton.demo.tsx`, and this spec. Use CSS custom-property animation and masks; no animation library or image assets are required.
