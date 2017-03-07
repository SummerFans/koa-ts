export async function IndexPage(ctx){
   await ctx.render('index', {
        user: 'John'
    });
};
