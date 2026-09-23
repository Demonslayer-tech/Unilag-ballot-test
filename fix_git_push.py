"""
fix_git_push.py

Fixes a rejected `git push` caused by the remote having commits your
local branch doesn't have (non-fast-forward error).

What it does:
  1. git pull origin main --rebase   (bring remote commits in, replay yours on top)
  2. If a conflict occurs, stop and tell you exactly what to do — it will
     NOT try to auto-resolve conflicting file content for you.
  3. If the rebase is clean, git push origin main

Run it from anywhere — it cd's into REPO_PATH itself.
"""

import subprocess
import shutil
import sys

REPO_PATH = r"C:\Users\Bosslady\Documents\Login Page(Glass Website)"
BRANCH = "main"


def find_git():
    git_path = shutil.which("git.exe" if sys.platform == "win32" else "git")
    if not git_path:
        print("ERROR: git was not found on PATH. Install Git or check your PATH.")
        sys.exit(1)
    return git_path


def run(git, args, cwd):
    result = subprocess.run(
        [git] + args,
        cwd=cwd,
        capture_output=True,
        text=True,
    )
    print(f"$ git {' '.join(args)}")
    if result.stdout.strip():
        print(result.stdout.strip())
    if result.stderr.strip():
        print(result.stderr.strip())
    return result


def main():
    git = find_git()

    print(f"Working in: {REPO_PATH}\n")

    # Step 1: pull with rebase
    pull = run(git, ["pull", "origin", BRANCH, "--rebase"], REPO_PATH)

    if pull.returncode != 0:
        combined = (pull.stdout + pull.stderr).lower()
        if "conflict" in combined:
            print("\n⚠ Rebase stopped due to a merge conflict.")
            print("Fix it manually:")
            print("  1. Open the conflicting file(s) listed above.")
            print("  2. Look for <<<<<<<, =======, >>>>>>> markers and pick the correct content.")
            print(f"  3. Run: git add <file>   (in \"{REPO_PATH}\")")
            print("  4. Run: git rebase --continue")
            print("  5. Re-run this script, or run: git push origin main")
        else:
            print("\n⚠ `git pull --rebase` failed for a reason other than a conflict.")
            print("Check the output above for details.")
        sys.exit(1)

    print("\n✓ Pull/rebase succeeded. Pushing...\n")

    # Step 2: push
    push = run(git, ["push", "origin", BRANCH], REPO_PATH)

    if push.returncode != 0:
        print("\n⚠ Push still failed. Check the output above.")
        sys.exit(1)

    print("\n✓ Push succeeded.")


if __name__ == "__main__":
    main()
