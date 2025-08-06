# VehiclesData Design System

## 1. Core Philosophy

This design system is the single source of truth for the VehiclesData UI. Its purpose is to ensure consistency, improve development efficiency, and maintain a high-quality, professional user experience across the entire application.

Our design philosophy is centered on three core principles:

-   **Clarity:** The UI must be clean, intuitive, and unambiguous. Users should understand functionality at a glance. Visual hierarchy guides the user's attention to what's most important.
-   **Control:** Users should feel in control of their actions. This means providing clear feedback for interactions and requiring deliberate actions for significant operations (e.g., an explicit "Search" button instead of filtering on every change).
-   **Responsiveness:** The application must provide a seamless and accessible experience on all devices, from mobile phones to large desktop monitors. A mobile-first approach is mandatory.

---

## 2. Design Tokens (Foundation)

Design tokens are the foundational values of our design language.

### Colors

Our color palette is defined in `tailwind.config.js` and uses a semantic naming convention.

| Role              | Usage                                                      | Example Classes                                    |
| ----------------- | ---------------------------------------------------------- | -------------------------------------------------- |
| **Primary/Action**  | Buttons, links, active states, focus rings, key highlights | `bg-indigo-600`, `text-indigo-500`                 |
| **Secondary Accent**| Icons, secondary highlights, decorative elements           | `text-teal-500`                                    |
| **Neutral**         | Backgrounds, text, borders, panels, cards                  | `bg-slate-100`, `bg-white`, `text-slate-700`       |
| **Success/Positive**| Confirmation messages, success states, included features   | `bg-green-50`, `text-green-600`                    |
| **Error/Warning**   | Error messages, destructive actions, failed states         | `bg-red-50`, `text-red-600`, `border-red-500`      |

**Dark Mode:** The app fully supports dark mode. All color choices must have a dark mode equivalent (e.g., `bg-white dark:bg-slate-800`).

### Typography

We use Tailwind's default sans-serif font stack for clean, modern, and highly readable text.

| Element         | Style                                      | Example Classes                                     |
| --------------- | ------------------------------------------ | --------------------------------------------------- |
| **Page Title (h1)** | Extra Large, Bold                          | `text-4xl sm:text-5xl font-extrabold tracking-tight`  |
| **Section Title (h2)**| Large, Bold                              | `text-3xl font-bold tracking-tight`                 |
| **Card/Panel Title (h3)**| Medium, Bold                             | `text-xl font-bold`                                 |
| **Body Text (p)**   | Standard                                   | `text-base` or `text-lg`                            |
| **Labels & Subtext**| Small                                      | `text-sm text-slate-600 dark:text-slate-400`        |

### Spacing & Sizing

We use Tailwind's default 4px-based spacing scale. Consistent spacing is crucial for a clean layout.

-   **Page Padding:** `px-4 sm:px-6 lg:px-8`
-   **Panel/Card Padding:** `p-6` or `p-8`
-   **Grid Gaps:** `gap-8` for major layout grids, `gap-4` for smaller component groups.
-   **Form Element Spacing:** `space-y-6` for vertical forms.

### Borders & Shadows

-   **Border Radius:** Use `rounded-lg`, `rounded-xl`, or `rounded-2xl` for containers. Use `rounded-full` for circular elements like avatars.
-   **Shadows:** Shadows create depth and elevation.
    -   `shadow-md`: Standard for cards and inputs.
    -   `shadow-lg`: For primary panels and emphasized cards.
    -   `shadow-xl`: For hover states and modals to bring them to the foreground.

---

## 3. Layout

-   **Container:** Main page content should be wrapped in a `.container.mx-auto` with horizontal padding to constrain width on large screens.
-   **Grid:** Use CSS Grid (`grid`, `grid-cols-*`) for all major page layouts (e.g., feature sections, catalog results). This is the preferred method for creating responsive column layouts.
-   **Flexbox:** Use Flexbox for component-level alignment (e.g., aligning items in a header or a card).

---

## 4. Component Reference

Always reuse an existing component before creating a new one.

### Buttons

-   **Primary Button:** For the single most important action on a page or view.
    -   **Classes:** `bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors`
    -   **Example:** "Search", "Sign Up"
-   **Secondary Button:** For less critical, alternative actions.
    -   **Classes:** `bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600`
    -   **Example:** "Clear Filters"
-   **Disabled State:** All buttons must have a clear disabled state.
    -   **Classes:** `disabled:bg-slate-400 disabled:cursor-not-allowed`

### Form Elements

-   **Label:** Always include a `<label>` for every input.
    -   **Classes:** `block text-sm font-medium text-slate-700 dark:text-slate-300`
-   **Input / Select / Textarea:**
    -   **Classes:** `block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700`
    -   **Focus State:** Must have a visible focus ring: `focus:border-indigo-500 focus:ring-indigo-500`

### Cards

Cards are the primary way to display summarized content (e.g., vehicles, team members).

-   **Structure:** Image (optional), Title, Subtitle/Metadata, Body, CTA.
-   **Base Classes:** `bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden`
-   **Interaction:** Provide a hover state to indicate interactivity.
    -   **Classes:** `transition-all duration-300 hover:shadow-xl hover:-translate-y-1`

### Feedback & Alerts

-   **Error:** Used for validation errors or API failures.
    -   **Classes:** `p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg`
-   **Success:** Used for confirming a successful action (e.g., form submission).
    -   **Classes:** `p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg`

### Icons

-   **Source:** All icons are defined as React components in `/components/Icons.tsx`.
-   **Usage:** Import the specific icon and use it like any other React component: `<MapPinIcon className="w-5 h-5 text-indigo-500" />`.
-   **Style:** Use Tailwind's `w-`, `h-`, and `text-` utility classes to style icons. Do not apply fill or stroke attributes directly unless necessary.

---

## 5. Accessibility (A11y)

Accessibility is not optional. Every component and page must be built with A11y in mind.

-   **Semantic HTML:** Use correct HTML5 elements (`<main>`, `<nav>`, `<article>`, `<button>`). Do not use a `<div>` when a `<button>` is appropriate.
-   **Image `alt` Tags:** All `<img>` tags must have a descriptive `alt` attribute.
-   **Form Labels:** Every form input must have a corresponding `<label>`.
-   **Keyboard Navigation:** All interactive elements must be reachable and operable via the keyboard.
-   **Focus States:** Visible focus states (`focus:ring`) are mandatory for all interactive elements.
-   **ARIA Roles:** Use ARIA (Accessible Rich Internet Applications) roles and attributes where semantic HTML is insufficient (e.g., for custom components).
-   **Screen Reader Text:** Use the `.sr-only` class for text that should only be available to screen readers.
