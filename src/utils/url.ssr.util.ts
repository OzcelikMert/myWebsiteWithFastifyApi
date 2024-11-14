import { IncomingMessage, ServerResponse } from 'http';
import absoluteUrl from 'next-absolute-url';
import { IGetURL } from 'types/pageProps';

const get = (req: IncomingMessage): IGetURL => {
  const paths = absoluteUrl(req);

  return {
    full: `${paths.protocol}//${paths.host}${req.url !== '/' ? `${req.url}` : ''}`.replace(
      /\/$/,
      ''
    ),
    base: `${paths.protocol}//${paths.host}`,
    asPath: req.url !== '/' ? `${req.url}` : '',
  };
};

const move = (res: ServerResponse<IncomingMessage>, newURL: string) => {
  res.writeHead(302, {
    Location: newURL,
  });
  return res.end();
};

export const UrlSSRUtil = {
  get: get,
  move: move,
};
