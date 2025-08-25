# How to Push Your Project to GitHub

This guide will walk you through the steps to get your project code from your local environment into a new repository on GitHub.

## Prerequisites

*   You need to have **Git** installed on your computer. If you don't, you can download it from [git-scm.com](https://git-scm.com/downloads).
*   You need to have a **GitHub account**. If you don't have one, you can sign up for free at [github.com](https://github.com).

## Step-by-Step Instructions

### Step 1: Initialize a Git Repository

If you haven't already, you need to turn your project folder into a Git repository. Open your terminal or command prompt, navigate to your project's root directory, and run the following command:

```bash
git init -b main
```

This command initializes a new Git repository and sets the default branch name to `main`.

### Step 2: Add Your Project Files

Next, you need to add all your project files to the staging area. This tells Git which files you want to track. Run this command from your project's root directory:

```bash
git add .
```

The `.` means "all files in the current directory and subdirectories".

### Step 3: Commit Your Files

Now, you need to "commit" your staged files. A commit is like a snapshot of your files at a specific point in time.

```bash
git commit -m "Initial commit"
```

You can change the message `"Initial commit"` to anything descriptive.

### Step 4: Create a New Repository on GitHub

1.  Go to [GitHub](https://github.com) and log in.
2.  In the top-right corner, click the **+** icon, and then select **New repository**.
3.  Give your repository a name (e.g., `estimatortest`).
4.  You can add an optional description.
5.  Make sure the repository is set to **Public** or **Private**, depending on your needs.
6.  **Important**: Do **not** initialize the repository with a `README`, `.gitignore`, or `license` file, as your project already contains these.
7.  Click the **Create repository** button.

### Step 5: Link Your Local Repository to GitHub

GitHub will show you a page with some commands. You need the one that starts with `git remote add origin`. Copy that command and run it in your terminal. It will look like this:

```bash
git remote add origin https://github.com/moni2021/estimatortest.git
```

If you have already set a remote URL and need to change it, you can use this command instead:
```bash
git remote set-url origin https://github.com/moni2021/estimatortest.git
```

This command links your local Git repository to the remote one on GitHub.

### Step 6: Push Your Code to GitHub

Finally, "push" your committed code from your local `main` branch to the `origin` (your GitHub repository):

```bash
git push -u origin main
```

This command uploads your files. The `-u` flag sets it up so that in the future, you can simply run `git push` to upload your changes.

---

That's it! If you refresh your repository page on GitHub, you will see all of your project files. You can now manage your code, track changes, and collaborate with others using GitHub.
