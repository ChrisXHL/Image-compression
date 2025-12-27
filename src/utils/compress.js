/**
 * Compresses an image file to a target size (KB) using binary search.
 * @param {File} file - The original image file
 * @param {number} targetSizeKB - The target size in KB (e.g. 50, 200)
 * @param {function} onProgress - Callback for progress (0-100) - optional
 * @returns {Promise<Blob>} - The compressed image Blob
 */
export async function compressImage(file, targetSizeKB, onProgress) {
    const targetSizeBytes = targetSizeKB * 1024;
    const maxIterations = 10;

    // Create an HTML Image Element
    const img = new Image();
    const imageUrl = URL.createObjectURL(file);

    await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
    });

    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;

    // Initial check: if file is already small enough, return original (or re-encode if format change needed)
    if (file.size <= targetSizeBytes) {
        // Just return original if we don't strictly enforce format conversion, 
        // but user might want to re-compress to ensure it fits strict limits.
        // Let's assume we proceed to ensure consistent output but maybe with high quality.
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    let minQ = 0;
    let maxQ = 1;
    let bestBlob = null;
    let bestSize = Infinity;

    // Binary search for Quality
    for (let i = 0; i < maxIterations; i++) {
        const midQ = (minQ + maxQ) / 2;
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', midQ));

        if (!blob) break;

        if (blob.size <= targetSizeBytes) {
            // It fits! Try to get better quality (higher size)
            bestBlob = blob;
            bestSize = blob.size;
            minQ = midQ;
        } else {
            // Too big
            maxQ = midQ;
        }
    }

    // If even lowest quality is too big, start scaling down dimensions
    if (!bestBlob || bestSize > targetSizeBytes) {
        let scale = 0.9;
        for (let i = 0; i < 5; i++) { // Try resizing 5 times
            width *= scale;
            height *= scale;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.5)); // Medium quality
            if (blob.size <= targetSizeBytes) {
                bestBlob = blob;
                break;
            }
        }
    }

    // Fallback: if we still don't have a bestBlob (rare), just return the last attempt
    if (!bestBlob) {
        bestBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.1));
    }

    URL.revokeObjectURL(imageUrl);
    return bestBlob;
}
