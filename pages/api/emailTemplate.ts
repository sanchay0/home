const emailTemplate = `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background: #f6f6f6;
      margin: 0;
      padding: 0;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 30px auto;
        background: #fff;
        padding: 32px;
        border-radius: 8px;
        box-shadow: 0 2px 8px #eee;
      "
    >
      <div style="font-size: 28px; font-weight: bold; margin-bottom: 8px">
        {{title}}
      </div>
      <a
        href="{{link}}"
        target="_blank"
        style="
          margin-bottom: 22px;
          display: block;
          font-size: 15px;
          color: #1188e6;
          text-decoration: none;
        "
        >Read on the blog</a
      >
      <div style="font-size: 16px; color: #222; margin-bottom: 30px">
        {{content}}
      </div>
    </div>
    <div
      style="
        font-size: 12px;
        text-align: center;
        margin: 20px 0 20px 0;
        color: #888;
      "
    >
      <a href="{{unsubscribe}}" style="color: #888" target="_blank"
        >Unsubscribe</a
      >
    </div>
  </body>
</html>
`;

export default emailTemplate;
