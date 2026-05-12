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
import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { getPermissions, resetPermissionsState } from '../actions';

const messages = defineMessages({
  onlyofficeOpenTitle: {
    defaultMessage: 'Open with ONLYOFFICE',
    id: 'onlyoffice_open_title',
  },
  onlyofficeViewTitle: {
    defaultMessage: 'View with ONLYOFFICE',
    id: 'onlyoffice_view_title',
  },
  onlyofficeEditTitle: {
    defaultMessage: 'Edit with ONLYOFFICE',
    id: 'onlyoffice_edit_title',
  },
  onlyofficeReviewTitle: {
    defaultMessage: 'Review with ONLYOFFICE',
    id: 'onlyoffice_review_title',
  },
  onlyofficeFillTitle: {
    defaultMessage: 'Fill with ONLYOFFICE',
    id: 'onlyoffice_fill_title',
  },
});

const ToolbarActions = () => {
  const { pathname } = useLocation();
  const intl = useIntl();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userSession.token);
  const [isClient, setIsClient] = useState(false);
  const permissions = useSelector(
    (state) => state.onlyofficePermissions.permissions,
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const path = pathname.replace(/\/onlyoffice-(edit|review|view|fill)$/, '');
    if (isClient) {
      dispatch(getPermissions(path));
      return () => {
        dispatch(resetPermissionsState());
      };
    }
  }, [dispatch, isClient, pathname]);

  if (!__CLIENT__ || (__CLIENT__ && !token)) {
    return null;
  }

  const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  return (
    <div className="menu-more pastanaga-menu">
      <header>{intl.formatMessage(messages.onlyofficeOpenTitle)}</header>
      <div className="pastanaga-menu-list">
        <ul>
          {permissions.can_view && (
            <li key={`onlyoffice-list-item-view`}>
              <Link to={`${path}/onlyoffice-view`}>
                {intl.formatMessage(messages.onlyofficeViewTitle)}
              </Link>
            </li>
          )}
          {permissions.can_edit && (
            <li key={`onlyoffice-list-item-edit`}>
              <Link to={`${path}/onlyoffice-edit`}>
                {intl.formatMessage(messages.onlyofficeEditTitle)}
              </Link>
            </li>
          )}
          {permissions.can_review && (
            <li key={`onlyoffice-list-item-review`}>
              <Link to={`${path}/onlyoffice-review`}>
                {intl.formatMessage(messages.onlyofficeReviewTitle)}
              </Link>
            </li>
          )}
          {permissions.can_fill && (
            <li key={`onlyoffice-list-item-fill`}>
              <Link to={`${path}/onlyoffice-fill`}>
                {intl.formatMessage(messages.onlyofficeFillTitle)}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ToolbarActions;
