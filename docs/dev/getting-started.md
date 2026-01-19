[← Back to Docs](../README.md) | **Category:** Developer Hub

---

# ⚙️ Getting Started

This guide covers the necessary tools and steps to prepare your local machine for contributing to the D&D Mapp Platform.

## 🛠 Prerequisites

Ensure you have the following installed:

*   **Node.js:** `v24+`
*   **pnpm:** `v10+`
*   **[mise](https://mise.jdx.dev/):** (Optional but Recommended) Used to manage runtime versions via the `.tool-versions` file.
*   **[mkcert](https://github.com/FiloSottile/mkcert):** Required for generating locally trusted development certificates.

## 📥 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/dnd-mapp/dma-platform.git
    cd dma-platform
    ```

2.  **Initialize Runtimes (if using mise):**

    ```bash
    mise install
    ```

3.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

## 🔑 Environment Variables

The workspace uses a unified `.env` file in the root directory.

1.  **Template:** Refer to the commented-out values in the root for required keys.
2.  **Naming Convention:** Variables are prefixed by the application they belong to (e.g., `AUTH_SERVER_`, `AUTH_DB_`).
3.  **Security:** Never commit your `.env` file. It is ignored by Git to protect your peppers, passwords, and private keys.

## 🚀 Serving the Application

To start the primary web application:

```bash
npx nx serve dnd-mapp
```

> [!TIP]
> The application will attempt to serve over HTTPS. Ensure you have completed the [SSL & DNS Setup](./ssl-dns-setup.md) before the first run.
