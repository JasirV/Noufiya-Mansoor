// The wedding video is served as a static asset from /public/video/*.mp4 and
// referenced via src="/video/save-the-date.mp4" in SaveTheDateVideo.tsx.
// There is no ESM import of the video file, so no module declaration is
// required. This file exists only to keep strict TypeScript environments happy
// if a future import of a video asset is added.
