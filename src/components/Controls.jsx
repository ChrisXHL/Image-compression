import React, { useEffect, useState } from 'react';
import { Settings, RefreshCw } from 'lucide-react';

export function Controls({ targetSize, setTargetSize, onProcess, isProcessing, originalSize }) {
    // Suggest a default if none set (e.g. 50% of original)
    useEffect(() => {
        if (!targetSize && originalSize) {
            const suggested = Math.floor((originalSize / 1024) * 0.5);
            setTargetSize(suggested > 0 ? suggested : 50);
        }
    }, [originalSize]);

    return (
        <div className="controls">
            <div className="size-control">
                <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Settings size={16} /> Target File Size (KB)
                </label>

                <div className="input-group">
                    <input
                        type="number"
                        className="control-input"
                        value={targetSize || ''}
                        onChange={(e) => setTargetSize(Number(e.target.value))}
                        placeholder="e.g. 100"
                        min="10"
                    />

                    <button
                        className="btn-primary"
                        onClick={onProcess}
                        disabled={isProcessing || !targetSize}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        {isProcessing ? (
                            <>
                                <RefreshCw className="spin" size={18} /> Processing...
                            </>
                        ) : (
                            'Compress Image'
                        )}
                    </button>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#525252', margin: 0 }}>
                    We will use binary search to get under this limit.
                </p>
            </div>
        </div>
    );
}
