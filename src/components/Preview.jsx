import React from 'react';
import { Download, ArrowRight, FileCheck } from 'lucide-react';

function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function Preview({ originalFile, compressedBlob }) {
    if (!originalFile) return null;

    const originalUrl = URL.createObjectURL(originalFile);
    const compressedUrl = compressedBlob ? URL.createObjectURL(compressedBlob) : null;

    const downloadImage = () => {
        if (!compressedUrl) return;
        const link = document.createElement('a');
        link.href = compressedUrl;
        link.download = `compressed-${originalFile.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="preview-area">
            {/* Original */}
            <div className="image-card">
                <div className="image-header">
                    <span>Original</span>
                    <span>{formatSize(originalFile.size)}</span>
                </div>
                <div className="image-view">
                    <img src={originalUrl} alt="Original" />
                </div>
            </div>

            {/* Compressed */}
            <div className="image-card" style={{ borderColor: compressedBlob ? 'var(--success)' : '#262626' }}>
                <div className="image-header">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {compressedBlob && <FileCheck size={14} color="var(--success)" />}
                        Compressed
                    </span>
                    <span style={{ color: compressedBlob ? 'var(--success)' : 'inherit', fontWeight: compressedBlob ? 700 : 400 }}>
                        {compressedBlob ? formatSize(compressedBlob.size) : '---'}
                    </span>
                </div>
                <div className="image-view">
                    {compressedUrl ? (
                        <img src={compressedUrl} alt="Compressed" />
                    ) : (
                        <div style={{ color: '#404040', fontSize: '0.875rem' }}>Waiting...</div>
                    )}
                </div>
            </div>

            {compressedBlob && (
                <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn-primary" onClick={downloadImage} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={18} /> Download Compressed Image
                    </button>
                </div>
            )}
        </div>
    );
}
