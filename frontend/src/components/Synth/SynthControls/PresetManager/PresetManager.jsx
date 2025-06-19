// PresetManager.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
    PMContainer,
    PMButton,
    PMTextInput,
    HiddenFileInput,
    PMSelect,
    PMGroup,
    PMLabel,
} from './PresetManager.style';

// Импорт Tabler Icons
import {
    TbDownload,
    TbUpload,
    TbCloudUpload,
    TbRefresh,
    TbCloudDownload,
    TbRotateClockwise,
} from 'react-icons/tb';

export default function PresetManager({
    currentPresetData,
    defaultPresetData,
    onApplyPreset,
    onResetPreset,
    apiBaseUrl,
    localPresets = {}, // необязательно: объект локальных пресетов { name: data }
}) {
    const [presetName, setPresetName] = useState('');
    const [serverPresets, setServerPresets] = useState([]);
    const [selectedServerPresetId, setSelectedServerPresetId] = useState('');
    const fileInputRef = useRef(null);

    // Сохранение текущего пресета как файл
    const handleSaveToFile = () => {
        const dataStr = JSON.stringify(currentPresetData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const name = presetName || 'preset';
        a.href = url;
        a.download = `${name}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Загрузка из файла
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const obj = JSON.parse(evt.target.result);
                onApplyPreset(obj);
            } catch (err) {
                alert('Неверный формат файла пресета', err);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const handleLoadFromFile = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    // Получение списка пресетов с сервера
    const fetchServerPresets = async () => {
        try {
            const resp = await fetch(`${apiBaseUrl}/presets/`);
            if (!resp.ok) throw new Error(`Ошибка ${resp.status}`);
            const data = await resp.json();
            setServerPresets(data);
        } catch (err) {
            console.error('Не удалось получить список пресетов:', err);
            alert('Ошибка при загрузке списка пресетов с сервера');
        }
    };

    useEffect(() => {
        fetchServerPresets();
    }, []);

    // Публикация на сервер
    const handlePublish = async () => {
        const name = presetName.trim();
        if (!name) {
            alert('Введите имя пресета перед публикацией');
            return;
        }
        const payload = { name, data: currentPresetData };
        try {
            const resp = await fetch(`${apiBaseUrl}/presets/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!resp.ok) {
                const errData = await resp.json();
                console.error('Ошибка при публикации:', errData);
                alert('Не удалось опубликовать пресет');
                return;
            }
            alert('Пресет опубликован успешно');
            fetchServerPresets();
        } catch (err) {
            console.error(err);
            alert('Ошибка при публикации пресета');
        }
    };

    // Загрузка выбранного из базы
    const handleLoadFromServer = async () => {
        if (!selectedServerPresetId) {
            alert('Выберите пресет из списка');
            return;
        }
        try {
            const resp = await fetch(
                `${apiBaseUrl}/presets/${selectedServerPresetId}/`
            );
            if (!resp.ok) throw new Error(`Ошибка ${resp.status}`);
            const obj = await resp.json();
            if (obj.data) {
                onApplyPreset(obj.data);
                setPresetName(obj.name || '');
            } else {
                alert('Некорректный ответ от сервера');
            }
        } catch (err) {
            console.error(err);
            alert('Ошибка при загрузке пресета с сервера');
        }
    };

    const handleSelectServerPreset = (e) => {
        setSelectedServerPresetId(e.target.value);
        handleLoadFromServer();
    };

    const handleReset = () => {
        onResetPreset();
        setPresetName('');
    };

    // Локальные пресеты (если есть)
    const localPresetNames = Object.keys(localPresets || {});
    const handleLoadLocalPreset = (e) => {
        const key = e.target.value;
        if (key) {
            onApplyPreset(localPresets[key]);
            setPresetName(key);
        }
    };

    return (
        <PMContainer>
            {/* Серверные пресеты */}
            <PMGroup>
                <PMSelect
                    value={selectedServerPresetId}
                    onChange={handleSelectServerPreset}
                >
                    <option value="" disabled>
                        {presetName}
                    </option>
                    {serverPresets.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </PMSelect>
            </PMGroup>
            {/* скрытый input file */}
            <HiddenFileInput
                accept="application/json"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {/* Кнопки с иконками */}
            <PMButton
                onClick={handleSaveToFile}
                aria-label="Сохранить как файл"
                title="Сохранить как файл"
            >
                <TbDownload />
            </PMButton>

            <PMButton
                onClick={handleLoadFromFile}
                aria-label="Загрузить из файла"
                title="Загрузить из файла"
            >
                <TbUpload />
            </PMButton>

            <PMButton
                onClick={handlePublish}
                aria-label="Публиковать"
                title="Публиковать пресет"
            >
                <TbCloudUpload />
            </PMButton>

            <PMButton
                onClick={fetchServerPresets}
                aria-label="Обновить список"
                title="Обновить список пресетов"
            >
                <TbRefresh />
            </PMButton>

            {/* Локальные пресеты */}
            {localPresetNames.length > 0 && (
                <PMGroup>
                    <PMLabel>Локальные пресеты</PMLabel>
                    <PMSelect defaultValue="" onChange={handleLoadLocalPreset}>
                        <option value="" disabled>
                            Выберите
                        </option>
                        {localPresetNames.map((k) => (
                            <option key={k} value={k}>
                                {k}
                            </option>
                        ))}
                    </PMSelect>
                </PMGroup>
            )}

            <PMButton
                onClick={handleReset}
                aria-label="Сброс"
                title="Сброс параметров пресета"
            >
                <TbRotateClockwise />
            </PMButton>
        </PMContainer>
    );
}
