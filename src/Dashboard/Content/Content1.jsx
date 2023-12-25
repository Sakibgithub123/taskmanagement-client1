// Content1.js
import React from 'react';

const Content1 = ({ content }) => {
    return (
        <div className="bg-white p-2 border mb-2" style={{ cursor: 'grab' }}>
            <div style={{ cursor: 'grabbing' }}>{content}</div>
        </div>
    );
};

export default Content1;
