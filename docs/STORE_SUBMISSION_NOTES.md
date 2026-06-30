# Store Submission Notes — The Goodest Good News

---

## App Identity

| Field | Value |
|---|---|
| App Name | The Goodest Good News |
| Version | 1.0.0 |
| iOS Bundle Identifier | com.erikmeyers.goodestgoodnews |
| iOS Build Number | 1 |
| Android Package Name | com.erikmeyers.goodestgoodnews |
| Android Version Code | 1 |

---

## V1 Scope

This first release is a self-contained digital storybook. It includes:

- Splash screen (animated, manual advancement)
- Dedication screen
- Home screen with mode selection
- Story Mode:
  - Read to Me (pre-recorded narration, play/pause/replay per spread)
  - Read by Myself (images only, no audio)
  - Cover through back cover (all illustrated spreads)
  - Replay Page button
  - Home / Previous / Next navigation
- Landscape orientation required for story (rotate prompt shown in portrait)

**Not included in V1:**
- Auto-play
- Background music
- Nature sounds
- Advertisements
- In-app purchases
- User accounts
- Analytics or tracking

---

## App Configuration Status

| Item | Status |
|---|---|
| `app.json` name + version | Done |
| iOS bundle identifier | Done |
| iOS build number | Done |
| iOS `usesNonExemptEncryption: false` | Done |
| Android package name | Done |
| Android version code | Done |
| Android adaptive icon | Done (uses `icon.png`) |
| Splash background color | Done (`#0D1B2A`) |
| Asset bundle patterns | Done (images + sounds) |
| `expo-av` plugin (no microphone) | Done |
| `expo-camera` removed from plugins | Done |
| Android permissions explicitly empty | Done |
| `eas.json` with dev/preview/production profiles | Done |
| Privacy policy document | Done (`docs/PRIVACY_POLICY.md`) |

---

## Permissions Audit — V1

| Permission | Status | Reason |
|---|---|---|
| Audio playback | Required | Narration audio via `expo-av` |
| Microphone | Explicitly disabled | `expo-av` plugin set `microphonePermission: false` |
| Camera | Not used | `expo-camera` is in `package.json` but never imported — remove before first build (see below) |
| Location | Not requested | Not used |
| Contacts | Not requested | Not used |
| Notifications | Not requested | Not used |

### Action needed on camera package
`expo-camera` appears in `package.json` as a dependency but is never used in any source file. It should be removed before building to eliminate any risk of an unnecessary permission being requested or flagged during App Store review.

To remove it locally:
```
npm uninstall expo-camera
```

---

## What Is Still Missing Before the First Preview Build

### You must provide:

1. **1024x1024 app icon** — Replace `assets/images/icon.png` with a 1024x1024 px version. The current file is too small for App Store submission.

2. **Contact email in privacy policy** — Add your email address to the placeholder in `docs/PRIVACY_POLICY.md` before the privacy policy URL goes live.

3. **Hosted privacy policy URL** — Both Apple and Google require a publicly accessible URL for your privacy policy. Host `docs/PRIVACY_POLICY.md` on a simple page (options: GitHub Pages, a personal site, Notion public page, or any static host).

4. **Apple Developer account credentials** — Fill in `eas.json` `submit.production.ios` fields before running `eas submit`:
   - `appleId` — your Apple ID email
   - `ascAppId` — App Store Connect app ID (created when you register the app in App Store Connect)
   - `appleTeamId` — your 10-character Apple team ID

5. **App Store Connect app record** — Create the app listing in App Store Connect before submitting. You will need: app name, category (Education or Books), age rating (4+), screenshots, and the privacy policy URL.

6. **Google Play Console app record** (Android) — Create the app listing in the Play Console. Fill in `serviceAccountKeyPath` in `eas.json` before running `eas submit` for Android.

---

## Next Single Step

Remove the unused `expo-camera` package, then run:

```
npm install -g eas-cli
eas login
eas build --platform ios --profile preview
```

This creates a TestFlight-ready IPA without submitting to the store.

---

## Suggested App Store Category and Age Rating

| Field | Value |
|---|---|
| Primary Category | Books (or Education) |
| Age Rating | 4+ |
| Content Advisory | No objectionable content |
| Privacy Nutrition Label | No data collected or linked to identity |
