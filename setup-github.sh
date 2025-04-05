#!/bin/bash

# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit - Speech Writing Website"

# Instructions for GitHub and Vercel setup
echo "===================================================="
echo "GITHUB AND VERCEL DEPLOYMENT INSTRUCTIONS"
echo "===================================================="
echo ""
echo "1. Create a new repository named 'speechproject' on GitHub"
echo "2. Run the following commands to push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/speechproject.git"
echo "   git push -u origin main"
echo ""
echo "3. Go to Vercel and import the GitHub repository"
echo "4. Add the following environment variables in Vercel:"
echo "   - OPENAI_API_KEY: (your API key from .env)"
echo "   - NEXT_PUBLIC_GOOGLE_ANALYTICS: G-NHP0V7DMK4"
echo ""
echo "5. Deploy the project"
echo "===================================================="