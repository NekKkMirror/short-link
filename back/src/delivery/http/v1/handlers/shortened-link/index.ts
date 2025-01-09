import Express from 'express';

import { DeliveryParams } from '@/delivery/types';
import { IHandler } from '@/delivery/http/v1/handlers/types';
import { createRouteHandler } from '@/delivery/http/v1/route-handler';
import { createShortenLinkRules } from '@/delivery/http/v1/handlers/shortened-link/rules';
import { shortUrlParamRule } from '@/delivery/http/v1/handlers/_common/rules/shortened-link';

import { buildRedirect, Redirect } from './redirect';
import { buildInfo, Info } from './info';
import { buildDelete, Delete } from './delete';
import { buildCreate, Create } from './create';

type Params = Pick<DeliveryParams, 'shortenedLink'>;

export type ShortenedLinkMethods = {
  create: Create;
  redirect: Redirect;
  info: Info;
  delete: Delete;
};

const buildRegisterRoutes = (methods: ShortenedLinkMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /shortened-link:
     *   post:
     *     tags: [Shortened Links]
     *     summary: Create a shortened URL
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/createShortenLink'
     *     responses:
     *       201:
     *         description: Shortened URL created
     */
    namespace.post('', createShortenLinkRules, createRouteHandler(methods.create));

    /**
     * @openapi
     * /shortened-link/{shortUrl}:
     *   get:
     *     tags: [Shortened Links]
     *     summary: Redirect to the original URL
     *     parameters:
     *       - in: path
     *         name: shortUrl
     *         required: true
     *         schema:
     *           $ref: '#/components/rules/shortUrlParam'
     *     responses:
     *       302:
     *         description: Redirect to the original URL
     *       404:
     *         description: Link not found
     */
    namespace.get('/:shortUrl', shortUrlParamRule, createRouteHandler(methods.redirect));

    /**
     * @openapi
     * /shortened-link/info/{shortUrl}:
     *   get:
     *     tags: [Shortened Links]
     *     summary: Get information about a shortened URL
     *     parameters:
     *       - in: path
     *         name: shortUrl
     *         required: true
     *         schema:
     *           $ref: '#/components/rules/shortUrlParam'
     *     responses:
     *       200:
     *         description: Shortened URL information retrieved
     */
    namespace.get('/info/:shortUrl', shortUrlParamRule, createRouteHandler(methods.info));

    /**
     * @openapi
     * /shortened-link/{shortUrl}:
     *   delete:
     *     tags: [Shortened Links]
     *     summary: Delete a shortened URL
     *     parameters:
     *       - in: path
     *         name: shortUrl
     *         required: true
     *         schema:
     *           $ref: '#/components/rules/shortUrlParam'
     *     responses:
     *       204:
     *         description: Shortened URL deleted
     *       404:
     *         description: Link not found
     */
    namespace.delete('/:shortUrl', shortUrlParamRule, createRouteHandler(methods.delete));

    root.use('/shortened-link', namespace);
  };
};

export const buildShortenedLinkHandler = (params: Params): IHandler => {
  const create = buildCreate(params);
  const redirect = buildRedirect(params);
  const info = buildInfo(params);
  const deleteLink = buildDelete(params);

  return {
    registerRoutes: buildRegisterRoutes({
      create,
      redirect,
      info,
      delete: deleteLink,
    }),
  };
};
