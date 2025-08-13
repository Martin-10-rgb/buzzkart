
# BuzzKart — Viral ForYou (GitHub + Netlify Ready)
- TikTok/Instagram-style feed (For You by default)
- Tabs: Newest / Temu / AliExpress / Amazon / POD
- Click-anywhere to Shop (opens in new tab) with affiliate auto-tagging
- Admin protected by password (set in `config.json`)
- Currency: USD default + NOK shown, dropdown for more (live rates)
- 100 products preloaded (edit `products.json`)
- 404 page included

## Deploy (Netlify)
1. Go to https://app.netlify.com → Add new site → Deploy manually.
2. Drag this folder.
3. Set site name (e.g., buzzkart). Done.

## Backup (GitHub Pages)
1. Create a repo `buzzkart` and upload all files.
2. Settings → Pages → Deploy from root → Save.
3. Your backup link goes live.

## Edit files later
- Edit locally and re-upload to Netlify (Deploys → Deploy manually), or
- Push to GitHub and connect Netlify to auto-deploy.

## Admin
- Visit `/admin.html` → enter password from `config.json` (`admin_password`).
- Use "Download updated config.json" to save your IDs and upload it.
- Use "Generate files" to download `p/<id>.html` and copy product JSON into `products.json`.

## Smart links from social
- Use `/p/<id>.html` links in TikTok/IG/YT descriptions. They redirect with your affiliate tags.
