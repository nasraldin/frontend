/*
=============================================================================
Copyright 2022 Nasr Aldin. All Rights Reserved.
Project: Online Rent @frontend
The use of this source code is governed by Nasr Aldin.
See LICENSE in the project root for license information.
=============================================================================
*/

import Json from '~/data/console-alert.json';
import { DEFAULT_LOCALE } from '~/i18n';
import { isBrowser } from '~/utils/env';
import { isArabic } from '~/utils/helpers';

const HANDSHAKE = String.fromCodePoint(0x1f91d);
const MAG = String.fromCodePoint(0x1f50e);
const ROCKET = String.fromCodePoint(0x1f680);

(() => {
  if (!isBrowser) return;

  const docLang = (document.documentElement.lang as AppLocale) || DEFAULT_LOCALE;

  const {
    title,
    helloMessage,
    supportTicket,
    feedbackLink,
    joinUs,
    selfXssTitle,
    selfXss,
  } = Json[docLang];

  const formatMessage = isArabic(docLang)
    ? [
        `${supportTicket} ${MAG}`,
        `${feedbackLink} ${HANDSHAKE}`,
        `${joinUs} ${ROCKET}`,
      ]
    : [
        `${MAG} ${supportTicket}`,
        `${HANDSHAKE} ${feedbackLink}`,
        `${ROCKET} ${joinUs}`,
      ];

  console.log(
    '%c%s\n\n%c%s\n\n%s\n%s\n%s',
    'font-size: 18px;',
    title,
    'font-size: 13px;',
    helloMessage,
    ...formatMessage,
  );

  console.log(
    '\n%c%s\n%c%s',
    'background: yellow; color: black; font-size: 20px;',
    selfXssTitle,
    'font-size: 18px;',
    selfXss,
  );
})();

export {};
