// PresetManager.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
    PMContainer,
    PMButton,
    PMTextInput,
    HiddenFileInput,
    PMGroup,
    PMLabel,
    PMSelect,
    PMButtonsGroup,
    PMInputSelectGroup,
} from './PresetManager.style';

import {
    TbDownload,
    TbUpload,
    TbCloudUpload,
    TbRefresh,
    TbRotateClockwise,
} from 'react-icons/tb';

export default function PresetManager({
    currentPresetData,
    onApplyPreset,
    onResetPreset,
    apiBaseUrl,
    localPresets = {},
}) {
    const [presetName, setPresetName] = useState('');
    // список серверных пресетов
    const [serverPresets, setServerPresets] = useState([]);
    // выбранная опция react-select
    const [selectedPresetOption, setSelectedPresetOption] = useState(null);
    // ошибки публикации
    const [publishError, setPublishError] = useState('');
    // состояния загрузки
    const [loadingList, setLoadingList] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [loadingPreset, setLoadingPreset] = useState(false);

    const fileInputRef = useRef(null);

    // Загрузка списка серверных пресетов
    const fetchServerPresets = async () => {
        setLoadingList(true);
        try {
            const resp = await fetch(`${apiBaseUrl}/presets/`);
            if (!resp.ok) throw new Error(`Ошибка ${resp.status}`);
            const data = await resp.json();
            setServerPresets(data);
        } catch (err) {
            console.error('Не удалось получить список пресетов:', err);
            alert('Ошибка при загрузке списка пресетов с сервера');
        } finally {
            setLoadingList(false);
        }
    };

    useEffect(() => {
        fetchServerPresets();
    }, []);

    // Подготовка опций для react-select
    const localPresetNames = Object.keys(localPresets || {});
    const localOptions = localPresetNames.map((name) => ({
        value: `local:${name}`,
        label: name,
    }));
    const serverOptions = serverPresets.map((p) => ({
        value: `server:${p.id}`,
        label: p.name,
    }));
    const groupedOptions = [];
    if (localOptions.length > 0) {
        groupedOptions.push({ label: 'Локальные', options: localOptions });
    }
    if (serverOptions.length > 0) {
        groupedOptions.push({ label: 'Серверные', options: serverOptions });
    }

    // Обработчик выбора
    const handleSelectPreset = (option) => {
        setSelectedPresetOption(option);
        setPublishError('');
        setPresetName('');

        if (!option) {
            // сброс
            return;
        }
        const [type, key] = option.value.split(':');
        if (type === 'local') {
            const presetData = localPresets[key];
            if (presetData) {
                onApplyPreset(presetData);
                setPresetName(key);
            } else {
                console.warn(`Локальный пресет ${key} не найден`);
            }
        } else if (type === 'server') {
            setLoadingPreset(true);
            (async () => {
                try {
                    const resp = await fetch(`${apiBaseUrl}/presets/${key}/`);
                    if (!resp.ok) throw new Error(`Ошибка ${resp.status}`);
                    const obj = await resp.json();
                    if (obj.data) {
                        onApplyPreset(obj.data);
                        setPresetName(obj.name || '');
                    } else {
                        alert(
                            'Некорректный ответ при загрузке пресета с сервера'
                        );
                    }
                } catch (err) {
                    console.error(
                        'Ошибка при загрузке пресета с сервера:',
                        err
                    );
                    alert('Ошибка при загрузке пресета с сервера');
                } finally {
                    setLoadingPreset(false);
                }
            })();
        }
    };

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

    // Загрузка из локального файла
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const obj = JSON.parse(evt.target.result);
                onApplyPreset(obj);
                setPresetName('');
                setSelectedPresetOption(null);
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

    // Публикация пресета на сервер
    const handlePublish = async () => {
        setPublishError('');
        const name = presetName.trim();
        if (!name) {
            setPublishError('Введите имя пресета');
            return;
        }
        setPublishing(true);
        try {
            const payload = { name, data: currentPresetData };
            const resp = await fetch(`${apiBaseUrl}/presets/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const text = await resp.text();
            let result = null;
            try {
                result = text ? JSON.parse(text) : null;
            } catch (err) {
                console.error('Ошибка при парсинге ответа:', err);
            }
            if (resp.status === 201) {
                alert('Пресет опубликован успешно');
                await fetchServerPresets();
                setSelectedPresetOption(null);
                setPresetName('');
            } else if (resp.status === 400) {
                const errMsg =
                    result &&
                    (result.error || (result.name && result.name.join(' ')))
                        ? result.error || result.name.join(' ')
                        : 'Ошибка публикации';
                setPublishError(errMsg);
            } else {
                console.error('Ошибка при публикации:', resp.status, result);
                setPublishError('Не удалось опубликовать пресет');
            }
        } catch (err) {
            console.error('Ошибка при публикации пресета:', err);
            setPublishError('Ошибка при публикации пресета');
        } finally {
            setPublishing(false);
        }
    };

    // Сброс к дефолту
    const handleReset = () => {
        onResetPreset();
        setPresetName('');
        setSelectedPresetOption(null);
        setPublishError('');
    };

    return (
        <PMContainer>
            <HiddenFileInput
                accept="application/json"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            <PMInputSelectGroup>
                <PMGroup>
                    <PMTextInput
                        placeholder=">"
                        value={presetName}
                        onChange={(e) => {
                            setPresetName(e.target.value);
                            setPublishError('');
                        }}
                        disabled={publishing || loadingPreset}
                    />
                    {publishError && <PMLabel>{publishError}</PMLabel>}
                </PMGroup>

                <PMGroup>
                    <PMSelect
                        options={groupedOptions}
                        value={selectedPresetOption}
                        onChange={handleSelectPreset}
                        isDisabled={loadingList || loadingPreset || publishing}
                        placeholder={loadingList ? 'loading' : 'preset'}
                    />
                </PMGroup>
            </PMInputSelectGroup>

            {loadingPreset && <PMLabel>applying...</PMLabel>}

            <PMButtonsGroup>
                <PMButton
                    onClick={handleSaveToFile}
                    aria-label="save as file"
                    title="save as file"
                    disabled={publishing || loadingPreset}
                >
                    <TbDownload />
                </PMButton>

                <PMButton
                    onClick={handleLoadFromFile}
                    aria-label="load from file"
                    title="laod from file"
                    disabled={publishing || loadingPreset}
                >
                    <TbUpload />
                </PMButton>

                <PMButton
                    onClick={handlePublish}
                    aria-label="upload to bank"
                    title="upload preset to preset bank"
                    disabled={publishing || loadingPreset}
                >
                    <TbCloudUpload />
                </PMButton>

                <PMButton
                    onClick={fetchServerPresets}
                    aria-label="refresh preset list"
                    title="refresh preset list"
                    disabled={loadingList || publishing || loadingPreset}
                >
                    <TbRefresh />
                </PMButton>

                <PMButton
                    onClick={handleReset}
                    aria-label="reset preset"
                    title="reset preset settings to default"
                    disabled={publishing || loadingPreset}
                >
                    <TbRotateClockwise />
                </PMButton>
            </PMButtonsGroup>
        </PMContainer>
    );
}
