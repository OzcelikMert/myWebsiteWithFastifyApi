import { IncomingMessage, ServerResponse } from 'http';
import { setCookie } from 'cookies-next';

const setLangId = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  setCookie('langId', req.appData.selectedLangId, {
    req,
    res,
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    path: '/',
  });
};

const deleteLangId = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  setCookie('langId', null, { req, res, maxAge: 0, httpOnly: true, path: '/' });
};

export const CookieSSRUtil = {
  setLangId: setLangId,
  deleteLangId: deleteLangId,
};
