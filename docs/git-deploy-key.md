# Git: deploy key for `ljangid054/company-profile`

Use this when your **default** GitHub account is different from the account that owns the repo. A [deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#deploy-keys) is an SSH key attached to **one** repository.

## 1. Create a dedicated SSH key (do not reuse your personal key)

```bash
ssh-keygen -t ed25519 -C "deploy-key company-profile" -f ~/.ssh/id_ed25519_ljangid_company_profile -N ""
```

## 2. Add the **public** key on GitHub

1. Open: `https://github.com/ljangid054/company-profile/settings/keys`
2. **Add deploy key** → paste contents of `~/.ssh/id_ed25519_ljangid_company_profile.pub`
3. Enable **Allow write access** if you need `git push` (read-only is enough for CI pull only).

## 3. SSH config: custom `Host` so this repo does not use your default GitHub key

Edit `~/.ssh/config` and add:

```
Host github.com-ljangid-company-profile
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_ljangid_company_profile
  IdentitiesOnly yes
```

`IdentitiesOnly yes` stops SSH from offering other keys first (avoids “wrong account” 403).

## 4. Remote URL for this clone

This repo is already set to:

`git@github.com-ljangid-company-profile:ljangid054/company-profile.git`

If you need to set it again:

```bash
git remote set-url origin git@github.com-ljangid-company-profile:ljangid054/company-profile.git
```

## 5. Test

```bash
ssh -T git@github.com-ljangid-company-profile
```

You should see a message that you’ve authenticated (often as read-only deploy key or similar). Then:

```bash
git fetch origin
git push origin production:main
```

(Adjust branch names to match your workflow.)

## CI (GitHub Actions) note

Deploy keys on GitHub are for **one** repo. For Actions on the same repo, prefer the built-in `GITHUB_TOKEN` or a **machine account** / fine-scoped PAT if you need cross-repo access.
