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
import { Field } from '@plone/volto/components/manage/Form';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import clearSVG from '@plone/volto/icons/clear.svg';
import saveSVG from '@plone/volto/icons/save.svg';
import find from 'lodash/find';
import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Checkbox,
  Container,
  Form,
  Grid,
  Segment,
} from 'semantic-ui-react';

import {
  getForms,
  resetFormsState,
  resetSaveState,
  saveSettings,
} from '../../actions';

const messages = defineMessages({
  onlyofficeConfigurationCancel: {
    defaultMessage: 'Cancel',
    id: 'onlyoffice_configuration_cancel',
  },
  onlyofficeConfigurationConfigTitle: {
    defaultMessage: 'ONLYOFFICE Configuration',
    id: 'onlyoffice_configuration_config_title',
  },
  onlyofficeConfigurationSave: {
    defaultMessage: 'Save',
    id: 'onlyoffice_configuration_save',
  },
  onlyofficeConfigurationSuccessMessage: {
    defaultMessage: 'Settings successfully saved',
    id: 'onlyoffice_configuration_success_message',
  },
});

const OnlyofficeConfiguration = ({ intl }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);
  const [docUrl, setDocUrl] = useState('http://documentserver/');
  const [demoEnabled, setDemoEnabled] = useState(false);
  const [jwtSecret, setJwtSecret] = useState('');
  const [ploneUrl, setPloneUrl] = useState('');
  const [docInnerUrl, setDocInnerUrl] = useState('');
  const [forms, setForms] = useState(null);

  const onlyofficeSave = useSelector((state) => state.onlyofficeSave);
  const onlyofficeForms = useSelector((state) => state.onlyofficeForms);
  const token = useSelector((state) => state.userSession?.token);
  const actions = useSelector((state) => state.actions?.actions ?? {});
  const ploneSetupAction = find(actions.user, { id: 'plone_setup' });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      dispatch(resetSaveState());
      dispatch(getForms());
      return () => {
        dispatch(resetSaveState());
        dispatch(resetFormsState());
      };
    }
  }, [dispatch, isClient]);

  useEffect(() => {
    if (onlyofficeForms.loaded) {
      const { items } = onlyofficeForms.nutsnames;
      const formValues = {
        demoEnabled:
          find(items, { name: 'onlyoffice.plone.demoEnabled' })?.value || false,
        docInnerUrl:
          find(items, { name: 'onlyoffice.plone.docInnerUrl' })?.value || '',
        docUrl: find(items, { name: 'onlyoffice.plone.docUrl' })?.value || '',
        jwtSecret:
          find(items, { name: 'onlyoffice.plone.jwtSecret' })?.value || '',
        ploneUrl:
          find(items, { name: 'onlyoffice.plone.ploneUrl' })?.value || '',
      };

      setDocUrl(formValues.docUrl);
      setDemoEnabled(formValues.demoEnabled);
      setJwtSecret(formValues.jwtSecret);
      setPloneUrl(formValues.ploneUrl);
      setDocInnerUrl(formValues.docInnerUrl);
      setForms(onlyofficeForms.nutsnames.items);
    }
  }, [onlyofficeForms]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        saveSettings(docUrl, demoEnabled, jwtSecret, ploneUrl, docInnerUrl),
      );
    },
    [dispatch, docUrl, demoEnabled, jwtSecret, ploneUrl, docInnerUrl],
  );

  useEffect(() => {
    if (onlyofficeSave.error) {
      toast.error(
        <Toast
          error
          title={onlyofficeSave.error.message}
          content={onlyofficeSave.error.response?.body?.message || ''}
        />,
      );
    }
    if (onlyofficeSave.loaded) {
      toast.success(
        <Toast
          success
          title={intl.formatMessage(
            messages.onlyofficeConfigurationSuccessMessage,
          )}
        />,
      );
    }
  }, [onlyofficeSave, intl]);

  if (!isClient || !token || !ploneSetupAction) {
    return <Unauthorized />;
  }

  if (!onlyofficeForms) {
    return <></>;
  }

  return (
    <>
      <Helmet
        title={intl.formatMessage(messages.onlyofficeConfigurationConfigTitle)}
      />
      <Container>
        <Segment.Group raised>
          <Segment>
            <Segment className="primary">
              <FormattedMessage
                {...messages.onlyofficeConfigurationConfigTitle}
              />
            </Segment>
            <br />
            {forms && (
              <Form>
                <Grid>
                  <Grid.Row stretched>
                    <Grid.Column>
                      <Field
                        disabled={demoEnabled}
                        id="doc-url"
                        title={
                          find(forms, { name: 'onlyoffice.plone.docUrl' })
                            ?.schema?.properties?.title
                        }
                        value={docUrl}
                        required
                        onChange={(_, v) => setDocUrl(v)}
                      />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row stretched>
                    <Grid.Column>
                      <Field
                        disabled={demoEnabled}
                        id="jwt-secret"
                        title={
                          find(forms, { name: 'onlyoffice.plone.jwtSecret' })
                            ?.schema?.properties?.title
                        }
                        value={jwtSecret}
                        onChange={(_, v) => setJwtSecret(v)}
                      />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row stretched>
                    <Grid.Column>
                      <Field
                        id="doc-inner-url"
                        title={
                          find(forms, { name: 'onlyoffice.plone.docInnerUrl' })
                            ?.schema?.properties?.title
                        }
                        value={docInnerUrl}
                        required
                        onChange={(_, v) => setDocInnerUrl(v)}
                      />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row stretched>
                    <Grid.Column>
                      <Field
                        disabled={demoEnabled}
                        id="plone-url"
                        title={
                          find(forms, { name: 'onlyoffice.plone.ploneUrl' })
                            ?.schema?.properties?.title
                        }
                        value={ploneUrl}
                        required
                        onChange={(_, v) => setPloneUrl(v)}
                      />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row stretched>
                    <Grid.Column>
                      <Segment attached>
                        <Form.Field>
                          <Checkbox
                            id="demo-enabled"
                            name="demo-enabled"
                            label={
                              <label htmlFor="demo-enabled">
                                {
                                  find(forms, {
                                    name: 'onlyoffice.plone.demoEnabled',
                                  })?.schema?.properties?.title
                                }
                              </label>
                            }
                            onChange={(_, { checked }) =>
                              setDemoEnabled(checked)
                            }
                            checked={demoEnabled}
                          />
                        </Form.Field>
                        <p className="help">
                          {
                            find(forms, {
                              name: 'onlyoffice.plone.demoEnabled',
                            })?.schema?.properties?.description
                          }
                        </p>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            )}
            <br />
          </Segment>
        </Segment.Group>
      </Container>

      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Button
                  id="toolbar-save"
                  className="save"
                  onClick={onSubmit}
                  loading={onlyofficeSave.loading}
                  aria-label={intl.formatMessage(
                    messages.onlyofficeConfigurationSave,
                  )}
                >
                  <Icon
                    name={saveSVG}
                    className="circled"
                    size="30px"
                    title={intl.formatMessage(
                      messages.onlyofficeConfigurationSave,
                    )}
                  />
                </Button>
                <Link to="/controlpanel" className="cancel">
                  <Icon
                    name={clearSVG}
                    className="circled"
                    size="30px"
                    title={intl.formatMessage(
                      messages.onlyofficeConfigurationCancel,
                    )}
                  />
                </Link>
              </>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </>
  );
};

export default injectIntl(OnlyofficeConfiguration);
