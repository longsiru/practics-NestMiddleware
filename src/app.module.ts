import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsController } from './controller/news/news.controller';
import { ProductController } from './controller/product/product.controller';
import { UserController } from './controller/user/user.controller';

//引入中间件A
//中间件就是匹配路由之前或者匹配路由完成做的一系列的操作。中间件中如果想往下
//匹配的话，那么需要写 next()
//访问路由之前都会先经过中间件。
import { InitMiddleware } from './middleware/init/init.middleware';
import { UserMiddleware } from './middleware/user/user.middleware';
import { NewsMiddleware } from './middleware/news/news.middleware';
import { logger } from './middleware/logger.middleware';
//函数式中间件  还有全局中间件需要写在跟里面main

@Module({
  imports: [],
  controllers: [
    AppController,
    NewsController,
    ProductController,
    UserController,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //1
    // consumer
    //   .apply(InitMiddleware)
    //   //.forRoutes('*'); 匹配所有的路由
    //   // .forRoutes('user')    //匹配指定路由
    //   //.forRoutes(UserController)里面也可以直接传入一个控制器。但是不建议写
    //   //匹配多个路由
    //   .forRoutes(
    //     { path: 'user', method: RequestMethod.ALL },
    //     { path: 'news', method: RequestMethod.ALL },
    //   );

    //2
    // consumer
    //   .apply(InitMiddleware)
    //   .forRoutes('*')
    //   .apply(UserMiddleware)
    //   .forRoutes('user')
    //   .apply(NewsMiddleware)
    //   .forRoutes('news');

    //3
    consumer.apply(NewsMiddleware, UserMiddleware, logger).forRoutes(
      { path: 'user', method: RequestMethod.ALL }, //path: 'u*r'
      { path: 'news', method: RequestMethod.ALL },
    );
  }
}
