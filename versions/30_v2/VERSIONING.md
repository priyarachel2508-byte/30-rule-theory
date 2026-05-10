# Folder Versioning

This project uses simple folder snapshots instead of git.

Current saved version:

- `versions/30_v1`

When you make a new config/design change, save the next version with:

```bash
./save-version.sh
```

The script will automatically create the next folder name, such as `30_v2`,
`30_v3`, and so on.

Generated folders are not copied into version snapshots:

- `node_modules`
- `dist`
- `.git`
- `versions`
