//函数式中间件  还有全局中间件需要写在跟里面main
export function logger(req, res, next) {
  console.log('this is function middleware');
  next();
}
