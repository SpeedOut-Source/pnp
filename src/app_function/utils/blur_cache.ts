import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { getPlaiceholder, type IGetPlaiceholderReturn } from "plaiceholder";
import log from "../logger/logger";
import { getFileExtSSR } from "./utils-server";
import { env } from "~/env.mjs";

const CACHE_DIR = path.join(env.DATA_PATH, "blur-cache");

// Ensure cache directory exists
async function ensureCacheDir() {
  try {
	await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
	log.error("Failed to create cache directory", error);
  }
}

// Generate a unique hash for the image URL
function generateCacheKey(imgUrl: string) {
  return crypto.createHash("md5").update(imgUrl).digest("hex");
}

export async function getBlurData(
  imgUrl: string,
  isUrl = true,
  forceRefresh = false,
) {
  // Check if it's a GIF
  if (isUrl && getFileExtSSR(imgUrl) === "gif") {
	return null;
  }

  await ensureCacheDir();

  const cacheKey = generateCacheKey(imgUrl);
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);

  // Check cache first
  if (!forceRefresh) {
	try {
	  const cachedData = await fs.readFile(cachePath, "utf8");
	  return JSON.parse(cachedData) as IGetPlaiceholderReturn;
	} catch {
	  // Cache miss or error reading cache
	}
  }

  try {
	const blurData = await getPlaiceholder(imgUrl);

	// Store in file cache
	await fs.writeFile(cachePath, JSON.stringify(blurData), "utf8");

	return blurData;
  } catch (e) {
	log.error(`Blur data fetch error for ${imgUrl}:`, e);

	// Optionally, you could still save the null result to prevent repeated attempts
	await fs.writeFile(cachePath, "null", "utf8");

	return null;
  }
}

// Clear specific or all cache entries
export async function clearBlurCache(imgUrl?: string) {
  await ensureCacheDir();

  if (imgUrl) {
	const cacheKey = generateCacheKey(imgUrl);
	const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);

	try {
	  await fs.unlink(cachePath);
	} catch (error) {
	  log.error("Failed to delete specific cache entry", error);
	}
  } else {
	// Clear all cache entries
	try {
	  const files = await fs.readdir(CACHE_DIR);
	  for (const file of files) {
		await fs.unlink(path.join(CACHE_DIR, file));
	  }
	} catch (error) {
	  log.error("Failed to clear blur cache", error);
	}
  }
}

// Optional: Add cache cleanup for old entries
export async function cleanupOldCache(maxAgeHours = 24) {
  await ensureCacheDir();

  const maxAge = maxAgeHours * 60 * 60 * 1000;
  const currentTime = Date.now();

  try {
	const files = await fs.readdir(CACHE_DIR);
	for (const file of files) {
	  const filePath = path.join(CACHE_DIR, file);
	  const stats = await fs.stat(filePath);

	  if (currentTime - stats.mtime.getTime() > maxAge) {
		await fs.unlink(filePath);
	  }
	}
  } catch (error) {
	log.error("Cache cleanup failed", error);
  }
}
