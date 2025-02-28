import { Octokit } from "@octokit/rest";
import { v4 as uuidv4 } from "uuid";
import simpleGit from "simple-git";
import fs from "fs";
import path from "path";

// This will be replaced with the new token that has correct permissions
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const git = simpleGit();
const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Random commit messages
const commitMessages = [
  "Update: Enhanced functionality",
  "Fix: Resolved minor issues",
  "Feature: Added new capabilities",
  "Improvement: Optimized performance",
  "Update: Code cleanup and organization",
  "Fix: Bug fixes and improvements",
  "Feature: New features added",
  "Doc: Updated documentation",
];

async function createRepository() {
  if (!GITHUB_TOKEN) {
    throw new Error("GitHub token not found. Please set the GITHUB_TOKEN environment variable.");
  }

  try {
    const repoName = `marketplace-${uuidv4().slice(0, 8)}`;
    const { data } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      auto_init: true,
      private: false,
      description: "Marketplace platform with Shipper integration"
    });

    return {
      name: repoName,
      url: data.html_url,
      cloneUrl: data.clone_url
    };
  } catch (error) {
    console.error("Failed to create repository:", error);
    throw error;
  }
}

async function initializeGit(repo: { name: string, url: string, cloneUrl: string }) {
  try {
    // Initialize git if not already initialized
    if (!fs.existsSync(".git")) {
      await git.init();
    }

    // Create .gitignore if it doesn't exist
    if (!fs.existsSync(".gitignore")) {
      fs.writeFileSync(".gitignore", `
node_modules/
dist/
.env
*.log
.DS_Store
      `);
    }

    // Create or update README.md
    if (!fs.existsSync("README.md")) {
      fs.writeFileSync("README.md", `
# Marketplace Platform

A marketplace platform integrating with Shipper for product cloning and order fulfillment, with SMS notifications.

## Features

- Product management with Shipper integration
- Order processing and fulfillment
- SMS notifications for order updates
- Real-time inventory tracking
- Admin dashboard for management

## Tech Stack

- React with TypeScript
- Express.js backend
- Tailwind CSS for styling
- shadcn/ui components
`);
    }

    // Set up remote with token authentication
    const remoteUrl = repo.cloneUrl.replace('https://', `https://${GITHUB_TOKEN}@`);
    await git.removeRemote("origin").catch(() => {});
    await git.addRemote("origin", remoteUrl);

    // Initial commit
    await git.add(".");
    await git.commit("Initial commit: Project setup");

    // Set main branch and push
    await git.branch(['-M', 'main']);
    await git.push(['-u', 'origin', 'main']);

    return repo.url;
  } catch (error) {
    console.error("Failed to initialize git:", error);
    throw error;
  }
}

async function startAutoSync() {
  console.log("Starting auto-sync process...");

  while (true) {
    try {
      const status = await git.status();

      if (status.files.length > 0) {
        // Update documentation.md with changes
        const changes = status.files.map(f => `- ${f.path}: ${f.working_dir}`).join("\n");
        fs.appendFileSync("documentation.md", `\n## Update ${new Date().toISOString()}\n${changes}\n`);

        // Commit and push changes
        await git.add(".");
        const randomMessage = commitMessages[Math.floor(Math.random() * commitMessages.length)];
        await git.commit(randomMessage);
        await git.push("origin", "main");

        console.log(`Changes pushed: ${randomMessage}`);
      }

      // Wait for 10 seconds
      await new Promise(resolve => setTimeout(resolve, 10000));
    } catch (error) {
      console.error("Error during auto-sync:", error);
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

// Main execution
async function main() {
  if (!GITHUB_TOKEN) {
    console.log("Waiting for GitHub token to be set...");
    return;
  }

  try {
    const repo = await createRepository();
    console.log("Created repository:", repo.url);

    const repoUrl = await initializeGit(repo);
    console.log("Initialized git repository");

    await startAutoSync();
  } catch (error) {
    console.error("Failed to set up GitHub sync:", error);
  }
}

main();