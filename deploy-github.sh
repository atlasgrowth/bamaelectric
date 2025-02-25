#!/bin/bash
set -e

echo "🚀 Starting comprehensive GitHub deployment process..."

# Step 1: Save all current changes to main branch
echo "Saving all changes to main branch..."
git add .
git commit -m "Update project code - $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Step 2: Push the main branch to GitHub
echo "Pushing source code to main branch..."
git push -u origin main

# Step 3: Build the client-side application
echo "Building the client application for GitHub Pages..."
npm run build:client

# Step 4: Prepare and deploy to gh-pages branch
echo "Setting up deployment to gh-pages branch..."
rm -rf .deploy
mkdir -p .deploy
cp -r dist/* .deploy/

# Add special 404.html file for SPA routing
cat > .deploy/404.html << EOF
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    var path = window.location.pathname;
    window.location.href = '/#' + path;
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
EOF

cd .deploy
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"
git push -f origin gh-pages

echo "🎉 Deployment complete!"