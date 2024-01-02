import React, { useState, useEffect } from 'react';

const LocalStorageManager = () => {
    const [selectedKey, setSelectedKey] = useState('');
    const [customKey, setCustomKey] = useState('');
    const [value, setValue] = useState('');
    const [storageItems, setStorageItems] = useState({});
    const [editingKey, setEditingKey] = useState(null);

    useEffect(() => {
        loadLocalStorageData();
    }, []);

    const loadLocalStorageData = () => {
        let items = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            items[key] = localStorage.getItem(key);
        }
        setStorageItems(items);
    };

    const handleAdd = () => {
        const keyToAdd = editingKey || customKey;
        if (!keyToAdd) return;

        localStorage.setItem(keyToAdd, value);
        loadLocalStorageData();
        setCustomKey('');
        setValue('');
        setEditingKey(null);
    };

    const handleRemove = (key) => {
        localStorage.removeItem(key);
        loadLocalStorageData();
        if (editingKey === key) {
            setEditingKey(null);
        }
    };

    const handleEdit = (key) => {
        setEditingKey(key);
        setValue(storageItems[key]);
    };

    const handleCopyToClipboard = (value) => {
        navigator.clipboard.writeText(value);
    };

    return (
        <div className="flex flex-row gap-8 p-4 max-w-6xl mx-auto">
  <div className="max-w-[200px] flex flex-col gap-4">
                <div>
                    <select
                        onChange={(e) => setSelectedKey(e.target.value)}
                        value={selectedKey}
                        className="border border-gray-300 p-2 rounded w-full"
                    >
                        <option value="">Select a key or add new</option>
                        {Object.keys(storageItems).map(key => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Add a custom key"
                        value={customKey}
                        onChange={(e) => setCustomKey(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

                <hr></hr>
                <div>
                    <input
                        type="text"
                        placeholder="Value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                >
                    Add/Update
                </button>
            </div>           
            
        
             <div className="flex-1 max-w-[400px] max-h-[400px]">   
             
               <h2 className="text-xl font-semibold mb-4">Local Storage Items:</h2>


                <ul className="overflow-auto">
                    {Object.entries(storageItems).map(([key, itemValue]) => (
                        <li key={key} className={`flex flex-col border-b border-gray-300 ${editingKey === key ? 'py-2 px-4' : 'py-1 px-2'} max-h-${editingKey === key ? 'none' : '[50px]'}`}>
                            {editingKey === key ? (
                                <>
                                    <textarea
                                        type="text"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="border border-gray-300 p-2 rounded w-full min-h-[200px] max-h-[400px] resize-x-none"
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <button
                                            onClick={handleAdd}
                                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-3 rounded mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => handleRemove(key)}
                                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-3 rounded"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <span>{key}: </span>
                                    <div>
                                        <button
                                            onClick={() => handleCopyToClipboard(itemValue)}
                                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-3 rounded mr-2"
                                        >
                                            Copy
                                        </button>
                                        <button
                                            onClick={() => handleEdit(key)}
                                            className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-3 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LocalStorageManager;
