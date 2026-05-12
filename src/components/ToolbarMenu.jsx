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
import map from 'lodash/map';
import React, { useCallback, useEffect } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { createFile, resetCreatedFileState } from '../actions';
import { getDefaultNameByType } from '../helpers';

const messages = defineMessages({
  onlyofficeMenuCell: {
    defaultMessage: 'Spreadsheet',
    id: 'onlyoffice_menu_cell',
  },
  onlyofficeMenuForm: {
    defaultMessage: 'PDF form',
    id: 'onlyoffice_menu_pdf',
  },
  onlyofficeMenuSlide: {
    defaultMessage: 'Presentation',
    id: 'onlyoffice_menu_slide',
  },
  onlyofficeMenuWord: {
    defaultMessage: 'Document',
    id: 'onlyoffice_menu_word',
  },
});

const DOCUMENT_TYPES = ['Word', 'Cell', 'Slide', 'Form'];

const ToolbarMenu = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const intl = useIntl();
  const onlyofficeSave = useSelector((state) => state.onlyofficeCreate);
  const token = useSelector((state) => state.userSession.token);
  const folderUID = useSelector((state) => state.content.data.UID);

  const onClick = useCallback(
    (e, documentType) => {
      e.preventDefault();
      dispatch(createFile(documentType, folderUID));
    },
    [dispatch, folderUID],
  );

  useEffect(() => {
    if (__CLIENT__) {
      dispatch(resetCreatedFileState());
      return () => {
        dispatch(resetCreatedFileState());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pathname, __CLIENT__]);

  if (!__CLIENT__ || (__CLIENT__ && !token)) {
    return null;
  }

  if (onlyofficeSave.nutsnames?.absolute_url_path) {
    return (
      <Redirect
        to={`${onlyofficeSave.nutsnames?.absolute_url_path}/onlyoffice-edit`}
      />
    );
  }

  return (
    <div className="menu-more pastanaga-menu">
      <header>
        <FormattedMessage
          id="onlyoffice_menu_title"
          defaultMessage="Create with ONLYOFFICE"
        />
      </header>
      <div className="pastanaga-menu-list">
        <ul>
          {map(DOCUMENT_TYPES, (documentType) => {
            const t = documentType.toLowerCase();
            // eslint-disable-next-line no-unused-vars
            const name = getDefaultNameByType(t);
            return (
              <li key={`onlyoffice-list-item-${t}`}>
                <Link
                  to="#"
                  id={`onlyoffice-link-${t}`}
                  className="item"
                  key={`onlyoffice-link-${t}`}
                >
                  <Button
                    disabled={onlyofficeSave.loading}
                    id="toolbar-save"
                    className="save"
                    onClick={(e) => onClick(e, t)}
                  >
                    {intl.formatMessage(
                      messages['onlyofficeMenu' + documentType],
                    )}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ToolbarMenu;
