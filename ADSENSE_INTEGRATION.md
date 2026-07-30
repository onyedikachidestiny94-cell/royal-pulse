# Google AdSense Integration Guide

## Overview
This document explains the Google AdSense implementation added to Royal Pulse.

## Changes Made

### 1. **index.html** - Added AdSense Script
- Added Google AdSense script tag in the `<head>` section
- Script loads asynchronously to avoid blocking page load
- Client ID: `ca-pub-6511395787886377`

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6511395787886377"
     crossorigin="anonymous"></script>
```

### 2. **AdSenseAd.tsx** - New Component
Created a reusable AdSense ad component with the following features:
- **Responsive design** - Adapts to mobile and desktop screens
- **Multiple formats** - Horizontal, vertical, and rectangle ads
- **Error handling** - Safely handles AdSense script initialization
- **Flexible configuration** - Easy to customize slot numbers and formats

**Usage:**
```tsx
import { AdSenseAd } from '@/components/AdSenseAd';

<AdSenseAd 
  slot="1234567890" 
  format="horizontal" 
  responsive={true}
/>
```

### 3. **Navbar.tsx** - Header Ad Integration
- Imported the `AdSenseAd` component
- Added ad container at the top of the navbar
- Styled with light background on desktop, dark on mobile
- Ad is always visible and responsive

## How It Works

1. **Script Loading**: Google AdSense script loads globally
2. **Ad Rendering**: When `AdSenseAd` component mounts, it pushes ad configuration to `window.adsbygoogle`
3. **Responsive**: Ads automatically scale based on device size
4. **Caching**: Ads are cached by browser for performance

## Configuration

### To Change the Ad Slot
1. Go to `src/components/AdSenseAd.tsx`
2. Update the `slot` prop when using the component:
```tsx
<AdSenseAd slot="YOUR_NEW_SLOT_ID" />
```

### To Change Ad Position
- Currently placed at the top of header
- Can be moved to any component by importing and using `<AdSenseAd />`
- Recommended placements: top, sidebar, between articles, footer

### To Add More Ads
Simply add more `<AdSenseAd />` components with different slot IDs throughout your site.

## Mobile Responsiveness

✅ **Desktop**: Full-width horizontal ad (728x90)
✅ **Tablet**: Scaled responsive ad
✅ **Mobile**: Responsive auto-sized ad with proper spacing

## Performance Notes

- ⚡ AdSense script loads asynchronously (non-blocking)
- 📱 Responsive ads load only necessary sizes
- 🚀 Lazy loading compatible
- ♻️ Component handles rerenders gracefully

## Troubleshooting

**Ads not showing?**
- Verify AdSense account is approved
- Check that slot ID is correct
- Wait 24-48 hours for Google AdSense to review new placements
- Check browser console for errors

**Ads are too large/small?**
- Adjust `format` prop: `'horizontal'`, `'vertical'`, or `'rectangle'`
- Modify CSS classes in the component for custom sizing
- Use Tailwind CSS utility classes for styling

## Next Steps

1. Replace slot ID `"1234567890"` with your actual AdSense slot ID
2. Test on multiple devices (mobile, tablet, desktop)
3. Monitor AdSense dashboard for performance metrics
4. Optimize ad placement based on user engagement

## Files Modified

```
artifacts/royal-pulse/
├── index.html (added AdSense script)
├── src/
│   └── components/
│       ├── AdSenseAd.tsx (new)
│       └── layout/
│           └── Navbar.tsx (updated)
```
