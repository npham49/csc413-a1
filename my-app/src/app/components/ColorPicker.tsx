"use client";
import React, { useState } from 'react';

interface ColorPickerProps {
    onChange: (color: string) => void;
}
export default function ColorPicker({onChange}: ColorPickerProps) {
    const [selectedColor, setSelectedColor] = useState<string>('#000000');

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
        setSelectedColor(event.target.value);
    };

    return (
        <div className="space-y-3" style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2 className='text-xl'>Pick a Color</h2>
            <input
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
                style={{ cursor: 'pointer' }}
            />
            <p className='text-lg'>
                Selected Color: <span style={{ color: selectedColor }}>{selectedColor}</span>
            </p>
        </div>
    );
};

