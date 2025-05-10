const emailTemplate = `
<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>{{title}}</title>
      <style>
         body {
         font-family: Arial, sans-serif;
         background: #f6f6f6;
         margin: 0;
         padding: 0;
         }
         .container {
         max-width: 600px;
         margin: 30px auto;
         background: #fff;
         padding: 32px;
         border-radius: 8px;
         box-shadow: 0 2px 8px #eee;
         }
         .title {
         font-size: 28px;
         font-weight: bold;
         margin-bottom: 8px;
         }
         .blog-link {
         margin-bottom: 22px;
         display: block;
         font-size: 15px;
         color: #1188E6;
         text-decoration: none;
         }
         .content {
         font-size: 16px;
         color: #222;
         margin-bottom: 30px;
         }
         .unsubscribe {
         font-size: 12px;
         text-align: center;
         margin: 20px 0 0 0;
         color: #888;
         }
         @media (max-width: 600px) {
         .container { padding: 16px; }
         .title { font-size: 22px; }
         }
      </style>
   </head>
   <body>
      <div class="container">
         <div class="title">{{title}}</div>
         <a class="blog-link" href="{{link}}" target="_blank">Read on the blog</a>
         <div class="content">{{content}}</div>
      </div>
      <div class="unsubscribe">
         <a href="{{unsubscribe}}" style="color:#888;" target="_blank">Unsubscribe</a>
      </div>
   </body>
</html>
`;

export default emailTemplate;
