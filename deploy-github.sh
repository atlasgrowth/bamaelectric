#!/bin/bash
set -e

echo "🚀 Starting comprehensive GitHub deployment process..."

# Get current date for commit messages
DEPLOY_DATE=$(date "+%Y-%m-%d %H:%M:%S")

# Step 1: Initialize git if not already initialized
if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init
  git branch -M main
fi

# Step 2: Configure git remote
if git remote -v | grep -q origin; then
  git remote set-url origin "https://github.com/atlasgrowth/bamaelectric.git"
else
  git remote add origin "https://github.com/atlasgrowth/bamaelectric.git"
fi

# Step 3: Save all current changes to main branch
echo "Saving all changes to main branch..."
git add .
git commit -m "Update project code - $DEPLOY_DATE" || echo "No changes to commit"

# Step 4: Push the main branch to GitHub (this stores all your source code)
echo "Pushing source code to main branch..."
git push -u origin main || (echo "Error pushing to main branch. You might need to pull first." && exit 1)

# Step 5: Build the client-side application
echo "Building the client application for GitHub Pages..."
npm run build:client

# Step 6: Prepare and deploy to gh-pages branch
echo "Setting up deployment to gh-pages branch..."

# Create a temporary directory for the deployment
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
    // Redirect to the home page with the current path as a hash
    var path = window.location.pathname;
    window.location.href = '/#' + path;
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
EOF

# Navigate to the deploy directory
cd .deploy

# Initialize a new git repository for gh-pages branch
echo "Initializing git repository for gh-pages deployment..."
git init
git checkout -b gh-pages

# Configure git for the deployment
git config user.name "Replit Deployment"
git config user.email "deployment@example.com"

# Add all files
git add .

# Commit
git commit -m "Deploy to GitHub Pages - $DEPLOY_DATE"

# Force push to the gh-pages branch
echo "Pushing to gh-pages branch..."
git push -f "https://github.com/atlasgrowth/bamaelectric.git" gh-pages

echo "🎉 Deployment complete!"
echo "✅ Source code pushed to: https://github.com/atlasgrowth/bamaelectric"
echo "✅ Website deployed to: https://atlasgrowth.github.io/bamaelectric/"
echo "📝 Remember to enable GitHub Pages in your repository settings if you haven't already!"
echo "   Go to Settings > Pages and select the gh-pages branch as the source."
