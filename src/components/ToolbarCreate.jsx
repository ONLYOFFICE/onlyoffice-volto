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
import { Plug } from '@plone/volto/components/manage/Pluggable';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import onlyofficeCreate from '@onlyoffice/volto/icons/onlyoffice-create.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  onlyofficeCreateTitle: {
    defaultMessage: 'Create with ONLYOFFICE',
    id: 'onlyoffice_create_title',
  },
});

const ToolbarCreate = (props) => {
  const { token } = props;
  const intl = useIntl();

  if (!__CLIENT__ || (__CLIENT__ && !token)) {
    return null;
  }

  let cb = null;
  return (
    <>
      <Plug pluggable="main.toolbar.bottom" id="onlyoffice-menu-blank">
        {({ onClickHandler }) => {
          cb = onClickHandler;
        }}
      </Plug>
      <Plug pluggable="main.toolbar.top" id="onlyoffice-menu">
        {() => {
          return (
            <button
              className="show-onlyoffice-toolbar-menu"
              aria-label={intl.formatMessage(messages.onlyofficeCreateTitle)}
              onClick={(e) => cb(e, 'onlyofficeToolbarMenu')}
              tabIndex={0}
              id="show-onlyoffice-toolbar-menu"
            >
              <Icon
                name={onlyofficeCreate}
                size="30px"
                title={intl.formatMessage(messages.onlyofficeCreateTitle)}
              />
            </button>
          );
        }}
      </Plug>
    </>
  );
};

ToolbarCreate.propTypes = {
  token: PropTypes.string,
};

export default ToolbarCreate;
