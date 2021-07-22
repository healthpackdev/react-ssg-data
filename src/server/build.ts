import { generateStaticDatas, generateStaticPages } from '@/server/generate-static';
import routes from '@/routes';
import log from '@/tools/logger';

const build = async () => {
  generateStaticDatas().then(() => {
    log.success('Static Datas generated.');
    generateStaticPages(routes).then(() => {
      log.success('Static Pages generated.');
    });
  });
};

export default build;
