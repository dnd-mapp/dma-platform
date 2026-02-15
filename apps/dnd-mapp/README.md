# dnd-mapp (Main Web Application)

This is the primary user-facing Angular application for the D&D Mapp Platform. It serves as the main interface where players and DMs interact with character sheets, maps, and campaign tools.

## 🛠 Technical Overview

- **Framework:** [Angular](https://angular.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)

---

## 🚀 Development

To run the application locally:

```bash
nx serve dnd-mapp
```

The application will be available at `https://localhost.www.dndmapp.dev:4200`.

> [!NOTE]
> Ensure your [SSL/DNS is configured](../../docs/dev/ssl-dns-setup.md) to access the app via https://localhost.www.dndmapp.dev:4200.

---

## 📁 Key Features in this App

- **Dashboard:** Entry point for user-specific campaigns and characters.
- **VTT Interface:** Interactive canvas for tactical battle simulation.
- **Character Builder:** Stepper-based wizard for 5e character creation.

---

## 🎨 Styling

This app uses **Tailwind CSS**. Configuration is local to this project but extends the shared workspace design system where applicable.

- Configuration: `apps/dnd-mapp/.postcssrc.json`
- Entry Point: `apps/dnd-mapp/src/styles.scss`
