# core

This library was generated with [Nx](https://nx.dev).

```sql
-- 1. Create user (can connect from any host)
CREATE USER 'user'@'%' IDENTIFIED BY 'password';

-- 2. Create schema / database
CREATE DATABASE IF NOT EXISTS `schema` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS `schema_shadow` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;

-- 3. Grant all privileges on that schema to the user from any host
GRANT ALL PRIVILEGES ON `schema`.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON `schema_shadow`.* TO 'user'@'%';

-- 4. Apply privilege changes
FLUSH PRIVILEGES;

```
