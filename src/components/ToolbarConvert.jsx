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
import onlyofficeConvertSVG from 'onlyoffice-volto/icons/onlyoffice-convert.svg';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Header,
  Message,
  Modal,
  Dimmer,
  Loader,
  Form,
} from 'semantic-ui-react';
import { convertFile, resetConvertedFileState } from '../actions';
import { getConvertOptionsForFormat } from '../helpers';
import { Field } from '@plone/volto/components/manage/Form';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  onlyofficeConvertTitle: {
    defaultMessage: 'Convert with ONLYOFFICE',
    id: 'onlyoffice_convert_title',
  },
  onlyofficeConvertTypeDescription: {
    defaultMessage: 'Select file type you want to download',
    id: 'onlyoffice_convert_type_description',
  },
  onlyofficeConvertTypeTitle: {
    defaultMessage: 'Target type:',
    id: 'onlyoffice_convert_type_title',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

const ToolbarConvert = ({ token }) => {
  const { pathname } = useLocation();
  const intl = useIntl();
  const dispatch = useDispatch();

  const [convertModalOpen, setConvertModalOpen] = useState(false);
  const [convertError, setConvertError] = useState(null);
  const [convertFormats, setConvertFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [field, setField] = useState({});

  const onlyofficeConvert = useSelector((state) => state.onlyofficeConvert);
  const data = useSelector((state) => state.content.data);

  useEffect(() => {
    if (__CLIENT__) {
      dispatch(resetConvertedFileState());
      setConvertError(null);
      return () => {
        dispatch(resetConvertedFileState());
        setConvertError(null);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, __CLIENT__]);

  useEffect(() => {
    if (data?.id) {
      const formatName = data.id.split('.').pop().toLowerCase();
      const formats = getConvertOptionsForFormat(formatName);
      setConvertFormats((prev) => {
        if (
          prev.length !== formats.length ||
          prev.some((val, i) => val !== formats[i])
        ) {
          return formats;
        }
        return prev;
      });
    } else {
      setConvertFormats([]);
    }
  }, [data?.id]);

  useEffect(() => {
    if (onlyofficeConvert.loaded && onlyofficeConvert.nutsnames) {
      const result = JSON.parse(onlyofficeConvert.nutsnames);

      if (result.error) {
        setConvertError(result.error);
      } else if (result.fileUrl) {
        const link = document.createElement('a');
        link.href = result.fileUrl;
        link.setAttribute('download', '');
        link.click();
        link.remove();
        setConvertModalOpen(false);
      }
    }
  }, [onlyofficeConvert]);

  useEffect(() => {
    setField({
      ...{
        choices: convertFormats.map((type) => [type, type]),
        title: intl.formatMessage(messages.onlyofficeConvertTypeTitle),
        type: 'string',
      },
      id: 'targetType',
      value: selectedFormat,
      onChange: (id, value) => {
        setSelectedFormat(value);
      },
    });
  }, [intl, convertFormats, selectedFormat]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(convertFile(pathname, selectedFormat));
  };

  if (!__CLIENT__ || (__CLIENT__ && !token)) {
    return null;
  }

  const onCancel = () => setConvertModalOpen(false);

  return (
    <>
      <Plug
        pluggable="main.toolbar.top"
        id="toolbar-onlyoffice-convert"
        order={99}
      >
        <div className=" toolbar-onlyoffice-convert">
          <Button
            basic
            onClick={() => setConvertModalOpen(true)}
            aria-label={intl.formatMessage(messages.onlyofficeConvertTitle)}
          >
            <Icon
              name={onlyofficeConvertSVG}
              size="30px"
              title={intl.formatMessage(messages.onlyofficeConvertTitle)}
            />
          </Button>
        </div>
      </Plug>

      {convertModalOpen && convertFormats.length > 0 && (
        <Modal open={convertModalOpen}>
          <Header>{intl.formatMessage(messages.onlyofficeConvertTitle)}</Header>
          <Dimmer active={onlyofficeConvert.loading}>
            <Loader>
              {<FormattedMessage id="Loading" defaultMessage="Loading." />}
            </Loader>
          </Dimmer>
          <Modal.Content scrolling style={{ height: '100vh' }}>
            <Form onSubmit={onSubmit} error={Boolean(convertError)}>
              {convertError ? (
                <Message error>
                  <FormattedMessage
                    id="There were some errors."
                    defaultMessage="There were some errors."
                  />
                  <div>{convertError}</div>
                </Message>
              ) : (
                <> </>
              )}
              <div class="inline field help field-wrapper-targetType">
                <div class="ui grid">
                  <div class="stretched row">
                    <div class="stretched twelve wide column">
                      <p>
                        {intl.formatMessage(
                          messages.onlyofficeConvertTypeDescription,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Field {...field} key={field.id} />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              circular
              primary
              floated="right"
              aria-label={intl.formatMessage(messages.save)}
              title={intl.formatMessage(messages.save)}
              onClick={onSubmit}
              loading={onlyofficeConvert.loading}
              disabled={!selectedFormat}
            >
              <Icon name={aheadSVG} className="contents circled" size="30px" />
            </Button>
            {onCancel && (
              <Button
                type="button"
                basic
                circular
                secondary
                aria-label={intl.formatMessage(messages.cancel)}
                title={intl.formatMessage(messages.cancel)}
                floated="right"
                onClick={onCancel}
              >
                <Icon name={clearSVG} className="circled" size="30px" />
              </Button>
            )}
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
};

ToolbarConvert.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ToolbarConvert;
