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
import { ONLYOFFICE_VOLTO_SETTINGS_SAVE } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  nutsnames: {},
};

export const save = (state = initialState, action = {}) => {
  switch (action?.type) {
    case `${ONLYOFFICE_VOLTO_SETTINGS_SAVE}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };

    case `${ONLYOFFICE_VOLTO_SETTINGS_SAVE}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };

    case `${ONLYOFFICE_VOLTO_SETTINGS_SAVE}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        nutsnames: action.result,
      };

    case `${ONLYOFFICE_VOLTO_SETTINGS_SAVE}_RESET`:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
