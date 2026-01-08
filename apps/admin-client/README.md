# dnd-mapp (Main UI)

This is the primary web application for the DMA Platform. It is a high-performance frontend built with **Angular** and **Tailwind CSS**.

## 🚀 Key Features

- **Virtual Tabletop (VTT):** A canvas-based interactive map for tactical combat and exploration.
- **Character Builder:** Reactive forms for 5e Character Sheet management.
- **Real-time Synchronization:** Planned integration with backend services for live campaign updates.

## 🛠 Tech Stack

- **Framework:** [Angular](https://angular.io)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Unit Testing:** [Vitest](https://vitest.dev) (In-browser testing enabled via @analogjs/vitest-angular)
- **E2E Testing:** [Playwright](https://playwright.dev)

## 💻 Development

### Run the App
To start the development server:

```bash
pnpm exec nx serve dnd-mapp
```
The app will be available at `https://localhost.www.dndmapp.dev:4200`.

### Runtime Configuration

This application uses a runtime configuration strategy rather than build-time environment variables. This allows the same build artifact to be promoted through different environments (Staging, Production) without rebuilding.

- Configuration is managed via a JSON file (e.g., `assets/config.json`).
- Key settings include:
    - `apiGatewayUrl`: The base URL for the centralized API gateway.
    - `authUrl`: The URL for the identity provider.

## 🧪 Testing

### Unit & Integration Tests

We use **Vitest** for fast, browser-based testing. We use the AnalogJS Vitest plugin to provide a fully customizable testing environment that standard Angular CLI configurations do not support.

```bash
pnpm exec nx test dnd-mapp
```

### End-to-End Tests

We use **Playwright** to test critical user flows.

```bash
pnpm exec nx e2e dnd-mapp-e2e
```

## 🏗 Architecture Notes

- **Testing Strategy:** @analogjs is used strictly for its Vitest integration to bypass standard Angular configuration limitations.
- **VTT Engine:** Implementation located in `src/app/vtt`. Focuses on performance and low-latency interaction.
- **State Management:** (e.g., Signals/RxJS) used for reactive game-state updates.

## 🐳 Containerization

This app is built as a standalone container. To build the production bundle:

```bash
pnpm exec nx build dnd-mapp
```

The output will be located in `dist/apps/dnd-mapp`.
