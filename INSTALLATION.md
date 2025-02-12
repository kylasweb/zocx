# MLM Platform Installation Guide for cPanel Hosting

## Requirements
- cPanel hosting with Node.js 18+ support
- Minimum 2GB RAM (4GB recommended)
- MySQL 5.7+ database
- NPM 9.x+

## Step 1: Upload Files
1. Connect via cPanel File Manager or FTP
2. Upload all project files to your public_html directory
3. Set file permissions:
   - Folders: 755
   - Files: 644
   - Exceptions (set to 664):
     - .env
     - *.log

## Step 2: Setup Node.js App
1. In cPanel, go to "Setup Node.js App"
2. Create new application:
   - Application root: /public_html
   - Application URL: yourdomain.com
   - Application startup file: server.js
3. Set environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=mysql://user:pass@localhost/dbname
   SECRET_KEY=your-secure-key
   NEXT_PUBLIC_API_URL=https://yourdomain.com/api
   ```

## Step 3: Install Dependencies
1. In cPanel terminal:
   ```bash
   npm install --production
   npm run build
   ```

## Step 4: Database Setup
1. Create MySQL database and user
2. Import SQL dump:
   ```bash
   mysql -u username -p database_name < dump.sql
   ```

## Step 5: Configure SSL
1. In cPanel, go to "SSL/TLS"
2. Install Let's Encrypt SSL certificate
3. Force HTTPS in .htaccess:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## Step 6: Start Application
1. In Node.js App manager:
   - Click "Reload"
   - Click "Run NPM install"
   - Click "Run NPM build"
   - Start application

## Troubleshooting
- **Application not starting**:
  - Check error logs in cPanel > Metrics > Errors
  - Verify database credentials
  - Ensure port 3000 is open

- **Build failures**:
  ```bash
  rm -rf node_modules .next
  npm cache clean --force
  npm install
  ```

- **Memory issues**:
  Add to .htaccess:
  ```apache
  php_value memory_limit 512M
  php_value max_execution_time 300
  ``` 