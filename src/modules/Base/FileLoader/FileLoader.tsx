import { IFileLoader } from 'FileLoader/IFileLoader';
import { FileLoaderType } from 'FileLoader/constants';
import { useState } from 'react';

/**
 * @link FileLoader/FileLoader
 * @description Кнопка загрузки файла
 */
export default function FileLoader({
  type = FileLoaderType.BUTTON,
  loadCallback,
  progressCallback,
  multiSelect = false,
}: IFileLoader) {
  const [isDropEnter, setIsDropEnter] = useState(false);
  const fileTypes = {
    img: ['jpg', 'jpeg', 'png', 'gif'],
    text: ['txt'],
  };

  /**
   * Обработка выбранных файлов
   * @param loadFiles
   */
  const loadFile = (loadFiles: FileList) => {
    Array.from(loadFiles).forEach((file, index) => {
      let reader = new FileReader();
      const id = ++index;
      const [name, ext] = file.name.split('.');
      const fileData = {
        id,
        name,
        ext,
        type: file.type,
        createDate: file.lastModified,
        size: file.size,
        progress: '0%',
        data: null,
        error: null,
      };

      const cleanExt = ext.toLowerCase();
      if (false && fileTypes.img.includes(cleanExt)) {
        reader.readAsDataURL(file);
      } else if (false && fileTypes.text.includes(cleanExt)) {
        reader.readAsText(file);
        reader.addEventListener;
      } else {
        reader.readAsArrayBuffer(file);
      }

      reader.onprogress = function (e: ProgressEvent) {
        const { total, loaded } = e;
        fileData.progress = `${(loaded / total) * 100}%`;
        progressCallback ? progressCallback(fileData) : null;
        return;
      };

      reader.onload = function () {
        fileData.data = reader.result;
        loadCallback ? loadCallback(fileData) : null;
      };

      reader.onerror = function () {
        fileData.error = reader.error;
        loadCallback ? loadCallback(fileData) : null;
      };
    });
  };

  /**
   * Стиль кнопки
   */
  const style = {
    dropArea: {
      height: '100%',
      width: '100%',
      display: 'flex',
      minHeight: 30,
      minWidth: 30,
      border: `1px ${isDropEnter ? 'dashed' : 'solid'}`,
      borderRadius: 4,
      alignItems: 'center',
      background: isDropEnter
        ? 'var(--light_grey_background_color)'
        : 'var(--default_background_color)',
      padding: 6,
      justifyContent: 'center',
      userSelect: 'none',
    },
    button: {
      background: 'white',
      padding: 6,
      borderRadius: '50%',
    },
  };

  /**
   * Событие выбора файлов кнопки input
   * @param e
   */
  const onChange = (e: InputEvent) => {
    loadFile((e.target as HTMLInputElement).files);
  };

  /**
   * Событие по дефолту
   * @param e
   */
  const preventDefault = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Событие выбора файлов dropArea
   * @param e
   */
  const onDrop = (e: DragEvent) => {
    preventDefault(e);
    setIsDropEnter(false);
    loadFile(e.dataTransfer.files);
  };

  return (
    <section
      className={`fileLoader__type-${type}`}
      style={type === FileLoaderType.BUTTON ? style.button : {}}
    >
      {type === FileLoaderType.BUTTON ? (
        <>
          <label className="ti-upload cursorPointer" htmlFor="fileLoad" />
          <input
            className="displayNone"
            type="file"
            id="fileLoad"
            onChange={onChange}
            multiple={multiSelect}
          />
        </>
      ) : (
        <div
          style={style.dropArea}
          onDragEnter={() => setIsDropEnter(true)}
          onDragLeave={() => setIsDropEnter(false)}
          onDragOver={(e) => preventDefault(e)}
          onDrop={onDrop}
        >
          DropArea
        </div>
      )}
    </section>
  );
}
