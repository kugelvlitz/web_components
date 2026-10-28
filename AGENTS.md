# Component workflow

- Use React and TypeScript, with Tailwind CSS where practical. Use component CSS for effects and animations that benefit from it.
- Keep reusable components separate from demos and playground backdrops.
- For every reusable component created, add a colocated `<ComponentName>.spec.md` containing a copy-ready prompt that can recreate the component in another project.
- When a component's appearance, behavior, API, or dependencies change, update its spec in the same task. Describe the current result, including accepted user refinements.
- Make each prompt self-contained. Include visual details, dimensions, colors, motion timing, interaction states, accessibility, props, demo expectations, and relevant acceptance criteria. Distinguish component behavior from demo controls and backgrounds.
- Use `docs/component-spec-template.md` as the starting point. Omit irrelevant sections and replace all placeholders.
- Link new component specs in the README's component-spec index.
- Verify documentation links for documentation-only changes. For implementation changes, run appropriate checks and verify visible interactions when browser tooling is available.
