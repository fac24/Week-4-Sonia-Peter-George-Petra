function layout(title, content) {
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Kalam&display=swap" rel="stylesheet">
    <title>${title}</title>
</head>
<body>
  <header class="banner flex-container"><h1>Cocorico</h1></header>
    ${content}
</body>
</html>
`;
  return html;
}

module.exports = layout;
