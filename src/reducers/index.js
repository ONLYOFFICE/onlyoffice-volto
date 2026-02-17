/**
 * Copyright (c) Ascensio System SIA 2025
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
import { get as onlyofficeConfig } from './config/get';
import { convert as onlyofficeConvert } from './files/convert';
import { create as onlyofficeCreate } from './files/create';
import { get as onlyofficePermissions } from './permissions/get';
import { forms as onlyofficeForms } from './settings/forms';
import { save as onlyofficeSave } from './settings/save';

const reducers = {
  onlyofficeConfig,
  onlyofficeConvert,
  onlyofficeCreate,
  onlyofficePermissions,
  onlyofficeForms,
  onlyofficeSave,
};

export default reducers;
