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
import { ONLYOFFICE_VOLTO_FILES_CREATE } from '../../constants/ActionTypes';

export function createFile(documentType, folderUID) {
  return {
    request: {
      data: {
        documentType,
        folderUID,
      },
      op: 'post',
      path: '/@onlyoffice-volto-create-file',
    },
    type: ONLYOFFICE_VOLTO_FILES_CREATE,
  };
}

export function resetCreatedFileState() {
  return {
    type: ONLYOFFICE_VOLTO_FILES_CREATE + '_RESET',
  };
}
