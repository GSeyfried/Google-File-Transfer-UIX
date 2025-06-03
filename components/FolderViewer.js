import { useEffect, useState } from 'react';

export default function FolderViewer({ folderId, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (folderId) {
      fetch(`/api/folder?id=${folderId}`).then(r => r.json()).then(setData);
    }
  }, [folderId]);

  if (!folderId) return null;

  const renderItems = (items) => (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.mimeType === 'application/vnd.google-apps.folder' ? (
            <details>
              <summary>{item.name}</summary>
              {item.children && renderItems(item.children)}
            </details>
          ) : (
            item.name
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="viewer-overlay">
      <div className="viewer-panel">
        <button onClick={onClose}>Close</button>
        {data ? (
          <div>
            <h3>{data.name}</h3>
            {renderItems(data.children || [])}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
