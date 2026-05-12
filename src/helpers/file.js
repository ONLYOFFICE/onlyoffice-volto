/**
 * Copyright (c) Ascensio System SIA 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import formatsData from './onlyoffice-docs-formats.json';

export const getDefaultExtByType = (str) => {
  if (str === 'word') {
    return 'docx';
  }
  if (str === 'cell') {
    return 'xlsx';
  }
  if (str === 'slide') {
    return 'pptx';
  }
  if (str === 'form') {
    return 'docxf';
  }
  return null;
};

export const getDefaultNameByType = (str) => {
  if (str === 'word') {
    return 'Document';
  }
  if (str === 'cell') {
    return 'Spreadsheet';
  }
  if (str === 'slide') {
    return 'Presentation';
  }
  if (str === 'form') {
    return 'PDF form';
  }
  return null;
};

export const getSupportedFormats = () => {
  const supportedFormats = formatsData
    .filter(
      (format) =>
        format.actions?.includes('view') || format.actions?.includes('edit'),
    )
    .map((format) => format.name);
  return `*(${supportedFormats.join('|')})`;
};

export const getFormatsWithConvertOptions = () => {
  const formatsWithConvert = formatsData
    .filter((format) => format.convert && format.convert.length > 0)
    .map((format) => format.name);

  return formatsWithConvert.length > 0
    ? `*(${formatsWithConvert.join('|')})`
    : '';
};

export const getConvertOptionsForFormat = (formatName) => {
  const format = formatsData.find((item) => item.name === formatName);
  return format?.convert || [];
};
