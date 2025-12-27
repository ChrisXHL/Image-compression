import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

export function DropZone({ onFileSelect }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div
            className={`droppipe ${isDragging ? 'active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: 'none' }}
            />

            <Upload className="icon-upload" strokeWidth={1.5} />

            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
                Drop your image here
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0' }}>
                or click to browse
            </p>
            <p style={{ fontSize: '0.875rem', color: '#525252', marginTop: '16px' }}>
                Supports JPG, PNG
            </p>
        </div>
    );
}
