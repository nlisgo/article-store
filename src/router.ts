import Router from '@koa/router';
import Routes from './routes';
import apiDocumentation from './routes/api-documentation';
import articleList from './routes/article-list';
import entryPoint from './routes/entry-point';
import Articles from './adaptors/articles';

export default (articles: Articles): Router => {
  const router = new Router();

  router.get(Routes.ApiDocumentation, '/doc', apiDocumentation(router));
  router.get(Routes.ArticleList, '/articles', articleList(articles, router));
  router.get(Routes.EntryPoint, '/', entryPoint(router));

  return router;
};
