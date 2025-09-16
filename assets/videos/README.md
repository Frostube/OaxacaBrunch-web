# Video Files for Oaxaca Brunch

## Required Video Files

To fix the iOS Safari video playback issue, add these video files to this directory:

### 1. **hero-video.mp4** (Primary - iOS Safari compatible)
- **Format:** MP4 with H.264 codec
- **Recommended specs:**
  - Resolution: 1920x1080 or 1280x720
  - Bitrate: 2-5 Mbps
  - Duration: 10-30 seconds (for hero video)
  - Audio: AAC codec (optional for hero videos)

### 2. **hero-video.webm** (Fallback - for other browsers)
- **Format:** WebM with VP9 codec
- **Same resolution and duration as MP4**

## iOS Safari Requirements

iOS Safari is very picky about video formats. Make sure your MP4 file:

✅ **Uses H.264 video codec**  
✅ **Uses AAC audio codec** (if audio is needed)  
✅ **Has proper metadata**  
✅ **Is optimized for web streaming**  

## Video Optimization Tips

1. **Keep file size small** (under 10MB for hero videos)
2. **Use web-optimized encoding** (fast start/streaming)
3. **Test on actual iOS devices** before deploying
4. **Consider using a video hosting service** (Vimeo, YouTube) for better compatibility

## Current Status

❌ **No video files found** - This is why you see a black screen on iOS  
📱 **iOS Safari shows black screen** when video source is missing or invalid  
✅ **Fallback poster image** (`hero.webp`) should display until video is added  

## Quick Fix

Until you add the video files, the poster image will show instead of a black screen on iOS Safari.
