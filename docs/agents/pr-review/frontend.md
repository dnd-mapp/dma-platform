# Frontend Checklist

Detailed checks for frontend, accessibility, and internationalization.

---

## Frontend-Specific Checks

- [ ] UI matches design requirements.
- [ ] Loading state is handled.
- [ ] Empty state is handled.
- [ ] Error state is handled.
- [ ] Success state is handled.
- [ ] Disabled state is handled.
- [ ] Form validation is clear.
- [ ] User input is preserved where appropriate.
- [ ] Components are reusable only where reuse is justified.
- [ ] Component state is minimal and understandable.
- [ ] Derived state is not stored unnecessarily.
- [ ] Side effects are handled correctly.
- [ ] Event handlers are correct.
- [ ] UI does not flicker unnecessarily.
- [ ] Responsive behavior works.
- [ ] Keyboard navigation works.
- [ ] Focus management is correct.
- [ ] Text is readable and consistent.
- [ ] Error messages are helpful.
- [ ] Client-side routing works.
- [ ] Browser compatibility is considered if relevant.
- [ ] Analytics or tracking changes are intentional and privacy-safe.

### Angular-Specific

- [ ] Component inputs and outputs are typed correctly.
- [ ] Signals and computed values are used appropriately.
- [ ] `effect()` calls are justified and free of unexpected side effects.
- [ ] `OnPush` change detection is used where appropriate.
- [ ] Template expressions are free of side effects.
- [ ] Subscriptions are cleaned up (`takeUntilDestroyed` or `async` pipe preferred over manual unsubscription).
- [ ] `@ViewChild` / `@ContentChild` usage respects lifecycle timing (`ngAfterViewInit`).
- [ ] Standalone components import only what they need.
- [ ] Dependency injection is correct (provided at the right scope).
- [ ] Route guards and resolvers handle errors correctly.

---

## Accessibility

- [ ] Interactive elements are keyboard accessible.
- [ ] Focus states are visible.
- [ ] Focus order is logical.
- [ ] Form fields have labels.
- [ ] Buttons and links have accessible names.
- [ ] Images have appropriate alt text.
- [ ] Decorative images are hidden from assistive tech.
- [ ] Color contrast is sufficient.
- [ ] UI does not rely on color alone.
- [ ] ARIA attributes are used correctly.
- [ ] Semantic HTML is preferred over unnecessary ARIA.
- [ ] Modals trap and restore focus correctly.
- [ ] Error messages are announced or associated with fields.
- [ ] Dynamic content updates are accessible where needed.
- [ ] Animations respect reduced-motion preferences.

### Red Flags

- `div` or `span` used as clickable controls without keyboard support.
- Missing labels on inputs.
- Icon-only buttons without accessible names.
- Low-contrast text.
- Modal dialogs that do not manage focus.

---

## Internationalization and Localization

- [ ] User-facing strings are translatable if the app supports i18n.
- [ ] No hardcoded English text where translations are required.
- [ ] Dates are formatted according to locale.
- [ ] Numbers and currencies are formatted according to locale.
- [ ] Timezones are handled correctly.
- [ ] Text expansion is considered for translated strings.
- [ ] Right-to-left layouts are considered if supported.
- [ ] Pluralization rules are handled correctly.
- [ ] Sorting is locale-aware where needed.
