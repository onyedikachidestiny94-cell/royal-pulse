---
name: Credential handling
description: Never keep third-party credentials in uploaded project files or source-controlled attachments.
---

Third-party API secrets must stay in Replit Secrets or the provider's managed integration; uploaded onboarding notes can contain live credentials and must not be committed.

**Why:** A credential-bearing attachment was accidentally tracked while connecting image storage, creating unnecessary exposure even though the file was later removed.

**How to apply:** Before committing uploaded assets, inspect text files for keys and secrets, remove them from tracked files, and advise rotating any credential that was exposed.