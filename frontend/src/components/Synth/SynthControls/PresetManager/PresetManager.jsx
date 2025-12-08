import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
    const [serverPresets, setServerPresets] = useState([]);
    const [selectedPresetOption, setSelectedPresetOption] = useState(null);
    const [publishError, setPublishError] = useState('');
    const [loading, setLoading] = useState({
        list: false,
        preset: false,
        publishing: false,
    });

    const fileInputRef = useRef(null);

    const fetchServerPresets = useCallback(async () => {
        setLoading((prev) => ({ ...prev, list: true }));
        try {
            const resp = await fetch(`${apiBaseUrl}/presets/`);
            if (!resp.ok) throw new Error(`Ошибка ${resp.status}`);
            const data = await resp.json();
            setServerPresets(data);
        } catch (err) {
            console.error('Не удалось получить список пресетов:', err);
            alert('Ошибка при загрузке списка пресетов с сервера');
        } finally {
            setLoading((prev) => ({ ...prev, list: false }));
        }
    }, [apiBaseUrl]);

    useEffect(() => {
        fetchServerPresets();
    }, [fetchServerPresets]);

    const presetOptions = useMemo(() => {
        const localOptions = Object.keys(localPresets).map((name) => ({
            value: `local:${name}`,
            label: name,
        }));

        const serverOptions = serverPresets.map((p) => ({
            value: `server:${p.id}`,
            label: p.name,
        }));

        const groups = [];
        if (localOptions.length) {
            groups.push({ label: 'Локальные', options: localOptions });
        }
        if (serverOptions.length) {
            groups.push({ label: 'Серверные', options: serverOptions });
        }

        return groups;
    }, [localPresets, serverPresets]);

    const handleSelectPreset = useCallback(
        async (option) => {
            setSelectedPresetOption(option);
            setPublishError('');
            setPresetName('');

            if (!option) return;

            const [type, key] = option.value.split(':');

            if (type === 'local') {
                const presetData = localPresets[key];
                if (presetData) {
                    onApplyPreset(presetData);
                    setPresetName(key);
                }
            } else if (type === 'server') {
                setLoading((prev) => ({ ...prev, preset: true }));
                try {
                    const resp = await fetch(`${apiBaseUrl}/presets/${key}/`);
                    if (!resp.ok) throw new Error(`Ошибка ${resp.status}`);
                    const { data, name } = await resp.json();
                    onApplyPreset(data);
                    setPresetName(name || '');
                } catch (err) {
                    console.error('Ошибка при загрузке пресета:', err);
                    alert('Ошибка при загрузке пресета с сервера');
                } finally {
                    setLoading((prev) => ({ ...prev, preset: false }));
                }
            }
        },
        [apiBaseUrl, localPresets, onApplyPreset]
    );

    const handleSaveToFile = useCallback(() => {
        const dataStr = JSON.stringify(currentPresetData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${presetName || 'preset'}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [currentPresetData, presetName]);

    const handleLoadFromFile = useCallback(
        (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    onApplyPreset(data);
                    setPresetName('');
                    setSelectedPresetOption(null);
                } catch {
                    alert('Неверный формат файла пресета');
                }
            };
            reader.readAsText(file);
            e.target.value = '';
        },
        [onApplyPreset]
    );

    const handlePublish = useCallback(async () => {
        const name = presetName.trim();
        if (!name) {
            setPublishError('Введите имя пресета');
            return;
        }

        setLoading((prev) => ({ ...prev, publishing: true }));
        setPublishError('');

        try {
            const response = await fetch(`${apiBaseUrl}/presets/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, data: currentPresetData }),
            });

            const result = await response.json().catch(() => null);

            if (response.status === 201) {
                alert('Пресет опубликован успешно');
                await fetchServerPresets();
                setSelectedPresetOption(null);
                setPresetName('');
            } else if (response.status === 400) {
                setPublishError(
                    result?.error ||
                        result?.name?.join(' ') ||
                        'Ошибка публикации'
                );
            } else {
                setPublishError('Не удалось опубликовать пресет');
            }
        } catch (err) {
            console.error('Ошибка при публикации:', err);
            setPublishError('Ошибка при публикации пресета');
        } finally {
            setLoading((prev) => ({ ...prev, publishing: false }));
        }
    }, [apiBaseUrl, currentPresetData, fetchServerPresets, presetName]);

    const handleReset = useCallback(() => {
        onResetPreset();
        setPresetName('');
        setSelectedPresetOption(null);
        setPublishError('');
    }, [onResetPreset]);

    const isButtonDisabled = loading.preset || loading.publishing;

    return (
        <PMContainer>
            <HiddenFileInput
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleLoadFromFile}
            />

            <PMInputSelectGroup>
                <PMGroup>
                    <PMTextInput
                        placeholder="Имя пресета"
                        value={presetName}
                        onChange={(e) => {
                            setPresetName(e.target.value);
                            setPublishError('');
                        }}
                        disabled={isButtonDisabled}
                    />
                    {publishError && <PMLabel $error>{publishError}</PMLabel>}
                </PMGroup>

                <PMGroup>
                    <PMSelect
                        options={presetOptions}
                        value={selectedPresetOption}
                        onChange={handleSelectPreset}
                        isDisabled={loading.list || isButtonDisabled}
                        placeholder={
                            loading.list ? 'Загрузка...' : 'Выберите пресет'
                        }
                    />
                </PMGroup>
            </PMInputSelectGroup>

            {loading.preset && <PMLabel>Применение...</PMLabel>}

            <PMButtonsGroup>
                <PMButton
                    onClick={handleSaveToFile}
                    disabled={isButtonDisabled}
                    title="Сохранить в файл"
                >
                    <TbDownload />
                </PMButton>

                <PMButton
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isButtonDisabled}
                    title="Загрузить из файла"
                >
                    <TbUpload />
                </PMButton>

                <PMButton
                    onClick={handlePublish}
                    disabled={isButtonDisabled}
                    title="Опубликовать на сервере"
                >
                    <TbCloudUpload />
                </PMButton>

                <PMButton
                    onClick={fetchServerPresets}
                    disabled={loading.list || isButtonDisabled}
                    title="Обновить список пресетов"
                >
                    <TbRefresh />
                </PMButton>

                <PMButton
                    onClick={handleReset}
                    disabled={isButtonDisabled}
                    title="Сбросить к настройкам по умолчанию"
                >
                    <TbRotateClockwise />
                </PMButton>
            </PMButtonsGroup>
        </PMContainer>
    );
}
