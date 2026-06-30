# Release Checklist — The Goodest Good News V1.0.0

Use this list before creating the first preview build and before store submission.

---

## App Configuration (done in Bolt)

- [x] App name set — "The Goodest Good News"
- [x] Version set — 1.0.0
- [x] iOS bundle identifier — com.erikmeyers.goodestgoodnews
- [x] iOS build number — 1
- [x] iOS `usesNonExemptEncryption: false`
- [x] iOS microphone usage string set (no mic access requested)
- [x] iOS camera usage string set (no camera access requested)
- [x] Android package name — com.erikmeyers.goodestgoodnews
- [x] Android version code — 1
- [x] Android adaptive icon configured
- [x] Android permissions explicitly empty
- [x] `expo-camera` removed from dependencies (never used in V1)
- [x] `expo-av` plugin configured with microphone permission disabled
- [x] Asset bundle patterns include images and sounds
- [x] `eas.json` created with development / preview / production profiles
- [x] Privacy policy document created

---

## Still Needed — You Must Provide

### Assets
- [ ] **App icon — 1024x1024 px**
  Replace `assets/images/icon.png` with a 1024x1024 version of the app icon.
  The current file is too small for App Store submission.
  Required for both iOS and Android builds.

### Accounts
- [ ] **Apple Developer account** ($99/yr)
  Required to create iOS builds and submit to the App Store.
  Sign up at: developer.apple.com
- [ ] **Google Play Console account** ($25 one-time)
  Required to publish on Android.
  Sign up at: play.google.com/console

### Privacy Policy
- [ ] **Add your contact email** to `docs/PRIVACY_POLICY.md`
  Replace the placeholder with a real email address before publishing.
- [ ] **Host the privacy policy at a public URL**
  Options: GitHub Pages, a personal website, Notion public page, or any static host.
  Both Apple and Google require a live URL at submission time.

### App Store Connect (iOS)
- [ ] Create the app record in App Store Connect
  (This generates the `ascAppId` you need in `eas.json`)
- [ ] Fill in `eas.json` → `submit.production.ios`:
  - `appleId` — your Apple ID email
  - `ascAppId` — App Store Connect numeric app ID
  - `appleTeamId` — your 10-character team ID
- [ ] Upload at least one set of screenshots (see `docs/store/SCREENSHOT_PLAN.md`)
- [ ] Add privacy policy URL to the App Store Connect listing
- [ ] Set age rating to 4+
- [ ] Set primary category to Books (secondary: Education)

### Google Play Console (Android)
- [ ] Create the app record in Play Console
- [ ] Add `serviceAccountKeyPath` to `eas.json` → `submit.production.android`
- [ ] Upload screenshots
- [ ] Add privacy policy URL to the Play Console listing
- [ ] Set content rating to Everyone
- [ ] Set category to Education → Books & Reference

---

## Build and Test

- [ ] Run `npm uninstall expo-camera` locally after downloading the project
- [ ] Run `eas build --platform ios --profile preview` for first TestFlight build
- [ ] Run `eas build --platform android --profile preview` for first internal APK
- [ ] Test on a real iOS device in landscape orientation
- [ ] Test on a real Android device in landscape orientation
- [ ] Verify narration plays correctly on device (Read to Me mode)
- [ ] Verify all page spreads load (cover through back cover)
- [ ] Verify Previous / Next / Home / Replay all work
- [ ] Verify rotate prompt appears in portrait and dismisses in landscape
- [ ] Verify audio stops cleanly when navigating away from story screen

---

## Final Before Production Build

- [ ] Bump `buildNumber` in `app.json` if any rebuild was needed during preview testing
- [ ] Confirm screenshots are captured at required sizes
- [ ] Confirm privacy policy URL is live and accessible
- [ ] Run `eas build --platform ios --profile production`
- [ ] Run `eas build --platform android --profile production`
- [ ] Run `eas submit --platform ios` to submit to TestFlight / App Store Review
- [ ] Run `eas submit --platform android` to submit to Google Play Review
