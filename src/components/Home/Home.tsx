import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import './Home.style.scss';

export const convertGigaByteInMegaByte = (data: number): number => {
  return data * 1024;
};

const Home: FC = () => {
  const maxFileSize: number = Number(process.env.REACT_APP_MAXIMUM_FILE);
  return (
    <div className={'home__content'}>
      <div className={'home__title'}>
        <h1 className={'title'}>
          <FormattedMessage id={'home.title'} />
        </h1>
      </div>
      <div className={'home__text text'}>
        <p>
          <strong>
            <FormattedMessage id={'home.text.service'} />
          </strong>{' '}
          - <FormattedMessage id={'home.text.service.explanation'} />
        </p>
        <p>
          <strong>
            <FormattedMessage id={'home.text.administration'} />
          </strong>{' '}
          - <FormattedMessage id={'home.text.administration.explanation'} />
        </p>
        <p>
          <strong>
            <FormattedMessage id={'home.text.visitor'} />
          </strong>{' '}
          - <FormattedMessage id={'home.text.visitor.explanation'} />
        </p>
        <p>
          <strong>
            <FormattedMessage id={'home.text.user'} />
          </strong>{' '}
          - <FormattedMessage id={'home.text.user.explanation'} />
        </p>
        <p>
          <strong>
            <FormattedMessage id={'home.text.personalFile'} />
          </strong>{' '}
          - <FormattedMessage id={'home.text.personalFile.explanation'} />
        </p>
        <p>
          <strong>
            <FormattedMessage id={'home.text.publicFile'} />
          </strong>{' '}
          - <FormattedMessage id={'home.text.publicFile.explanation'} />
        </p>
      </div>
      <div className={'home__list text'}>
        <ul>
          <li>
            <strong>
              <FormattedMessage id={'home.text.list.title.terms'} />
            </strong>
            <ul>
              <li>
                <FormattedMessage id={'home.text.list.item.service'} />
              </li>
              <li>
                <FormattedMessage
                  id={'home.text.list.item.maximumFile'}
                  values={{
                    dataInGB: maxFileSize,
                    dataInMB: convertGigaByteInMegaByte(maxFileSize),
                  }}
                />
              </li>
              <li>
                <FormattedMessage
                  id={'home.text.list.item.shelfLifeFiles'}></FormattedMessage>
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.servicesProvided'} />
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.currentRules'} />
              </li>
            </ul>
          </li>
          <li>
            <strong>
              <FormattedMessage id={'home.text.list.title.files'} />
            </strong>
            <ul>
              <li>
                <FormattedMessage id={'home.text.list.item.country'} />
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.filesPromoting'} />
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.maliciousFiles'} />
              </li>
            </ul>
          </li>
          <li>
            <strong>
              <FormattedMessage id={'home.text.list.title.publicFiles'} />
            </strong>
            <ul>
              <li>
                <FormattedMessage id={'home.text.list.item.deceiveVisitors'} />
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.content'} />
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.password'} />
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.sources'} />
              </li>
              <li>
                <FormattedMessage
                  id={'home.text.list.item.promotion'}></FormattedMessage>
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.eroContent'} />
              </li>
            </ul>
          </li>
          <li>
            <strong>
              <FormattedMessage id={'home.text.list.title.responsibility'} />
            </strong>
            <ul>
              <li>
                <FormattedMessage id={'home.text.list.item.fullyResponsible'} />
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.consequences'} />
              </li>
              <li>
                <FormattedMessage
                  id={'home.text.list.item.administrationAndServices'}
                />
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.anyVisitor'} />
              </li>
              <li>
                <FormattedMessage
                  id={'home.text.list.item.administrationDeleteFilesForReasons'}
                />
              </li>
              <li>
                <FormattedMessage
                  id={'home.text.list.item.administrationDeleteFiles'}
                />
              </li>
              <li>
                <FormattedMessage
                  id={'home.text.list.item.administrationDeleteFilesRules'}
                />
              </li>
              <li>
                <FormattedMessage
                  id={'home.text.list.item.administrationSendInformation'}
                />
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.usersRules'} />
              </li>
              <li>
                <FormattedMessage id={'home.text.list.item.allDeletedFiles'} />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
