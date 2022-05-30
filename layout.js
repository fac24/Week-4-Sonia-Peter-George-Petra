function layout(title, content) {
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./public/style.css">
    <title>${title}</title>
</head>
<body>
    ${content}
</body>
</html>
`;
  return html;
}

module.exports = layout;
