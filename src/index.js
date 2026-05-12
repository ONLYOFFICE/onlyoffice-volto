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

import {
  OnlyofficeConfiguration,
  OnlyofficeEditor,
  ToolbarActions,
  ToolbarConvert,
  ToolbarCreate,
  ToolbarMenu,
  ToolbarOpen,
} from './components';
import { getFormatsWithConvertOptions, getSupportedFormats } from './helpers';
import onlyofficeControlpanel from '@onlyoffice/volto/icons/onlyoffice-controlpanel.svg';
import reducers from './reducers';

const applyConfig = (config) => {
  config.settings.supportedLanguages = [
    'de',
    'en',
    'es',
    'fr',
    'it',
    'ja',
    'nl',
    'pt',
    'ru',
    'zh_CN',
  ];
  config.settings.isMultilingual = false;

  config.addonReducers = {
    ...(config.addonReducers || []),
    ...reducers,
  };

  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      component: ToolbarCreate,
      match: '*/contents',
    },
    {
      component: ToolbarOpen,
      match: {
        exact: true,
        path: getSupportedFormats(),
        strict: false,
      },
    },
    {
      component: ToolbarConvert,
      match: {
        exact: true,
        path: getFormatsWithConvertOptions(),
        strict: false,
      },
    },
  ];

  config.settings.additionalToolbarComponents = {
    onlyofficeToolbarMenu: {
      component: ToolbarMenu,
      wrapper: null,
    },
    onlyofficeToolbarActions: {
      component: ToolbarActions,
      wrapper: null,
    },
  };

  config.settings.controlpanels = [
    ...(config.settings.controlpanels || []),
    {
      '@id': '/onlyoffice-configuration',
      group: 'Add-on Configuration',
      title: 'ONLYOFFICE Configuration',
    },
  ];

  config.settings.controlPanelsIcons['onlyoffice-configuration'] =
    onlyofficeControlpanel;

  config.addonRoutes = [
    ...config.addonRoutes,
    {
      component: OnlyofficeConfiguration,
      path: '/controlpanel/onlyoffice-configuration',
    },
    {
      component: OnlyofficeEditor,
      path: '*/onlyoffice-view',
    },
    {
      component: OnlyofficeEditor,
      path: '*/onlyoffice-edit',
    },
    {
      component: OnlyofficeEditor,
      path: '*/onlyoffice-review',
    },
    {
      component: OnlyofficeEditor,
      path: '*/onlyoffice-fill',
    },
  ];

  return config;
};

export default applyConfig;
