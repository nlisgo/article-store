import createApp from './app';
import createRouter from './router';
import PersistArticles from './adaptors/persist-articles';
import pgPromise from 'pg-promise';
import Routes from './routes';

const articles = new PersistArticles(pgPromise()(process.env.DATABASE_CONNECTION_STRING));
const router = createRouter();
const apiDocumentationPath = router.url(Routes.ApiDocumentation);

const app = createApp(articles, router, apiDocumentationPath);

app.listen(8080);
