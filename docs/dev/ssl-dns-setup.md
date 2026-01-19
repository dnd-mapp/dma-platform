[← Back to Docs](../README.md) | **Category:** Developer Hub

---

# 🔒 Local SSL & DNS Configuration

To provide a production-like environment, the platform uses a custom local domain and secure HTTPS.

## 🌐 1. DNS Configuration (Hosts File)

You must map the application domain to your local loopback address (`127.0.0.1`) in your system's `hosts` file.

**Required Mapping:**

| Application   | Local Domain                 | Port |
|---------------|------------------------------|------|
| `dnd-mapp`    | `localhost.www.dndmapp.dev`  | 4200 |
| `auth-client` | `localhost.auth.dndmapp.dev` | 4300 |
| `auth-server` | `localhost.auth.dndmapp.dev` | 4350 |

> [!NOTE]
> Both Auth applications share the same base domain but run on different ports.

**File Locations:**

*   **Windows:** `C:\Windows\System32\drivers\etc\hosts` (Run Notepad as Admin)
*   **macOS / Linux:** `/etc/hosts` (Use `sudo nano /etc/hosts`)

**Add this line:**

```text
127.0.0.1 localhost.www.dndmapp.dev
127.0.0.1 localhost.auth.dndmapp.dev
```

## 🔑 2. Local HTTPS Setup

We use `mkcert` to generate certificates that your browser will trust locally.

1.  **Install the local CA** (first time only):

    ```bash
    mkcert -install
    ```

2.  **Generate Certificates:**

    Run the following command from the repository root:

    ```bash
    pnpm gen:ssl-cert
    ```

> [!IMPORTANT]
> This command generates `ssl-key.pem` and `ssl-cert.pem` in the root. Git ignores these files. **Do not commit these files.**

## 🌍 Accessing the App

Once configured, the main app will be available at: https://localhost.www.dndmapp.dev:4200/
