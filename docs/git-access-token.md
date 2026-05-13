# Git: personal access token (second GitHub account)

Use this when your **default** Git credentials are for another GitHub account, but **`origin`** must authenticate as **`ljangid054`** for [company-profile](https://github.com/ljangid054/company-profile).

HTTPS + a **Personal Access Token (PAT)** is simpler than a deploy key if you are happy storing a token in your OS credential manager.

Official docs: [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens), [Fine-grained PATs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).

## 1. Create a token (sign in as `ljangid054`)

### Option A — Fine-grained (recommended)

1. GitHub (as **`ljangid054`**) → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
2. **Resource owner:** `ljangid054`.
3. **Repository access:** *Only select repositories* → choose **`company-profile`**.
4. **Permissions** → **Repository permissions**:
   - **Contents:** *Read and write* (needed for `git push`).
   - **Metadata:** *Read-only* (usually auto).
5. Generate the token and **copy it once** — GitHub will not show it again.

### Option B — Classic token

1. **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**.
2. Enable scope **`repo`** (covers private + push; for a public repo, **`public_repo`** can be enough for push — prefer fine-grained for least access).

## 2. Point this clone at HTTPS

`origin` should be:

`https://github.com/ljangid054/company-profile.git`

If needed:

```bash
git remote set-url origin https://github.com/ljangid054/company-profile.git
git remote -v
```

## 3. Store credentials on macOS (Keychain)

So you are not prompted every push:

```bash
git config --global credential.helper osxkeychain
```

(Use `manager` / `cache` on other OSes per [Git credential storage](https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage).)

## 4. First `git push` / `git fetch`

When Git asks:

- **Username:** `ljangid054`
- **Password:** paste the **token** (not your GitHub account password).

macOS Keychain then reuses it for `github.com` + that repo path.

## 5. If your machine keeps using the wrong GitHub user

Clear the saved GitHub entry in **Keychain Access** (search `github.com`) and push again, or use:

```bash
git credential-osxkeychain erase
host=github.com
protocol=https

```

(Press Enter twice after the blank line.) Then retry `git fetch`; enter **`ljangid054`** + PAT when prompted.

## Security

- **Never** commit the token or put it in the repo URL in tracked files.
- Prefer **fine-grained** tokens scoped to **one repo** and minimum permissions.
- Revoke old tokens under **Settings → Developer settings** when rotating.

## CI note

For **GitHub Actions** on the same repo, use the default **`GITHUB_TOKEN`** in workflows instead of a PAT when possible.
