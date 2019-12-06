import createHttpError from 'http-errors';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { Next, Response } from 'koa';
import InMemoryArticles from '../../src/adaptors/in-memory-articles';
import Articles from '../../src/articles';
import addArticle from '../../src/routes/add-article';
import createContext from '../context';
import createArticle from '../create-article';
import runMiddleware from '../middleware';

const makeRequest = async (
  body: JsonLdObj = {},
  next?: Next,
  articles: Articles = new InMemoryArticles(),
): Promise<Response> => (
  runMiddleware(addArticle(articles), createContext({ body }), next)
);

describe('add article', (): void => {
  it('should return a successful response', async (): Promise<void> => {
    const articles = new InMemoryArticles();
    const response = await makeRequest(createArticle(), undefined, articles);

    expect(response.status).toBe(204);
    expect(await articles.count()).toBe(1);
  });

  it('should throw an error if id is already set', async (): Promise<void> => {
    await expect(makeRequest(createArticle('_:1'))).rejects.toThrow(new createHttpError.Forbidden('Article IDs must not be set (\'_:1\' was given)'));
  });

  it('should throw an error if it is not a schema:Article', async (): Promise<void> => {
    await expect(makeRequest(createArticle(undefined, undefined, 'http://schema.org/NewsArticle'))).rejects.toThrow(new createHttpError.Forbidden('Article type must be http://schema.org/Article (\'http://schema.org/NewsArticle\' was given)'));
  });

  it.skip('should throw an error if no scheam:name set', async (): Promise<void> => {
    // check appropriate error is thrown
  });
});
